import React, { useState } from "react";



//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [toDos, setToDos] = useState([]);
	const [completedTasks, setCompletedTasks] = useState(0);

	const handleAddTask = () => {
		if (inputValue.trim() !== "") {
			setToDos([...toDos, { task: inputValue, completed: false }]);
			setInputValue("");
		}
	};

	const handleTaskToggle = (index) => {
		const newToDos = [...toDos];
		if (!newToDos[index].completed) {
			setCompletedTasks(completedTasks + 1); // Incrementa el contador solo si la tarea no estaba completada antes
		}
		newToDos[index].completed = !newToDos[index].completed;
		setToDos(newToDos);
	};
	const DeleteAll = () => {
		setToDos([]);
		setCompletedCounter(0);
	};

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
										handleAddTask();
									}



								}}
								placeholder="Add new task..."></input></li>

						{toDos.map((todo, index) => {
							return (
								<li className={`list-group-item ${toDos.completed ? "completed" : ""}`} key={index}>
									{todo.task}
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill float-end trash" viewBox="0 0 16 16" onClick={() => { setToDos(toDos.filter((t, currentIndex) => index !== currentIndex)) }}>
										<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
									</svg>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg check float-end me-1" viewBox="0 0 16 16" onClick={() => handleTaskToggle(index)}>
										<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
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
			<h3 className="m-5 text-danger">Pending tasks: {toDos.length} </h3>

			<h3 className="m-5 text-success">Completed tasks: {completedTasks}</h3>

		</div>
	);
};

export default Home;
