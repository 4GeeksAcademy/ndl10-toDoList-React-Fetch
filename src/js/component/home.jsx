import React, { useState, useEffect } from "react";
import User from "./User";


//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [toDos, setToDos] = useState([]);
	const [completedTasks, setCompletedTasks] = useState(0);
	const [user, setUser] = useState();
	const [taskLength, setTaskLength]= useState(0);










	
		const validateTask = (toDos) => {
			if (!toDos || !toDos.trim()) {
				alert("Task cannot be empty!");
			}
		}
	
		const createNewUser = async () => {
			await fetch('https://playground.4geeks.com/todo/users/ndl10', {
				method: 'POST'
			}).then(resp => {
				if (resp.ok) {
					alert('User created!')
					getUser();
				}
	
	
			})
		};
	
		const getUser = async () => {
			await fetch('https://playground.4geeks.com/todo/users/ndl10').then(resp => {
				if (!resp.ok) {
					createNewUser(user)
				}
				return resp.json()
			}).then(user => {setUser(user);
				setTaskLength(user.todos.length)
		})
		}
	
		useEffect(() => {
			getUser()
		}, [])
	
		const createTask = async (toDos) => {
			await fetch('https://playground.4geeks.com/todo/todos/ndl10', {
				method: 'POST',
				headers: {
					"content-type": "application/json"
				},
				body: JSON.stringify({
					"label": toDos,
					"is_done": false
				})
			}).then(resp => {
				if (resp.ok) {
					getUser()
				}
			})
		}
	
		const deleteTask = async (id) => {
		  await fetch(`https://playground.4geeks.com/todo/todos/${id}`,{
		method: 'DELETE',
		headers: {
			"content-type": "application/json"
		}})
		.then(resp => {
			if (resp.ok){
				getUser()
			}
	
		})
	
		}
	
	
	
		const handleAddTask = (e) => {
			validateTask(e.target.value)
	
			if (inputValue.trim() !== "") {
				createTask(inputValue)
				setInputValue("");
			}
		};
	
		const handleTaskToggle = (index) => {
			const newToDos = [...toDos];
			if (!newToDos[toDos.id].completed) {
				setCompletedTasks(completedTasks + 1);
			}
			newToDos[index].completed = !newToDos[index].completed;
			setToDos(newToDos);
		};
		const DeleteAll = async () => {
			await fetch('https://playground.4geeks.com/todo/users/ndl10',{
		  method: 'DELETE',
		  headers: {
			  "content-type": "application/json"
		  },
		  body: JSON.stringify({
             user: "ndl10" })
		})
		  .then(resp => {
			  if (resp.ok){
				  getUser()
			  }
	  
		  })
	  
		  }
	
	
		return (
			<div className="text-center bigDiv">
				
				<div className="container border border-4 border border-info rounded">
					<h1>To Do List</h1>
					<div className="container ">
						<ul className="list-group">
	
							<li className="list-group-item">
								<input
									className="w-100 border border-0"
									type="text"
									onClick={() => alert("Press Enter to add a new task")}
									onChange={(e) => setInputValue(e.target.value)}
									value={inputValue}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleAddTask(e);
										}
	
									}}
									placeholder="Add new task..."></input></li>
	
							{user && user.todos.map((todo) => {
								return (
									<li className={`list-group-item ${toDos.completed ? "completed" : ""}`} key={todo.id}>
										{todo.label}
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill float-end trash" viewBox="0 0 16 16" onClick={() => { deleteTask(todo.id)}}>
											<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
										</svg>
										
									</li>
								);
	
							})}
	
						</ul>
						<div className=" justify-content-center col-4 m-auto mt-3 mb-3">
							<button type="button" className="btnfos btnfos-5 list-group-item list-group-item-action rounded" onClick={DeleteAll}>Delete all</button>
						</div>
	
					</div>
	
	
				</div>
				<h3 className="m-5 text-danger">Pending tasks: {taskLength} </h3>
	
			</div>
		);
	}; 


export default Home;
