import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Fix 100vh viewport issue on mobile browsers
const setVhProperty = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Set initial viewport height
setVhProperty();

// Update on resize and orientation change
window.addEventListener('resize', setVhProperty);
window.addEventListener('orientationchange', setVhProperty);

createRoot(document.getElementById("root")!).render(<App />);