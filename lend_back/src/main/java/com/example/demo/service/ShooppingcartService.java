package com.example.demo.service;

import com.example.demo.dto.ShooppingcartDto;
import com.example.demo.entity.Member;
import com.example.demo.entity.Question;
import com.example.demo.entity.Shooppingcart;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.ShooppingcartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.example.demo.security.SecurityUtil.getCurrentMemberId;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShooppingcartService {
    private final ShooppingcartRepository shooppingcartRepository;
    private final MemberRepository memberRepository;

    public boolean getAllApplyList(String email, Long loanId) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));

        return !shooppingcartRepository.existsByMemberAndLoanId(member, loanId);
    }

    public boolean saveWishlist(ShooppingcartDto shooppingcartDto) {
        try {
            Member member = memberRepository.findByEmail(shooppingcartDto.getMemberId())
                    .orElseThrow(() -> new IllegalArgumentException("Member not found"));

            Shooppingcart shooppingcart = new Shooppingcart();
            shooppingcart.setMember(member);
            shooppingcart.setLoanId(shooppingcartDto.getLoan_id());
            shooppingcart.setLoan_name(shooppingcartDto.getLoan_name());
            shooppingcart.setLoan_category(shooppingcartDto.getLoan_category());
            shooppingcart.setUserage(shooppingcartDto.getUserage());
            shooppingcart.setRate(shooppingcartDto.getRate());
            shooppingcart.setLim(shooppingcartDto.getLim());

            shooppingcartRepository.save(shooppingcart);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public Map<String, Object> getCart(String memberId, Pageable pageable) {
        Member member = memberRepository.findByEmail(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
        Page<Shooppingcart> shooppingcartPage = shooppingcartRepository.findByMember(member, pageable);
        if (shooppingcartPage.isEmpty()) {
            throw new RuntimeException("장바구니 내역이 존재하지 않습니다");
        }
        List<ShooppingcartDto> shooppingcartDtos = shooppingcartPage.getContent()
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
        Map<String, Object> result = new HashMap<>();
        result.put("items", shooppingcartDtos); // 'paymentHistory' 대신 'items'
        result.put("totalPages", shooppingcartPage.getTotalPages());
        result.put("totalItems", shooppingcartPage.getTotalElements());
        return result;
    }

    private ShooppingcartDto convertEntityToDto(Shooppingcart shooppingcart) {
        ShooppingcartDto shooppingcartDto = new ShooppingcartDto();
        shooppingcartDto.setMemberId(shooppingcart.getMember().getEmail());
        shooppingcartDto.setRate(shooppingcart.getRate());
        shooppingcartDto.setLim(shooppingcart.getLim());
        shooppingcartDto.setLoan_id(shooppingcart.getLoanId());
        shooppingcartDto.setLoan_name(shooppingcart.getLoan_name());
        shooppingcartDto.setLoan_category(shooppingcart.getLoan_category());
        return shooppingcartDto;
    }


    @Transactional
    public void deletecart(Member memberId, Long loan_id) {

        shooppingcartRepository.deleteByMemberAndLoanId(memberId, loan_id);
    }

    ;
}