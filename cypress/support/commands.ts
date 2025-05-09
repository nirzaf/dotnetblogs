// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Declare global Cypress namespace to add custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to check if all images in the page are loaded
       * @example cy.checkAllImagesLoaded()
       */
      checkAllImagesLoaded(): Chainable<Element>;
      
      /**
       * Custom command to check if a blog post loads correctly
       * @example cy.checkBlogPost('my-blog-post-slug')
       */
      checkBlogPost(slug: string): Chainable<Element>;
    }
  }
}

// Custom command to check if all images in the page are loaded
Cypress.Commands.add('checkAllImagesLoaded', () => {
  cy.get('img').each(($img) => {
    cy.wrap($img).should('be.visible');
    cy.wrap($img).should('have.attr', 'src');
  });
});

// Custom command to check if a blog post loads correctly
Cypress.Commands.add('checkBlogPost', (slug: string) => {
  cy.visit(`/blog/${slug}`);
  cy.get('h1').should('be.visible');
  cy.get('.prose').should('exist');
  cy.checkAllImagesLoaded();
  cy.get('body').should('not.contain', 'Error:');
});

// Export an empty object to make TypeScript happy
export {};
