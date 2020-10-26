package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.IterationDto;
import com.core.rupprojectscore.entity.Iteration;
import com.core.rupprojectscore.repository.IterationRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class IterationServiceTest {

    @Autowired
    private IterationService crudService;
    @Autowired
    private MemberRepository repository;

    @Test
    void openMembersTest() {
        // Arrangement
        Iteration build = Iteration.builder()
                .number("000")
                .start(new GregorianCalendar())
                .end(new GregorianCalendar())
                .duration(0)
                .build();

        repository.save(build);

        // Actions
        List<IterationDto> all = crudService.openIterations();

        // Asserts
        assertThat(all).hasSize(1);
        assertThat(all.get(0).getNumber()).isEqualTo("000");
        assertThat(all.get(0).getStart()).isEqualTo(new GregorianCalendar());
        assertThat(all.get(0).getEnd()).isEqualTo(new GregorianCalendar());
        assertThat(all.get(0).getDuration()).isEqualTo(0);
        assertThat(all.get(0).getId()).isPositive();
    }

}
