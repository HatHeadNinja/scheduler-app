/* eslint-disable no-undef */
describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", '/api/debug/reset')
    cy.visit('/')
    cy.contains("Monday")
  })

  it("should book an interview", () => {
    cy.get('[alt=Add]')
      .first()
      .click()
  });
})