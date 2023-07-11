package com.neuravolt.cabmanagement.service.Impl;
import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;
import com.neuravolt.cabmanagement.repository.CabRepository;
import com.neuravolt.cabmanagement.repository.DriverRepository;
import com.neuravolt.cabmanagement.service.CabService;
import com.neuravolt.cabmanagement.service.DriverService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


class DriverServiceImplTest {
    @Mock
    private DriverRepository driverRepository;
    private DriverService driverService;
    AutoCloseable autoCloseable;
    Driver driver;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        driverService = new DriverServiceImpl(driverRepository);
        driver = new Driver("123456789","John Doe",
                "johndoe@example.com","1234567890");
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void TestCreateDriver() {
        mock(Driver.class);
        mock(DriverRepository.class);
        when(driverRepository.save(driver)).thenReturn(driver);
        assertThat(driverService.createDriver(driver)).isEqualTo("Driver successfully added");
    }

    @Test
    void TestUpdateDriver() {
        mock(Driver.class);
        mock(DriverRepository.class);
        when(driverRepository.save(driver)).thenReturn(driver);
        assertThat(driverService.updateDriver(driver)).isEqualTo("Driver does not exist");
    }

    @Test
    void TestDeleteDriver() {
        mock(Driver.class);
        mock(DriverRepository.class);
        when(driverRepository.save(driver)).thenReturn(driver);
        assertThat(driverService.deleteDriver(driver.getDriverIdNumber())).isEqualTo("Driver does not exist");
    }

    @Test
    void TestGetAllDriver() {
    }

    @Test
    void assignCabToDriver() {
    }

    @Test
    void updateAssignedCab() {
    }

    @Test
    void getAssignedCab() {
    }

    @Test
    void removeAssignedCab() {
    }
}