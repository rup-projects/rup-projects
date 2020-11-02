package com.core.rupprojectscore.stories;

import com.core.rupprojectscore.entity.Member;
import com.core.rupprojectscore.entity.MemberRole;
import com.core.rupprojectscore.repository.MemberRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.cucumber.core.api.Scenario;
import io.cucumber.java.After;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("test")
public class CreateMember {

    ResultActions resultActions;
    @Autowired
    private MockMvc mvc;
    @Autowired
    private MemberRepository memberRepository;

    @When("client makes call to POST members with valid request")
    public void clientMakesCallToPOSTMembersWithValidRequest() throws Exception {
        String requestBody = new ObjectMapper().writeValueAsString(createDefaultMember());
        resultActions = mvc.perform(post("/members").content(requestBody).contentType(MediaType.APPLICATION_JSON));
    }

    @Then("the client receives status code of {int} and created member with Id {int}")
    public void theClientReceivesStatusCodeOfAndCreatedMemberWithId(int status, int memberId) throws Exception {
        resultActions.andExpect(status().is(status))
                .andExpect(jsonPath("id", is(memberId)));
    }

    private Member createDefaultMember() {
        return Member.builder()
                .name("name1")
                .surName("surname1")
                .email("email1")
                .role(MemberRole.Architect)
                .build();
    }

    @After
    public void cleanDatabase(Scenario scenario){
        memberRepository.deleteAll();
    }
}
