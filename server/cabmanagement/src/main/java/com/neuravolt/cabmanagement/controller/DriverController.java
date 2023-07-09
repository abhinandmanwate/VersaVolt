package com.neuravolt.cabmanagement.controller;
import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;
import com.neuravolt.cabmanagement.service.DriverService;
import org.springframework.http.HttpStatus;
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
    public String createDriverDetails(@RequestBody Driver driver) {
        try {
            driverService.createDriver(driver);
            return "Driver added successfully!";
        } catch (Exception e) {
            return "Failed to add driver: " + e.getMessage();
        }
    }

    @GetMapping
    public ResponseEntity<List<Driver>> getDriverDetails() {
        try {
            List<Driver> drivers = driverService.getAllDriver();
            return ResponseEntity.ok(drivers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping
    public String updateDriverDetails(@RequestBody Driver driver) {
        try {
            driverService.updateDriver(driver);
            return "Driver details updated successfully!";
        } catch (Exception e) {
            return "Failed to update driver details: " + e.getMessage();
        }
    }

    @DeleteMapping("/{driverIdNumber}")
    public String deleteDriverDetails(@PathVariable("driverIdNumber") String driverIdNumber) {
        try {
            driverService.deleteDriver(driverIdNumber);
            return "Driver details deleted successfully!";
        } catch (Exception e) {
            return "Failed to delete driver details: " + e.getMessage();
        }
    }

    // Statement 3 code
    @PostMapping("/{driverIdNumber}/cab/{cabRegistrationNumber}")
    public ResponseEntity<String> assignCabToDriver(
            @PathVariable("driverIdNumber") String driverIdNumber,
            @PathVariable("cabRegistrationNumber") String cabRegistrationNumber) {
        try {
            Driver driver = driverService.assignCabToDriver(driverIdNumber, cabRegistrationNumber);
            if (driver != null) {
                return ResponseEntity.ok("Cab assigned to driver successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to assign cab to driver: " + e.getMessage());
        }
    }

    @PutMapping("/{driverIdNumber}/cab/{cabRegistrationNumber}")
    public ResponseEntity<String> updateAssignedCab(
            @PathVariable("driverIdNumber") String driverIdNumber,
            @PathVariable("cabRegistrationNumber") String cabRegistrationNumber) {
        try {
            Driver driver = driverService.updateAssignedCab(driverIdNumber, cabRegistrationNumber);
            if (driver != null) {
                return ResponseEntity.ok("Assigned cab updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update assigned cab: " + e.getMessage());
        }
    }

    @GetMapping("/{driverIdNumber}/cab")
    public ResponseEntity<Cab> getAssignedCab(
            @PathVariable("driverIdNumber") String driverIdNumber) {
        try {
            Cab cab = driverService.getAssignedCab(driverIdNumber);
            if (cab != null) {
                return ResponseEntity.ok(cab);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{driverIdNumber}/cab")
    public ResponseEntity<String> removeAssignedCab(
            @PathVariable("driverIdNumber") String driverIdNumber) {
        try {
            boolean removed = driverService.removeAssignedCab(driverIdNumber);
            if (removed) {
                return ResponseEntity.ok("Assigned cab removed successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to remove assigned cab: " + e.getMessage());
        }
    }
}
