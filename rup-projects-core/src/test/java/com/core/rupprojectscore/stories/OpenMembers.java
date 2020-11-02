package com.core.rupprojectscore.stories;

import com.core.rupprojectscore.entity.Member;
import com.core.rupprojectscore.entity.MemberRole;
import com.core.rupprojectscore.repository.MemberRepository;
import io.cucumber.core.api.Scenario;
import io.cucumber.java.After;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.stream.Stream;

import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("test")
public class OpenMembers {

    ResultActions resultActions;
    @Autowired
    private MockMvc mvc;
    @Autowired
    private MemberRepository memberRepository;

    @Given("{int} members stored in the system")
    public void membersStoredInTheSystem(int membersToCreate) {
        Stream.generate(this::createDefaultMember).limit(membersToCreate).forEach(memberRepository::save);
    }

    @When("client makes call to GET members")
    public void clientMakesCallToGETMembers() throws Exception {
        resultActions = mvc.perform(get("/members").contentType(MediaType.APPLICATION_JSON));
    }

    @Then("the client receives status code of 200 and list with {} members")
    public void theClientReceivesStatusCodeOfAndMemberIdAnd(int membersSize) throws Exception {
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id", hasSize(membersSize)));
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
