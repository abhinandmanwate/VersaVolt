package com.neuravolt.cabmanagement.controller;
import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;
import com.neuravolt.cabmanagement.service.CabService;
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
    public  String createCabDetails(@RequestBody Cab cab){
        cabService.createCab(cab);
        return "Cab added successfully!";
    }
    @GetMapping
    public List<Cab> getCabDetails(){
        return cabService.getAllCab();

    }
    @PutMapping
    public String  UpdateCabDetails(@RequestBody Cab cab ){
        cabService.updateCab(cab);
        return "Cab Details updated successfully!";
    }

    @DeleteMapping("{cabRegistrationNumber}")
    public String DeleteCabDetails(@PathVariable("cabRegistrationNumber") String cabRegistrationNumber){
        cabService.deleteCab(cabRegistrationNumber);
        return "Cab Details deleted successfully!";
    }

    //Statement 3 code
    @PostMapping("/{cabRegistrationNumber}/driver/{driverIdNumber}")
    public ResponseEntity<String> assignDriverToCab(
            @PathVariable("cabRegistrationNumber") String cabRegistrationNumber,
            @PathVariable("driverIdNumber") String driverIdNumber) {
        Cab cab = cabService.assignDriverToCab(cabRegistrationNumber, driverIdNumber);
        if (cab != null) {
            return ResponseEntity.ok("Driver assigned to cab successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{cabRegistrationNumber}/driver/{driverIdNumber}")
    public ResponseEntity<String> updateAssignedDriver(
            @PathVariable("cabRegistrationNumber") String cabRegistrationNumber,
            @PathVariable("driverIdNumber") String driverIdNumber) {
        Cab cab = cabService.updateAssignedDriver(cabRegistrationNumber, driverIdNumber);
        if (cab != null) {
            return ResponseEntity.ok("Assigned driver updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{cabRegistrationNumber}/driver")
    public ResponseEntity<Driver> getAssignedDriver(
            @PathVariable("cabRegistrationNumber") String cabRegistrationNumber) {
        Driver driver = cabService.getAssignedDriver(cabRegistrationNumber);
        if (driver != null) {
            return ResponseEntity.ok(driver);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{cabRegistrationNumber}/driver")
    public ResponseEntity<String> removeAssignedDriver(
            @PathVariable("cabRegistrationNumber") String cabRegistrationNumber) {
        boolean removed = cabService.removeAssignedDriver(cabRegistrationNumber);
        if (removed) {
            return ResponseEntity.ok("Assigned driver removed successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
