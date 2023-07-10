package com.neuravolt.cabmanagement.controller;
import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;
import com.neuravolt.cabmanagement.service.CabService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cabapi")
public class CabController {
    CabService cabService;

    public CabController(CabService cabService) {
        this.cabService = cabService;
    }

    @PostMapping
    public String createCabDetails(@RequestBody Cab cab) {
        try {
            cabService.createCab(cab);
            return "Cab added successfully!";
        } catch (Exception e) {
            return "Error adding cab: " + e.getMessage();
        }
    }

    @GetMapping
    public List<Cab> getCabDetails() {
        try {
            return cabService.getAllCab();
        } catch (Exception e) {
            // Log the exception or handle it as needed
            throw new RuntimeException("Error retrieving cab details: " + e.getMessage());
        }
    }

    @PutMapping
    public String updateCabDetails(@RequestBody Cab cab) {
        try {
            cabService.updateCab(cab);
            return "Cab details updated successfully!";
        } catch (Exception e) {
            return "Error updating cab details: " + e.getMessage();
        }
    }

    @DeleteMapping("{cabRegistrationNumber}")
    public String deleteCabDetails(@PathVariable("cabRegistrationNumber") String cabRegistrationNumber) {
        try {
            cabService.deleteCab(cabRegistrationNumber);
            return "Cab details deleted successfully!";
        } catch (Exception e) {
            return "Error deleting cab details: " + e.getMessage();
        }
    }

    // Statement 3 code
    @PostMapping("/{cabRegistrationNumber}/driver/{driverIdNumber}")
    public ResponseEntity<String> assignDriverToCab(
            @PathVariable("cabRegistrationNumber") String cabRegistrationNumber,
            @PathVariable("driverIdNumber") String driverIdNumber) {
        try {
            Cab cab = cabService.assignDriverToCab(cabRegistrationNumber, driverIdNumber);
            if (cab != null) {
                return ResponseEntity.ok("Driver assigned to cab successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error assigning driver to cab: " + e.getMessage());
        }
    }

    @PutMapping("/{cabRegistrationNumber}/driver/{driverIdNumber}")
    public ResponseEntity<String> updateAssignedDriver(
            @PathVariable("cabRegistrationNumber") String cabRegistrationNumber,
            @PathVariable("driverIdNumber") String driverIdNumber) {
        try {
            Cab cab = cabService.updateAssignedDriver(cabRegistrationNumber, driverIdNumber);
            if (cab != null) {
                return ResponseEntity.ok("Assigned driver updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating assigned driver: " + e.getMessage());
        }
    }

    @GetMapping("/{cabRegistrationNumber}/driver")
    public ResponseEntity<Driver> getAssignedDriver(
            @PathVariable("cabRegistrationNumber") String cabRegistrationNumber) {
        try {
            Driver driver = cabService.getAssignedDriver(cabRegistrationNumber);
            if (driver != null) {
                return ResponseEntity.ok(driver);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{cabRegistrationNumber}/driver")
    public ResponseEntity<String> removeAssignedDriver(
            @PathVariable("cabRegistrationNumber") String cabRegistrationNumber) {
        try {
            boolean removed = cabService.removeAssignedDriver(cabRegistrationNumber);
            if (removed) {
                return ResponseEntity.ok("Assigned driver removed successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing assigned driver: " + e.getMessage());
        }
    }
}


