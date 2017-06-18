Feature: Computer database-delete records


Scenario: Deleting a record
  Given I save a computer with the following name "testdelete" in the DB
  When I delete the record "testdelete"
  And I see a confirmation that the record is deleted
  When I filter by "testdelete"
  And I should see a message that no results were found



