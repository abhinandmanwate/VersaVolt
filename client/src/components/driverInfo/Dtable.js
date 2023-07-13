import React from "react";
import "../../css/Dtable.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Dtable = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Driver Id Number</th>
            <th>Driver Name</th>
            <th className="expand">Driver Email</th>
            <th>Driver Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td data-title="Driver Id Number">{row.driverIdNumber}</td>
                <td data-title="Driver Name">{row.driverName}</td>
                <td data-title="Driver Email" className="expand">
                  {row.driverEmail}
                </td>
                <td data-title="Driver Phone Number">
                  {row.driverPhoneNumber}
                </td>
                <td>
                  <span className="actions">
                    <EditIcon
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                    <DeleteIcon
                      className="delete-btn"
                      onClick={() => deleteRow(row.driverIdNumber)}
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

export default Dtable;
