import React, { useState } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  const [checked, setChecked] = useState(false);

  function changeChevronColor() {
    const completedTasks = tasks.every((c) => c.completed === true);
    console.log(completedTasks);
    if (completedTasks) {
      setChecked(true);
    }
  }

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
    tasks.filter((task) => task.completed === false).length
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

    const completedTasks = updatedTasks.every((c) => c.completed === true);
    if (completedTasks) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }

  const black = (
    <label
      className="chevron-bottom black-chevron"
      htmlFor="icon-checkbox"
    ></label>
  );

  const gray = (
    <label
      className="chevron-bottom gray-chevron"
      htmlFor="icon-checkbox"
    ></label>
  );

  function checkAll() {
    const checked = tasks.some((c) => c.completed === true);
    const notChecked = tasks.every((c) => c.completed === false);
    const abcChecked = tasks.every((c) => c.completed === true);

    if (abcChecked) {
      setChecked(false);
      setTasks(
        tasks.map((d) => {
          return { ...d, completed: false };
        })
      );
    } else if (checked || notChecked) {
      setChecked(true);
      setTasks(
        tasks.map((d) => {
          return { ...d, completed: true };
        })
      );
    }
  }

  return (
    <>
      <h1 className="todosHeader">todos </h1>
      <ul role="list" className="todo-list" aria-labelledby="list-heading">
        <Form addTask={addTask} />
        {taskList}
        {tasks.length ? (
          <div className="main-buttons">
            <div className="heading-text">{headingText}</div>
            <div className="filter-buttons">{filterList}</div>
            <button className="clear-all" onClick={doneTodos}>
              Clear completed
            </button>
          </div>
        ) : (
          <div></div>
        )}
        {tasks.length ? (
          <div>
            <input
              type="checkbox"
              id="icon-checkbox"
              className="allToggler"
              onClick={checkAll}
            ></input>
            {checked ? black : gray}
          </div>
        ) : (
          <div></div>
        )}
      </ul>
    </>
  );
}

export default App;
