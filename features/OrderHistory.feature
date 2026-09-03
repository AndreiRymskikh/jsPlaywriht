@Web
Feature: Product order history

  Scenario: Place an order and find it in order history
    Given the user is logged in
    When the user adds the configured product to the cart
    Then the configured product should be displayed in the cart
    When the user completes checkout with the configured country
    Then the order should be placed successfully
    And the order should appear in the order history
