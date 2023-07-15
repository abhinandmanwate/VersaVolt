import  {React, useState }  from 'react'

import "../../css/ManageCab.css"
import MCabtable from '../cabDiver/MCabtable';
import MCabmodal from '../cabDiver/MCabmodal';
import MCabAssign from '../cabDiver/MCabAssign';


const ManageCab = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  const [rows, setRows] = useState([
    {
      CabRegNumber: "12",
      CabModel: "audi",
      CabColor: "red",
      DiverName: "ASD",
    },
    {
      CabRegNumber: "23",
      CabModel: "bmw",
      CabColor: "green",
      DiverName: "ZXC",
    },    
  ]);

  // const [rowToEdit, setRowToEdit] = useState(null);

  // const handleDeleteRow = (targetIndex) => {
  //   setRows(rows.filter((_, idx) => idx !== targetIndex));
  // };

  // const handleEditRow = (idx) => {
  //   setRowToEdit(idx);

  //   setModalOpen(true);
  // };

  const handleCheckboxChange = (idx) => {
    const updatedRows = rows.map((row, index) => {
      if (index === idx) {
        return {
          ...row,
          isChecked: !row.isChecked,
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setModalOpen(true);
  };

  // const handleSubmit = (newRow) => {
  //   rowToEdit === null
  //     ? setRows([...rows, newRow])
  //     : setRows(
  //         rows.map((currRow, idx) => {
  //           if (idx !== rowToEdit) return currRow;

  //           return newRow;
  //         })
  //       );
  // };
  
  // const handleAssign = (idx) => {
  //   setAssignModalOpen(true);
  //   setRowToEdit(idx);
  // };

  const handleSubmit = (newRow) => {
    setRows([...rows, newRow]);
    closeModal();
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAssign = (selectedRow) => {
    if (selectedRow) {
      setAssignModalOpen(true);
    }
  };

  const handleDriverSelect = (driverID) => {
    const updatedRows = rows.map((row) => {
      if (row.isChecked) {
        return {
          ...row,
          DriverName: driverList.find((driver) => driver.DriverID === driverID).DriverName,
          isChecked: false,
        };
      }
      return row;
    });
    setRows(updatedRows);
    setAssignModalOpen(false);
  };

  
  // Assign
  const [driverList, setDriverList] = useState([
    {
      DriverID: "1",
      DriverName: "John Doe",
    },
    {
      DriverID: "2",
      DriverName: "Kenny Rosh",
    },
  ]);

  

  // const handleDriverSelect = (driverID) => {
  //   const updatedRows = rows.map((row, idx) => {
  //     if (idx === rowToEdit) {
  //       return { ...row, DriverName: driverList.find((driver) => driver.DriverID === driverID).DriverName, };
  //     }
  //     return row;
  //   });
  //   setRows(updatedRows);
  //   setAssignModalOpen(false);
  //   setRowToEdit(null);
  // };


  return (
    <div className='ManageCab'>
    <MCabtable rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} assign={handleAssign}/>
    {/* <button onClick={() => setModalOpen(true)} className='btn'>Add</button> */}
    {/* <button onClick={() => setAssignModalOpen(true)} className='btn'>Assign</button> */}

    <button onClick={() => handleAssign()} className="btn" disabled={!rows.some((row) => row.isChecked)}>
        Assign
    </button>

      {modalOpen && (
        <MCabmodal
          closeModal={closeModal}
          onSubmit={handleSubmit}
          defaultValue={null}
        />
      )}

      {assignModalOpen && (
        <MCabAssign
          closeModal={() => setAssignModalOpen(false)}
          driverList={driverList}
          onDriverSelect={handleDriverSelect}
        />
      )}

    {/* {modalOpen && ( 
        <MCabmodal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          // defaultValue={rowToEdit !== null && rows[rowToEdit]}
          defaultValue={rowToEdit !== null ? rows[rowToEdit] : null}
        />
      )}
    
      {assignModalOpen && ( 
        <MCabAssign
          closeModal={() => {
            setAssignModalOpen(false);
            setRowToEdit(null);
          }}
          driverList={driverList}
          onDriverSelect={handleDriverSelect}
        />
      )} */}
      
    </div>

    
  )
}

export default ManageCab