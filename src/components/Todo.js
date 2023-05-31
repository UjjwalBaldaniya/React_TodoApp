import React, { useEffect, useState } from 'react'
import '../styles/todo.css'
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const Todo = () => {

    const todoLocalStorage = () => {
        const data = localStorage.getItem('todoData')
        if (data) {
            return JSON.parse(data)
        } else {
            return []
        }
    }

    const [inputField, setInputField] = useState({
        name: '',
    })
    const [todoData, setTodoData] = useState(todoLocalStorage());
    const [editIndex, setEditIndex] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)

    useEffect(() => {
        localStorage.setItem('todoData', JSON.stringify(todoData))
    }, [todoData])

    // --------- Change Functionality --------- //
    const handleChange = (e) => {
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value
        })
    }

    // --------- Submit Functionality --------- //
    const handleSubmit = (e) => {
        e.preventDefault()

        if (isSubmit) {
            const currentData = todoData;
            Object.assign(currentData[editIndex], inputField)
            setTodoData([...currentData])
            setInputField({
                name: '',
            })
            setIsSubmit(false)
        } else {
            setTodoData([...todoData, inputField])
            setInputField({
                name: ''
            })
        }
    }

    // --------- Delete Functionality --------- //
    const handleDelete = (i) => {
        const deleteData = todoData.filter((element, index) => index !== i)
        setTodoData(deleteData)
    }

    // --------- Edit Functionality --------- //
    const handleEdit = (i) => {
        const getEditData = todoData[i]
        setInputField({
            name: getEditData.name
        })
        setEditIndex(i)
        setIsSubmit(true)
    }

    return (
        <div className="todoWrapper">
            <div className='todoBox'>
                <h1 className='title'>
                    Welcome Your TodoList
                </h1>
                <form className='todoform' onSubmit={handleSubmit} >
                    <input type='text' className='todo-input' name='name' placeholder='What is the Task Today!' value={inputField.name} onChange={handleChange} />
                    <button type='submit' disabled={!inputField.name} className='todo-btn'>{isSubmit ? 'Edit' : 'Add'} todo </button>
                </form>

                {todoData.map((element, index) => (
                    <div className='todo' key={index}>
                        <p>{element.name}</p>
                        <div className='todo-icons'>
                            <AiFillEdit className='icon' onClick={() => handleEdit(index)} />
                            <MdDelete onClick={() => handleDelete(index)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Todo