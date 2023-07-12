import React, { useState } from "react";
import Ctable from "../cabInfo/Ctable";
import Cmodal from "../cabInfo/Cmodal";

const CabCRUD = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="DriverCRUD">
      <Ctable />
      <button className="btn" onClick={() => setModalOpen(true)}>
        Add
      </button>
      {modalOpen && (
        <Cmodal
          closeModal={() => {
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default CabCRUD;
