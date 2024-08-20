package com.example.demo.service;

import com.example.demo.dto.MemberResDto;
import com.example.demo.entity.Member;
import com.example.demo.entity.MyLoan;
import com.example.demo.repository.MyLoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MyLoanService {

    @Autowired
    private MyLoanRepository myLoanRepository;

    public MyLoan saveLoanApplication(MyLoan myLoan){
        return myLoanRepository.save(myLoan);
    }

    public List<MyLoan> getMyLoan(String email) {
        List<MyLoan> myLoans = myLoanRepository.findByEmail(email);
        if (myLoans.isEmpty()) {
            throw new RuntimeException("해당 회원이 존재하지 않습니다.");
        }
        return myLoans;
    }
}
