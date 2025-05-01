
import sitemap from 'vite-plugin-sitemap';
import fs from 'fs';
import path from 'path';

// Define test output directory
const TEST_OUTPUT_DIR = './sitemap-test';

/**
 * Sets up the test environment for sitemap generation
 */
function setupTestEnvironment() {
  try {
    // Create clean test directory
    if (fs.existsSync(TEST_OUTPUT_DIR)) {
      fs.rmSync(TEST_OUTPUT_DIR, { recursive: true, force: true });
    }
    
    fs.mkdirSync(TEST_OUTPUT_DIR, { recursive: true });
    console.log(`Created test directory: ${TEST_OUTPUT_DIR}`);
    
    return true;
  } catch (error) {
    console.error('Error setting up test environment:', error);
    return false;
  }
}

/**
 * Generates a sitemap for testing purposes
 */
function generateTestSitemap() {
  try {
    // Mock Vite configuration
    const mockConfig = {
      build: {
        outDir: TEST_OUTPUT_DIR
      }
    };

    // Configure sitemap with routes (same as in vite.config.ts)
    const sitemapInstance = sitemap({
      hostname: "https://yourdomain.com",
      dynamicRoutes: [
        "/", 
        "/chats", 
        "/explore", 
        "/profile",
        "/chat/:botId"
      ],
      exclude: ["/404"]
    });

    // Manually trigger sitemap generation
    console.log('Generating test sitemap...');
    sitemapInstance.closeBundle();
    
    // Verify sitemap was created
    const sitemapPath = path.join(TEST_OUTPUT_DIR, 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      console.log(`✅ Sitemap successfully generated at: ${sitemapPath}`);
      return true;
    } else {
      console.error('❌ Sitemap generation failed: File not created');
      return false;
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return false;
  }
}

// Main execution
(async function main() {
  console.log('=== Sitemap Generation Test ===');
  
  if (setupTestEnvironment()) {
    const success = generateTestSitemap();
    
    if (success) {
      console.log('Test completed successfully!');
    } else {
      console.error('Test failed.');
      process.exit(1);
    }
  } else {
    console.error('Failed to set up test environment.');
    process.exit(1);
  }
})();
