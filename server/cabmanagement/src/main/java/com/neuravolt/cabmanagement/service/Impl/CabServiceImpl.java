package com.neuravolt.cabmanagement.service.Impl;

import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;
import com.neuravolt.cabmanagement.repository.CabRepository;
import com.neuravolt.cabmanagement.service.CabService;
import com.neuravolt.cabmanagement.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CabServiceImpl implements CabService {


    public static CabRepository cabRepository;
    public CabServiceImpl(CabRepository cabRepository) {
        this.cabRepository = cabRepository;
    }

    @Override
    public String createCab(Cab cab) {

       // try{
        cabRepository.save(cab);
        return "Cab Successfully Added";
      /*  } catch (Exception e) {
            // Handle specific exceptions or log the error
            throw new RuntimeException("Failed to create Cab", e);
        } */
    }


    @Override
    public String updateCab(Cab cab) {
        cabRepository.save(cab);
        return "Cab Successfully Updated";
    }

    @Override
    public String deleteCab(String Cab_Registration_Number) {
        cabRepository.deleteById(Cab_Registration_Number);
        return "Cab Successfully Deleted";
    }


    @Override
    public List<Cab> getAllCab() {
        return cabRepository.findAll();
    }
    public void setCab(Cab cab) {
        }

    @Override
    public String assignDriverToCab(String CabRegistrationNumber, String DriverIdNumber) {
        Cab cab = cabRepository.findById(CabRegistrationNumber).orElse(null);
        Driver driver = DriverService.getByDriverIdNumber(DriverIdNumber);

        if (cab != null && driver != null) {
            cab.setDriver(driver);
            cabRepository.save(cab);
            return "Driver assigned to cab successfully!";
        } else {
            return "Cab or Driver not found.";
        }
    }

    @Override
    public String unassignDriverFromCab(String CabRegistrationNumber) {
        Cab cab = cabRepository.findById(CabRegistrationNumber).orElse(null);

        if (cab != null) {
            cab.setDriver(null);
            cabRepository.save(cab);
            return "Driver unassigned from cab successfully!";
        } else {
            return "Cab not found.";
        }
    }
}
