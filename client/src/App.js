import "./css/DriverCRUD.css";

//                                            Driver
import DriverCRUD from "./components/mainComp/DriverCRUD";

//                                            Cab
import CabCRUD from "./components/mainComp/CabCRUD";

//                                          Cab & Diver

function App() {
  return (
    <div className="App">
      {/* <DriverCRUD /> */}
      <CabCRUD />
    </div>
  );
}

export default App;
