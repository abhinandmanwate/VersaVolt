package com.neuravolt.cabmanagement.controller;
import com.neuravolt.cabmanagement.model.Driver;
import com.neuravolt.cabmanagement.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/driverapi")
public class DriverController {

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

}
