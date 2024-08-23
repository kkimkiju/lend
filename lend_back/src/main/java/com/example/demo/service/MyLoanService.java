package com.example.demo.service;

import com.example.demo.dto.MemberResDto;
import com.example.demo.entity.Member;
import com.example.demo.entity.MyLoan;
import com.example.demo.repository.MyLoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MyLoanService {

    @Autowired
    private MyLoanRepository myLoanRepository;

    public MyLoan saveLoanApplication(MyLoan myLoan) {
        return myLoanRepository.save(myLoan);
    }

    public boolean getAllApplyList(String email, Long loanId) {

        return !myLoanRepository.existsByEmailAndLoanId(email, loanId);
    }

    //id 역순으로 하기 위한 코드
    public List<MyLoan> getMyLoan(String email) {
        List<MyLoan> myLoans = myLoanRepository.findByEmail(email, Sort.by(Sort.Direction.DESC, "id"));
        if (myLoans.isEmpty()) {
            throw new RuntimeException("해당 회원이 존재하지 않습니다.");
        }
        return myLoans;
    }

    public List<MyLoan> getAllLoan() {
        List<MyLoan> myLoans = myLoanRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        if (myLoans.isEmpty()) {
            throw new RuntimeException("신청이 없습니다.");
        }
        return myLoans;
    }

    public void updateStatus(Long id, String status) {
        Optional<MyLoan> optionalLoan = myLoanRepository.findById(id);

        if (optionalLoan.isPresent()) {
            MyLoan loan = optionalLoan.get();
            loan.setStatus(status);
            myLoanRepository.save(loan);
        } else {
            throw new NoSuchElementException("Loan with ID " + id + " not found");
        }
    }
}
