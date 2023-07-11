import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Dtable.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Cmodal from "./Cmodal";

const Ctable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cabs, setCabs] = useState([]);
  const [newCabData, setNewCabData] = useState({
    cabRegistrationNumber: "",
    cabModel: "",
    cabColour: "",
  });
  const [updatedCabData, setUpdatedCabData] = useState({
    cabRegistrationNumber: "",
    cabModel: "",
    cabColour: "",
  });
  //   const [deleteCabRegistrationNumber, setDeleteCabRegistrationNumber] =
  //     useState("");

  const getCabs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cabapi");
      //   console.log(response.data);
      setCabs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCabs();
  }, []);

  const createCab = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/cabapi",
        newCabData
      );
      console.log(response.data);
      // Perform any additional actions or update UI as needed
    } catch (error) {
      console.error(error);
    }
  };

  const updateCab = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8080/cabapi",
        updatedCabData
      );
      console.log(response.data);
      // Perform any additional actions or update UI as needed
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCab = async (deleteCabRegistrationNumber) => {
    console.log("Entered delete " + deleteCabRegistrationNumber);
    try {
      const response = await axios.delete(
        `http://localhost:8080/cabapi/${deleteCabRegistrationNumber}`
      );
      console.log(response.data);
      // Perform any additional actions or update UI as needed

      // getCabs() to reload the table
      getCabs();
    } catch (error) {
      console.error(error);
    }
  };

  //   const handleNewCabInputChange = (event) => {
  //     setNewCabData({
  //       ...newCabData,
  //       [event.target.name]: event.target.value,
  //     });
  //   };

  //   const handleUpdatedCabInputChange = (event) => {
  //     setUpdatedCabData({
  //       ...updatedCabData,
  //       [event.target.name]: event.target.value,
  //     });
  //   };

  //   const handleDeleteCabInputChange = (event) => {
  //     setDeleteCabRegistrationNumber(event.target.value);
  //   };
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th className="expand">Cab Registration Number</th>
            <th>Cab Model</th>
            <th>Cab Colour</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cabs.map((cab, index) => (
            <tr key={cab.cabRegistrationNumber}>
              <td>{index + 1}</td>
              <td>{cab.cabRegistrationNumber}</td>
              <td>{cab.cabModel}</td>
              <td>{cab.cabColour}</td>
              <td className="actions">
                <span>
                  <EditIcon />
                </span>
                <span onClick={() => deleteCab(cab.cabRegistrationNumber)}>
                  <DeleteIcon />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ctable;
