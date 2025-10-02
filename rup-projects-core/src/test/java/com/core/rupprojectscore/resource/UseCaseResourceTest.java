package com.core.rupprojectscore.resource;

import com.core.rupprojectscore.dto.UseCaseDto;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;

import java.util.List;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class UseCaseResourceTest {

    @LocalServerPort
    protected int port;

    private RestTemplate restTemplate = new RestTemplate();

    @Test
    void createUseCases() {
        // Arrangement
        UseCaseDto usecaseDto = UseCaseDto.builder()
                .id(1L)
                .name("usecase")
                .description("description")
                .build();

        var endpointToTest = new DefaultUriBuilderFactory("http://localhost").builder()
                .port(port)
                .path("use-cases")
                .build();

        // Actions
        ResponseEntity<UseCaseDto> response = restTemplate.postForEntity(endpointToTest, usecaseDto, UseCaseDto.class);

        // Asserts
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody().getId(), is(notNullValue()));
    }

    @Test
    void openUseCases() {
        // Arrangement
        var endpointToTest = new DefaultUriBuilderFactory("http://localhost").builder()
                .port(port)
                .path("use-cases")
                .build();

        // Actions
        ResponseEntity<String> response = restTemplate.getForEntity(endpointToTest, String.class);

        // Asserts
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
    }

    @Test
    void updateUseCase() {
        // Arrangement
        UseCaseDto usecaseDto = UseCaseDto.builder()
                .id(1L)
                .name("usecase")
                .description("description")
                .build();
        var endpointToTest = new DefaultUriBuilderFactory("http://localhost").builder()
                .port(port)
                .path("use-cases")
                .pathSegment(usecaseDto.getId().toString())
                .build();

        // Actions
        restTemplate.put(endpointToTest, usecaseDto);

        // Asserts
    }

    @Test
    void prioritizeUseCase() {
        // Arrangement
        List<UseCaseDto> dtos = Stream.generate(() -> UseCaseDto.builder().build()).limit(5).collect(toList());

        var endpointToTest = new DefaultUriBuilderFactory("http://localhost").builder()
                .port(port)
                .path("use-cases")
                .build();

        // Actions
        restTemplate.put(endpointToTest, dtos);

        // Asserts
    }

    @Test
    void deleteUseCase() {
        // Arrangement
        UseCaseDto usecaseDto = UseCaseDto.builder()
                .id(1L)
                .name("usecase")
                .description("description")
                .build();
        var createEndPoint = new DefaultUriBuilderFactory("http://localhost").builder()
                .port(port)
                .path("use-cases")
                .build();
        ResponseEntity<UseCaseDto> response = restTemplate.postForEntity(createEndPoint, usecaseDto, UseCaseDto.class);;
        String useCaseIdToDelete = response.getBody().getId().toString();
        var deleteEndPoint = new DefaultUriBuilderFactory("http://localhost").builder()
                .port(port)
                .path("use-cases")
                .pathSegment(useCaseIdToDelete)
                .build();

        // Actions
        restTemplate.delete(deleteEndPoint);

        // Asserts
    }

}
