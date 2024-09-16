// import { createSlice, nanoid } from "@reduxjs/toolkit";

// // Define a type for the slice state
// interface TodoState {
//   todos: { id: string; text: string }[];
// }
// const initialState: TodoState = {
//   todos: [{ id: "1", text: "Hello world" }],
// };


// export const todoSlice= createSlice({
//     name: "todo",
//     initialState,
//     reducers: {
//         addTodo: (state, action) => {
//             const todo = { id: nanoid(), text: action.payload.text };
//             state.todos.push(todo);
//         },
//         removeTodo: (state, action) => {
//             state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
//         },
//     }
// })

// export const { addTodo, removeTodo } = todoSlice.actions;

// export default todoSlice.reducer;