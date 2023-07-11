import React, { useState } from "react";
import "../../css/Dmodal.css";

const Dmodal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      id: "",
      name: "",
      email: "",
      mobile: "",
    }
  );

  // Checking error
  const [errors, setErrors] = useState("");

  // Check if all inputs are filled
  const validateForm = () => {
    if (formState.id && formState.name && formState.email && formState.mobile) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);
    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(event) => {
        if (event.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="id">Id</label>
            <input name="id" value={formState.id} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input name="name" value={formState.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              name="mobile"
              value={formState.mobile}
              onChange={handleChange}
            />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button className="btn" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dmodal;
