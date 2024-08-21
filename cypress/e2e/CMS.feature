Feature: CMS

Background: Log in
  Given I log in using the default credentials

Scenario: I can log in to the CMS
  Then I should see the CMS interface is loaded
  And I should see the pages section
  And I should see pages

Scenario: I can open all the model admins
  Then I can visit each of the model admin pages
