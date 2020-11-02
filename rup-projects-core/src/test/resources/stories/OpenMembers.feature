Feature: Verify Open members

  Scenario:
    Given 2 members stored in the system
    When client makes call to GET members
    Then the client receives status code of 200 and list with 2 members

