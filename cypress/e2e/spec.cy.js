describe('after page is loaded', () => {
  beforeEach(()=> {
    cy.fixture('example').then((urls)=> {
      cy.intercept('GET',`http://localhost:3001/api/v1/urls`, {
        statusCode:200,
        body: urls
      }).as('getUrls')
    })
    cy.visit('http://localhost:3000');
  })


  it('user can see the page title, the form, and the existing shorteened URLs', ()=> {
    cy.get('h1').contains('URL Shortener')
    cy.get('form').should('exist')  
    cy.get('.url').contains('Awesome photo')
  })

  it('When a user fills out the form, the information is reflected in the input field values', () => {
    cy.get('[placeholder="Title..."]').type('title')
    cy.get('input[placeholder="Title..."]').should('have.value', 'title')
    cy.get('[placeholder="URL to Shorten..."]').type('https://www.pexels.com/photo/flat-lay-photography-of-vegetable-salad-on-plate-1640777/')
    cy.get('input[placeholder="URL to Shorten..."]').should('have.value', 'https://www.pexels.com/photo/flat-lay-photography-of-vegetable-salad-on-plate-1640777/')

  })

  it('When a user fills out and submits the form, the new shortened URL is rendered', () => {
    cy.intercept('POST', `http://localhost:3001/api/v1/urls`, {
      statusCode:201,
      body: {
        id: 2,
        title: 'title',
        short_url: 'example.com',
        long_url: "https://www.pexels.com/photo/flat-lay-photography-of-vegetable-salad-on-plate-1640777/"
      }
    })

    cy.get('button').click()
    cy.get('section > :nth-child(2)').contains('title')
    cy.get('section > :nth-child(2)').contains('https://www.pexels.com/photo/flat-lay-photography-of-vegetable-salad-on-plate-1640777/')
  })

  
})