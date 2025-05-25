<script>
  // Props for the tech card using Svelte 5 $props
  const { 
    name = "", 
    icon = "", 
    description = "", 
    startYear = new Date().getFullYear(), 
    endYear = null, 
    isActive = true, 
    level = "advanced" // Can be "beginner", "intermediate", or "advanced"
  } = $props();

  // Use $state for mutable state
  let currentYear = $state(new Date().getFullYear());
  
  // Calculate years of experience
  let yearsOfExperience = $derived(isActive 
    ? currentYear - startYear 
    : (endYear || currentYear) - startYear + 1);
  
  // Handle endYear for retired tools
  let finalEndYear = $state(endYear);
  
  $effect(() => {
    if (!isActive && !finalEndYear) {
      finalEndYear = currentYear - 1;
    }
  });
  
  // Status label and experience text
  let statusLabel = $derived(isActive 
    ? level.charAt(0).toUpperCase() + level.slice(1) 
    : `Retired (${level.charAt(0).toUpperCase() + level.slice(1)})`);
    
  let experienceText = $derived(isActive 
    ? (yearsOfExperience === 0 ? "<1 year experience" : `${yearsOfExperience}+ ${yearsOfExperience === 1 ? 'year' : 'years'} experience`)
    : (yearsOfExperience === 0 ? "<1 year" : `${yearsOfExperience} ${yearsOfExperience === 1 ? 'year' : 'years'}`) + 
      (startYear === finalEndYear ? ` (${startYear})` : ` (${startYear}-${finalEndYear})`));
</script>

<div class="tech-card {level} {!isActive ? 'retired' : ''} p-6 rounded-xl">
  <!-- Status tag -->
  <div class="tech-tag">{statusLabel}</div>
  
  <!-- Icon -->
  <div class="icon-container">
    <div class="icon-bg"></div>
    <i class="{icon} tech-icon text-3xl"></i>
  </div>
  
  <!-- Content -->
  <div class="text-center">
    <h3 class="card-title">{name}</h3>
    <span class="experience">{experienceText}</span>
    <p class="description">{description}</p>
  </div>
</div>

<style>
  /* Base card styles */
  .tech-card {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.3);
  }
  
  /* Hover effects for all cards */
  .tech-card:hover {
    transform: translateY(-8px) scale(1.03);
    z-index: 2;
    background: rgba(15, 23, 42, 0.65);
    border-color: rgba(255, 255, 255, 0.15);
  }
  
  /* Card pseudo-element for glow effect */
  .tech-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.1), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .tech-card:hover::before {
    opacity: 1;
  }
  
  /* Level-specific colors and effects */
  
  /* BEGINNER - Cyan/Blue theme */
  .tech-card.beginner:not(.retired) {
    border-top: 2px solid rgba(34, 211, 238, 0.4);
    background: linear-gradient(180deg, rgba(34, 211, 238, 0.08) 0%, rgba(15, 23, 42, 0.4) 100%);
  }
  
  .tech-card.beginner:not(.retired):hover {
    box-shadow: 0 20px 30px -15px rgba(34, 211, 238, 0.5), 0 0 15px rgba(34, 211, 238, 0.2);
    border-color: rgba(34, 211, 238, 0.6);
    background: linear-gradient(180deg, rgba(34, 211, 238, 0.12) 0%, rgba(15, 23, 42, 0.65) 100%);
  }
  
  .tech-card.beginner:not(.retired) .tech-tag {
    background: rgba(34, 211, 238, 0.2);
    color: rgb(34, 211, 238);
    border-color: rgba(34, 211, 238, 0.5);
  }
  
  .tech-card.beginner:not(.retired) .icon-bg {
    background: linear-gradient(135deg, rgba(34, 211, 238, 0.9) 0%, rgba(96, 165, 250, 0.9) 100%);
  }
  
  .tech-card.beginner:not(.retired):hover .tech-icon {
    filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.8));
    color: rgba(255, 255, 255, 0.95);
  }
  
  .tech-card.beginner:not(.retired) .experience {
    color: rgba(34, 211, 238, 0.85);
    text-shadow: 0 0 5px rgba(34, 211, 238, 0.3);
  }
  
  .tech-card.beginner:not(.retired):hover .card-title::after {
    background: linear-gradient(to right, rgba(34, 211, 238, 0.9), rgba(96, 165, 250, 0.9));
  }
  
  /* INTERMEDIATE - Green/Teal theme */
  .tech-card.intermediate:not(.retired) {
    border-top: 2px solid rgba(16, 185, 129, 0.4);
    background: linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(15, 23, 42, 0.4) 100%);
  }
  
  .tech-card.intermediate:not(.retired):hover {
    box-shadow: 0 20px 30px -15px rgba(16, 185, 129, 0.5), 0 0 15px rgba(16, 185, 129, 0.2);
    border-color: rgba(16, 185, 129, 0.6);
    background: linear-gradient(180deg, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.65) 100%);
  }
  
  .tech-card.intermediate:not(.retired) .tech-tag {
    background: rgba(16, 185, 129, 0.2);
    color: rgb(16, 185, 129);
    border-color: rgba(16, 185, 129, 0.5);
  }
  
  .tech-card.intermediate:not(.retired) .icon-bg {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%);
  }
  
  .tech-card.intermediate:not(.retired):hover .tech-icon {
    filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.8));
    color: rgba(255, 255, 255, 0.95);
  }
  
  .tech-card.intermediate:not(.retired) .experience {
    color: rgba(16, 185, 129, 0.85);
    text-shadow: 0 0 5px rgba(16, 185, 129, 0.3);
  }
  
  .tech-card.intermediate:not(.retired):hover .card-title::after {
    background: linear-gradient(to right, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.9));
  }
  
  /* ADVANCED - Purple/Indigo theme */
  .tech-card.advanced:not(.retired) {
    border-top: 2px solid rgba(99, 102, 241, 0.4);
    background: linear-gradient(180deg, rgba(99, 102, 241, 0.08) 0%, rgba(15, 23, 42, 0.4) 100%);
  }
  
  .tech-card.advanced:not(.retired):hover {
    box-shadow: 0 20px 30px -15px rgba(99, 102, 241, 0.5), 0 0 15px rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.6);
    background: linear-gradient(180deg, rgba(99, 102, 241, 0.12) 0%, rgba(15, 23, 42, 0.65) 100%);
  }
  
  .tech-card.advanced:not(.retired) .tech-tag {
    background: rgba(99, 102, 241, 0.2);
    color: rgb(139, 92, 246);
    border-color: rgba(99, 102, 241, 0.5);
  }
  
  .tech-card.advanced:not(.retired) .icon-bg {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(168, 85, 247, 0.9) 100%);
  }
  
  .tech-card.advanced:not(.retired):hover .tech-icon {
    filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.8));
    color: rgba(255, 255, 255, 0.95);
  }
  
  .tech-card.advanced:not(.retired) .experience {
    color: rgba(99, 102, 241, 0.85);
    text-shadow: 0 0 5px rgba(99, 102, 241, 0.3);
  }
  
  .tech-card.advanced:not(.retired):hover .card-title::after {
    background: linear-gradient(to right, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9));
  }
  
  /* RETIRED - Improved gray theme with better transition to original color */
  .tech-card.retired {
    filter: grayscale(85%);
    opacity: 0.75;
    background: linear-gradient(180deg, rgba(148, 163, 184, 0.05) 0%, rgba(15, 23, 42, 0.3) 100%);
    border-top: 2px solid rgba(148, 163, 184, 0.3);
    position: relative;
  }
  
  .tech-card.retired::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(148, 163, 184, 0.03) 10px,
      rgba(148, 163, 184, 0.03) 20px
    );
    pointer-events: none;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
  
  .tech-card.retired:hover {
    filter: grayscale(0%);
    opacity: 1;
    box-shadow: 0 20px 30px -15px rgba(148, 163, 184, 0.5), 0 0 15px rgba(148, 163, 184, 0.2);
    border-color: rgba(148, 163, 184, 0.5);
    background: linear-gradient(180deg, rgba(148, 163, 184, 0.1) 0%, rgba(15, 23, 42, 0.5) 100%);
  }
  
  .tech-card.retired:hover::after {
    opacity: 0;
  }
  
  .tech-card.retired .tech-tag {
    background: rgba(148, 163, 184, 0.15);
    color: rgb(148, 163, 184);
    border-color: rgba(148, 163, 184, 0.4);
    text-shadow: 0 0 3px currentColor, 0 0 5px currentColor;
    box-shadow: 0 0 5px 0 currentColor;
  }
  
  .tech-card.retired .icon-bg {
    background: linear-gradient(135deg, rgba(148, 163, 184, 0.9) 0%, rgba(100, 116, 139, 0.9) 100%);
  }
  
  .tech-card.retired .tech-icon {
    color: rgba(148, 163, 184, 0.7);
  }
  
  .tech-card.retired:hover .tech-icon {
    filter: drop-shadow(0 0 8px rgba(148, 163, 184, 0.6));
  }
  
  .tech-card.retired .card-title {
    color: rgba(148, 163, 184, 0.8);
  }
  
  .tech-card.retired .experience {
    color: rgba(148, 163, 184, 0.7);
  }
  
  .tech-card.retired:hover .card-title::after {
    background: linear-gradient(to right, rgba(148, 163, 184, 0.8), rgba(100, 116, 139, 0.8));
  }
  
  /* Retired with level hints */
  .tech-card.beginner.retired {
    border-top: 2px solid rgba(34, 211, 238, 0.2);
  }
  
  .tech-card.intermediate.retired {
    border-top: 2px solid rgba(16, 185, 129, 0.2);
  }
  
  .tech-card.advanced.retired {
    border-top: 2px solid rgba(99, 102, 241, 0.2);
  }
  
  /* Icon styles */
  .icon-container {
    position: relative;
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
  }
  
  .icon-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    filter: blur(8px);
  }
  
  .tech-card:hover .icon-bg {
    opacity: 0.7;
    animation: morphBlob 5s linear infinite;
    width: 65px;
    height: 65px;
  }
  
  .tech-icon {
    position: relative;
    z-index: 3;
    transition: all 0.3s ease;
    color: rgba(226, 232, 240, 0.8);
  }
  
  .tech-card:hover .tech-icon {
    transform: scale(1.2) rotate(5deg);
    animation: iconPulse 2s infinite alternate;
  }
  
  @keyframes iconPulse {
    0% {
      transform: scale(1.2) rotate(5deg);
    }
    100% {
      transform: scale(1.3) rotate(5deg);
    }
  }
  
  /* Status tag with neon effect on hover */
  .tech-tag {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 0.15rem 0.5rem;
    font-size: 0.55rem;
    border-radius: 12px;
    color: white;
    font-weight: 700;
    z-index: 10;
    transform: scale(0.9);
    transition: all 0.3s ease;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
  }
  
  .tech-card:hover .tech-tag {
    transform: scale(1);
    letter-spacing: 0.6px;
    text-shadow: 0 0 5px currentColor, 0 0 15px currentColor, 0 0 20px currentColor;
    box-shadow: 0 0 12px 2px currentColor;
    border-color: rgba(255, 255, 255, 0.4);
    animation: neonPulse 1.5s infinite alternate;
  }
  
  @keyframes neonPulse {
    0% {
      text-shadow: 0 0 5px currentColor, 0 0 10px currentColor;
      box-shadow: 0 0 8px 0 currentColor;
    }
    100% {
      text-shadow: 0 0 7px currentColor, 0 0 15px currentColor, 0 0 20px currentColor;
      box-shadow: 0 0 12px 2px currentColor;
    }
  }
  
  /* Text styles */
  .card-title {
    font-weight: 700;
    font-size: 1.05rem;
    color: rgba(226, 232, 240, 0.95);
    margin-bottom: 0.25rem;
    position: relative;
    display: inline-block;
    transition: all 0.3s ease;
    letter-spacing: 0.2px;
  }
  
  .tech-card:hover .card-title {
    color: rgba(255, 255, 255, 1);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }
  
  .card-title::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -3px;
    width: 0;
    height: 2px;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  .tech-card:hover .card-title::after {
    width: 100%;
  }
  
  .experience {
    display: block;
    font-size: 0.75rem;
    margin-bottom: 0.75rem;
    font-weight: 500;
    transition: all 0.3s ease;
    letter-spacing: 0.2px;
  }
  
  .tech-card:hover .experience {
    letter-spacing: 0.4px;
  }
  
  .description {
    font-size: 0.8rem;
    line-height: 1.5;
    color: rgba(226, 232, 240, 0.6);
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
  }
  
  .tech-card:hover .description {
    color: rgba(226, 232, 240, 0.9);
    transform: translateY(2px);
  }
  
  /* Animation */
  @keyframes morphBlob {
    0% {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    }
    25% {
      border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
    }
    50% {
      border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
    }
    75% {
      border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
    }
    100% {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    }
  }
</style> 