describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'user',
      username: 'user',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Blogs')
    cy.contains('Log in to application')
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('[name="Username"]').type('user')
      cy.get('[name="Password"]').type('password')
      cy.get('.login-btn').click()
      cy.contains('Log out')
      cy.contains('New blog')
    })
    it('fails with wrong credentials', function() {
      cy.get('[name="Username"]').type('user')
      cy.get('[name="Password"]').type('wrongpassword')
      cy.get('.login-btn').click()
      cy.get('.error')
        .should('contain', 'Wrong username o password')
        .and('have.css', 'background-color', 'rgb(221, 80, 68)')
    })
  })
})

