package com.example.demo.repository;

import com.example.demo.entity.Member;
import com.example.demo.entity.Shooppingcart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;



public interface ShooppingcartRepository extends JpaRepository<Shooppingcart, Long> {
    Page<Shooppingcart> findByMember(Member member, Pageable pageable);

}
