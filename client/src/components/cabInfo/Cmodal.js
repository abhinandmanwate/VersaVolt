import React, { useState } from "react";
import axios from "axios";
import "../../css/Dmodal.css";

const Cmodal = ({ closeModal }) => {
  const [newCabData, setNewCabData] = useState({
    cabRegistrationNumber: "",
    cabModel: "",
    cabColour: "",
  });

  const createCab = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/cabapi",
        newCabData
      );
      console.log(response.data);
      // Perform any additional actions or update UI as needed
      // history.push("/ctable");
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="modal-container"
      onClick={(event) => {
        if (event.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form onSubmit={createCab}>
          <div className="form-group">
            <label htmlFor="carRegisterNumber">Car Register Number</label>
            <input
              name="carRegisterNumber"
              onChange={(event) =>
                setNewCabData((prevData) => ({
                  ...prevData,
                  cabRegistrationNumber: event.target.value,
                }))
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="carModel">Car Model</label>
            <input
              name="carModel"
              onChange={(event) =>
                setNewCabData((prevData) => ({
                  ...prevData,
                  cabModel: event.target.value,
                }))
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="carColor">Car Color</label>
            <input
              name="carColor"
              onChange={(event) =>
                setNewCabData((prevData) => ({
                  ...prevData,
                  cabColour: event.target.value,
                }))
              }
            />
          </div>

          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cmodal;
