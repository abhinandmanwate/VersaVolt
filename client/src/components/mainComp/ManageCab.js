// import { React, useState } from "react";

// import "../../css/ManageCab.css";
// import "../../css/Dmodal.css";
// import MCabtable from "../cabDiver/MCabtable";
// import MCabmodal from "../cabDiver/MCabmodal";
// import MCabAssign from "../cabDiver/MCabAssign";

// const ManageCab = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [assignModalOpen, setAssignModalOpen] = useState(false);

//   const [rows, setRows] = useState([
//     {
//       CabRegNumber: "12",
//       CabModel: "audi",
//       CabColor: "red",
//       DiverName: "ASD",
//     },
//     {
//       CabRegNumber: "23",
//       CabModel: "bmw",
//       CabColor: "green",
//       DiverName: "ZXC",
//     },
//   ]);

//   // const [rowToEdit, setRowToEdit] = useState(null);

//   // const handleDeleteRow = (targetIndex) => {
//   //   setRows(rows.filter((_, idx) => idx !== targetIndex));
//   // };

//   // const handleEditRow = (idx) => {
//   //   setRowToEdit(idx);

//   //   setModalOpen(true);
//   // };

//   const handleCheckboxChange = (idx) => {
//     const updatedRows = rows.map((row, index) => {
//       if (index === idx) {
//         return {
//           ...row,
//           isChecked: !row.isChecked,
//         };
//       }
//       return row;
//     });
//     setRows(updatedRows);
//   };

//   const handleDeleteRow = (targetIndex) => {
//     setRows(rows.filter((_, idx) => idx !== targetIndex));
//   };

//   const handleEditRow = (idx) => {
//     setModalOpen(true);
//   };

//   // const handleSubmit = (newRow) => {
//   //   rowToEdit === null
//   //     ? setRows([...rows, newRow])
//   //     : setRows(
//   //         rows.map((currRow, idx) => {
//   //           if (idx !== rowToEdit) return currRow;

//   //           return newRow;
//   //         })
//   //       );
//   // };

//   // const handleAssign = (idx) => {
//   //   setAssignModalOpen(true);
//   //   setRowToEdit(idx);
//   // };

//   const handleSubmit = (newRow) => {
//     setRows([...rows, newRow]);
//     closeModal();
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   const handleAssign = (selectedRow) => {
//     if (selectedRow) {
//       setAssignModalOpen(true);
//     }
//   };

//   const handleDriverSelect = (driverID) => {
//     const updatedRows = rows.map((row) => {
//       if (row.isChecked) {
//         return {
//           ...row,
//           DriverName: driverList.find((driver) => driver.DriverID === driverID)
//             .DriverName,
//           isChecked: false,
//         };
//       }
//       return row;
//     });
//     setRows(updatedRows);
//     setAssignModalOpen(false);
//   };

//   // Assign
//   const [driverList, setDriverList] = useState([
//     {
//       DriverID: "1",
//       DriverName: "John Doe",
//     },
//     {
//       DriverID: "2",
//       DriverName: "Kenny Rosh",
//     },
//   ]);

//   // const handleDriverSelect = (driverID) => {
//   //   const updatedRows = rows.map((row, idx) => {
//   //     if (idx === rowToEdit) {
//   //       return { ...row, DriverName: driverList.find((driver) => driver.DriverID === driverID).DriverName, };
//   //     }
//   //     return row;
//   //   });
//   //   setRows(updatedRows);
//   //   setAssignModalOpen(false);
//   //   setRowToEdit(null);
//   // };

//   return (
//     <div className="ManageCab">
//       <MCabtable
//         rows={rows}
//         deleteRow={handleDeleteRow}
//         editRow={handleEditRow}
//         assign={handleAssign}
//       />
//       {/* <button onClick={() => setModalOpen(true)} className='btn'>Add</button> */}
//       {/* <button onClick={() => setAssignModalOpen(true)} className='btn'>Assign</button> */}

//       <button
//         onClick={() => handleAssign()}
//         className="btn"
//         disabled={!rows.some((row) => row.isChecked)}
//       >
//         Assign
//       </button>

//       {modalOpen && (
//         <MCabmodal
//           closeModal={closeModal}
//           onSubmit={handleSubmit}
//           defaultValue={null}
//         />
//       )}

//       {assignModalOpen && (
//         <MCabAssign
//           closeModal={() => setAssignModalOpen(false)}
//           driverList={driverList}
//           onDriverSelect={handleDriverSelect}
//         />
//       )}

//       {/* {modalOpen && (
//         <MCabmodal
//           closeModal={() => {
//             setModalOpen(false);
//             setRowToEdit(null);
//           }}
//           onSubmit={handleSubmit}
//           // defaultValue={rowToEdit !== null && rows[rowToEdit]}
//           defaultValue={rowToEdit !== null ? rows[rowToEdit] : null}
//         />
//       )}

//       {assignModalOpen && (
//         <MCabAssign
//           closeModal={() => {
//             setAssignModalOpen(false);
//             setRowToEdit(null);
//           }}
//           driverList={driverList}
//           onDriverSelect={handleDriverSelect}
//         />
//       )} */}
//     </div>
//   );
// };

// export default ManageCab;

// -----------------------------------------------2---------------------------------------------

import React, { useEffect, useState } from "react";
import MCabAssign from "../cabDiver/MCabAssign";
import MCabModal from "../cabDiver/MCabmodal";
import MCabTable from "../cabDiver/MCabtable";
import axios from "axios";

const ManageCab = () => {
  const [rows, setRows] = useState([]);
  const [selectedCab, setSelectedCab] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [assignedDrivers, setAssignedDrivers] = useState({});

  useEffect(() => {
    getCabs();
    getDrivers();
  }, []);

  useEffect(() => {
    fetchAssignedDrivers();
  }, [rows]);

  const getCabs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cabapi");
      console.log(response.data);
      setRows(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDrivers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/driverapi");
      console.log(response.data);
      setDrivers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAssignedDriver = async (cabRegistrationNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/cabapi/${cabRegistrationNumber}/driver`
      );
      console.log(response.data.driverName);
      return response.data?.driverName || "Not assigned";
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Driver not assigned:", error);
        return "Not assigned";
      } else {
        console.error("Error fetching assigned driver:", error);
      }
    }
  };

  const fetchAssignedDrivers = async () => {
    const driversData = {};
    for (const row of rows) {
      const assignedDriver = await getAssignedDriver(row.cabRegistrationNumber);
      driversData[row.cabRegistrationNumber] = assignedDriver;
    }
    setAssignedDrivers(driversData);
  };

  const handleEditClick = (cabRegistrationNumber) => {
    setSelectedCab(cabRegistrationNumber);
    setModalOpen(true);
  };

  const handleCabUpdate = () => {
    getCabs();
  };

  const handleCabDelete = () => {
    fetchAssignedDrivers();
    getCabs();
  };

  return (
    <div>
      <h1>Manage Cabs</h1>
      <MCabTable
        rows={rows}
        onEditClick={handleEditClick}
        getAssignedDriver={getAssignedDriver}
        onCabUpdate={handleCabUpdate} // Pass the handleCabUpdate function
      />
      {modalOpen && (
        <MCabModal
          cabRegistrationNumber={selectedCab}
          drivers={drivers}
          onClose={() => setModalOpen(false)}
          onCabUpdate={handleCabUpdate} // Pass the handleCabUpdate function
          onDeleteCab={handleCabDelete} // Pass the handleCabDelete function
        />
      )}
      <MCabAssign
        drivers={drivers}
        onCabUpdate={handleCabUpdate} // Pass the handleCabUpdate function
        getAssignedDriver={getAssignedDriver}
      />
    </div>
  );
};

export default ManageCab;
