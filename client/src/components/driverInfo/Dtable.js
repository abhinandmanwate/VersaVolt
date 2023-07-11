import React from "react";
import "../../css/Dtable.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Dtable() {
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
          {/* 1st row */}
          <tr>
            <td>9859</td>
            <td>ABC</td>
            <td>abc@gmail</td>
            <td>1234567890</td>
            <td className="actions">
              <span>
                <EditIcon />
              </span>
              <span>
                <DeleteIcon />
              </span>
            </td>
          </tr>

          {/* 2nd row */}
          <tr>
            <td>1245</td>
            <td>John Doe</td>
            <td>johndoe@example.com</td>
            <td>9876543210</td>
            <td className="actions">
              <span>
                <EditIcon />
              </span>
              <span>
                <DeleteIcon />
              </span>
            </td>
          </tr>

          {/* 3rd row */}
          <tr>
            <td>7854</td>
            <td>Jane Smith</td>
            <td>janesmith@example.com</td>
            <td>8765432109</td>
            <td className="actions">
              <span>
                <EditIcon />
              </span>
              <span>
                <DeleteIcon />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Dtable;
