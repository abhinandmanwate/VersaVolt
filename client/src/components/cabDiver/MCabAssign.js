

// ------------------------------------------------------------ 1 ===============================================

import React, { useState } from "react";
import axios from "axios";
import "../../css/CDassign.css"

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
    <div className="MCabAssign">
      <div>
        <h2 className="head2">Assign Driver to Cab</h2>
      </div>
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
      <button className="btn" onClick={handleAssign}>Assign</button>
    </div>
  );
};

export default MCabAssign;
