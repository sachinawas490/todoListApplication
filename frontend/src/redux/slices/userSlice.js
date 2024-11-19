import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: null,
        selectedUser: null,
        todos:[]
       
    },
    reducers: {
        setAuthUser: (state, action) => {console.log(action.payload);
            state.authUser = action.payload;
        },
        setTodos: (state, action) => {
            state.todos = action.payload;
           
        },
        setNewTodo: (state, action) => {
            state.todos = [...state.todos, action.payload]
            //  console.log(state.todos,"for action ")
        },
        setUpdatedTodo: (state, action) => {
            state.todos = state.todos.map(val => {
                if (val._id === action.payload._id) {
                    return action.payload
                }
                return val;
            })
        }
    },
});

export const { setAuthUser, setTodos,setNewTodo,setUpdatedTodo } = userSlice.actions;
export default userSlice.reducer;