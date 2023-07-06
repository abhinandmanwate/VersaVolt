package com.neuravolt.cabmanagement.service;

import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;

import java.util.List;

import static com.neuravolt.cabmanagement.service.Impl.CabServiceImpl.cabRepository;

public interface CabService {

    public String createCab(Cab cab);

    public String updateCab(Cab cab);

    public String deleteCab(String Cab_Registration_Number);

    public List<Cab> getAllCab();



    public static Cab getCabByRegistrationNumber(String cabRegistrationNumber){
        return cabRepository.findById(cabRegistrationNumber).orElse(null);
    };
    public void setCab(Cab cab);

    public String assignDriverToCab(String cabRegistrationNumber, String driverIdNumber);
    public String unassignDriverFromCab(String cabRegistrationNumber);

}
