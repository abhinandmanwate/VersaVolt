package com.neuravolt.cabmanagement.service;

import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;
import org.springframework.stereotype.Service;

import java.util.List;

public interface CabService {

    public String createCab(Cab cab);

    public String updateCab(Cab cab);

    public String deleteCab(String Cab_Registration_Number);

    public List<Cab> getAllCab();
}
