Feature: Computer database - Update records

Background:
  Given I save a valid computer record in the DB

Scenario: Saving without changes
  When I edit the same computer record
  And I save without editing
  Then the saved record should have the same name as original
  And the same introduced date
  And the same discontinued date
  And the same company

Scenario: Editing details and saving
 When I edit the same computer record
 And I save the computer record with the following details in the DB with company as MOS technology
  |Computer name|Updated|
  |Introduced date|2015-06-14|
  |Discontinued date|2017-04-11|
 Then the saved record should have the following details
  |Computer name|Updated|
  |Introduced date|2015-06-14|
  |Discontinued date|2017-04-11|




