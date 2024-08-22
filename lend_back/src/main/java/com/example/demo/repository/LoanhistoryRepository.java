package com.example.demo.repository;


import com.example.demo.entity.Loanhistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanhistoryRepository extends JpaRepository<Loanhistory, Long> {
}
