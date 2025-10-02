it('plan project', () => {
  cy.visit('/');
  cy.get('#planProject').click();
  cy.get('#planProjectNextStep').click();
  cy.get('#createProject').click();
});
