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
<<<<<<< HEAD
                <td data-title="Driver Id">{row.id}</td>
                <td data-title="Driver Name">{row.name}</td>
                <td data-title="Driver Email" className="expand">{row.email}</td>
                <td data-title="Driver Mobile">{row.mobile}</td>
                <td data-title="Action">
=======
                <td>{row.driverIdNumber}</td>
                <td>{row.driverName}</td>
                <td className="expand">{row.driverEmail}</td>
                <td>{row.driverPhoneNumber}</td>
                <td>
>>>>>>> 42ecb20d9930d03f917438519cea33558b0720d3
                  <span className="actions">
                    <EditIcon
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                    <DeleteIcon
                      className="delete-btn"
                      onClick={() => deleteRow(row.driverIdNumber)}
                    />
                    {/* <DeleteIcon
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    /> */}
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
