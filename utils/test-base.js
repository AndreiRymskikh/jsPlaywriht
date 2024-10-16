const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder : {
            productName : "zara coat 3"
        }
    }
)