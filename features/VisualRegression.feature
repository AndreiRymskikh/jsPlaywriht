@Web @Visual
Feature: Visual regression

  Scenario: Hide button remains visually unchanged
    Given the user opens the Automation Practice page
    Then the displayed text should be visible
    And the hide button should match its approved visual snapshot
    When the user clicks the hide button
    Then the displayed text should be hidden
