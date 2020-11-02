package com.core.rupprojectscore;

import org.junit.Test;
import org.junit.runner.RunWith;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.springframework.boot.test.context.SpringBootContextLoader;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

@RunWith(Cucumber.class)
@CucumberOptions(plugin = {"pretty","json:target/integration_test/cucumber.json","html:target/integration_test"}, features = "src/test/resources/stories")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ContextConfiguration(classes = RupProjectsCoreApplication.class, loader = SpringBootContextLoader.class)
public class CucumberIntegrationIT {

    @Test
    public void contextLoads() {
        System.out.println("ejecutando contextLoads");
    }

}