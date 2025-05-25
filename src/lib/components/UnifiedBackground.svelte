<script>
  import { onMount } from 'svelte';
  
  let canvas;
  let ctx;
  let width;
  let height;
  let particles = [];
  let mouseX = 0;
  let mouseY = 0;
  let animationFrameId;
  let ripples = [];
  
  // Configuration for the interactive particle field
  const config = {
    particleCount: 150,      // Number of particles
    particleSize: 2,         // Size of particles
    connectionDistance: 120, // Maximum distance to draw connections
    lineWidth: 0.5,          // Width of connection lines
    interactive: true,       // Whether particles respond to mouse
    interactiveRadius: 180,  // Radius of mouse influence
    interactiveStrength: 1.2, // Strength of mouse influence
    particleSpeed: 0.2,      // Base movement speed (now much slower)
    returnSpeed: 0.01,       // Speed at which particles return to original position
    colorMode: 'blue-purple', // Color scheme for particles
    rippleCount: 3,          // Number of ripples to create on click
    rippleSpeed: 2,          // Speed of ripple expansion
    rippleWidth: 2,          // Width of ripple line
    rippleMaxRadius: 300,    // Maximum radius of ripple
    rippleColors: [240, 260, 280] // Hue values for ripples
  };
  
  class Particle {
    constructor() {
      // Start particles at random positions
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.originalX = this.x;
      this.originalY = this.y;
      this.size = Math.random() * config.particleSize + 1;
      this.speedX = 0;
      this.speedY = 0;
      this.hue = Math.floor(Math.random() * 60) + 220; // Blue/purple range (220-280)
      // Add slight random movement
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = Math.random() * 0.001 - 0.0005;
      this.amplitude = Math.random() * 0.5 + 0.2;
    }
    
    update() {
      // Apply cursor interaction
      if (config.interactive) {
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.interactiveRadius) {
          // Calculate influence based on distance
          const influence = (1 - distance / config.interactiveRadius) * config.interactiveStrength;
          
          // Apply stronger attraction/repulsion to mouse position
          this.speedX += -dx * influence * 0.01;
          this.speedY += -dy * influence * 0.01;
        }
      }
      
      // Update angle for subtle ambient movement
      this.angle += this.angleSpeed;
      
      // Apply subtle ambient movement
      this.speedX += Math.cos(this.angle) * this.amplitude * 0.01;
      this.speedY += Math.sin(this.angle) * this.amplitude * 0.01;
      
      // Apply return force to original position
      this.speedX += (this.originalX - this.x) * config.returnSpeed;
      this.speedY += (this.originalY - this.y) * config.returnSpeed;
      
      // Apply friction
      this.speedX *= 0.95;
      this.speedY *= 0.95;
      
      // Update position
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Handle window boundaries with bounce effect
      if (this.x < 0 || this.x > width) {
        this.speedX *= -0.5;
        this.x = Math.max(0, Math.min(width, this.x));
      }
      
      if (this.y < 0 || this.y > height) {
        this.speedY *= -0.5;
        this.y = Math.max(0, Math.min(height, this.y));
      }
      
      // Calculate size based on speed (particles moving faster appear larger)
      const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
      
      // Apply size boost if present (from click effect)
      this.sizeBoost = this.sizeBoost ? this.sizeBoost * this.sizeBoostDecay : 0;
      const dynamicSize = this.size + speed * 1.5 + this.sizeBoost;
      
      // Draw the particle with glow effect
      ctx.beginPath();
      ctx.arc(this.x, this.y, dynamicSize, 0, Math.PI * 2);
      
      // Adjust hue based on distance from cursor
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distanceToCursor = Math.sqrt(dx * dx + dy * dy);
      const hueShift = distanceToCursor < config.interactiveRadius 
        ? 30 * (1 - distanceToCursor / config.interactiveRadius) 
        : 0;
      
      ctx.fillStyle = `hsla(${this.hue + hueShift}, 90%, 65%, 0.7)`;
      ctx.fill();
      
      // Add glow effect
      if (speed > 0.5) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, dynamicSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue + hueShift}, 90%, 65%, ${0.15 * Math.min(speed / 5, 0.4)})`;
        ctx.fill();
      }
    }
  }
  
  function createParticles() {
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  function drawConnections() {
    // Draw connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.connectionDistance) {
          // Calculate opacity based on distance
          const opacity = 1 - distance / config.connectionDistance;
          
          // Check if either particle is near cursor
          const p1ToCursor = Math.sqrt(Math.pow(particles[i].x - mouseX, 2) + Math.pow(particles[i].y - mouseY, 2));
          const p2ToCursor = Math.sqrt(Math.pow(particles[j].x - mouseX, 2) + Math.pow(particles[j].y - mouseY, 2));
          const nearCursor = p1ToCursor < config.interactiveRadius || p2ToCursor < config.interactiveRadius;
          
          // Enhanced opacity and color for connections near cursor
          const enhancedOpacity = nearCursor ? opacity * 0.6 : opacity * 0.15;
          const hue = nearCursor 
            ? (particles[i].hue + particles[j].hue) / 2 + 20 
            : (particles[i].hue + particles[j].hue) / 2;
          
          // Draw line connecting particles
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `hsla(${hue}, 90%, 65%, ${enhancedOpacity})`;
          ctx.lineWidth = nearCursor ? config.lineWidth * 1.5 : config.lineWidth;
          ctx.stroke();
        }
      }
    }
  }
  
  // Ripple class for subtle click effect
  class Ripple {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 0;
      this.maxRadius = config.rippleMaxRadius;
      this.lineWidth = config.rippleWidth;
      this.speed = config.rippleSpeed;
      this.alpha = 0.7;
      this.hue = config.rippleColors[Math.floor(Math.random() * config.rippleColors.length)];
      // Add slight delay for sequential ripples
      this.delay = Math.random() * 300;
      this.active = false;
      this.startTime = Date.now();
    }
    
    update() {
      // Check if delay has passed
      if (!this.active && Date.now() - this.startTime > this.delay) {
        this.active = true;
      }
      
      // Only update if active
      if (this.active) {
        // Expand radius
        this.radius += this.speed;
        
        // Fade out as it expands
        this.alpha = Math.max(0, 0.7 * (1 - this.radius / this.maxRadius));
        
        // Reduce line width as it expands
        this.lineWidth = Math.max(0.2, config.rippleWidth * (1 - this.radius / this.maxRadius));
        
        // Draw ripple
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${this.hue}, 90%, 70%, ${this.alpha})`;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
      }
      
      // Return true if ripple is still active
      return this.radius < this.maxRadius;
    }
  }
  
  function createRippleEffect(x, y) {
    // Create multiple ripples with different sizes/speeds
    for (let i = 0; i < config.rippleCount; i++) {
      ripples.push(new Ripple(x, y));
    }
    
    // Add subtle influence to nearby particles
    particles.forEach(particle => {
      const dx = particle.x - x;
      const dy = particle.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200) {
        // Calculate influence based on distance
        const influence = Math.max(0, (200 - distance) / 200) * 0.8;
        
        // Add slight velocity away from click point
        const angle = Math.atan2(dy, dx);
        particle.speedX += Math.cos(angle) * influence * 1.5;
        particle.speedY += Math.sin(angle) * influence * 1.5;
        
        // Temporarily boost particle size
        particle.sizeBoost = influence * 2;
        particle.sizeBoostDecay = 0.95;
      }
    });
  }
  

  
  function draw() {
    // Clear canvas with semi-transparent background for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, width, height);
    
    // Draw background
    drawBackground();
    
    // Draw cursor glow effect
    if (mouseX > 0 && mouseY > 0) {
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, config.interactiveRadius);
      gradient.addColorStop(0, 'rgba(140, 80, 220, 0.15)');
      gradient.addColorStop(0.5, 'rgba(140, 80, 220, 0.05)');
      gradient.addColorStop(1, 'rgba(140, 80, 220, 0)');
      
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, config.interactiveRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    // Draw connections between particles
    drawConnections();
    
    // Update and draw particles
    particles.forEach(particle => particle.update());
    
    // Update and draw ripples
    if (ripples.length > 0) {
      ripples = ripples.filter(ripple => ripple.update());
    }
    
    // Continue animation loop
    animationFrameId = requestAnimationFrame(draw);
  }
  
  function drawBackground() {
    // Create a gradient background with a dark navy/midnight blue scheme
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    
    // Use a fixed color palette with deep purple/blue tones
    gradient.addColorStop(0, 'rgba(15, 10, 30, 1)');
    gradient.addColorStop(0.5, 'rgba(20, 12, 40, 1)');
    gradient.addColorStop(1, 'rgba(10, 8, 25, 1)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  function handleResize() {
    // Update canvas dimensions
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    // Reset particles for new dimensions
    createParticles();
  }
  
  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
  
  function handleClick(e) {
    createRippleEffect(e.clientX, e.clientY);
  }
  
  onMount(() => {
    // Initialize canvas
    ctx = canvas.getContext('2d');
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    // Create initial particles
    createParticles();
    
    // Start animation loop
    draw();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  });
</script>

<canvas
  bind:this={canvas}
  class="background-canvas"
  on:click={handleClick}
></canvas>

<style>
  .background-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
  }
</style>