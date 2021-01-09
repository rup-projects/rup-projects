package com.core.rupprojectscore.resource;

import com.core.rupprojectscore.dto.ProjectDto;
import com.core.rupprojectscore.dto.UseCaseDto;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;

import java.net.URI;
import java.time.LocalDate;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class ProjectResourceTest {

    @LocalServerPort
    protected int port;

    private RestTemplate restTemplate = new RestTemplate();

    @Test
    void createProject() {
        var projectDto = createProjectDto(LocalDate.of(1, 1, 1), LocalDate.of(1, 6, 30), cost(100000L));
        var endpointToTest = createProjectEndPoint();

        ResponseEntity<UseCaseDto> response = restTemplate.postForEntity(endpointToTest, projectDto, UseCaseDto.class);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody().getId(), is(notNullValue()));
    }

    private URI createProjectEndPoint() {
        return new DefaultUriBuilderFactory("http://localhost").builder()
                .port(port)
                .path("projects")
                .build();
    }

    private ProjectDto createProjectDto(LocalDate startDate, LocalDate endDate, long cost) {
        return ProjectDto.builder()
                .startDate(startDate)
                .endDate(endDate)
                .cost(cost)
                .build();
    }

    private long cost(long cost) {
        return cost;
    }

}
