package com.totalprj.movieverse.repository;

import com.totalprj.movieverse.entity.Kakao;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KakaoRepository extends JpaRepository<Kakao, Long> {
    Optional<Kakao> findByEmail(String email);

    boolean existsByEmail(String email);

}
