Feature: Verify Create member

  @ignore
  Scenario:
    When client makes call to POST members with valid request
    Then the client receives status code of 200 and created member with Id 1
