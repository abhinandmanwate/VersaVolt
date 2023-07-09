package com.neuravolt.cabmanagement.service.Impl;
import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;
import com.neuravolt.cabmanagement.repository.CabRepository;
import com.neuravolt.cabmanagement.repository.DriverRepository;
import com.neuravolt.cabmanagement.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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
        try {
            driverRepository.save(driver);
            return "Driver Added Successfully";
        } catch (DataIntegrityViolationException ex) {
            throw new IllegalArgumentException("Invalid driver data");
        } catch (Exception ex) {
            throw new RuntimeException("Failed to add driver");
        }
    }

    @Override
    public String updateDriver(Driver driver) {
        try {
            driverRepository.save(driver);
            return "Driver Updated Successfully";
        } catch (DataIntegrityViolationException ex) {
            throw new IllegalArgumentException("Invalid driver data");
        } catch (Exception ex) {
            throw new RuntimeException("Failed to update driver");
        }
    }

    @Override
    public String deleteDriver(String driverIdNumber) {
        try {
            driverRepository.deleteById(driverIdNumber);
            return "Driver Successfully Deleted";
        } catch (Exception ex) {
            throw new RuntimeException("Failed to delete driver");
        }
    }

    @Override
    public List<Driver> getAllDriver() {
        try {
            return driverRepository.findAll();
        } catch (Exception ex) {
            throw new RuntimeException("Failed to get driver details");
        }
    }

    public Driver assignCabToDriver(String driverIdNumber, String cabRegistrationNumber) {
        try {
            Driver driver = driverRepository.findByDriverIdNumber(driverIdNumber);
            Cab cab = cabRepository.findByCabRegistrationNumber(cabRegistrationNumber);
            if (driver != null && cab != null) {
                driver.setCab(cab);
                return driverRepository.save(driver);
            }
            return null;
        } catch (Exception ex) {
            throw new RuntimeException("Error assigning cab to driver");
        }
    }

    public Driver updateAssignedCab(String driverIdNumber, String cabRegistrationNumber) {
        try {
            Driver driver = driverRepository.findByDriverIdNumber(driverIdNumber);
            Cab cab = cabRepository.findByCabRegistrationNumber(cabRegistrationNumber);
            if (driver != null && cab != null) {
                driver.setCab(cab);
                return driverRepository.save(driver);
            }
            return null;
        } catch (Exception ex) {
            throw new RuntimeException("Error updating assigned cab");
        }
    }

    public Cab getAssignedCab(String driverIdNumber) {
        try {
            Driver driver = driverRepository.findByDriverIdNumber(driverIdNumber);
            if (driver != null) {
                Cab cab = driver.getCab();
                System.out.println("Driver: " + driverIdNumber + ", Cab: " + cab);
                return cab;
            }
            return null;
        } catch (Exception ex) {
            throw new RuntimeException("Error getting assigned cab");
        }
    }

    public boolean removeAssignedCab(String driverIdNumber) {
        try {
            Driver driver = driverRepository.findByDriverIdNumber(driverIdNumber);
            if (driver != null) {
                driver.setCab(null);
                driverRepository.save(driver);
                return true;
            }
            return false;
        } catch (Exception ex) {
            throw new RuntimeException("Error removing assigned cab");
        }
    }

}
// exception handling for various scenarios. If there is a `DataIntegrityViolationException`, it will be caught and
// an `IllegalArgumentException` will be thrown with a corresponding error message.
// If there is any other exception, a generic `RuntimeException` will be thrown with an appropriate error message.