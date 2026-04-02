import React from 'react'
import { useState } from 'react';

// Helper function to format current date as yyyy-MM-dd
const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Helper function to format current time as HH:mm:ss
const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

// Function to convert date from yyyy-MM-dd to ddmmyyyy
const formatDateToDDMMYYYY = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}${month}${year}`;
};

const AddTodo = ({ addTodo }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [timeTargetDate, setTimeTargetDate] = useState(getCurrentDate());
    const [timeTargetTime, setTimeTargetTime] = useState(getCurrentTime());

    const submit = (e) => {
        e.preventDefault();//to prevent page reload
        if (!title || !desc || !timeTargetDate || !timeTargetTime) {
            alert("All fields are required")
        }
        else {
            const dateFormatted = formatDateToDDMMYYYY(timeTargetDate);
            addTodo(title, desc, dateFormatted, timeTargetTime);
            setTitle('');
            setDesc('');
            setTimeTargetDate(getCurrentDate());
            setTimeTargetTime(getCurrentTime());
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

                <div className="form-group">
                    <label htmlFor="timeTargetDate">Target Date (dd/mm/yyyy)</label>
                    <input type="date" value={timeTargetDate} onChange={(e) => setTimeTargetDate(e.target.value)}
                        className="form-control" id="timeTargetDate" />
                </div>

                <div className="form-group">
                    <label htmlFor="timeTargetTime">Target Time (hh:mm:ss)</label>
                    <input type="time" step="1" value={timeTargetTime} onChange={(e) => setTimeTargetTime(e.target.value)}
                        className="form-control" id="timeTargetTime" />
                </div>

                <button type="submit" className="btn btn-sm btn-success mt-3">Add Todo</button>
            </form>
        </div>
    )
}

export default AddTodo
