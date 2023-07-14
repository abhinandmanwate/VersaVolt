import React, {useState} from 'react'
import "../../css/Dmodal.css"





function MCabAssign({ closeModal, driverList, onDriverSelect }) {
    const [selectedDriver, setSelectedDriver] = useState('');
  
    const handleDriverSelect = (driverID) => {
      setSelectedDriver(driverID);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onDriverSelect(selectedDriver);
      closeModal();
    };


  return (
    <div 
      className="modal-assign"
      //clicking on form works rest dont work
      onClick={(e) => {
        if (e.target.className === "modal-assign")  closeModal();
      }}
      
    >
      <div className="modal">
        <h3>Assign Driver</h3>
        <div className="form-group">
          <form>
            <div className='driverList'>
              <label className="selectDriver" htmlFor="DriverID">Select Driver</label>
              <select
                name="DriverID"
                value={selectedDriver}
                onChange={(e) => handleDriverSelect(e.target.value)}
              >
                <option value="">Select</option>
                {driverList.map((driver, idx) => (
                  <option key={idx} value={driver.DriverID}>
                    {driver.DriverName}
                  </option>
                ))}
              </select>
            </div>
            
            
            <button type='submit' className="btn" onClick={handleSubmit}>Submit</button>
          </form>
        </div>      
      </div> 

    </div>
  )
}

export default MCabAssign



// function MCabAssign({closeModal, driverList, rows, setRows, onDriverSelect}) {
// function MCabAssign({ closeModal, driverList, onDriverSelect }) {
  // const [selectedDriver, setSelectedDriver] = useState(null);
  // const [rowToEdit, setRowToEdit] = useState(null);

  // const handleDriverSelect = (driverID) => {
  //   setSelectedDriver(driverID);
  // };

  // const handleSubmit = () => {
  //   onDriverSelect(selectedDriver);
  //   closeModal();
  
    // Update the selected row in the table
    // if (rowToEdit !== undefined) {
    //   const row = rows.find(r => r.idx === rowToEdit);
    //   row.DriverAssign = selectedDriver;
    //   setRows([...rows]);
    // }