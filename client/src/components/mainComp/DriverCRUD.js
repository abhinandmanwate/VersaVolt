import  React, { useState } from 'react';

import Dtable from "../driverInfo/Dtable";
import Dmodal from "../driverInfo/Dmodal";


function DriverCRUD() {
    const [modalOpen, setModalOpen] = useState(false);

    const [rows, setRows] = useState([
      {
        id: "9859",
        name: "ABC",
        email: "abc@gmail",
        mobile: "1234567890",
      },
      {
        id: "1245",
        name: "John Doe",
        email: "johndoe@example.com",
        mobile: "9876543210",
      },
      {
        id: "7854",
        name: "Jane Smith",
        email: "janesmith@example.com",
        mobile: "8765432109",
      },
    ]);

    const [rowToEdit, setRowToEdit] = useState(null);

    //Handle delete rows
    const handleDeleteRow = (targetIndex) => {
      setRows(rows.filter((_, idx) => idx !== targetIndex));
    };

    // Edit the field
    const handleEditRow = (idx) => {
      setRowToEdit(idx);
  
      setModalOpen(true);
    };

    // Add new row 
    const handleSubmit = (newRow) => {
      rowToEdit === null
        ? setRows([...rows, newRow])
        : setRows(
          rows.map((currRow, idx) => {
            if(idx !== rowToEdit) return currRow;
            return newRow;
          })
        );
      
    };

  return (
    <div className='DriverCRUD'>
      <Dtable rows={rows} deleteRow = {handleDeleteRow} editRow = {handleEditRow}/>
      <button className='btn' onClick={() => setModalOpen(true)}>
        Add
      </button>
      {modalOpen && <Dmodal closeModal={() => {
        setModalOpen(false);
        setRowToEdit(null);
      }}
        onSubmit={handleSubmit}
        defaultValue={rowToEdit !== null && rows[rowToEdit]} 
      />}
      
    </div>
  )
}

export default DriverCRUD
