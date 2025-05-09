describe('Accessibility', () => {
  context('Homepage Accessibility', () => {
    beforeEach(() => {
      // Visit the homepage
      cy.visit('/');
    });

    it('should have proper heading hierarchy', () => {
      // Check for h1
      cy.get('h1').should('have.length', 1);
      
      // Check for proper heading order
      cy.get('h1').then($h1 => {
        // Get all headings
        cy.get('h2, h3, h4, h5, h6').each($heading => {
          // Get heading level
          const headingLevel = parseInt($heading.prop('tagName').replace('H', ''));
          
          // Get previous heading level
          const prevHeadingLevel = parseInt($heading.prevAll('h1, h2, h3, h4, h5, h6').first().prop('tagName').replace('H', ''));
          
          // Check if heading level is at most one level deeper than previous heading
          if (!isNaN(prevHeadingLevel)) {
            expect(headingLevel).to.be.at.most(prevHeadingLevel + 1);
          }
        });
      });
    });

    it('should have alt text for all images', () => {
      // Check for images
      cy.get('img').each($img => {
        // Check if image has alt attribute
        cy.wrap($img).should('have.attr', 'alt');
        
        // Check if alt text is not empty
        cy.wrap($img).invoke('attr', 'alt').should('not.be.empty');
      });
    });

    it('should have proper link text', () => {
      // Check for links
      cy.get('a').each($a => {
        // Check if link has text
        cy.wrap($a).invoke('text').then(text => {
          // Skip links with images
          if ($a.find('img').length === 0) {
            // Check if link text is not empty
            expect(text.trim()).to.not.be.empty;
            
            // Check if link text is not just "click here" or similar
            const linkText = text.trim().toLowerCase();
            expect(linkText).not.to.be.oneOf(['click here', 'here', 'link']);
          }
        });
      });
    });

    it('should have sufficient color contrast', () => {
      // Check for text elements
      cy.get('p, h1, h2, h3, h4, h5, h6, a, button, span').each($el => {
        // Get text color
        cy.wrap($el).invoke('css', 'color').then(color => {
          // Get background color
          cy.wrap($el).invoke('css', 'background-color').then(bgColor => {
            // Log colors for manual verification
            cy.log(`Element: ${$el.prop('tagName')}, Text: ${$el.text().substring(0, 20)}...`);
            cy.log(`Color: ${color}, Background: ${bgColor}`);
          });
        });
      });
    });
  });

  context('Blog Post Accessibility', () => {
    // Known blog post slug for testing
    const blogSlug = 'building-an-angular-project-with-bootstrap-4-and-firebase';
    
    beforeEach(() => {
      // Visit the blog post
      cy.visit(`/blog/${blogSlug}`);
    });

    it('should have proper heading hierarchy', () => {
      // Check for h1
      cy.get('h1').should('have.length', 1);
      
      // Check for proper heading order
      cy.get('h1').then($h1 => {
        // Get all headings
        cy.get('h2, h3, h4, h5, h6').each($heading => {
          // Get heading level
          const headingLevel = parseInt($heading.prop('tagName').replace('H', ''));
          
          // Get previous heading level
          const prevHeadingLevel = parseInt($heading.prevAll('h1, h2, h3, h4, h5, h6').first().prop('tagName').replace('H', ''));
          
          // Check if heading level is at most one level deeper than previous heading
          if (!isNaN(prevHeadingLevel)) {
            expect(headingLevel).to.be.at.most(prevHeadingLevel + 1);
          }
        });
      });
    });

    it('should have alt text for all images', () => {
      // Check for images
      cy.get('img').each($img => {
        // Check if image has alt attribute
        cy.wrap($img).should('have.attr', 'alt');
        
        // Check if alt text is not empty
        cy.wrap($img).invoke('attr', 'alt').should('not.be.empty');
      });
    });

    it('should have proper link text', () => {
      // Check for links
      cy.get('a').each($a => {
        // Check if link has text
        cy.wrap($a).invoke('text').then(text => {
          // Skip links with images
          if ($a.find('img').length === 0) {
            // Check if link text is not empty
            expect(text.trim()).to.not.be.empty;
            
            // Check if link text is not just "click here" or similar
            const linkText = text.trim().toLowerCase();
            expect(linkText).not.to.be.oneOf(['click here', 'here', 'link']);
          }
        });
      });
    });

    it('should have accessible code blocks', () => {
      // Check for code blocks
      cy.get('pre, code').then($code => {
        if ($code.length > 0) {
          // Check if code blocks have proper styling
          cy.get('pre').should('have.css', 'background-color');
          cy.get('pre').should('have.css', 'padding');
          cy.get('pre').should('have.css', 'border-radius');
        }
      });
    });
  });

  context('Navigation Accessibility', () => {
    beforeEach(() => {
      // Visit the homepage
      cy.visit('/');
    });

    it('should have keyboard navigable links', () => {
      // Check if links are keyboard focusable
      cy.get('a').first().focus().should('have.focus');
      
      // Check if focus is visible
      cy.get('a').first().focus().should('have.css', 'outline').and('not.equal', 'none');
    });

    it('should have keyboard navigable buttons', () => {
      // Check if buttons are keyboard focusable
      cy.get('button').then($buttons => {
        if ($buttons.length > 0) {
          cy.get('button').first().focus().should('have.focus');
          
          // Check if focus is visible
          cy.get('button').first().focus().should('have.css', 'outline').and('not.equal', 'none');
        }
      });
    });
  });

  context('Form Accessibility', () => {
    beforeEach(() => {
      // Visit the about page (which might have a contact form)
      cy.visit('/about');
    });

    it('should have accessible forms if present', () => {
      // Check for forms
      cy.get('form').then($forms => {
        if ($forms.length > 0) {
          // Check if form inputs have labels
          cy.get('form input, form textarea, form select').each($input => {
            // Check if input has id
            cy.wrap($input).should('have.attr', 'id');
            
            // Get input id
            cy.wrap($input).invoke('attr', 'id').then(id => {
              // Check if there's a label for this input
              cy.get(`label[for="${id}"]`).should('exist');
            });
          });
        } else {
          cy.log('No forms found on this page');
        }
      });
    });
  });
});
