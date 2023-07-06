package com.neuravolt.cabmanagement.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cabinfo")
public class Cab {

    @OneToOne
    private  Driver driver;



    @Id
    private String CabRegistrationNumber ;
    private String CabModel;
    private String CabColour;

    public Cab() {
    }

    public Cab(String cabRegistrationNumber, String cabModel, String cabColour) {
        CabRegistrationNumber = cabRegistrationNumber;
        CabModel = cabModel;
        CabColour = cabColour;
    }

    public String getCabRegistrationNumber() {
        return CabRegistrationNumber;
    }

    public void setCabRegistrationNumber(String cabRegistrationNumber) {
        CabRegistrationNumber = cabRegistrationNumber;
    }

    public String getCabModel() {
        return CabModel;
    }

    public void setCabModel(String cabModel) {
        CabModel = cabModel;
    }

    public String getCabColour() {
        return CabColour;
    }

    public void setCabColour(String cabColour) {
        CabColour = cabColour;
    }


    public Driver getDriver() {
        return driver;
    }
    public void setDriver( Driver driver) {
        this.driver = driver;
    }



}
