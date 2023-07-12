import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Dmodal.css";

// const Dmodal = ({ closeModal, onSubmit, defaultValue }) => {
//   const [formState, setFormState] = useState(
//     defaultValue || {
//       driverIdNumber: "",
//       driverName: "",
//       driverEmail: "",
//       driverPhoneNumber: "",
//     }
//   );

//   // Checking error
//   const [errors, setErrors] = useState("");

//   // Check if all inputs are filled
//   const validateForm = () => {
//     if (
//       formState.driverIdNumber &&
//       formState.driverName &&
//       formState.driverEmail &&
//       formState.driverPhoneNumber
//     ) {
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

//   const handleChange = (e) => {
//     setFormState({
//       ...formState,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     onSubmit(formState);
//     createDriver(formState);
//     closeModal();
//   };

//   const createDriver = async (newCabData) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/driverapi",
//         newCabData
//       );
//       console.log(response.data);
//       closeModal();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div
//       className="modal-container"
//       onClick={(event) => {
//         if (event.target.className === "modal-container") closeModal();
//       }}
//     >
//       <div className="modal">
//         <form onSubmit={createDriver}>
//           <div className="form-group">
//             <label htmlFor="driverIdNumber">driverIdNumber</label>
//             <input
//               name="driverIdNumber"
//               value={formState.driverIdNumber}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="name">Name</label>
//             <input name="name" value={formState.name} onChange={handleChange} />
//           </div>

//           <div className="form-group">
//             <label htmlFor="driverEmail">driverEmail</label>
//             <input
//               name="driverEmail"
//               value={formState.driverEmail}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="driverPhoneNumber">driverPhoneNumber</label>
//             <input
//               name="driverPhoneNumber"
//               value={formState.driverPhoneNumber}
//               onChange={handleChange}
//             />
//           </div>
//           {errors && <div className="error">{`Please include: ${errors}`}</div>}
//           <button className="btn" type="submit" onClick={handleSubmit}>
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Dmodal;

// ---------------------------------------------------------------------------------------

// const Dmodal = ({ closeModal, defaultValue }) => {
//   const [formState, setFormState] = useState({
//     driverIdNumber: "",
//     driverName: "",
//     driverEmail: "",
//     driverPhoneNumber: "",
//   });

//   const [errors, setErrors] = useState("");
//   const [editedFields, setEditedFields] = useState([]);

//   const validateForm = () => {
//     // Validation logic here
//     if (
//       formState.driverIdNumber &&
//       formState.driverName &&
//       formState.driverEmail &&
//       formState.driverPhoneNumber
//     ) {
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

//   useEffect(() => {
//     if (defaultValue) {
//       setFormState(defaultValue);
//     }
//   }, [defaultValue]);

//   const handleChange = (e) => {
//     const fieldName = e.target.name;
//     const fieldValue = e.target.value;

//     setFormState({
//       ...formState,
//       [fieldName]: fieldValue,
//     });

//     if (!editedFields.includes(fieldName)) {
//       setEditedFields([...editedFields, fieldName]);
//     } else {
//       setEditedFields(editedFields.filter((field) => field !== fieldName));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     const editedData = {};
//     editedFields.forEach((field) => {
//       editedData[field] = formState[field];
//     });
//     console.log(editedData);
//     createDriver(editedData);
//   };

//   const createDriver = async (newDriverData) => {
//     console.log(newDriverData);
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/driverapi",
//         newDriverData
//       );
//       console.log(response.data);
//       closeModal();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div
//       className="modal-container"
//       onClick={(event) => {
//         if (event.target.className === "modal-container") closeModal();
//       }}
//     >
//       <div className="modal">
//         <form onSubmit={createDriver}>
//           {/* Form fields */}
//           <div className="form-group">
//             <label htmlFor="driverIdNumber">Driver Id Number</label>
//             <input
//               name="driverIdNumber"
//               value={formState.driverIdNumber}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="driverName">driverName</label>
//             <input
//               name="driverName"
//               value={formState.driverName}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="driverEmail">driverEmail</label>
//             <input
//               name="driverEmail"
//               value={formState.driverEmail}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="driverPhoneNumber">driverPhoneNumber</label>
//             <input
//               name="driverPhoneNumber"
//               value={formState.driverPhoneNumber}
//               onChange={handleChange}
//             />
//           </div>
//           {errors && <div className="error">{`Please include: ${errors}`}</div>}
//           <button className="btn" type="submit" onClick={handleSubmit}>
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Dmodal;

// ------------------------------------------------------------------

const Dmodal = ({ closeModal, defaultValue }) => {
  const [formState, setFormState] = useState({
    driverIdNumber: "",
    driverName: "",
    driverEmail: "",
    driverPhoneNumber: "",
  });

  const [errors, setErrors] = useState("");
  const [editedFields, setEditedFields] = useState([]);

  const validateForm = () => {
    // Validation logic here
    if (
      formState.driverIdNumber &&
      formState.driverName &&
      formState.driverEmail &&
      formState.driverPhoneNumber
    ) {
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

  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormState({
      ...formState,
      [fieldName]: fieldValue,
    });

    if (!editedFields.includes(fieldName)) {
      setEditedFields([...editedFields, fieldName]);
    } else {
      setEditedFields(editedFields.filter((field) => field !== fieldName));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log(formState);
    createDriver(formState);
  };

  const createDriver = async (newDriverData) => {
    console.log(newDriverData);
    try {
      const response = await axios.post(
        "http://localhost:8080/driverapi",
        newDriverData
      );
      console.log(response.data);
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
        
        <form onSubmit={handleSubmit}>
          <h3>Enter Driver details</h3>
          {/* Form fields */}
          <div className="form-group">
            <label htmlFor="driverIdNumber">Driver Id Number</label>
            <input
              name="driverIdNumber"
              value={formState.driverIdNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="driverName">driverName</label>
            <input
              name="driverName"
              value={formState.driverName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="driverEmail">driverEmail</label>
            <input
              name="driverEmail"
              value={formState.driverEmail}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="driverPhoneNumber">driverPhoneNumber</label>
            <input
              name="driverPhoneNumber"
              value={formState.driverPhoneNumber}
              onChange={handleChange}
            />
          </div>

          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          
          
          <div className="dform-btn">
            <button className="btn" type="submit" onClick={handleSubmit}>
              Edit
            </button>

            <button id="btn-1" className="btn" type="submit" onClick={handleSubmit}>
              Submit
            </button>            
          </div>           
          
        </form>
      </div>
    </div>
  );
};

export default Dmodal;
