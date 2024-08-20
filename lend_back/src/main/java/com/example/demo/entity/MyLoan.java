package com.example.demo.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class MyLoan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String loanName;
    private String name;
    private String phone;
    private String income;
    private String property;
    private Integer loanAmount;
    private String loanPeriod;
    private String usePurpose;

    public MyLoan() {
    }
    public MyLoan(String email, String loanName, String name, String phone, String income, String property, Integer loanAmount, String loanPeriod, String usePurpose) {
        this.email = email;
        this.loanName = loanName;
        this.name = name;
        this.phone = phone;
        this.income = income;
        this.property = property;
        this.loanAmount = loanAmount;
        this.loanPeriod = loanPeriod;
        this.usePurpose = usePurpose;
    }
}
