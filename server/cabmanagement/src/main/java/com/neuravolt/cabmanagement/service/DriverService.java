package com.neuravolt.cabmanagement.service;

import com.neuravolt.cabmanagement.model.Driver;
import com.neuravolt.cabmanagement.repository.DriverRepository;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.neuravolt.cabmanagement.service.Impl.CabServiceImpl.cabRepository;
import static com.neuravolt.cabmanagement.service.Impl.DriverServiceImpl.driverRepository;


public interface DriverService {

    static Driver getByDriverIdNumber(String DriverIdNumber){
        return driverRepository.findById(DriverIdNumber).orElse(null);
    }
    public void setDriver(Driver driver);
    public String createDriver(Driver driver);

    public String updateDriver(Driver driver);

    public String deleteDriver(String Driver_Id_number);

    public List<Driver> getAllDriver();

    public String assignCabToDriver(String driverIdNumber, String cabRegistrationNumber);

    public String unassignCabFromDriver(String driverIdNumber);

}


