// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Dtable from "../driverInfo/Dtable";
// import Dmodal from "../driverInfo/Dmodal";
// import Config from "../../Config/Config";
// import { Link } from "react-router-dom";

// function DriverCRUD() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [rows, setRows] = useState([]);
//   const [rowToEdit, setRowToEdit] = useState(null);

//   useEffect(() => {
//     getDriver();
//   }, []);

//   // Fetch driver data from the API
//   const getDriver = async () => {
//     try {
//       const response = await axios.get(
//         `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiDriver}`
//       );
//       console.log(response.data);
//       setRows(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Delete a driver
//   const deleteDriver = async (deleteDriverIdNumber) => {
//     console.log("Entered delete " + deleteDriverIdNumber);
//     try {
//       const response = await axios.delete(
//         `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiDriver}/${deleteDriverIdNumber}`
//       );
//       console.log(response.data);
//       // Perform any additional actions or update UI as needed

//       // Refresh driver data
//       getDriver();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Edit a driver
//   const handleEditRow = (idx) => {
//     setRowToEdit(idx);
//     console.log(rowToEdit);

//     setModalOpen(true);
//   };

//   // Handle form submission
//   const handleSubmit = (newRow) => {
//     rowToEdit === null
//       ? setRows([...rows, newRow])
//       : setRows(
//           rows.map((currRow, idx) => {
//             if (idx !== rowToEdit) return currRow;
//             return newRow;
//           })
//         );
//   };

//   return (
//     <div className="DriverCRUD">
//       <h1 className="heading">List of Drivers</h1>
//       <Dtable rows={rows} deleteRow={deleteDriver} editRow={handleEditRow} />
//       <div className="buttons">
//         <button className="btn" id="Back">
//           Back
//         </button>

//         <button className="btn" onClick={() => setModalOpen(true)}>
//           Add Driver
//         </button>

//         <Link to="/assign-cab" className="btn" id="Assign">
//           Assign
//         </Link>
//       </div>
//       {modalOpen && (
//         <Dmodal
//           closeModal={() => {
//             setModalOpen(false);
//             setRowToEdit(null);
//             getDriver();
//           }}
//           onSubmit={handleSubmit}
//           defaultValue={rowToEdit !== null && rows[rowToEdit]}
//         />
//       )}
//     </div>
//   );
// }

// export default DriverCRUD;

// DriverCRUD.js
import React, { useState, useEffect } from "react";
import Dtable from "../driverInfo/Dtable";
import Dmodal from "../driverInfo/Dmodal";
import { Link } from "react-router-dom";
import {
  getDrivers,
  deleteDriver,
  updateDriver,
  createDriver,
} from "../../Config/DriverAPI"; // Import the API functions from api.js

function DriverCRUD() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);

  useEffect(() => {
    getDriver();
  }, []);

  // Fetch driver data from the API
  const getDriver = async () => {
    try {
      const driversData = await getDrivers();
      setRows(driversData);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a driver
  const handleDeleteDriver = async (deleteDriverIdNumber) => {
    console.log("Entered delete " + deleteDriverIdNumber);
    try {
      await deleteDriver(deleteDriverIdNumber);
      // Perform any additional actions or update UI as needed

      // Fetch driver data again after deletion
      getDriver();
    } catch (error) {
      console.error(error);
    }
  };

  // Edit a driver
  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    console.log(rowToEdit);

    setModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (newRow) => {
    try {
      if (rowToEdit === null) {
        // If rowToEdit is null, it's a new driver, call createDriver API
        await createDriver(newRow);
      } else {
        // Otherwise, it's an existing driver, call updateDriver API
        await updateDriver(rows[rowToEdit].driverIdNumber, newRow);
      }
      // Close the modal after successful form submission
      closeModal();
      // Fetch driver data again after update/create
      getDriver();
    } catch (error) {
      console.error(error);
    }
  };

  // Close the modal
  const closeModal = () => {
    setModalOpen(false);
    setRowToEdit(null);
  };

  return (
    <div className="DriverCRUD">
      <h1 className="heading">List of Drivers</h1>
      <Dtable
        rows={rows}
        deleteRow={handleDeleteDriver}
        editRow={handleEditRow}
      />
      <div className="buttons">
        <button className="btn" id="Back">
          Back
        </button>

        <button className="btn" onClick={() => setModalOpen(true)}>
          Add Driver
        </button>

        <Link to="/assign-cab" className="btn" id="Assign">
          Assign
        </Link>
      </div>
      {modalOpen && (
        <Dmodal
          closeModal={closeModal}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default DriverCRUD;
