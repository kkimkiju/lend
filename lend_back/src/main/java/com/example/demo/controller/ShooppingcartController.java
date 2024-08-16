package com.example.demo.controller;

import com.example.demo.dto.ShooppingcartDto;
import com.example.demo.service.ShooppingcartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
