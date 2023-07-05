package com.neuravolt.cabmanagement.controller;
import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.service.CabService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @DeleteMapping("{CabRegistrationNumber}")
    public String DeleteCabDetails(@PathVariable("CabRegistrationNumber") String CabRegistrationNumber){
        cabService.deleteCab(CabRegistrationNumber);
        return "Cab Details deleted successfully!";
    }
}
