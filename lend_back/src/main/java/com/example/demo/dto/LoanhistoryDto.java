package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoanhistoryDto {
    private Long historyid;
    private String memberid;
    private String loan_name;
    private String loan_category;
    private Long loan_id;
    private int userage;
    private String rate;
    private String lim;
}
