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
            <th>Id</th>
            <th>Name</th>
            <th className="expand">Email</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td className="expand">{row.email}</td>
                <td>{row.mobile}</td>
                <td>
                  <span className="actions">
                    <EditIcon
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                    <DeleteIcon
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
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
