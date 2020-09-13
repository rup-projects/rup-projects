package com.core.rupprojectscore.resource;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;

import java.net.URI;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class MemberResourceTest {

    @LocalServerPort
    protected int port;

    private RestTemplate restTemplate = new RestTemplate();

    @Test
    void openMembersTest() {
        // Arrangement
        URI endpointToTest = new DefaultUriBuilderFactory("http://localhost").builder()
                .port(port)
                .path("members")
                .build();

        // Actions
        ResponseEntity<String> response = restTemplate.getForEntity(endpointToTest, String.class);

        // Asserts
        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));
    }

}
