Feature: Computer database - Create records

Background: 
	Given There are a number of records existing in the DB

Scenario: Successfully add a record to the DB
 	When I save a valid computer record in the DB
 	Then I should see the confirmation that the record has been saved
 	And the number of records should increase by "1"
 	And I should be able to find the same record

Scenario: Add a record with incomplete information
 	When I save a computer record without a name to the computer database
 	Then I should see an indication that the name field is required

Scenario: Cancel computer record creation
 	When I enter valid data for all the fields in the add computer form
 	And I cancel
 	Then I should be navigated back to the list of computers
 	And the number of records should increase by "0"
