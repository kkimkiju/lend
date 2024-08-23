package com.example.demo.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

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
    private String rate;
    private Long loanId;
    private String status; // 운영자 확인 중 , 신청 완료 , 신청 반려 3개로 나눔


    @Column(updatable = false)
    private LocalDate appDate;

    public MyLoan() {
    }

    @PrePersist
    protected void onCreate() {
        this.appDate = LocalDate.now();
    }


    public MyLoan(String email, String loanName, String name, String phone, String income, String property, Integer loanAmount, String loanPeriod, String usePurpose, Long loanId, String rate ,String status) {
        this.email = email;
        this.loanName = loanName;
        this.name = name;
        this.phone = phone;
        this.income = income;
        this.property = property;
        this.loanAmount = loanAmount;
        this.loanPeriod = loanPeriod;
        this.usePurpose = usePurpose;
        this.loanId = loanId;
        this.rate = rate;
        this.status = status;
    }
}
