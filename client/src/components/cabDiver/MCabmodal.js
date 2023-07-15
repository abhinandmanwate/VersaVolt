// import React, { useState } from "react";
// import "../../css/Dmodal.css";

// const MCabmodal = ({ closeModal, onSubmit, defaultValue }) => {
//   const [formState, setFormState] = useState(
//     defaultValue || {
//       CabRegNumber: "",
//       CabModel: "",
//       CabColor: "",
//       DriverAssign: "",
//     }
//   );

//   const [errors, setErrors] = useState("");

//   // get value of fields
//   const handleChange = (e) => {
//     setFormState({
//       ...formState,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Validation of inputs whether filled or not before submit
//   const validateForm = () => {
//     if (formState.CabRegNumber && formState.CabModel && formState.CabColor) {
//       setErrors("");
//       return true;
//     } else {
//       let errorFields = [];
//       for (const [key, value] of Object.entries(formState)) {
//         if (!value) {
//           errorFields.push(key);
//         }
//       }
//       setErrors(errorFields.join(", "));
//       return false;
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     onSubmit(formState);
//     closeModal();
//   };

//   return (
//     <div
//       className="modal-container"
//       onClick={(e) => {
//         if (e.target.className === "modal-container") closeModal();
//       }}
//     >
//       <div className="modal">
//         <form onSubmit={handleSubmit}>
//           <h3>Enter Cab Details</h3>
//           <div className="form-group">
//             <label htmlFor="CabRegNumber">Cab Reg Number</label>
//             <input
//               name="CabRegNumber"
//               onChange={handleChange}
//               value={formState.CabRegNumber}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="CabModel">Cab Model</label>
//             <input
//               name="CabModel"
//               onChange={handleChange}
//               value={formState.CabModel}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="CabColor">Cab Color</label>
//             <input
//               name="CabColor"
//               onChange={handleChange}
//               value={formState.CabColor}
//             />
//           </div>
//           {errors && <div className="error">{`Please include: ${errors}`}</div>}

//           <button type="submit" className="btn">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default MCabmodal;

// ======================= 1==================================

// import React, { useState } from "react";
// import axios from "axios";

// const MCabModal = ({
//   cabRegistrationNumber,
//   drivers,
//   onClose,
//   onCabUpdate,
//   onDeleteCab,
// }) => {
//   const [selectedDriver, setSelectedDriver] = useState("");

//   const handleUpdate = () => {
//     axios
//       .put(
//         `http://localhost:8080/cabapi/${cabRegistrationNumber}/driver/${selectedDriver}`
//       )
//       .then(() => {
//         onCabUpdate();
//         onClose();
//       })
//       .catch((error) => {
//         console.error("Error updating cab:", error);
//       });
//   };

//   const handleDelete = () => {
//     axios
//       .delete(`http://localhost:8080/cabapi/${cabRegistrationNumber}/driver`)
//       .then(() => {
//         onDeleteCab();
//         onClose();
//       })
//       .catch((error) => {
//         console.error("Error deleting cab:", error);
//       });
//   };

//   return (
//     <div className="modal">
//       <h2>Edit Cab</h2>
//       <p>Cab Registration Number: {cabRegistrationNumber}</p>
//       <label>
//         Select Driver:
//         <select
//           value={selectedDriver}
//           onChange={(e) => setSelectedDriver(e.target.value)}
//         >
//           <option value="">Select a driver</option>
//           {drivers.map((driver) => (
//             <option key={driver.driverIdNumber} value={driver.driverIdNumber}>
//               {driver.driverName}
//             </option>
//           ))}
//         </select>
//       </label>
//       <button onClick={handleUpdate}>Submit</button>
//       <button onClick={onClose}>Close</button>
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// };

// export default MCabModal;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../css/Dmodal.css";

const MCabModal = ({
  cabRegistrationNumber,
  drivers,
  onClose,
  onCabUpdate,
  onDeleteCab,
}) => {
  const [selectedDriver, setSelectedDriver] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    setSelectedDriver("");
  }, [cabRegistrationNumber]);

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:8080/cabapi/${cabRegistrationNumber}/driver/${selectedDriver}`
      )
      .then(() => {
        onCabUpdate();
        onClose();
      })
      .catch((error) => {
        console.error("Error updating cab:", error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/cabapi/${cabRegistrationNumber}/driver`)
      .then(() => {
        onDeleteCab();
        onClose();
      })
      .catch((error) => {
        console.error("Error deleting cab:", error);
      });
  };

  const handleModalClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose(); // Close the modal when clicking outside
    }
  };

  return (
    <div className="modal-container" onClick={handleModalClick}>
      <div className="modal" ref={modalRef}>
        <h2>Edit Cab</h2>
        <p>Cab Registration Number: {cabRegistrationNumber}</p>
        <label>
          Select Driver:
          <select
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
          >
            <option value="">Select a driver</option>
            {drivers.map((driver) => (
              <option key={driver.driverIdNumber} value={driver.driverIdNumber}>
                {driver.driverName}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleUpdate}>Submit</button>
        <button onClick={onClose}>Close</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default MCabModal;
