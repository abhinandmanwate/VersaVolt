package com.neuravolt.cabmanagement.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="driverinfo")
public class Driver {



    @Id
    private String DriverIdNumber;

    private String DriverName;
    private String DriverEmail;
    private String DriverPhoneNumber;


    public Driver() {
    }

    public Driver(String driverName, String driverIdNumber, String driverEmail, String driverPhoneNumber) {
        DriverIdNumber = driverIdNumber;
        DriverName = driverName;
        DriverEmail = driverEmail;
        DriverPhoneNumber = driverPhoneNumber;
    }



    public String getDriverIdNumber() {
        return DriverIdNumber;
    }

    public void setDriverIdNumber(String driverIdNumber) {
        DriverIdNumber = driverIdNumber;
    }

    public String getDriverName() {
        return DriverName;
    }

    public void setDriverName(String driverName) {
        DriverName = driverName;
    }
    public String getDriverEmail() {
        return DriverEmail;
    }

    public void setDriverEmail(String driverEmail) {
        DriverEmail = driverEmail;
    }

    public String getDriverPhoneNumber() {
        return DriverPhoneNumber;
    }

    public void setDriverPhoneNumber(String driverPhoneNumber) {
        DriverPhoneNumber = driverPhoneNumber;
    }
}
