package com.neuravolt.cabmanagement.service.Impl;
import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;
import com.neuravolt.cabmanagement.repository.CabRepository;
import com.neuravolt.cabmanagement.repository.DriverRepository;
import com.neuravolt.cabmanagement.service.CabService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CabServiceImpl implements CabService {


    private CabRepository cabRepository;
    private DriverRepository driverRepository;

    @Autowired
    public CabServiceImpl(CabRepository cabRepository, DriverRepository driverRepository) {
        this.cabRepository = cabRepository;
        this.driverRepository = driverRepository;
    }
    @Override
    public String createCab(Cab cab) {

        cabRepository.save(cab);
        return "Cab Successfully Added";

    }


    @Override
    public String updateCab(Cab cab) {
        cabRepository.save(cab);
        return "Cab Successfully Updated";
    }

    @Override
    public String deleteCab(String cabRegistrationNumber) {
        cabRepository.deleteById(cabRegistrationNumber);
        return "Cab Successfully Deleted";
    }


    @Override
    public List<Cab> getAllCab() {
        return cabRepository.findAll();
    }

    //Statement 3

    public Cab assignDriverToCab(String cabRegistrationNumber, String driverIdNumber) {
        Cab cab = cabRepository.findByCabRegistrationNumber(cabRegistrationNumber);
        Driver driver = driverRepository.findByDriverIdNumber(driverIdNumber);
        if (cab != null && driver != null) {
            cab.setDriver(driver);
            driver.setCab(cab);
            cabRepository.save(cab);
            driverRepository.save(driver);
            return cab;
        }
        return null;
    }

    public Cab updateAssignedDriver(String cabRegistrationNumber, String driverIdNumber) {
        Cab cab = cabRepository.findByCabRegistrationNumber(cabRegistrationNumber);
        Driver driver = driverRepository.findByDriverIdNumber(driverIdNumber);
        if (cab != null && driver != null) {
            cab.getDriver().setCab(null); // Unassign the current driver from the cab
            cab.setDriver(driver);
            driver.setCab(cab);
            cabRepository.save(cab);
            driverRepository.save(driver);
            return cab;
        }
        return null;
    }

    public Driver getAssignedDriver(String cabRegistrationNumber) {
        Cab cab = cabRepository.findByCabRegistrationNumber(cabRegistrationNumber);
        if (cab != null) {
            Driver driver = cab.getDriver();
            System.out.println("Cab: " + cabRegistrationNumber + ", Driver: " + driver); // Add this line for debugging
            return driver;
        }
        return null;
    }

    public boolean removeAssignedDriver(String cabRegistrationNumber) {
        Cab cab = cabRepository.findByCabRegistrationNumber(cabRegistrationNumber);
        if (cab != null) {
            Driver driver = cab.getDriver();
            if (driver != null) {
                driver.setCab(null);
                driverRepository.delete(driver);
                return true;
            }
        }
        return false;
    }


}
