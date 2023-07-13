import React, { useState, useEffect } from "react";
import axios from "axios";
import Dtable from "../driverInfo/Dtable";
import Dmodal from "../driverInfo/Dmodal";

function DriverCRUD() {
  const [modalOpen, setModalOpen] = useState(false);

  const [rows, setRows] = useState([]);

  const [rowToEdit, setRowToEdit] = useState(null);

  const getDriver = async () => {
    try {
      const response = await axios.get("http://localhost:8080/driverapi");
      console.log(response.data);
      setRows(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDriver();
  }, []);

  const deleteDriver = async (deleteDriverIdNumber) => {
    console.log("Entered delete " + deleteDriverIdNumber);
    try {
      const response = await axios.delete(
        `http://localhost:8080/driverapi/${deleteDriverIdNumber}`
      );
      console.log(response.data);
      // Perform any additional actions or update UI as needed

      // getCabs() to reload the table
      getDriver();
    } catch (error) {
      console.error(error);
    }
  };

  // Edit the field
  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    console.log(rowToEdit);

    setModalOpen(true);
  };

  // Add new row
  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;
            return newRow;
          })
        );
  };

  return (
    <div className="DriverCRUD">
      <Dtable rows={rows} deleteRow={deleteDriver} editRow={handleEditRow} />
      <button className="btn" onClick={() => setModalOpen(true)}>
        Add
      </button>
      {modalOpen && (
        <Dmodal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default DriverCRUD;
