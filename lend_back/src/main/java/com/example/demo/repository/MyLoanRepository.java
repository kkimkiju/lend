package com.example.demo.repository;

import com.example.demo.entity.Member;
import com.example.demo.entity.MyLoan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MyLoanRepository extends JpaRepository<MyLoan, Long> {
    List<MyLoan> findByEmail(String email);
    boolean existsByEmailAndLoanId(String email, Long loan_id);
}
