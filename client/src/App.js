import "./css/DriverCRUD.css";

//                                            Driver
// import DriverCRUD from "./components/mainComp/DriverCRUD";

//                                            Cab
// import CabCRUD from "./components/mainComp/CabCRUD";

//                                          Cab & Diver
import ManageCab from "./components/mainComp/ManageCab";
// import ManageDriver from "./components/mainComp/ManageDriver";

//                                             Home page
import Landing from "./components/mainComp/Landing";
function App() {
  return (
    <div className="App">

      {/* <DriverCRUD /> */}
      {/* <CabCRUD /> */}
      <ManageCab/>
      {/* <ManageDriver /> */}

      {/* <Landing/> */}


      {/* <CabCRUD /> */}
      {/* <ManageCab/> */}
      {/* <DriverCRUD /> */}

      {/* <DriverCRUD />
      <CabCRUD />
      <ManageCab /> */}

    </div>
  );
}

export default App;
