package com.neuravolt.cabmanagement.service.Impl;

import com.neuravolt.cabmanagement.model.Driver;
import com.neuravolt.cabmanagement.repository.DriverRepository;
import com.neuravolt.cabmanagement.service.DriverService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverServiceImpl implements DriverService {

    DriverRepository driverRepository;
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
}
