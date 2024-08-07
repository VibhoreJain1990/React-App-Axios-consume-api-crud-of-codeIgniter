import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faEye, faTrashAlt,faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editingTodo, setEditingTodo] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const [addingTodo, setAddingTodo] = useState(false);
    const [addTitle, setAddTitle] = useState('');
    const [addDescription, setAddDescription] = useState('');

    useEffect(() => {
        // Fetch todos from the API
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/get_todos'); // Replace with your API URL
                
                setTodos(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch todos');
                setLoading(false);
            }
        };

        fetchTodos();
    }, []);

    const handleEditClick = (todo) => {
        setEditingTodo(todo.id);
        setEditTitle(todo.title);
        setEditDescription(todo.description);
    };
    const handleAddNewClick = () => {
        setAddingTodo(true);
    };
    

    const handleUpdateSaveClick = async () => {
        try {
            await axios.put(`http://localhost:8080/update_todo/${editingTodo}`, {
                title: editTitle,
                description: editDescription,
            });
            setTodos(todos.map(todo =>
                todo.id === editingTodo
                    ? { ...todo, title: editTitle, description: editDescription }
                    : todo
            ));
            setEditingTodo(null);
        } catch (err) {
            setError('Failed to update todo' + err);
        }
    };
    
    const handleAddSaveClick = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/create_todo`, {
                title: addTitle,
                description: addDescription,
            });

            // Check the response status
            if (response.data.status === 'success') {
                // Create a new todo object manually
                const newTodo = {
                    id: response.data.id, // Ideally, get this from the server response if possible
                    title: addTitle,
                    description: addDescription,
                };

                // Update local state with the new todo item
                setTodos(prevTodos => [...prevTodos, newTodo]);

            // Clear the input fields or reset the state
            setAddingTodo(false);
            setAddTitle('');
            setAddDescription('');
            }else {
                // Handle cases where the response status is not 'success'
                setError('Failed to add todo: ' + response.data.message);
            }
        } catch (err) {
            setError('Failed to add todo' + err);
        }
    };


    const handleDeleteClick = async (todoId) => {
        try {
            await axios.delete(`http://localhost:8080/delete_todo/${todoId}`);
            setTodos(todos.filter(todo => todo.id !== todoId));
        } catch (err) {
            setError('Failed to delete todo' + err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Todos<FontAwesomeIcon
                            icon={faPlusCircle}
                            onClick={() => handleAddNewClick()}
                            style={{ marginLeft: 98, cursor: 'pointer' }}
                        />Add New Item</h1>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <strong>{todo.title}</strong>: {todo.description}
                        <FontAwesomeIcon
                            icon={faEye}
                            onClick={() => alert(`Showing details for ${todo.title}`)}
                            style={{ marginLeft: 8, cursor: 'pointer' }}
                        />
                        <FontAwesomeIcon
                            icon={faPencilAlt}
                            onClick={() => handleEditClick(todo)}
                            style={{ marginLeft: 8, cursor: 'pointer' }}
                        />
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            onClick={() => handleDeleteClick(todo.id)}
                            style={{ marginLeft: 8, cursor: 'pointer' }}
                        />
                    </li>
                ))}
            </ul>
            {editingTodo && (
                <div>
                    <h2>Edit Todo</h2>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Description"
                    />
                    <button onClick={handleUpdateSaveClick}>Save</button>
                </div>
            )}
            {addingTodo && (
                <div>
                    <h2>Add Todo</h2>
                    <input
                        type="text"
                        value={addTitle}
                        onChange={(e) => setAddTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <textarea
                        value={addDescription}
                        onChange={(e) => setAddDescription(e.target.value)}
                        placeholder="Description"
                    />
                    <button onClick={handleAddSaveClick}>Create</button>
                </div>
            )}
        </div>
    );
};

export default Todos;
