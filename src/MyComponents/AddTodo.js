import React from 'react'
import { useState } from 'react';


const AddTodo = ({ addTodo }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const submit = (e) => {
        e.preventDefault();//to prevent page reload
        if (!title || !desc) {
            alert("Title or Description cannot be blank")
        }
        else {
            addTodo(title, desc);
            setTitle('');
            setDesc('');
        }
    }

    return (
        <div className='container'>
            <h3 className="my-3">Add a Todo</h3>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="title">Todo Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" aria-describedby="emailHelp" />
                </div>

                <div className="form-group">
                    <label htmlFor="desc">Todo Description</label>
                    <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)}
                        className="form-control" id="desc" />
                </div>

                <button type="submit" className="btn btn-sm btn-success mt-3">Add Todo</button>
            </form>
        </div>
    )
}

export default AddTodo
