package com.neuravolt.cabmanagement.service.Impl;
import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.repository.CabRepository;
import com.neuravolt.cabmanagement.service.CabService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Collections;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


class CabServiceImplTest {

    @Mock
    private CabRepository cabRepository;
    private CabService cabService;
    AutoCloseable autoCloseable;
     Cab cab;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        cabService = new CabServiceImpl(cabRepository);
        cab = new Cab("ABC123","Sedan","Black");

    }

    @AfterEach
    void tearDown() throws Exception{
        autoCloseable.close();
    }

    @Test
    void TestCreateCab() {
        mock(Cab.class);
        mock(CabRepository.class);

        when(cabRepository.save(cab)).thenReturn(cab);
        assertThat(cabService.createCab(cab)).isEqualTo("Cab successfully added");
    }

    @Test
    void  TestUpdateCab(){
        mock(Cab.class);
        mock(CabRepository.class);

        when(cabRepository.save(cab)).thenReturn(cab);
        assertThat(cabService.updateCab(cab)).isEqualTo("Cab does not exist");

    }

    @Test
    void TestDeleteCab() {
        mock(Cab.class);
        mock(CabRepository.class);

        when(cabRepository.save(cab)).thenReturn(cab);
        assertThat(cabService.deleteCab(cab.getCabRegistrationNumber())).isEqualTo("Cab does not exist");

    }

    @Test
    void TestGetAllCab() {
        mock(Cab.class);
        mock(CabRepository.class);

        when(cabRepository.findAll()).thenReturn(
                new ArrayList<Cab>(Collections.singletonList(cab))
        );
        assertThat(cabService.getAllCab().get(0).getCabRegistrationNumber())
                .isEqualTo(cab.getCabRegistrationNumber());

    }

    @Test
    void assignDriverToCab() {

    }

    @Test
    void updateAssignedDriver() {
    }

    @Test
    void getAssignedDriver() {
    }

    @Test
    void removeAssignedDriver() {
    }
}