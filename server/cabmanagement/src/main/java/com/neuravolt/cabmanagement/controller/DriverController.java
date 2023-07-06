package com.neuravolt.cabmanagement.controller;
import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;
import com.neuravolt.cabmanagement.service.DriverService;
import jakarta.persistence.OneToOne;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/driverapi")
public class DriverController {

    @OneToOne
    private Cab cab;
    DriverService driverService;

    public DriverController(DriverService driverService){

        this.driverService = driverService;
    }

    @PostMapping
    public  String createDriverDetails(@RequestBody Driver driver){
        driverService.createDriver(driver);
        return "Driver added successfully!";
    }

    //Give All driver details no need to pass Driver Id
    @GetMapping()
    public List<Driver> getDriverDetails(){
        return  driverService.getAllDriver();
    }

    //update existing Driver details
    @PutMapping
    public String  UpdateDriverDetails(@RequestBody Driver driver){

        driverService.updateDriver(driver);
        return "Driver Details updated successfully!";
    }
    @DeleteMapping("{DriverIdNumber}")
    public String DeleteDriverDetails(@PathVariable("DriverIdNumber") String DriverIdNumber){

        driverService.deleteDriver(DriverIdNumber);
        return " Driver Details deleted successfully!";
    }

 /*   public Cab getCab() {
        return cab;
    }

    public void setCab(Cab cab) {
        this.cab = cab;
    }*/
}
