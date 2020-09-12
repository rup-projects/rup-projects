package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.MemberDto;
import com.core.rupprojectscore.entity.Member;
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
    void openMembers() {
        // Arrangement
        Member build = Member.builder()
                .name("name1")
                .description("description1")
                .build();

        repository.save(build);

        // Actions
        List<MemberDto> all = crudService.openMembers();

        // Asserts
        assertThat(all).hasSize(1);
        assertThat(all.get(0).getName()).isEqualTo("name1");
        assertThat(all.get(0).getDescription()).isEqualTo("description1");
        assertThat(all.get(0).getId()).isGreaterThan(0);
    }

    @Test
    void createMember() {
    }

    @Test
    void updateMember() {
    }

    @Test
    void deleteMember() {
    }
}
