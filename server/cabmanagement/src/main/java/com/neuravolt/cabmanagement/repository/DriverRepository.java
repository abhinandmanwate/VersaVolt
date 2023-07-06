package com.neuravolt.cabmanagement.repository;
import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DriverRepository extends JpaRepository<Driver,String> {

    Driver findByCab(Cab cab);


    List<Driver> findByCabIsNull();


}
