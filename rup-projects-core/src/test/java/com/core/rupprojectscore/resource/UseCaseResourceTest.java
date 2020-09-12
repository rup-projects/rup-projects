package com.core.rupprojectscore.resource;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class UseCaseResourceTest {

    @LocalServerPort
    protected int port;

    private RestTemplate restTemplate = new RestTemplate();


    @Test
    void openUseCases() {
        // Arrangement
        var endpointToTest = new DefaultUriBuilderFactory("http://localhost").builder()
                .port(port)
                .path(UseCaseResource.USE_CASES)
                .build();

        // Actions
        ResponseEntity<String> response = restTemplate.getForEntity(endpointToTest, String.class);

        // Asserts
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
    }
}
