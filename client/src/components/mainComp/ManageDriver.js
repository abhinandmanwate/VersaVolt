import React, { useEffect, useState } from "react";
import MDriverAssign from "../driverCab/MDriverAssign";
import MDriverModal from "../driverCab/MDriverModal";
import MDriverTable from "../driverCab/MDriverTable";
import axios from "axios";

const ManageDriver = () => {
  const [rows, setRows] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [cabs, setCabs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [assignedCabs, setAssignedCabs] = useState({});

  useEffect(() => {
    getDrivers();
    getCabs();
  }, []);

  useEffect(() => {
    fetchAssignedCabs();
  }, [rows]);

  const getDrivers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/driverapi");
      console.log(response.data);
      setRows(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCabs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cabapi");
      console.log(response.data);
      setCabs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAssignedCab = async (driverId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/driverapi/${driverId}/cab`
      );
      console.log(response.data);
      return response.data || "Not assigned";
    } catch (error) {
      console.error("Error fetching assigned cab:", error);
      return "Not assigned";
    }
  };

  const fetchAssignedCabs = async () => {
    const cabsData = {};
    for (const row of rows) {
      const assignedCab = await getAssignedCab(row.driverIdNumber);
      cabsData[row.driverIdNumber] = assignedCab;
    }
    setAssignedCabs(cabsData);
  };

  const handleEditClick = (driverId) => {
    setSelectedDriver(driverId);
    setModalOpen(true);
  };

  const handleDriverUpdate = () => {
    getDrivers();
  };

  const handleDriverDelete = () => {
    fetchAssignedCabs();
    getDrivers();
  };

  return (
    <div>
      <h1>Manage Drivers</h1>
      <MDriverTable
        rows={rows}
        onEditClick={handleEditClick}
        assignedCabs={assignedCabs}
        onDriverUpdate={handleDriverUpdate}
      />
      {modalOpen && (
        <MDriverModal
          driverId={selectedDriver}
          cabs={cabs}
          onClose={() => setModalOpen(false)}
          onDriverUpdate={handleDriverUpdate}
          onDeleteDriver={handleDriverDelete}
        />
      )}
      {cabs.length > 0 && (
        <MDriverAssign
          cabs={cabs}
          onDriverUpdate={handleDriverUpdate}
          getAssignedCab={getAssignedCab}
        />
      )}
    </div>
  );
};

export default ManageDriver;
