// import React, { useState } from "react";
// import "../../css/Dmodal.css";

// function MCabAssign({ closeModal, driverList, onDriverSelect }) {
//   const [selectedDriver, setSelectedDriver] = useState("");

//   const handleDriverSelect = (driverID) => {
//     setSelectedDriver(driverID);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onDriverSelect(selectedDriver);
//     closeModal();
//   };
//   return (
//     <div
//       className="modal-assign"
//       //clicking on form works rest dont work
//       onClick={(e) => {
//         if (e.target.className === "modal-assign") closeModal();
//       }}
//     >
//       <div className="modal">
//         <h3>Assign Driver</h3>
//         <div className="form-group">
//           <form onSubmit={handleSubmit}>
//             <div className="driverList">
//               <label className="selectDriver" htmlFor="DriverID">
//                 Select Driver
//               </label>
//               <select
//                 name="DriverID"
//                 value={selectedDriver}
//                 onChange={(e) => handleDriverSelect(e.target.value)}
//               >
//                 <option value="">Select</option>
//                 {driverList.map((driver) => (
//                   <option key={driver.DriverID} value={driver.DriverID}>
//                     {driver.DriverName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button type="submit" className="btn">
//               Submit
//             </button>
//             {/* <button type='submit' className="btn" onClick={handleSubmit}>Submit</button> */}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MCabAssign;

// ------------------------------------------------------------ 1 ===============================================

import React, { useState } from "react";
import axios from "axios";

const MCabAssign = ({ drivers, onCabUpdate, getAssignedDriver }) => {
  const [cabRegistrationNumber, setCabRegistrationNumber] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");

  const handleAssign = async () => {
    try {
      await axios.post(
        `http://localhost:8080/cabapi/${cabRegistrationNumber}/driver/${selectedDriver}`
      );
      const assignedDriver = await getAssignedDriver(cabRegistrationNumber);
      onCabUpdate();
      setSelectedDriver("");
      setCabRegistrationNumber("");
      console.log("Assigned Driver:", assignedDriver);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onDriverSelect(selectedDriver);
    closeModal();
  };
  return (
    <div>
      <h2>Assign Driver to Cab</h2>
      <label>
        Cab Registration Number:
        <input
          type="text"
          value={cabRegistrationNumber}
          onChange={(e) => setCabRegistrationNumber(e.target.value)}
        />
      </label>
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
      <button onClick={handleAssign}>Assign</button>
    </div>
  );
};

export default MCabAssign;
