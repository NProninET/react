import React, { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim()) {
      props.addTask(name);
      setName("");
    }
  }
  return (
    <form onSubmit={handleSubmit} >
      <div>      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg"></label>
      </h2></div>
      <div>      <input
        type="text"
        id="new-todo-input"
        placeholder="What needs to be done?"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      /></div>

    </form>
  );
}

export default Form;
