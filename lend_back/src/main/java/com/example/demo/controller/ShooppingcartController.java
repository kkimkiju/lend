package com.example.demo.controller;

import com.example.demo.dto.MemberResDto;
import com.example.demo.dto.ShooppingcartDto;
import com.example.demo.entity.Member;
import com.example.demo.entity.MyLoan;
import com.example.demo.service.MyLoanService;
import com.example.demo.service.ShooppingcartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/wishlist")
@RequiredArgsConstructor
public class ShooppingcartController {
    private final ShooppingcartService shooppingcartService;
    private final MyLoanService myLoanService;

    @PostMapping("/ssave")
    public ResponseEntity<Boolean> saveWishlist(@RequestBody ShooppingcartDto shooppingcartDto) {
        boolean isTrue = shooppingcartService.saveWishlist(shooppingcartDto);
        return ResponseEntity.ok(isTrue);
    }

    // 전체 조회기능 (신청한 사람 재 신청 막기위해 생성 )
    @GetMapping("/all-list/{email}/{loanId}")
    public ResponseEntity<Boolean> allApplyList(@PathVariable String email, @PathVariable Long loanId) {
        boolean isTrue = shooppingcartService.getAllApplyList(email, loanId);
        return ResponseEntity.ok(isTrue);
    }

    @GetMapping("/cart/{memberId}")
    public ResponseEntity<Map<String, Object>> cartDetail(
            @PathVariable String memberId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "7") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Map<String, Object> result = shooppingcartService.getCart(memberId, pageable);
        System.out.println("Member ID: " + memberId);
        System.out.println("Pageable: " + pageable);
        return ResponseEntity.ok(result);
    }


    @GetMapping("/delete")
    public ResponseEntity<List<ShooppingcartDto>> deleteQuestion(@RequestParam Long loan_id) {
        String memberEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = new Member();
        member.setEmail(memberEmail);
        shooppingcartService.deletecart(member, loan_id);
        return ResponseEntity.noContent().build();
    }
//위시리스트 > 대출신청(상세내역)추가하는 코드
    @PostMapping("/submit/{loanId}")
    public ResponseEntity<String> submitLoanApplication(@PathVariable("loanId") Long loanId,
                                                        @RequestBody MyLoan myLoan) {
        try {
            myLoan.setStatus("운영자 확인 중");
            myLoan.setLoanId(loanId);
            myLoanService.saveLoanApplication(myLoan);
            return new ResponseEntity<>("대출 신청이 완료되었습니다.", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("서버 오류. 다시 시도해 주세요.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
//중복된 상세신청이 있나 확인
    @GetMapping("/existsubmit/{email}/{loanId}")
    public ResponseEntity<Boolean> existSubmit(@PathVariable String email, @PathVariable Long loanId) {
        boolean isTrue = myLoanService.getAllApplyList(email, loanId);
        return ResponseEntity.ok(isTrue);
    }

    @GetMapping("/loaninfo")
    public ResponseEntity<List<MyLoan>> memberInfo() {
        List<MyLoan> myLoans = myLoanService.getMyLoan(SecurityContextHolder.getContext().getAuthentication().getName());
        return ResponseEntity.ok(myLoans);
    }
}
