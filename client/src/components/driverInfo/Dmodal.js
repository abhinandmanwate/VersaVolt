import React from 'react'
import "../../css/Dmodal.css"

const Dmodal = ({closeModal}) => {
  return (
    <div 
    className='modal-container' 
    onClick={(event) => {
        if(event.target.className === "modal-container")
        closeModal();
    }}>
      <div className="modal">
        <form >
            <div className='form-group'>
                <label htmlFor="#id">Id</label>
                <input name="Id" />
            </div>

            <div className='form-group'>
                <label htmlFor="#name">Name</label>
                <input name="Name" />
            </div>

            <div className='form-group'>
                <label htmlFor="#email">Email</label>
                <input name="Email" />
            </div>

            <div className='form-group'>
                <label htmlFor="#mobile">Mobile</label>
                <input name="Mobile" />
            </div>
            <button className='btn' type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Dmodal
