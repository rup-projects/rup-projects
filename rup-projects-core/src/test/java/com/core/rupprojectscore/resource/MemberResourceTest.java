package com.core.rupprojectscore.resource;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.RestTemplate;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class MemberResourceTest {

    @LocalServerPort
    protected int port;

    private RestTemplate restTemplate = new RestTemplate();

    @Test
    void openMembers() {
        // Arrangement
        String endpointToTest = String.format("http://localhost:%s/%s", port, "members");

        // Actions
        ResponseEntity<String> response = restTemplate.getForEntity(endpointToTest, String.class);

        // Asserts
        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));
    }

}
