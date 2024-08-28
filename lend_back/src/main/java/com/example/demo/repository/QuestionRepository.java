package com.example.demo.repository;

import com.example.demo.entity.Member;
import com.example.demo.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// interface 이어야하고 JpaRepository 상속받아야하고, <조회 할 엔터티, 기본키타입>
public interface QuestionRepository extends JpaRepository<Question, Long> {
    // 특정문자열을 포함하는 레코드 찾기
    List<Question> findByTitleLike(String Title);
    List<Question> findByTitleContaining(String keyword);
    List<Question> findByMember_Email(String email);
    Optional<Question> findById(Long id);
    // 페이지네이션
    Page<Question> findAll(Pageable pageable);

    void deleteByMember(Member member);
}
