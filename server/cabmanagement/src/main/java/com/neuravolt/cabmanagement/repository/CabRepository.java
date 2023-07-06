package com.neuravolt.cabmanagement.repository;
import com.neuravolt.cabmanagement.model.Cab;
import com.neuravolt.cabmanagement.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CabRepository extends JpaRepository<Cab,String> {
    List<Cab> findByDriver(Driver driver);
    List<Cab> findByDriverNotNull();

    List<Cab> findByDriverIsNull();

}
