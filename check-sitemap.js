
import sitemap from 'vite-plugin-sitemap';
import fs from 'fs';

// Create mock context that simulates Vite build
const mockConfig = {
  build: {
    outDir: './sitemap-test'
  }
};

// Create the output directory if it doesn't exist
if (!fs.existsSync('./sitemap-test')) {
  fs.mkdirSync('./sitemap-test', { recursive: true });
}

// Configure sitemap with the same options as in vite.config.ts
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

// Execute the closeBundle hook to generate the sitemap
console.log('Testing sitemap generation...');
sitemapInstance.closeBundle();
console.log('Sitemap generation test complete. Check the sitemap-test directory.');
