package com.example.demo.repository;

import com.example.demo.entity.Member;
import com.example.demo.entity.Shooppingcart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface ShooppingcartRepository extends JpaRepository<Shooppingcart, Long> {
    Page<Shooppingcart> findByMember(Member member, Pageable pageable);
    @Modifying
    @Query("DELETE FROM Shooppingcart s WHERE s.member = :member AND s.loan_name = :loan_name")
    void deleteByMemberAndLoanName(@Param("member") Member member, @Param("loan_name") String loan_name);
}

