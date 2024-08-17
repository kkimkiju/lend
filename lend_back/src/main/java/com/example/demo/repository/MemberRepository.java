package com.example.demo.repository;

import com.example.demo.constant.Authority;
import com.example.demo.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
    Optional<Member> findByEmail(String email);
    Optional<Member> findByEmailAndPassword(String email, String password);
    Optional<Member> findByNameAndEmail(String name, String email);
    //권한 확인 추가
    Optional<Authority> findAuthorityByEmail(String email);
    boolean existsByEmail(String email);
}
