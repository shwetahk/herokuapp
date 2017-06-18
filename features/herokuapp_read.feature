
Feature: Computer database - Read

Scenario: Search for a valid computer
Given I open herokuapp`s search page
When I filter by "IBM"
Then I should see the list of computers with name "IBM"

Scenario: Search for a invalid computer
Given I open herokuapp`s search page
When I filter by "herokuapp"
Then I should see a message that no results were found

Scenario: Search by company name
Given I have the computer record with the following details in the DB with company as MOS technology
 |Computer name|TestMOS6|
 |Introduced date|2017-06-16|
 |Discontinued date|2017-06-16|
When I filter by "MOS technology"
Then I should see a message that no results were found

Scenario: Viewing a computer that was just added
Given I save a computer with the following name "Test1011" in the DB
When I filter by "Test1011"
Then I should see the list of computers with name "Test1011"
