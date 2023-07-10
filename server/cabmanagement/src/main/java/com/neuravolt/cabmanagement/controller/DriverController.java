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

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    @PostMapping
    public String createDriverDetails(@RequestBody Driver driver) {
        try {
            driverService.createDriver(driver);
            return "Driver added successfully!";
        } catch (Exception e) {
            return "Error adding driver: " + e.getMessage();
        }
    }

    @GetMapping
    public List<Driver> getDriverDetails() {
        try {
            return driverService.getAllDriver();
        } catch (Exception e) {
            // Log the exception or handle it as needed
            throw new RuntimeException("Error retrieving driver details: " + e.getMessage());
        }
    }

    @PutMapping
    public String updateDriverDetails(@RequestBody Driver driver) {
        try {
            driverService.updateDriver(driver);
            return "Driver details updated successfully!";
        } catch (Exception e) {
            return "Error updating driver details: " + e.getMessage();
        }
    }

    @DeleteMapping("{driverIdNumber}")
    public String deleteDriverDetails(@PathVariable("driverIdNumber") String driverIdNumber) {
        try {
            driverService.deleteDriver(driverIdNumber);
            return "Driver details deleted successfully!";
        } catch (Exception e) {
            return "Error deleting driver details: " + e.getMessage();
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error assigning cab to driver: " + e.getMessage());
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating assigned cab: " + e.getMessage());
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing assigned cab: " + e.getMessage());
        }
    }
}

