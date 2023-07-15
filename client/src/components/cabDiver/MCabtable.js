import React from 'react'
import "../../css/Dtable.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


function MCabtable({ rows,  deleteRow, editRow, assign }) {
    // const handleCheckboxChange = (e, idx) => {
    //     if (e.target.checked) {
    //       assign(idx);
    //     } else {
    //       assign(null);
    //     }
    //   };
    // const handleCheckboxChange = (e, idx) => {
    //     const updatedRows = rows.map((row, index) => {
    //       if (index === idx) {
    //         return {
    //           ...row,
    //           isChecked: e.target.checked,
    //         };
    //       }
    //       return row;
    //     });
    //     assign(updatedRows.find((row) => row.isChecked));
    //   };

    const handleCheckboxChange = (idx) => {
        assign(rows[idx]);
      };

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
         <tr>
            <th>Select</th>
            <th >Cab Reg Number</th>
            <th >Cab Model</th>
            <th>Cab Color</th>
            <th className="expand">Driver Assign</th>
            <th>Actions</th>
          </tr>
         </thead>
         <tbody>
          {
            rows.map((row,idx) => {
              return <tr key={idx}>
                <td>
                <input 
                  type="checkbox" 
                  checked={row.isChecked} 
                //   onChange={(e) => handleCheckboxChange(e, idx)}
                  onChange={() => handleCheckboxChange(idx)}
                />
                </td>
                <td data-title="CabRegNumber">{row.CabRegNumber}</td>
                <td data-title="CabModel" >{row.CabModel}</td>                    
                <td data-title="CabColor">{row.CabColor}</td>
                <td data-title="DriverAssign" className="expand">{row.DriverName}</td>
                <td data-title="Action">
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
            })
          }                  
         </tbody>
       </table>
      
      
    </div>
  )
}

export default MCabtable