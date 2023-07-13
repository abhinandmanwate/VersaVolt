import "./css/DriverCRUD.css";

//                                            Driver
import DriverCRUD from "./components/mainComp/DriverCRUD";
// import DriverList from "./components/DriverList";


//                                            Cab
// import CabCRUD from "./components/mainComp/CabCRUD";

//                                          Cab & Diver

function App() {
  return (
    <div className="App">
      <DriverCRUD />
      {/* <CabCRUD /> */}
    </div>
  );
}

export default App;
