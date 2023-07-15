// import React from "react";
// import "../../css/Dtable.css";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// function MCabtable({ rows, deleteRow, editRow, assign }) {
//   // const handleCheckboxChange = (e, idx) => {
//   //     if (e.target.checked) {
//   //       assign(idx);
//   //     } else {
//   //       assign(null);
//   //     }
//   //   };
//   // const handleCheckboxChange = (e, idx) => {
//   //     const updatedRows = rows.map((row, index) => {
//   //       if (index === idx) {
//   //         return {
//   //           ...row,
//   //           isChecked: e.target.checked,
//   //         };
//   //       }
//   //       return row;
//   //     });
//   //     assign(updatedRows.find((row) => row.isChecked));
//   //   };

//   const handleCheckboxChange = (idx) => {
//     assign(rows[idx]);
//   };

//   return (
//     <div className="table-wrapper">
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Select</th>
//             <th>Cab Reg Number</th>
//             <th>Cab Model</th>
//             <th>Cab Color</th>
//             <th className="expand">Driver Assign</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, idx) => {
//             return (
//               <tr key={idx}>
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={row.isChecked}
//                     //   onChange={(e) => handleCheckboxChange(e, idx)}
//                     onChange={() => handleCheckboxChange(idx)}
//                   />
//                 </td>
//                 <td data-title="CabRegNumber">{row.CabRegNumber}</td>
//                 <td data-title="CabModel">{row.CabModel}</td>
//                 <td data-title="CabColor">{row.CabColor}</td>
//                 <td data-title="DriverAssign" className="expand">
//                   {row.DriverName}
//                 </td>
//                 <td data-title="Action">
//                   <span className="actions">
//                     <EditIcon
//                       className="edit-btn"
//                       onClick={() => editRow(idx)}
//                     />
//                     <DeleteIcon
//                       className="delete-btn"
//                       onClick={() => deleteRow(idx)}
//                     />
//                   </span>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default MCabtable;

// ==================1=======================

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const MCabTable = ({ rows, onEditClick, getAssignedDriver, onCabUpdate }) => {
//   const [assignedDrivers, setAssignedDrivers] = useState({});

//   useEffect(() => {
//     fetchAssignedDrivers();
//   }, [rows]);

//   const fetchAssignedDrivers = async () => {
//     const driversData = {};
//     for (const row of rows) {
//       const assignedDriver = await getAssignedDriver(row.cabRegistrationNumber);
//       driversData[row.cabRegistrationNumber] = assignedDriver;
//     }
//     setAssignedDrivers(driversData);
//   };

//   const handleEditClick = (cabRegistrationNumber) => {
//     onEditClick(cabRegistrationNumber);
//   };

//   const handleCabUpdate = () => {
//     onCabUpdate();
//   };

//   const handleCabDelete = (cabRegistrationNumber) => {
//     axios
//       .delete(`http://localhost:8080/cabapi/${cabRegistrationNumber}/driver`)
//       .then(() => {
//         fetchAssignedDrivers();
//         onCabUpdate();
//       })
//       .catch((error) => {
//         console.error("Error deleting cab:", error);
//       });
//   };

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Cab Reg Number</th>
//           <th>Cab Model</th>
//           <th>Cab Color</th>
//           <th>Driver Assign</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {rows.map((row) => (
//           <tr key={row.cabRegistrationNumber}>
//             <td>{row.cabRegistrationNumber}</td>
//             <td>{row.cabModel}</td>
//             <td>{row.cabColour}</td>
//             <td>{assignedDrivers[row.cabRegistrationNumber]}</td>
//             <td>
//               <button
//                 onClick={() => handleEditClick(row.cabRegistrationNumber)}
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleCabDelete(row.cabRegistrationNumber)}
//               >
//                 Delete
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default MCabTable;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../../css/Dtable.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomPagination from "../Pagination";

const MCabTable = ({ rows, onEditClick, getAssignedDriver, onCabUpdate }) => {
  const [assignedDrivers, setAssignedDrivers] = useState({});
  const modalRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchAssignedDrivers();
  }, [rows]);

  const fetchAssignedDrivers = async () => {
    const driversData = {};
    for (const row of rows) {
      const assignedDriver = await getAssignedDriver(row.cabRegistrationNumber);
      driversData[row.cabRegistrationNumber] = assignedDriver;
    }
    setAssignedDrivers(driversData);
  };

  const handleEditClick = (cabRegistrationNumber) => {
    onEditClick(cabRegistrationNumber);
  };

  const handleCabUpdate = () => {
    onCabUpdate();
  };

  const handleCabDelete = (cabRegistrationNumber) => {
    axios
      .delete(`http://localhost:8080/cabapi/${cabRegistrationNumber}/driver`)
      .then(() => {
        fetchAssignedDrivers();
        onCabUpdate();
      })
      .catch((error) => {
        console.error("Error deleting cab:", error);
      });
  };

  const handleModalClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onEditClick(null); // Close the modal when clicking outside
    }
  };

  return (
    <div className="table-wrapper" onClick={handleModalClick}>
      <table className="table">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th className="expand">Cab Reg Number</th>
            <th>Cab Model</th>
            <th>Cab Color</th>
            <th>Driver Assign</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, idx) => {
            const rowIndex = indexOfFirstItem + idx;
            return (
              <tr key={rowIndex}>
                <td data-title="Sr No.">{rowIndex + 1}</td>
                <td data-title="Cab Reg Number" className="expand">
                  {row.cabRegistrationNumber}
                </td>
                <td data-title="Cab Model">{row.cabModel}</td>
                <td data-title="Cab Color">{row.cabColour}</td>
                <td data-title="Driver Assign">
                  {assignedDrivers[row.cabRegistrationNumber]}
                </td>
                <td>
                  <span className="actions">
                    <EditIcon
                      className="edit-btn"
                      onClick={() => handleEditClick(row.cabRegistrationNumber)}
                    />
                    <DeleteIcon
                      className="delete-btn"
                      onClick={() => handleCabDelete(row.cabRegistrationNumber)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination */}
      <CustomPagination
        totalItems={rows.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MCabTable;
