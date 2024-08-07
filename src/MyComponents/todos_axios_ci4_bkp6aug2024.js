import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Todos_ci4 = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch todos from the API
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/get_todos'); // Replace with your actual API URL
                setTodos(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch todos');
                setLoading(false);
            }
        };

        fetchTodos();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Todos</h1>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <strong>{todo.title}</strong>: {todo.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todos_ci4;
