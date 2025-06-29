describe('Green Thumb App Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('allows user to register, login, and manage reminders', () => {
    // Register new user
    cy.contains('Register').click();
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('testpassword');
    cy.get('button[type="submit"]').click();

    // Login
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('testpassword');
    cy.get('button[type="submit"]').click();

    // Check home page loaded
    cy.contains('Welcome, testuser');

    // Navigate to Reminders page
    cy.contains('Reminders').click();

    // Add a new reminder
    cy.get('input[name="task"]').type('Test reminder');
    cy.get('input[name="due_date"]').type('2024-07-01');
    cy.get('button[type="submit"]').click();

    // Verify reminder appears in list
    cy.contains('Test reminder').should('exist');

    // Delete the reminder
    cy.contains('Test reminder').parent().find('button.delete').click();
    cy.contains('Test reminder').should('not.exist');
  });
});
