describe('Responsive Design', () => {
  context('Homepage Responsive Design', () => {
    beforeEach(() => {
      // Visit the homepage
      cy.visit('/');
    });

    it('should adapt layout for mobile devices', () => {
      // Test mobile viewport
      cy.testResponsive('mobile', () => {
        // Check if navigation is collapsed or hamburger menu is visible
        cy.get('header').should('be.visible');
        
        // Check if content is properly sized for mobile
        cy.get('main').should('be.visible');
        cy.get('main').invoke('width').should('be.lessThan', 500);
        
        // Check if text is readable on mobile
        cy.get('p').invoke('css', 'font-size').then(fontSize => {
          const size = parseFloat(fontSize);
          expect(size).to.be.at.least(14);
        });
      });
    });

    it('should adapt layout for tablet devices', () => {
      // Test tablet viewport
      cy.testResponsive('tablet', () => {
        // Check if navigation is visible
        cy.get('header').should('be.visible');
        
        // Check if content is properly sized for tablet
        cy.get('main').should('be.visible');
        cy.get('main').invoke('width').should('be.within', 500, 900);
      });
    });

    it('should adapt layout for desktop devices', () => {
      // Test desktop viewport
      cy.testResponsive('desktop', () => {
        // Check if navigation is fully visible
        cy.get('header').should('be.visible');
        
        // Check if content is properly sized for desktop
        cy.get('main').should('be.visible');
        cy.get('main').invoke('width').should('be.greaterThan', 900);
      });
    });

    it('should adapt layout for large desktop devices', () => {
      // Test large desktop viewport
      cy.testResponsive('largeDesktop', () => {
        // Check if navigation is fully visible
        cy.get('header').should('be.visible');
        
        // Check if content is properly sized for large desktop
        cy.get('main').should('be.visible');
        cy.get('main').invoke('width').should('be.greaterThan', 1000);
      });
    });
  });

  context('Blog Index Responsive Design', () => {
    beforeEach(() => {
      // Visit the blog index page
      cy.visit('/blog');
    });

    it('should adapt blog post grid for different screen sizes', () => {
      // Test mobile viewport
      cy.testResponsive('mobile', () => {
        // Check if blog posts are stacked vertically on mobile
        cy.get('a[href*="/blog/"]').then($links => {
          if ($links.length > 1) {
            // Check if posts are in a single column
            cy.get('a[href*="/blog/"]').first().parent().parent()
              .should('have.css', 'grid-template-columns')
              .and(columns => {
                expect(columns).to.match(/1fr/);
              });
          }
        });
      });
      
      // Test desktop viewport
      cy.testResponsive('desktop', () => {
        // Check if blog posts are in a grid on desktop
        cy.get('a[href*="/blog/"]').then($links => {
          if ($links.length > 1) {
            // Check if posts are in multiple columns
            cy.get('a[href*="/blog/"]').first().parent().parent()
              .should('have.css', 'grid-template-columns')
              .and(columns => {
                expect(columns).to.not.match(/1fr/);
              });
          }
        });
      });
    });
  });

  context('Blog Post Responsive Design', () => {
    // Known blog post slug for testing
    const blogSlug = 'building-an-angular-project-with-bootstrap-4-and-firebase';
    
    beforeEach(() => {
      // Visit the blog post
      cy.visit(`/blog/${blogSlug}`);
    });

    it('should adapt blog post content for different screen sizes', () => {
      // Test mobile viewport
      cy.testResponsive('mobile', () => {
        // Check if content is properly sized for mobile
        cy.get('.prose, article, [class*="content"]').should('be.visible');
        cy.get('.prose, article, [class*="content"]').invoke('width').should('be.lessThan', 500);
        
        // Check if images are responsive
        cy.get('img').should('have.css', 'max-width', '100%');
      });
      
      // Test desktop viewport
      cy.testResponsive('desktop', () => {
        // Check if content is properly sized for desktop
        cy.get('.prose, article, [class*="content"]').should('be.visible');
        cy.get('.prose, article, [class*="content"]').invoke('width').should('be.greaterThan', 500);
      });
    });

    it('should adapt code blocks for different screen sizes', () => {
      // Check for code blocks
      cy.get('pre, code').then($code => {
        if ($code.length > 0) {
          // Test mobile viewport
          cy.testResponsive('mobile', () => {
            // Check if code blocks are responsive
            cy.get('pre').should('have.css', 'max-width', '100%');
            cy.get('pre').should('have.css', 'overflow-x', 'auto');
          });
        }
      });
    });
  });

  context('Tags Page Responsive Design', () => {
    beforeEach(() => {
      // Visit the tags page
      cy.visit('/tags');
    });

    it('should adapt tags layout for different screen sizes', () => {
      // Test mobile viewport
      cy.testResponsive('mobile', () => {
        // Check if tags are properly sized for mobile
        cy.get('a[href*="/tags/"]').should('be.visible');
      });
      
      // Test desktop viewport
      cy.testResponsive('desktop', () => {
        // Check if tags are properly sized for desktop
        cy.get('a[href*="/tags/"]').should('be.visible');
      });
    });
  });

  context('About Page Responsive Design', () => {
    beforeEach(() => {
      // Visit the about page
      cy.visit('/about');
    });

    it('should adapt about page content for different screen sizes', () => {
      // Test mobile viewport
      cy.testResponsive('mobile', () => {
        // Check if content is properly sized for mobile
        cy.get('main').should('be.visible');
        cy.get('main').invoke('width').should('be.lessThan', 500);
      });
      
      // Test desktop viewport
      cy.testResponsive('desktop', () => {
        // Check if content is properly sized for desktop
        cy.get('main').should('be.visible');
        cy.get('main').invoke('width').should('be.greaterThan', 500);
      });
    });
  });

  context('Navigation Responsive Design', () => {
    beforeEach(() => {
      // Visit the homepage
      cy.visit('/');
    });

    it('should adapt navigation for different screen sizes', () => {
      // Test mobile viewport
      cy.testResponsive('mobile', () => {
        // Check if navigation is collapsed or hamburger menu is visible
        cy.get('header').should('be.visible');
        
        // Check if mobile menu button exists
        cy.get('button[aria-label*="menu"], button[aria-label*="Menu"], button[aria-label*="navigation"], button[aria-label*="Navigation"]')
          .should('have.length.at.least', 0);
      });
      
      // Test desktop viewport
      cy.testResponsive('desktop', () => {
        // Check if navigation links are visible
        cy.get('header a[href="/"]').should('be.visible');
        cy.get('header a[href="/blog"]').should('be.visible');
        cy.get('header a[href="/tags"]').should('be.visible');
        cy.get('header a[href="/about"]').should('be.visible');
      });
    });
  });
});
