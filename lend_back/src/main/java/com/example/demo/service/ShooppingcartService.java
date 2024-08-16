package com.example.demo.service;

import com.example.demo.dto.ShooppingcartDto;
import com.example.demo.entity.Member;
import com.example.demo.entity.Shooppingcart;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.ShooppingcartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShooppingcartService {
    private final ShooppingcartRepository shooppingcartRepository;
    private final MemberRepository memberRepository;

    public boolean saveWishlist(ShooppingcartDto shooppingcartDto) {
        try {
            Member member = memberRepository.findByEmail(shooppingcartDto.getMemberId())
                    .orElseThrow(() -> new IllegalArgumentException("Author not found"));

            Shooppingcart shooppingcart = new Shooppingcart();
            shooppingcart.setMember_id(member);
            shooppingcart.setLoan_id(shooppingcartDto.getLoan_id());
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
}