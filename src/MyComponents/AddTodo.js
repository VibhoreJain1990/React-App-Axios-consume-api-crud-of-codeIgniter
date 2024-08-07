import React, { useState } from 'react'

export const AddTodo = ({addTodo}) => {
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [error,setError]=useState("");
    const submit=(e)=>{
        e.preventDefault();
        if (!title) {
            setError("Title cannot be blank");
        } else if (!desc) {
            setError("Description cannot be blank");
        }else
        {
        //Check if title or description already exists
        let all_todos = JSON.parse(localStorage.getItem("todos")) || [];
        const titleExists = all_todos.some(todo => todo.title === title);
        const descExists = all_todos.some(todo => todo.desc === desc);

        if (titleExists) {
           // alert('Title already exists');
            setError("Title already exists");
        } else if (descExists) {
            //alert('Description already exists');
            setError("Description already exists");
        }else
        {
            addTodo(title,desc);
            //title="";
            //desc="";//constant hai to method say hi update hoga, nahi to error dega..
            setTitle("");
            setDesc("");
            setError("");
        } 
        } 
    }
    return (
        <div  className="container my-3">
            <h3>Add a Todo</h3>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="form-control" id="title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" value={desc} onChange={(e)=>setDesc(e.target.value)} className="form-control" id="desc" />
                </div>
                <span id="error_show" className="text-danger">{error}</span><br/>
                <button type="submit" className="btn btn-sm btn-success">Add Todo</button>
            </form>
        </div>
    )
}
