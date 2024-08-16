package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShooppingcartDto {
    private Long shooppingid;
    private String memberId;
    private String loan_name;
    private String loan_category;
    private Long loan_id;
    private String userage;
    private String rate;
    private String lim;
}
