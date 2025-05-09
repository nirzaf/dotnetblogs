import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 800,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,
    retries: {
      runMode: 2,
      openMode: 1
    },
    // Define viewports for responsive testing
    viewportPresets: {
      mobile: {
        width: 375,
        height: 667,
        deviceScaleFactor: 2,
        isMobile: true
      },
      tablet: {
        width: 768,
        height: 1024,
        deviceScaleFactor: 1,
        isMobile: true
      },
      desktop: {
        width: 1280,
        height: 800,
        deviceScaleFactor: 1,
        isMobile: false
      },
      largeDesktop: {
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
        isMobile: false
      }
    },
    // Known blog post slugs for testing
    knownBlogSlugs: [
      'building-an-angular-project-with-bootstrap-4-and-firebase',
      'advanced-csharp-programming-delegates-events-generics-async-await-and-linq',
      'you-are-doing-validation-wrong-in-net-code',
      'mastering-sql-the-power-of-sum-with-case-when',
      'performance-optimization-techniques-in-python'
    ],
    // Known tags for testing
    knownTags: [
      'Angular',
      'C#',
      'Python',
      'SQL',
      'Validation'
    ],
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
  // Component testing configuration
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    viewportWidth: 1280,
    viewportHeight: 800,
  },
});
