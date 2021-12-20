import React, { useState } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

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
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const tasksNoun = taskList.length !== 1 ? "items" : "item";
  const headingText = `${
    tasks.filter((task) => task.completed == false).length
  } ${tasksNoun} left`;

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

  function checkAll(e) {
    let checked = e.target.checked;
    setTasks(
      tasks.map((d) => {
        d.completed = checked;
        return { ...d, completed: d.completed };
      })
    );
  }

  // function addBobo() {
  //   const footer = document.querySelector('.main-buttons')
  //   if(tasks.length <= 0) {
  //     return footer
  //   }
  // }



  return (
    <div className="todoapp stack-large">
      <h1 className="todosHeader">todos </h1>
      
      <ul
        role="list"
        className="todo-list"
        aria-labelledby="list-heading"
      >
        <Form addTask={addTask} />
        {taskList}
        {
          tasks.length ? 
            <div className="main-buttons">
              <div>{headingText}</div>
              <div className="filter-buttons">{filterList}</div>
              <button onClick={doneTodos}>Clear completed</button>
            </div>
            :
            <div></div>
        }
       {/* <div className="main-buttons">
         <div>{headingText}</div>
         <div className="filter-buttons">{filterList}</div>
         <button onClick={doneTodos}>Clear completed</button>
       </div> */}
       {
          tasks.length ?
<div>
                    <input type="checkbox" id="icon-checkbox" className="allToggler" onClick={checkAll}></input>
                    <label className="todo-label-icon" htmlFor="icon-checkbox"></label>
                    </div>
                    :
<div></div>
        }
      </ul>
    </div>
  );
}

export default App;
