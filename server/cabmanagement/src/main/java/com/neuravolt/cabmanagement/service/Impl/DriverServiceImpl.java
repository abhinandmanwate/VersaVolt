package com.neuravolt.cabmanagement.service.Impl;
import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;
import com.neuravolt.cabmanagement.repository.DriverRepository;
import com.neuravolt.cabmanagement.service.CabService;
import com.neuravolt.cabmanagement.service.DriverService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverServiceImpl implements DriverService {

    public static DriverRepository driverRepository;
    public DriverServiceImpl(DriverRepository driverRepository) {
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
    public String deleteDriver(String Driver_Id_number) {

        driverRepository.deleteById(Driver_Id_number);
        return  "Driver Successfully Deleted";
    }


    @Override
    public List<Driver> getAllDriver() {

      return  driverRepository.findAll();

    }
    public void setDriver(Driver driver){};

    @Override
    public String assignCabToDriver(String DriverIdNumber, String CabRegistrationNumber) {
        Driver driver = driverRepository.findById(DriverIdNumber).orElse(null);
        Cab cab = CabService.getCabByRegistrationNumber(CabRegistrationNumber);

        if (driver != null && cab != null) {
            driver.setCab(cab);
            driverRepository.save(driver);
            return "Cab assigned to driver successfully!";
        } else {
            return "Driver or Cab not found.";
        }
    }

    @Override
    public String unassignCabFromDriver(String DriverIdNumber) {
        Driver driver = driverRepository.findById(DriverIdNumber).orElse(null);

        if (driver != null) {
            driver.setCab(null);
            driverRepository.save(driver);
            return "Cab unassigned from driver successfully!";
        } else {
            return "Driver not found.";
        }
    }

}
