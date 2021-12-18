import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    let tasks = [
      { id: 1, name: "Eat" },
      { id: 2, name: "Sleep" },
      { id: 3, name: "Repeat" }
    ]

    setTasks(
      tasks.map(task => {
        return {
          completed: false,
          id: task.id,
          name: task.name,
        }
      })
    )
  }, [])

  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${tasks.filter((task) => task.completed == false).length
    } ${tasksNoun} remaining`;

  function addTask(name) {
    const newTask = { id: Date.now(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function doneTodos() {
    setTasks(tasks.filter((todoItem) => todoItem.completed === false));
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }


  return (
    <div className="todoapp stack-large">
      {/* <button onClick={handleCheckboxChange}>Сделать выбранными</button> */}

      <h1>todos</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
        <button onClick={doneTodos} >Удалить выполненные</button>
        <button onClick={e => {
          let checked = e.target.checked;
          setTasks(tasks.map(d => {
            d.completed = checked;
            return { ...d, completed: !d.completed }
            //  ...d, completed: !d.completed }{
          }))
        }} >Выбрать все</button>
      </ul>
    </div >
  );
}

export default App;
