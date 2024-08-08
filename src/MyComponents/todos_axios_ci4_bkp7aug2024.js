import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faEye, faTrashAlt,faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Modal from './ShowModal.js';


const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [error, setError] = useState(null);
    const [customerror, setCustomError] = useState(null);

    const [editingTodo, setEditingTodo] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const [addingTodo, setAddingTodo] = useState(false);
    const [addTitle, setAddTitle] = useState('');
    const [addDescription, setAddDescription] = useState('');

    const handleClose = () => {
        setOpen(false);
        setModalTodo(false);
        setModalTitle('');
        setModalDesc('');
    };
    
    const [open, setOpen] = React.useState(false);
    const [modaltitle,setModalTitle]=useState('');
    const [modaldesc,setModalDesc]=useState('');
    const [modalTodo, setModalTodo] = React.useState(false);
    
    const handleOpen = (x,y) => {
        setModalTodo(true);
        setOpen(true);
        setModalTitle(x);
        setModalDesc(y);
    };
    
    useEffect(() => {
        // Fetch todos from the API
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/get_todos'); // Replace with your API URL
                
                setTodos(response.data);
                setLoading(false);
            } catch (err) {
                //setError('Failed to fetch todos');
                setCustomError('Failed to fetch todos');
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
        if(!editTitle){setCustomError('Title is required');}
        else if(editTitle.length<3)
        {setCustomError('Title should be at least 3 charactters long');}
        else if(!editDescription){setCustomError('Description is required');}
        else if(editDescription.length<5)
        {setCustomError('Description should be at least 5 charactters long');}
        else
        {
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
            setCustomError('');
        } catch (err) {
            //setError('Failed to update todo' + err);
            setCustomError('Failed to update todo' + err);
        }
        }
    };
    
    const handleAddSaveClick = async () => {
        if(!addTitle){setCustomError('Title is required');}
        else if(addTitle.length<3){setCustomError('Title should be at least 3 characters long');}
        else if(!addDescription){setCustomError('Description is required');}
        else if(addDescription.length<5){setCustomError('Description should be at least 5 characters long');}
        else
        {
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
            setCustomError('');
            }else {
                // Handle cases where the response status is not 'success'
                //setError('Failed to add todo: ' + response.data.message);
                setCustomError('Failed to add todo: ' + response.data.message);
            }
        } catch (err) {
            //setError('Failed to add todo' + err);
            setCustomError('Failed to add todo' + err);
        }
        }
    };

    const handleDeleteClick = async (todoId) => {
        // Confirm deletion
        if (window.confirm("Do you really want to delete?")) {
            try {
                // Send delete request
                await axios.delete(`http://localhost:8080/delete_todo/${todoId}`);
                
                // Update state to remove deleted todo
                setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== todoId));
            } catch (err) {
                // Set error message with a space after "todo"
                //setError(`Failed to delete todo: ${err.message}`);
                setCustomError(`Failed to delete todo: ${err.message}`);
            }
        }
    };
    

    if (loading) return <p>Loading...</p>;
    //if (error) return <p>{error}</p>;

    return (<>
        <div className='mt-3'>
            <h1>Todos<FontAwesomeIcon
                            icon={faPlusCircle}
                            onClick={() => handleAddNewClick()}
                            style={{ marginLeft: 98, cursor: 'pointer' }}
                        /><span onClick={() => handleAddNewClick()} style={{cursor: 'pointer'}}>Add New Item</span></h1>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <strong>{todo.title}</strong>: {todo.description}
                        <FontAwesomeIcon
                            icon={faEye}
                            onClick={() => handleOpen(todo.title, todo.description)}
                            style={{ marginLeft: 8, cursor: 'pointer',color:'brown' }}
                        />
                        <FontAwesomeIcon
                            icon={faPencilAlt}
                            onClick={() => handleEditClick(todo)}
                            style={{ marginLeft: 8, cursor: 'pointer',color:'orange' }}
                        />
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            onClick={() => handleDeleteClick(todo.id)}
                            style={{ marginLeft: 8, cursor: 'pointer' ,color:'red'}}
                        />
                    </li>
                ))}
            </ul>
            {editingTodo && (
                <div>
                    <h2>Edit Todo</h2><br/>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Title"
                        maxLength={50}
                    /><br/><br/>
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Description"
                    /><br/>
                    <button onClick={handleUpdateSaveClick} className='btn btn-primary'>Update</button>&nbsp;&nbsp;
                    <button onClick={() => window.location.reload()} className='btn btn-danger'>Cancel</button>
                </div>
            )}
            {addingTodo && (
                <div>
                    <h2>Add Todo</h2><br/>
                    
                    <input
                        type="text"
                        value={addTitle}
                        onChange={(e) => setAddTitle(e.target.value)}
                        placeholder="Title"
                    /><br/><br/>
                    <textarea
                        value={addDescription}
                        onChange={(e) => setAddDescription(e.target.value)}
                        placeholder="Description"
                    /><br/>
                    <button onClick={handleAddSaveClick} className='btn btn-primary'>Create</button>&nbsp;&nbsp;
                    <button onClick={() => window.location.reload()} className='btn btn-danger'>Cancel</button>
                </div>
            )}
            <p className="text-danger">{customerror}</p>
        {modalTodo && (
        <div
            style={{
                textAlign: "center",
                display: "block",
                padding: 30,
                margin: "auto",
            }}
        >
            <button type="button" onClick={handleOpen}>
                Click Me to Open Modal
            </button>
            <Modal isOpen={open} onClose={handleClose}>
                <>
                    <h1>{modaltitle}</h1>
                    <h3>{modaldesc}</h3>
                </>
            </Modal>
        </div>)}

        </div>
        </>
    );
    
};

export default Todos;
