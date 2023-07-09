package com.neuravolt.cabmanagement.service.Impl;
import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;
import com.neuravolt.cabmanagement.repository.CabRepository;
import com.neuravolt.cabmanagement.repository.DriverRepository;
import com.neuravolt.cabmanagement.service.CabService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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
        try {
            cabRepository.save(cab);
            return "Cab Successfully Added";
        } catch (DataIntegrityViolationException ex) {
            throw new IllegalArgumentException("Invalid cab data");
        } catch (Exception ex) {
            throw new RuntimeException("Failed to add cab");
        }
    }

    @Override
    public String updateCab(Cab cab) {
        try {
            cabRepository.save(cab);
            return "Cab Successfully Updated";
        } catch (DataIntegrityViolationException ex) {
            throw new IllegalArgumentException("Invalid cab data");
        } catch (Exception ex) {
            throw new RuntimeException("Failed to update cab");
        }
    }

    @Override
    public String deleteCab(String cabRegistrationNumber) {
        try {
            cabRepository.deleteById(cabRegistrationNumber);
            return "Cab Successfully Deleted";
        } catch (Exception ex) {
            throw new RuntimeException("Failed to delete cab");
        }
    }

    @Override
    public List<Cab> getAllCab() {
        try {
            return cabRepository.findAll();
        } catch (Exception ex) {
            throw new RuntimeException("Failed to get cab details");
        }
    }

    public Cab assignDriverToCab(String cabRegistrationNumber, String driverIdNumber) {
        try {
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
        } catch (Exception ex) {
            throw new RuntimeException("Error assigning driver to cab");
        }
    }

    public Cab updateAssignedDriver(String cabRegistrationNumber, String driverIdNumber) {
        try {
            Cab cab = cabRepository.findByCabRegistrationNumber(cabRegistrationNumber);
            Driver driver = driverRepository.findByDriverIdNumber(driverIdNumber);
            if (cab != null && driver != null) {
                cab.getDriver().setCab(null);
                cab.setDriver(driver);
                driver.setCab(cab);
                cabRepository.save(cab);
                driverRepository.save(driver);
                return cab;
            }
            return null;
        } catch (Exception ex) {
            throw new RuntimeException("Error updating assigned driver");
        }
    }

    public Driver getAssignedDriver(String cabRegistrationNumber) {
        try {
            Cab cab = cabRepository.findByCabRegistrationNumber(cabRegistrationNumber);
            if (cab != null) {
                Driver driver = cab.getDriver();
                System.out.println("Cab: " + cabRegistrationNumber + ", Driver: " + driver);
                return driver;
            }
            return null;
        } catch (Exception ex) {
            throw new RuntimeException("Error getting assigned driver");
        }
    }

    public boolean removeAssignedDriver(String cabRegistrationNumber) {
        try {
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
        } catch (Exception ex) {
            throw new RuntimeException("Error removing assigned driver");
        }
    }
}
// exception handling for various scenarios. If there is a `DataIntegrityViolationException`, it will be caught and
// an `IllegalArgumentException` will be thrown with a corresponding error message.
// If there is any other exception, a generic `RuntimeException` will be thrown with an appropriate error message.