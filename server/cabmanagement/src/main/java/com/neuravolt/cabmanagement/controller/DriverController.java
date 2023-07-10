package com.neuravolt.cabmanagement.controller;
import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;
import com.neuravolt.cabmanagement.service.DriverService;
import org.springframework.http.ResponseEntity;
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
    @GetMapping
    public List<Driver> getDriverDetails(){
        return  driverService.getAllDriver();
    }

    //update existing Driver details
    @PutMapping
    public String  UpdateDriverDetails(@RequestBody Driver driver){

        driverService.updateDriver(driver);
        return "Driver Details updated successfully!";
    }
    @DeleteMapping("{driverIdNumber}")
    public String DeleteDriverDetails(@PathVariable("driverIdNumber") String driverIdNumber){

        driverService.deleteDriver(driverIdNumber);
        return " Driver Details deleted successfully!";
    }

    //Statement 3 code
    @PostMapping("/{driverIdNumber}/cab/{cabRegistrationNumber}")
    public ResponseEntity<String> assignCabToDriver(
            @PathVariable("driverIdNumber") String driverIdNumber,
            @PathVariable("cabRegistrationNumber") String cabRegistrationNumber) {
        Driver driver = driverService.assignCabToDriver(driverIdNumber, cabRegistrationNumber);
        if (driver != null) {
            return ResponseEntity.ok("Cab assigned to driver successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{driverIdNumber}/cab/{cabRegistrationNumber}")
    public ResponseEntity<String> updateAssignedCab(
            @PathVariable("driverIdNumber") String driverIdNumber,
            @PathVariable("cabRegistrationNumber") String cabRegistrationNumber) {
        Driver driver = driverService.updateAssignedCab(driverIdNumber, cabRegistrationNumber);
        if (driver != null) {
            return ResponseEntity.ok("Assigned cab updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{driverIdNumber}/cab")
    public ResponseEntity<Cab> getAssignedCab(
            @PathVariable("driverIdNumber") String driverIdNumber) {
        Cab cab = driverService.getAssignedCab(driverIdNumber);
        if (cab != null) {
            return ResponseEntity.ok(cab);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{driverIdNumber}/cab")
    public ResponseEntity<String> removeAssignedCab(
            @PathVariable("driverIdNumber") String driverIdNumber) {
        boolean removed = driverService.removeAssignedCab(driverIdNumber);
        if (removed) {
            return ResponseEntity.ok("Assigned cab removed successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
