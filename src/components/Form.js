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
      <div>
        <label htmlFor="new-todo-input" className="label__lg"></label>
     <input
        type="text"
        id="new-todo-input"
        placeholder="What needs to be done?"
        className="input_form"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      </div>

    </form>
  );
}

export default Form;
