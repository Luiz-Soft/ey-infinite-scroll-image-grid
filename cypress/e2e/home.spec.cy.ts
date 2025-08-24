/// <reference types="cypress" />

const sampleItems = (n = 3) =>
  Array.from({ length: n }).map((_, i) => ({
    id: `${i + 1}`,
    author: `Author ${i + 1}`,
    download_url: `https://picsum.photos/id/${i + 1}/300/200`,
    width: 300,
    height: 200,
    url: `https://picsum.photos/id/${i + 1}`
  }))

describe('Home edge cases (E2E)', () => {
  const API_PATTERN = '**/v2/list*'

  const sampleItems = (n = 3) =>
    Array.from({ length: n }).map((_, i) => ({
      id: `${i + 1}`,
      author: `Author ${i + 1}`,
      download_url: `https://picsum.photos/id/${i + 1}/300/200`,
      width: 300,
      height: 200,
      url: `https://picsum.photos/id/${i + 1}`
    }))

  it('displays error state, then retries successfully on click', () => {
    const LIST = 'https://picsum.photos/v2/list*'

    cy.intercept(
      { method: 'GET', url: LIST, middleware: true, times: 1 },
      (req) => req.reply(500)
    ).as('listFail')

    cy.visit('/')

    cy.wait('@listFail').its('response.statusCode').should('eq', 500)
    cy.get('[data-cy="error"]').should('be.visible')
    cy.get('.Toastify__toast.Toastify__toast--error').should('be.visible')

    cy.intercept(
      { method: 'GET', url: LIST, middleware: true },
      (req) =>
        req.reply({
          statusCode: 200,
          body: sampleItems(1),
          headers: {
            Link: '<https://picsum.photos/v2/list?page=2&limit=20>; rel="next"'
          }
        })
    ).as('listSuccess')

    cy.get('[data-cy="error"]').should('be.visible').click()

    cy.wait('@listSuccess').its('response.statusCode').should('eq', 200)

    cy.get('[data-cy="grid"]').should('be.visible')
    cy.get('[data-cy="card"]').should('have.length', 1)
    cy.get('[data-cy="error"]').should('not.exist')
  })

  it('displays loading then renders cards', () => {
    cy.intercept('GET', API_PATTERN, {
      delay: 500,
      statusCode: 200,
      body: sampleItems(2),
      headers: {
        Link: '<https://picsum.photos/v2/list?page=2&limit=20>; rel="next"'
      }
    }).as('getList')

    cy.visit('/')

    cy.get('[data-cy="loading"]').should('be.visible')
    cy.wait('@getList')
    cy.get('[data-cy="loading"]').should('not.exist')
    cy.get('[data-cy="grid"]').should('be.visible')
    cy.get('[data-cy="card"]').should('have.length', 2)
    cy.get('[data-cy="end"]').should('not.exist')
  })

  it('displays empty state when API returns []', () => {
    cy.intercept('GET', API_PATTERN, {
      statusCode: 200,
      body: [],
      headers: {} // no Link -> hasMore=false
    }).as('getEmpty')

    cy.visit('/')
    cy.wait('@getEmpty')

    cy.get('[data-cy="empty"]').should('be.visible')
    cy.get('[data-cy="grid"]').should('not.exist')
    cy.get('[data-cy="end"]').should('not.exist')
  })

  it('displays "no more items to show" when last page is reached', () => {
    cy.intercept('GET', API_PATTERN, {
      statusCode: 200,
      body: sampleItems(3),
      headers: {} // no Link -> last page
    }).as('getLast')

    cy.visit('/')
    cy.wait('@getLast')

    cy.get('[data-cy="card"]').should('have.length', 3)
    cy.get('[data-cy="end"]').should('be.visible')
  })

  it('loads more items on scroll', () => {
    cy.intercept(
      'GET',
      'https://picsum.photos/v2/list?page=1*',
      {
        statusCode: 200,
        body: sampleItems(20),
        headers: {
          Link: '<https://picsum.photos/v2/list?page=2&limit=20>; rel="next"'
        }
      }
    ).as('listPage1')

    cy.intercept(
      'GET',
      'https://picsum.photos/v2/list?page=2*',
      {
        statusCode: 200,
        body: sampleItems(20)
      }
    ).as('listPage2')

    cy.visit('/')

    cy.wait('@listPage1')
    cy.get('[data-cy="card"]').should('have.length', 20)

    cy.scrollTo('bottom')
    cy.wait('@listPage2')

    cy.get('[data-cy="card"]').should('have.length', 40)
  })

  it('display 2 columns on mobile', () => {
    cy.intercept(
      'GET',
      'https://picsum.photos/v2/list?page=1*',
      { statusCode: 200, body: sampleItems(6) }
    ).as('list')

    cy.viewport(375, 667)
    cy.visit('/')

    cy.wait('@list')
    cy.get('[data-cy="card"]').then(($els) => {
      const columns = [
        ...new Set(
          $els.toArray().map((el) =>
            Math.round(el.getBoundingClientRect().left)
          )
        )
      ]
      expect(columns).to.have.length(2)
    })
  })

  it('removes a card when clicking the remove button', () => {
  cy.intercept(
    'GET',
    'https://picsum.photos/v2/list?page=1*',
    {
      statusCode: 200,
      body: sampleItems(3),
      headers: {
        Link: '<https://picsum.photos/v2/list?page=2&limit=20>; rel="next"'
      }
    }
  ).as('listPage1')

  cy.visit('/')

  cy.wait('@listPage1')
  cy.get('[data-cy="card"]').should('have.length', 3)

  cy.get('[data-cy="card"]').first().within(() => {
    cy.get('[data-cy="remove-card"]').click()

  })

  cy.get('[data-cy="card"]').should('have.length', 2)
})

})
