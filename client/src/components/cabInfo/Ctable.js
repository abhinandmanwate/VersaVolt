import React from "react";
import "../../css/Dtable.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Ctable = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th className="expand">Cab Registration Number</th>
            <th>Cab Model</th>
            <th>Cab Color</th>
            {/* <th>Driver Phone Number</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td data-title="Sr No.">{idx + 1}</td>
                <td data-title="Cab Registration Number" className="expand">
                  {row.cabRegistrationNumber}
                </td>
                <td data-title="Cab Model">{row.cabModel}</td>
                <td data-title="Cab Color">{row.cabColour}</td>
                <td>
                  <span className="actions">
                    <EditIcon
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                    <DeleteIcon
                      className="delete-btn"
                      onClick={() => deleteRow(row.cabRegistrationNumber)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Ctable;
