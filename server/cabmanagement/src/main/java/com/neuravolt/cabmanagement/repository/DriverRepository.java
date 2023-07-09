package com.neuravolt.cabmanagement.repository;
import com.neuravolt.cabmanagement.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverRepository extends JpaRepository<Driver,String> {
    Driver findByDriverIdNumber(String driverIdNumber);
}
