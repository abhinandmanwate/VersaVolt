package com.neuravolt.cabmanagement.service.Impl;
import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;
import com.neuravolt.cabmanagement.repository.CabRepository;
import com.neuravolt.cabmanagement.repository.DriverRepository;
import com.neuravolt.cabmanagement.service.CabService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CabServiceImplTest {

    @Mock
    private CabRepository cabRepository;
    @Mock
    private DriverRepository driverRepository;

    private CabService cabService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        cabService = new CabServiceImpl(cabRepository, driverRepository);
    }

    @Test
    void testCreateCab_Success() {
        // Arrange
        Cab cab = new Cab("ABC123", "Sedan", "Black");
        when(cabRepository.existsByCabRegistrationNumber(cab.getCabRegistrationNumber())).thenReturn(false);

        // Act
        String result = cabService.createCab(cab);

        // Assert
        assertThat(result).isEqualTo("Cab successfully added");
        verify(cabRepository).save(cab);
    }

    @Test
    void testCreateCab_CabAlreadyExists() {
        // Arrange
        Cab cab = new Cab("ABC123", "Sedan", "Black");
        when(cabRepository.existsByCabRegistrationNumber(cab.getCabRegistrationNumber())).thenReturn(true);

        // Act
        String result = cabService.createCab(cab);

        // Assert
        assertThat(result).isEqualTo("Cab already Added");
        verify(cabRepository, never()).save(any(Cab.class));
    }

    @Test
    void testUpdateCab_Success() {
        // Arrange
        Cab cab = new Cab("ABC123", "Sedan", "Black");
        when(cabRepository.existsByCabRegistrationNumber(cab.getCabRegistrationNumber())).thenReturn(true);

        // Act
        String result = cabService.updateCab(cab);

        // Assert
        assertThat(result).isEqualTo("Cab successfully updated");
        verify(cabRepository).save(cab);
    }

    @Test
    void testUpdateCab_CabDoesNotExist() {
        // Arrange
        Cab cab = new Cab("ABC123", "Sedan", "Black");
        when(cabRepository.existsByCabRegistrationNumber(cab.getCabRegistrationNumber())).thenReturn(false);

        // Act
        String result = cabService.updateCab(cab);

        // Assert
        assertThat(result).isEqualTo("Cab does not exist");
        verify(cabRepository, never()).save(any(Cab.class));
    }

    @Test
    void testGetAllCab_Success() {
        // Arrange
        List<Cab> cabs = new ArrayList<>();
        cabs.add(new Cab("ABC123", "Sedan", "Black"));
        cabs.add(new Cab("DEF456", "SUV", "White"));
        when(cabRepository.findAll()).thenReturn(cabs);

        // Act
        List<Cab> result = cabService.getAllCab();

        // Assert
        assertThat(result).hasSize(2);
        assertThat(result).containsExactlyElementsOf(cabs);
    }

    @Test
    void testGetAllCab_ExceptionThrown() {
        // Arrange
        when(cabRepository.findAll()).thenThrow(new RuntimeException("Failed to retrieve cab details"));

        // Act & Assert
        assertThatThrownBy(() -> cabService.getAllCab())
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Failed to retrieve cab details");
    }

    @Test
    void testDeleteCab_Success() {
        // Arrange
        String cabRegistrationNumber = "ABC123";
        when(cabRepository.existsByCabRegistrationNumber(cabRegistrationNumber)).thenReturn(true);

        // Act
        String result = cabService.deleteCab(cabRegistrationNumber);

        // Assert
        assertThat(result).isEqualTo("Cab successfully deleted");
        verify(cabRepository).deleteById(cabRegistrationNumber);
    }

    @Test
    void testDeleteCab_CabDoesNotExist() {
        // Arrange
        String cabRegistrationNumber = "ABC123";
        when(cabRepository.existsByCabRegistrationNumber(cabRegistrationNumber)).thenReturn(false);

        // Act
        String result = cabService.deleteCab(cabRegistrationNumber);

        // Assert
        assertThat(result).isEqualTo("Cab does not exist");
        verify(cabRepository, never()).deleteById(anyString());
    }

    @Test
    void testAssignDriverToCab_Success() {
        // Arrange
        String cabRegistrationNumber = "ABC123";
        String driverIdNumber = "123456789";
        Cab cab = new Cab(cabRegistrationNumber, "Sedan", "Black");
        Driver driver = new Driver(driverIdNumber, "John Doe", "johndoe@example.com", "1234567890");
        when(cabRepository.findByCabRegistrationNumber(cabRegistrationNumber)).thenReturn(cab);
        when(driverRepository.findByDriverIdNumber(driverIdNumber)).thenReturn(driver);

        // Act
        Cab result = cabService.assignDriverToCab(cabRegistrationNumber, driverIdNumber);

        // Assert
        assertThat(result).isEqualTo(cab);
        assertThat(cab.getDriver()).isEqualTo(driver);
        assertThat(driver.getCab()).isEqualTo(cab);
        verify(cabRepository).save(cab);
        verify(driverRepository).save(driver);
    }

    @Test
    void testAssignDriverToCab_CabOrDriverNotFound() {
        // Arrange
        String cabRegistrationNumber = "ABC123";
        String driverIdNumber = "123456789";
        when(cabRepository.findByCabRegistrationNumber(cabRegistrationNumber)).thenReturn(null);
        when(driverRepository.findByDriverIdNumber(driverIdNumber)).thenReturn(null);

        // Act
        Cab result = cabService.assignDriverToCab(cabRegistrationNumber, driverIdNumber);

        // Assert
        assertThat(result).isNull();
        verify(cabRepository, never()).save(any(Cab.class));
        verify(driverRepository, never()).save(any(Driver.class));
    }

    @Test
    void testUpdateAssignedDriver_Success() {
        // Arrange
        String cabRegistrationNumber = "ABC123";
        String driverIdNumber = "123456789";
        Cab cab = new Cab(cabRegistrationNumber, "Sedan", "Black");
        Driver driver = new Driver(driverIdNumber, "John Doe", "johndoe@example.com", "1234567890");
        cab.setDriver(new Driver());

        when(cabRepository.findByCabRegistrationNumber(cabRegistrationNumber)).thenReturn(cab);
        when(driverRepository.findByDriverIdNumber(driverIdNumber)).thenReturn(driver);

        // Act
        Cab result = cabService.updateAssignedDriver(cabRegistrationNumber, driverIdNumber);

        // Assert
        assertThat(result).isEqualTo(cab);
        assertThat(cab.getDriver()).isEqualTo(driver);
        assertThat(driver.getCab()).isEqualTo(cab);
        verify(cabRepository).save(cab);
        verify(driverRepository).save(driver);
    }

    @Test
    void testUpdateAssignedDriver_CabOrDriverNotFound() {
        // Arrange
        String cabRegistrationNumber = "ABC123";
        String driverIdNumber = "123456789";
        when(cabRepository.findByCabRegistrationNumber(cabRegistrationNumber)).thenReturn(null);
        when(driverRepository.findByDriverIdNumber(driverIdNumber)).thenReturn(null);

        // Act
        Cab result = cabService.updateAssignedDriver(cabRegistrationNumber, driverIdNumber);

        // Assert
        assertThat(result).isNull();
        verify(cabRepository, never()).save(any(Cab.class));
        verify(driverRepository, never()).save(any(Driver.class));
    }

    @Test
    void testGetAssignedDriver_Success() {
        // Arrange
        String cabRegistrationNumber = "ABC123";
        Cab cab = new Cab(cabRegistrationNumber, "Sedan", "Black");
        Driver driver = new Driver("123456789", "John Doe", "johndoe@example.com", "1234567890");
        cab.setDriver(driver);
        when(cabRepository.findByCabRegistrationNumber(cabRegistrationNumber)).thenReturn(cab);

        // Act
        Driver result = cabService.getAssignedDriver(cabRegistrationNumber);

        // Assert
        assertThat(result).isEqualTo(driver);
    }

    @Test
    void testGetAssignedDriver_CabNotFound() {
        // Arrange
        String cabRegistrationNumber = "ABC123";
        when(cabRepository.findByCabRegistrationNumber(cabRegistrationNumber)).thenReturn(null);

        // Act
        Driver result = cabService.getAssignedDriver(cabRegistrationNumber);

        // Assert
        assertThat(result).isNull();
    }


    @Test
    void testRemoveAssignedDriver_CabOrDriverNotFound() {
        // Arrange
        String cabRegistrationNumber = "ABC123";
        when(cabRepository.findByCabRegistrationNumber(cabRegistrationNumber)).thenReturn(null);

        // Act
        boolean result = cabService.removeAssignedDriver(cabRegistrationNumber);

        // Assert
        assertThat(result).isFalse();
        verify(driverRepository, never()).delete(any(Driver.class));
    }
}
