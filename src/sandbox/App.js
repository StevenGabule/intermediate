import React, {useState} from 'react';
import {gql, useMutation, useQuery} from "@apollo/client";

const GET_TODOS = gql`
    query getTodos {
        todos {
            done
            id
            text
        }
    }
`

const TOGGLE_TODO = gql`
    mutation toggleTodo($id: uuid!, $done: Boolean!) {
        update_todos(where: { id: { _eq: $id }}, _set: { done: $done }) {
            returning {
                done
                id
                text
            }
        }
    }
`

const ADD_TODO = gql`
    mutation addTodo($text: String!) {
        insert_todos(objects: { text: $text}) {
            returning {
                done
                id
                text
            }
        }
    }
`

const DELETE_TODO = gql`
    mutation deleteTodo($id: uuid!) {
        delete_todos(where: {id: {_eq: $id}}) {
            returning {
                done
                id
                text
            }
        }
    }
`

function App() {
    const [todoText, setTodoText] = useState('');
    const {data, loading, error} = useQuery(GET_TODOS);
    const [toggleTodo] = useMutation(TOGGLE_TODO);
    const [addTodo] = useMutation(ADD_TODO, {
        onCompleted: () => setTodoText('')
    });
    const [deleteTodo] = useMutation(DELETE_TODO);

    async function handleToggleTodo({id, done}) {
        const data = await toggleTodo({
            variables: {id, done: !done}
        })
        console.log(data)
    }

    function handleChange(e) {
        setTodoText(e.target.value);
    }

    async function handleAddTodo(e) {
        e.preventDefault();
        if (!todoText.trim()) return;
        await addTodo({
            variables: {text: todoText},
            refetchQueries: [
                {query: GET_TODOS}
            ]
        })
    }

    async function handleDeleteTodo({id}) {
        const isConfirmed = window.confirm('Do you want to delete this todo?')
        if (isConfirmed) {
            await deleteTodo({
                variables: {id: id},
                update: cache => {
                    const prevData = cache.readQuery({query: GET_TODOS})
                    const newTodos = prevData.todos.filter(todo => todo.id !== id);
                    cache.writeQuery({
                        query: GET_TODOS,
                        data: {todos: newTodos}
                    });
                }
            })
        }
    }

    if (error) return <div>Encounter error. Please check your internet connection...</div>

    if (loading) return <div>loading...</div>


    return (
        <div className="App">
            <h1>Learn the basics</h1>
            <form onSubmit={handleAddTodo}>
                <input type="text" value={todoText} placeholder={'Write your todo'} onChange={handleChange}/>
                <button type={'submit'}>Create</button>
            </form>
            <h4>Todo List</h4>
            <ul>
                {data.todos.map(todo => (
                    <li key={todo.id} onDoubleClick={() => handleToggleTodo(todo)}>
                        <span style={{textDecoration: `${todo.done ? "line-through" : ""}`}}>{todo.text}</span>
                        <button onClick={() => handleDeleteTodo(todo)}>&times;</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
