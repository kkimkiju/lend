package com.example.demo.service;

import com.example.demo.dto.LoanhistoryDto;
import com.example.demo.entity.Loanhistory;
import com.example.demo.repository.LoanhistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoanhistoryService {
    private final LoanhistoryRepository loanhistoryRepository;

    public boolean saveLoanhistory(LoanhistoryDto loanhistoryDto) {
        try{
            Loanhistory loanhistory =new Loanhistory();
            loanhistory.setMemberid(loanhistoryDto.getMemberid());
            loanhistory.setLoan_name(loanhistoryDto.getLoan_name());
            loanhistory.setLoan_category(loanhistoryDto.getLoan_category());
            loanhistory.setLoan_id(loanhistoryDto.getLoan_id());
            loanhistory.setUserage(loanhistoryDto.getUserage());
            loanhistory.setRate(loanhistoryDto.getRate());
            loanhistory.setLim(loanhistoryDto.getLim());

            loanhistoryRepository.save(loanhistory);
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
