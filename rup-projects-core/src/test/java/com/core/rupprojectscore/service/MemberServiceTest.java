package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.MemberDto;
import com.core.rupprojectscore.entity.Member;
import com.core.rupprojectscore.entity.MemberRole;
import com.core.rupprojectscore.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class MemberServiceTest {

    @Autowired
    private MemberService crudService;
    @Autowired
    private MemberRepository repository;

    @Test
    void openMembersTest() {
        // Arrangement
        Member build = Member.builder()
                .name("name1")
                .surName("surname1")
                .email("email1")
                .role(MemberRole.Architect)
                .build();

        repository.save(build);

        // Actions
        List<MemberDto> all = crudService.openMembers();

        // Asserts
        assertThat(all).hasSize(3);
        assertThat(all.get(0).getName()).isEqualTo("member1");
        assertThat(all.get(0).getSurName()).isEqualTo("member1");
        assertThat(all.get(0).getEmail()).isEqualTo("member@mail.com");
        assertThat(all.get(0).getRole()).isEqualTo(MemberRole.Developer);

        assertThat(all.get(0).getId()).isPositive();
    }

}
