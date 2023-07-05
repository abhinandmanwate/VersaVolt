package com.neuravolt.cabmanagement.service.Impl;

import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;
import com.neuravolt.cabmanagement.repository.CabRepository;
import com.neuravolt.cabmanagement.service.CabService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CabServiceImpl implements CabService {


    CabRepository cabRepository;
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
}
