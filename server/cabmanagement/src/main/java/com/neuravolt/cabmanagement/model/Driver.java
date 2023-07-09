package com.neuravolt.cabmanagement.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.neuravolt.cabmanagement.repository.DriverRepository;
import jakarta.persistence.*;

@Entity
@Table(name="driverinfo")
public class Driver {

    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "cab_registration_number")
    private Cab cab;


    @Id
    @Column(name = "driverIdNumber")
    private String driverIdNumber;
    private String DriverName;
    private String DriverEmail;
    private String DriverPhoneNumber;


    public Driver() {
    }

    public Driver(String driverName, String driverIdNumber, String driverEmail, String driverPhoneNumber) {
        this.driverIdNumber = driverIdNumber;
        DriverName = driverName;
        DriverEmail = driverEmail;
        DriverPhoneNumber = driverPhoneNumber;
    }



    public String getDriverIdNumber() {
        return driverIdNumber;
    }

    public void setDriverIdNumber(String driverIdNumber) {
        this.driverIdNumber = driverIdNumber;
    }

    public String getDriverName() {
        return DriverName;
    }

    public void setDriverName(String DriverName) {
        this.DriverName = DriverName;
    }
    public String getDriverEmail() {
        return DriverEmail;
    }

    public void setDriverEmail(String DriverEmail) {
        this.DriverEmail = DriverEmail;
    }

    public String getDriverPhoneNumber() {
        return DriverPhoneNumber;
    }

    public void setDriverPhoneNumber(String driverPhoneNumber) {
        DriverPhoneNumber = driverPhoneNumber;
    }


    //Statement 3
    public void setCab(Cab cab) {
        this.cab = cab;
    }

    public Cab getCab() {
        return cab;
    }

}
