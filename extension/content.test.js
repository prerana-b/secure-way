//const { test, expect } = require('@jest/globals');
const check = require('./content');

test('check for phishing', () => {
    expect(check.showPrediction()).toBe(-1)
    })

test("to check for illegal HTTPS ", () => {
    testUrl = "dule-exports-exports-node-js/"
    expect(check.isIllegalHttpsURL(testUrl)).toBe(-1)
})

test("to check for illegal HTTPS ", () => {
    testUrl = "http://localhost/"
    expect(check.isIllegalHttpsURL(testUrl)).toBe(-1)
})