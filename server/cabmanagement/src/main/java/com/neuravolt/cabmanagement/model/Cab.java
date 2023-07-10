package com.neuravolt.cabmanagement.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.neuravolt.cabmanagement.repository.CabRepository;
import jakarta.persistence.*;


@Entity
@Table(name = "cabinfo")
public class Cab {

    //OneToOne Mapping with cascadetype all
    @OneToOne(mappedBy = "cab", cascade = CascadeType.ALL)
    @JsonIgnore
    private Driver driver;

    @Id
    @Column(name = "cabRegistrationNumber")
    private String cabRegistrationNumber ;
    private String CabModel;
    private String CabColour;

    public Cab() {
    }

    public Cab(String cabRegistrationNumber, String cabModel, String cabColour) {
        this.cabRegistrationNumber = cabRegistrationNumber;
        CabModel = cabModel;
        CabColour = cabColour;
    }

    public String getCabRegistrationNumber() {
        return cabRegistrationNumber;
    }

    public void setCabRegistrationNumber(String cabRegistrationNumber) {
        this.cabRegistrationNumber= cabRegistrationNumber;
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

    //Statement 3
    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public Driver getDriver() {
        return driver;
    }


}
