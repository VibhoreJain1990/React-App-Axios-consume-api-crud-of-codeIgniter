import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faEye, faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Modal from './ShowModal.js';
import LogoutButton from '../Logout.js';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';  // Import DataTables CSS
// Import custom CSS
import './customDataTableStyles.css'; 

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [customError, setCustomError] = useState(null);

    const [editingTodo, setEditingTodo] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const [addingTodo, setAddingTodo] = useState(false);
    const [addTitle, setAddTitle] = useState('');
    const [addDescription, setAddDescription] = useState('');

    const [open, setOpen] = React.useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalDesc, setModalDesc] = useState('');
    const [modalTodo, setModalTodo] = React.useState(false);

    const tableRef = useRef(null);
    const dataTableRef = useRef(null);

    const handleClose = () => {
        setOpen(false);
        setModalTodo(false);
        setModalTitle('');
        setModalDesc('');
        setEditingTodo(null);
        setAddingTodo(false);
        setEditTitle('');
        setEditDescription('');
        setAddTitle('');
        setAddDescription('');
        setCustomError('');
    };

    const handleOpen = (title, description) => {
        setModalTodo(true);
        setOpen(true);
        setModalTitle(title);
        setModalDesc(description);
    };

    useEffect(() => {
        // Fetch todos from the API
        const fetchTodos = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get('http://localhost:8080/get_todos', {
                    headers: {
                        Authorization: `Bearer ${token}`  // Include the bearer token
                    }
                });
                // Reverse the data before setting it to state
                const reversedTodos = response.data.reverse();
                setTodos(reversedTodos);
                setLoading(false);
            } catch (err) {
                setCustomError('Failed to fetch todos');
                setLoading(false);
            }
        };

        fetchTodos();
    }, []);

    useEffect(() => {
        if (tableRef.current) {
            // Initialize DataTable if not already initialized
            if (!dataTableRef.current) {
                dataTableRef.current = new DataTable(tableRef.current, {
                    language: {
                        lengthMenu: 'Show _MENU_ entries' // Customize the text here
                    }
                });
            } else {
                // Redraw DataTable with updated todos
                dataTableRef.current.clear();
                dataTableRef.current.rows.add(todos);
                dataTableRef.current.draw();
            }
        }

        // Cleanup function to destroy DataTable instance
        return () => {
            if (dataTableRef.current) {
                dataTableRef.current.destroy();
                dataTableRef.current = null;
            }
        };
    }, [todos]);

    const handleEditClick = (todo) => {
        setEditingTodo(todo.id);
        setEditTitle(todo.title);
        setEditDescription(todo.description);
        setOpen(true);
    };

    const handleAddNewClick = () => {
        setAddingTodo(true);
        setOpen(true);
    };

    const handleUpdateSaveClick = async () => {
        if (!editTitle) { setCustomError('Title is required'); }
        else if (editTitle.length < 3) { setCustomError('Title should be at least 3 characters long'); }
        else if (!editDescription) { setCustomError('Description is required'); }
        else if (editDescription.length < 5) { setCustomError('Description should be at least 5 characters long'); }
        else {
            try {
                const token = localStorage.getItem('jwtToken');
                await axios.put(`http://localhost:8080/update_todo/${editingTodo}`, {
                    title: editTitle,
                    description: editDescription,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`  // Include the bearer token
                    }
                });
                setTodos(todos.map(todo =>
                    todo.id === editingTodo
                        ? { ...todo, title: editTitle, description: editDescription }
                        : todo
                ));
                handleClose(); // Use handleClose to reset state
            } catch (err) {
                setCustomError('Failed to update todo: ' + err);
            }
        }
    };

    const handleAddSaveClick = async () => {
        if (!addTitle) { setCustomError('Title is required'); }
        else if (addTitle.length < 3) { setCustomError('Title should be at least 3 characters long'); }
        else if (!addDescription) { setCustomError('Description is required'); }
        else if (addDescription.length < 5) { setCustomError('Description should be at least 5 characters long'); }
        else {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.post(`http://localhost:8080/create_todo`, {
                    title: addTitle,
                    description: addDescription,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`  // Include the bearer token
                    }
                });

                if (response.data.status === 'success') {
                    const newTodo = {
                        id: response.data.id,
                        title: addTitle,
                        description: addDescription,
                    };

                    setTodos(prevTodos => [newTodo, ...prevTodos ]);//i want to show the newly added todo at top
                    handleClose(); // Use handleClose to reset state
                } else {
                    setCustomError('Failed to add todo: ' + response.data.message);
                }
            } catch (err) {
                setCustomError('Failed to add todo: ' + err);
            }
        }
    };

    const handleDeleteClick = async (todoId) => {
        if (window.confirm("Do you really want to delete?")) {
            try {
                const token = localStorage.getItem('jwtToken');
                await axios.delete(`http://localhost:8080/delete_todo/${todoId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`  // Include the bearer token
                    }
                });
                // Update state and let DataTable re-render
                setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== todoId));
                setCustomError('');
            } catch (err) {
                setCustomError(`Failed to delete todo: ${err.message}`);
            }
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <div className='mt-3'>
                <h1 style={{"display":"inline"}}>Todos
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                        onClick={() => handleAddNewClick()}
                        style={{ marginLeft: 98, cursor: 'pointer' }}
                    />
                    <span onClick={() => handleAddNewClick()} style={{ cursor: 'pointer' }}>Add New Item</span>
                </h1>
                <LogoutButton/>
                <table ref={tableRef} className='display'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(todo => (
                            <tr key={todo.id}>
                                <td><strong>{todo.title}</strong></td>
                                <td>{todo.description}</td>
                                <td>
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        onClick={() => handleOpen(todo.title, todo.description)}
                                        style={{ marginLeft: 8, cursor: 'pointer', color: 'brown' }}
                                    />
                                    <FontAwesomeIcon
                                        icon={faPencilAlt}
                                        onClick={() => handleEditClick(todo)}
                                        style={{ marginLeft: 8, cursor: 'pointer', color: 'orange' }}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        onClick={() => handleDeleteClick(todo.id)}
                                        style={{ marginLeft: 8, cursor: 'pointer', color: 'red' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {editingTodo && (
                    <div style={{
                        textAlign: "center",
                        display: "block",
                        padding: 30,
                        margin: "auto",
                    }} >
                    <Modal isOpen={open} onClose={handleClose}>
                        <>
                        <h2>Edit Todo</h2><br />
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Title"
                            maxLength={50}
                        /><br /><br />
                        <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Description"
                        /><br />
                        <button onClick={handleUpdateSaveClick} className='btn btn-primary'>Update</button>&nbsp;&nbsp;
                        <button onClick={handleClose} className='btn btn-danger'>Cancel</button>
                        <p className="text-danger">{customError}</p>
                        </>
                        </Modal>
                    </div>
                )}
                {addingTodo && (
                    <div style={{
                        textAlign: "center",
                        display: "block",
                        padding: 30,
                        margin: "auto",
                    }} >
                        <Modal isOpen={open} onClose={handleClose}>
                        <>
                        <h2>Add Todo</h2><br />
                        <input
                            type="text"
                            value={addTitle}
                            onChange={(e) => setAddTitle(e.target.value)}
                            placeholder="Title"
                        /><br /><br />
                        <textarea
                            value={addDescription}
                            onChange={(e) => setAddDescription(e.target.value)}
                            placeholder="Description"
                        /><br />
                        <button onClick={handleAddSaveClick} className='btn btn-primary'>Create</button>&nbsp;&nbsp;
                        <button onClick={handleClose} className='btn btn-danger'>Cancel</button>
                        <p className="text-danger">{customError}</p>
                        </>
                        </Modal>
                    </div>
                )}
                
                {modalTodo && (
                    <div
                        style={{
                            textAlign: "center",
                            display: "block",
                            padding: 30,
                            margin: "auto",
                        }}
                    >
                        <Modal isOpen={open} onClose={handleClose}>
                            <>
                                <h1>{modalTitle}</h1>
                                <h3>{modalDesc}</h3>
                            </>
                        </Modal>
                    </div>
                )}
            </div>
        </>
    );
};

export default Todos;
