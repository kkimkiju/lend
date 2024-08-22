package com.example.demo.controller;

import com.example.demo.dto.LoanhistoryDto;
import com.example.demo.service.LoanhistoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/loanhistory")
@RequiredArgsConstructor
public class LoanhistoryController {
    private final LoanhistoryService loanhistoryService;
    @PostMapping("/save")
    public ResponseEntity<Boolean> saveLoanhistory(@RequestBody LoanhistoryDto loanhistoryDto){
        boolean isTrue =loanhistoryService.saveLoanhistory(loanhistoryDto);
        return ResponseEntity.ok(isTrue);
    }
}
