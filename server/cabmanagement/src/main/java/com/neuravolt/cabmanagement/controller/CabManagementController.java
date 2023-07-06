package com.neuravolt.cabmanagement.controller;


import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;
import com.neuravolt.cabmanagement.service.CabService;
import com.neuravolt.cabmanagement.service.DriverService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cabmanagement")
public class CabManagementController {

    private final DriverService driverService;
    private final CabService cabService;
    public CabManagementController(DriverService driverService, CabService cabService) {
        this.driverService = driverService;
        this.cabService = cabService;
    }

    @GetMapping("/driverapi")
    public List<Driver> getAllDrivers() {
        return driverService.getAllDriver();
    }

    @GetMapping("/cabapi")
    public List<Cab> getAllCabs() {
        return cabService.getAllCab();
    }

    //Assign drivers cab
    @PostMapping("/drivers")
    public String assignCabToDriver(@RequestBody Map<String, String> requestBody) {
        String DriverIdNumber = requestBody.get("DriverIdNumber");
        String CabRegistrationNumber = requestBody.get("CabRegistrationNumber");

        cabService.assignDriverToCab(CabRegistrationNumber, DriverIdNumber);
        return driverService.assignCabToDriver(DriverIdNumber, CabRegistrationNumber);
    }

    //Update drivers cab
    @PutMapping("/drivers")
    public String updateCabToDriver(@RequestBody Map<String, String> requestBody) {
        String DriverIdNumber = requestBody.get("DriverIdNumber");
        String CabRegistrationNumber = requestBody.get("CabRegistrationNumber");

        cabService.assignDriverToCab(CabRegistrationNumber, DriverIdNumber);
        return driverService.assignCabToDriver(DriverIdNumber, CabRegistrationNumber);
    }


    //Assign cabs driver
    @PostMapping("/cabs")
    public String assignDriverToCab(@RequestBody Map<String, String> requestBody) {
        String DriverIdNumber = requestBody.get("DriverIdNumber");
        String CabRegistrationNumber = requestBody.get("CabRegistrationNumber");

        driverService.assignCabToDriver(DriverIdNumber, CabRegistrationNumber);
        return cabService.assignDriverToCab(CabRegistrationNumber, DriverIdNumber);
    }

    //Update Driver to Cab
    @PutMapping("/cabs")
    public String updateAssignDriverToCab(@RequestBody Map<String, String> requestBody) {
        String DriverIdNumber = requestBody.get("DriverIdNumber");
        String CabRegistrationNumber = requestBody.get("CabRegistrationNumber");

        driverService.assignCabToDriver(DriverIdNumber, CabRegistrationNumber);
        return cabService.assignDriverToCab(CabRegistrationNumber, DriverIdNumber);
    }


    //Unassign drivers cab
    @DeleteMapping("/drivers/{DriverIdNumber}")
    public String unassignCabFromDriver(@PathVariable("DriverIdNumber") String DriverIdNumber) {

        return driverService.unassignCabFromDriver(DriverIdNumber);
    }

    //Unassign cabs driver
    @DeleteMapping("/cabs/{CabRegistrationNumber}")
    public String unassignDriverFromCab(@PathVariable("CabRegistrationNumber") String CabRegistrationNumber) {
        return cabService.unassignDriverFromCab(CabRegistrationNumber);
    }

}
