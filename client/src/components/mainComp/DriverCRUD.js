import { React, useState } from 'react';

import Dtable from "../driverInfo/Dtable";
import Dmodal from "../driverInfo/Dmodal";


function DriverCRUD() {
    const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className='DriverCRUD'>
      <Dtable/>
      <button className='btn' onClick={() => setModalOpen(true)}>
        Add
      </button>
      {modalOpen && <Dmodal closeModal={() => {
        setModalOpen(false)
      }}/>}
      
    </div>
  )
}

export default DriverCRUD
