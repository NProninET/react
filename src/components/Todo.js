import React, { useState } from "react";

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newName === '') {
      setEditing(false)
    } else {
      props.editTask(props.id, newName);
      setNewName("");
      setEditing(false);
    }
  }

  const editingTemplate = (
    <form className="todo-edit" onSubmit={handleSubmit}>
      <div className="todo-item">
      <label className="todo-item-label" htmlFor={props.id}>
        <input
          id={props.id}
          type="checkbox"
          className="todo-item-checkbox"
          checked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <span className="custom-checkbox"></span>
      </label>
        <label className="todo-label" htmlFor={props.id} >
        </label>
        <input
          id={props.id}
          className="todo-text"
          placeholder={props.name}
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="todo-item" onDoubleClick={() => setEditing(true)}>
      <label className="todo-item-label" htmlFor={props.id}>
        <input
          id={props.id}
          type="checkbox"
          className="todo-item-checkbox"
          checked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <span className="custom-checkbox"></span>
        {props.name}
      </label>

      <input id={props.id} type="checkbox" className="danger-icon"></input>
      <label
        className="todo-danger"
        htmlFor={props.id}
        onClick={() => props.deleteTask(props.id)}
      ></label>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
