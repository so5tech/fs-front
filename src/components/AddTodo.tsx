// import React, {useState} from 'react'
// import { UseDispatch } from 'react-redux'
// import { addTodo } from '../features/todo/todoSlice'

// function AddTodo() {
//     const [title, setTitle] = useState<string>('')
//     const [description, setDescription] = useState<string>('')
//     const [input, setInput] = useState<string>('')
//     const dispatch = UseDispatch()
//     const addTodo = (e) => {
//         e.preventDefault()
//         dispatch(addTodo(input))
//         setInput('')
//     }

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault()
//         console.log(title, description)
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//             <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
//             <button type="submit">Add Todo</button>
//         </form>
//     )
// }
// }