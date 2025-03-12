import fs from 'fs';
import { createCanvas } from 'canvas';

// Create a new favicon with proper centering
async function createCenteredFavicon() {
  try {
    // Create canvas with desired dimensions
    const size = 512;
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Draw rounded rectangle background with gradient
    const radius = size / 10; // Rounded corners
    
    // Create gradient (indigo to purple)
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#6366f1'); // indigo
    gradient.addColorStop(1, '#a855f7'); // purple
    
    // Draw rounded rectangle with gradient
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(size - radius, 0);
    ctx.quadraticCurveTo(size, 0, size, radius);
    ctx.lineTo(size, size - radius);
    ctx.quadraticCurveTo(size, size, size - radius, size);
    ctx.lineTo(radius, size);
    ctx.quadraticCurveTo(0, size, 0, size - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.fill();
    
    // Draw the letter D properly centered
    const fontSize = size * 0.58; // Adjust size as needed
    ctx.fillStyle = 'white';
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('D', size / 2, size / 2);
    
    // Write to PNG file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./static/favicon.png', buffer);
    
    console.log('Successfully created centered favicon.png');
  } catch (error) {
    console.error('Error creating favicon:', error);
  }
}

createCenteredFavicon(); 