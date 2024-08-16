//Member.java
package com.example.demo.entity;
import com.example.demo.constant.Authority;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "member")
public class Member {
    @Id
    @Column(name = "member_id")
    private String email;

    private String name;
    @Column(nullable = false)
    private String password;
    private Boolean isKakao;

//    @Column
//    private String nickname;

   // @Column(length = 7, nullable = false)
    @Column(length = 7)
    private String identityNumber;

    @Lob
    private String profileImgPath;


//    @Column
//    private String skill;
//
//    @Lob
//    private String myInfo;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    //@GeneratedValue(strategy = GenerationType.AUTO)
    //private String customId;
}
