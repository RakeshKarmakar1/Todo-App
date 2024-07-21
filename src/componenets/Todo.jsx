import React, { useState, useEffect } from 'react';
import Tasklist from "./Tasklist";
import uuid from 'react-uuid';

const Todo = () => {
    const getLocalItem = () => {
        const storeItem = localStorage.getItem("list");
        return storeItem ? JSON.parse(storeItem) : [];
    }

    const [activity, setActivity] = useState("");
    const [task, setTask] = useState(getLocalItem());
    const [update, setUpdate] = useState(true);
    const [edit, setEdit] = useState(null);

    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(task));
    }, [task]);

    const handleChange = (e) => {
        setActivity(e.target.value);
    }

    const updateTask = () => {
        if (activity === "") {
            alert("Please enter something.");
        } else if (!update) {
            setTask(task.map((newele) => {
                if (newele.id === edit) {
                    return { ...newele, title: activity };
                }
                return newele;
            }));
            setActivity("");
            setUpdate(true);
        } else {
            const newActivity = {
                id: uuid(),
                title: activity,
                complete: false
            };
            setTask([...task, newActivity]);
            setActivity("");
        }
    }

    return (
        <div className="bg-gray-200 min-h-screen">
            <div className="container mx-auto py-8 px-4">
                <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-3xl font-bold text-center mb-8">Todo List</h2>
                    <div className="flex items-center border-b-2 border-teal-500 py-2">
                        <input
                            type="text"
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            placeholder="Add a new task..."
                            value={activity}
                            onChange={handleChange}
                        />
                        <button
                            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                            onClick={updateTask}
                        >
                            {update ? 'Add' : 'Update'}
                        </button>
                    </div>
                    <Tasklist task={task} setTask={setTask} setActivity={setActivity} setUpdate={setUpdate} update={update} setEdit={setEdit} />
                </div>
            </div>
        </div>
    );
}

export default Todo;
