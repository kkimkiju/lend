package com.example.demo.controller;

import com.example.demo.dto.ShooppingcartDto;
import com.example.demo.service.ShooppingcartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/wishlist")
@RequiredArgsConstructor
public class ShooppingcartController {
    private final ShooppingcartService shooppingcartService;


    @PostMapping("/ssave")
    public ResponseEntity<Boolean> saveWishlist(@RequestBody ShooppingcartDto shooppingcartDto){
        boolean isTrue = shooppingcartService.saveWishlist(shooppingcartDto);
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
}
