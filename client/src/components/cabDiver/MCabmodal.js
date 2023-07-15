import React, {useState} from 'react'
import "../../css/Dmodal.css"

const MCabmodal = ({closeModal, onSubmit, defaultValue}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      CabRegNumber: "",
      CabModel: "",
      CabColor: "",
      DriverAssign: "",      
    }
  );

  const [errors, setErrors] = useState("");


  // get value of fields
  const handleChange = (e) => {
    setFormState({ 
      ...formState, 
      [e.target.name]: e.target.value 
    });
  }; 

  // Validation of inputs whether filled or not before submit
  const validateForm = () => {
    if (formState.CabRegNumber && formState.CabModel && formState.CabColor) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);
    closeModal();
  };

  return (
    <div 
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container")  closeModal();
      }}
      
    >
      <div className="modal">
            <form onSubmit={handleSubmit}>
              <h3>Enter Cab Details</h3>
              <div className="form-group">
                <label htmlFor="CabRegNumber">Cab Reg Number</label>
                <input 
                  name="CabRegNumber" 
                  onChange={handleChange} 
                  value={formState.CabRegNumber} />
              </div>

              <div className="form-group">
                <label htmlFor="CabModel">Cab Model</label>
                <input
                  name="CabModel"
                  onChange={handleChange}
                  value={formState.CabModel}
                />
              </div>

              <div className="form-group">
                <label htmlFor="CabColor">Cab Color</label>
                <input
                  name="CabColor"
                  onChange={handleChange}
                  value={formState.CabColor}
                />
              </div>
              {errors && <div className="error">{`Please include: ${errors}`}</div>}
              
              <button type='submit' className="btn">Submit</button>
            </form>
          </div>
      
    </div>
  )
}

export default MCabmodal