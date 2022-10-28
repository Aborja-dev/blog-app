describe('Blog app', () => {
  beforeEach(() => {
    cy.request('GET', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'abraham',
      username: 'arahakna',
      password: 'mipassword'
    }
    cy.request('POST', 'http://localhost:3001/api/testing/user', user)
  })
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })
  it('login', () => {
    cy.get("input[name='username']").type('arahakna')
    cy.get("input[name='password']").type('mipassword')
    cy.get('form > button').click()
  })
  it('login with wrong password', () => {
    cy.get("input[name='username']").type('arahakna')
    cy.get("input[name='password']").type('mipassword123')
    cy.get('form > button').click()
    cy.get('.alert')
      .should('contain', 'acceso incorrecto')
  })
  describe('funciones de <Blog />', () => {
    beforeEach(() => {
      cy
        .request('POST', 'http://localhost:3001/api/login', {
          username: 'arahakna',
          password: 'mipassword'

        })
        .then(response => {
          window.localStorage.setItem('userSession', JSON.stringify(response.body))
        })
    })
    it.only('show blogList', () => {

    })
  })
})
