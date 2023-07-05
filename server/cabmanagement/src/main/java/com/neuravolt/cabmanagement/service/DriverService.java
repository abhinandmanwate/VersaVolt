package com.neuravolt.cabmanagement.service;

import com.neuravolt.cabmanagement.model.Driver;
import org.springframework.stereotype.Service;

import java.util.List;


public interface DriverService {

    public String createDriver(Driver driver);

    public String updateDriver(Driver driver);

    public String deleteDriver(String Driver_Id_number);

    public List<Driver> getAllDriver();


}


