Feature: Ordering a product

    Scenario: Placing the order
        Given User is logged in the App
        When Add "zara coat 3" to Cart
        Then Verify "zara coat 3" is displayed in the Cart