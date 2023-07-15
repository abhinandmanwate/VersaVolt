import "./css/DriverCRUD.css";

//                                            Driver
// import DriverCRUD from "./components/mainComp/DriverCRUD";

//                                            Cab
// import CabCRUD from "./components/mainComp/CabCRUD";

//                                          Cab & Diver
import ManageCab from "./components/mainComp/ManageCab";
import ManageDriver from "./components/mainComp/ManageDriver";

function App() {
  return (
    <div className="App">

      {/* <DriverCRUD /> */}
      {/* <CabCRUD /> */}
      <ManageCab/>


      <DriverCRUD />
      {/* <CabCRUD /> */}
      {/* <ManageCab/> */}

      {/* <DriverCRUD />
      <CabCRUD />
      <ManageCab /> */}
      <ManageDriver />

    </div>
  );
}

export default App;
