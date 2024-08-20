package com.example.demo.entity;

import com.example.demo.repository.MemberRepository;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "shooppingcart")
public class Shooppingcart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shoopping")
    private Long shooppingid;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "loan_name", nullable = false)
    private String loan_name;

    @Column(name = "loan_category", nullable = false)
    private String loan_category;

    @Column(name = "loan_id", nullable = false)
    private Long loanId;

    @Column(name = "userage", nullable = false)
    private String userage;

    @Column(name = "rate", nullable = false)
    private String rate;

    @Column(name = "lim", nullable = false)
    private String lim;
}
