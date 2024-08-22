package com.example.demo.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "loanhistory")
public class Loanhistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "historyid")
    private Long historyid;

    @Column(name = "memberid")
    private String memberid;

    @Column(name = "loan_name")
    private String loan_name;

    @Column(name = "loan_category")
    private String loan_category;

    @Column(name = "loan_id")
    private Long loan_id;

    @Column(name = "userage")
    private int userage;

    @Column(name = "rate")
    private String rate;

    @Column(name = "lim")
    private String lim;
}
