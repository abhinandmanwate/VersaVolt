package com.neuravolt.cabmanagement.service.Impl;
import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;
import com.neuravolt.cabmanagement.repository.CabRepository;
import com.neuravolt.cabmanagement.repository.DriverRepository;
import com.neuravolt.cabmanagement.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverServiceImpl implements DriverService {

    private CabRepository cabRepository;
    private DriverRepository driverRepository;

    @Autowired
    public DriverServiceImpl(CabRepository cabRepository, DriverRepository driverRepository) {
        this.cabRepository = cabRepository;
        this.driverRepository = driverRepository;
    }


    @Override
    public String createDriver(Driver driver) {

        driverRepository.save(driver);
        return "Driver Added Successfully";
    }

    @Override
    public String updateDriver(Driver driver) {

        driverRepository.save(driver);
        return "Driver Updated Successfully";
    }

    @Override
    public String deleteDriver(String driverIdNumber) {

        driverRepository.deleteById(driverIdNumber);
        return  "Driver Successfully Deleted";
    }


    @Override
    public List<Driver> getAllDriver() {

        return  driverRepository.findAll();

    }

    //Statement 3

    public Driver assignCabToDriver(String driverIdNumber, String cabRegistrationNumber) {
        Driver driver = driverRepository.findByDriverIdNumber(driverIdNumber);
        Cab cab = cabRepository.findByCabRegistrationNumber(cabRegistrationNumber);
        if (driver != null && cab != null) {
            driver.setCab(cab);
            return driverRepository.save(driver);
        }
        return null;
    }

    public Driver updateAssignedCab(String driverIdNumber, String cabRegistrationNumber) {
        Driver driver = driverRepository.findByDriverIdNumber(driverIdNumber);
        Cab cab = cabRepository.findByCabRegistrationNumber(cabRegistrationNumber);
        if (driver != null && cab != null) {
            driver.setCab(cab);
            return driverRepository.save(driver);
        }
        return null;
    }

    public Cab getAssignedCab(String driverIdNumber) {
        Driver driver = driverRepository.findByDriverIdNumber(driverIdNumber);
        if (driver != null) {
            Cab cab = driver.getCab();
            System.out.println("Driver: " + driverIdNumber + ", Cab: " + cab); // Add this line for debugging
            return cab;
        }
        return null;
    }

    public boolean removeAssignedCab(String driverIdNumber) {
        Driver driver = driverRepository.findByDriverIdNumber(driverIdNumber);
        if (driver != null) {
            driver.setCab(null);
            driverRepository.save(driver);
            return true;
        }
        return false;
    }

}
