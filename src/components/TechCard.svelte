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
    : (endYear || currentYear) - startYear);
  
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
    background: rgba(30, 41, 59, 0.5);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  /* Hover effects for all cards */
  .tech-card:hover {
    transform: translateY(-8px) scale(1.03);
    z-index: 2;
  }
  
  /* Level-specific colors and effects */
  
  /* BEGINNER - Cyan/Blue theme */
  .tech-card.beginner:not(.retired) {
    border-top: 2px solid rgba(34, 211, 238, 0.3);
  }
  
  .tech-card.beginner:not(.retired):hover {
    box-shadow: 0 20px 30px -15px rgba(34, 211, 238, 0.5);
    border-color: rgba(34, 211, 238, 0.5);
  }
  
  .tech-card.beginner:not(.retired) .tech-tag {
    background: linear-gradient(135deg, #22d3ee 0%, #60a5fa 100%);
  }
  
  .tech-card.beginner:not(.retired) .icon-bg {
    background: linear-gradient(135deg, rgba(34, 211, 238, 0.8) 0%, rgba(96, 165, 250, 0.8) 100%);
  }
  
  .tech-card.beginner:not(.retired):hover .tech-icon {
    filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.6));
  }
  
  .tech-card.beginner:not(.retired) .experience {
    color: rgba(34, 211, 238, 0.7);
  }
  
  .tech-card.beginner:not(.retired):hover .card-title::after {
    background: linear-gradient(to right, rgba(34, 211, 238, 0.8), rgba(96, 165, 250, 0.8));
  }
  
  /* INTERMEDIATE - Green/Teal theme */
  .tech-card.intermediate:not(.retired) {
    border-top: 2px solid rgba(16, 185, 129, 0.3);
  }
  
  .tech-card.intermediate:not(.retired):hover {
    box-shadow: 0 20px 30px -15px rgba(16, 185, 129, 0.5);
    border-color: rgba(16, 185, 129, 0.5);
  }
  
  .tech-card.intermediate:not(.retired) .tech-tag {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }
  
  .tech-card.intermediate:not(.retired) .icon-bg {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(5, 150, 105, 0.8) 100%);
  }
  
  .tech-card.intermediate:not(.retired):hover .tech-icon {
    filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.6));
  }
  
  .tech-card.intermediate:not(.retired) .experience {
    color: rgba(16, 185, 129, 0.7);
  }
  
  .tech-card.intermediate:not(.retired):hover .card-title::after {
    background: linear-gradient(to right, rgba(16, 185, 129, 0.8), rgba(5, 150, 105, 0.8));
  }
  
  /* ADVANCED - Purple/Indigo theme */
  .tech-card.advanced:not(.retired) {
    border-top: 2px solid rgba(99, 102, 241, 0.3);
  }
  
  .tech-card.advanced:not(.retired):hover {
    box-shadow: 0 20px 30px -15px rgba(99, 102, 241, 0.5);
    border-color: rgba(99, 102, 241, 0.5);
  }
  
  .tech-card.advanced:not(.retired) .tech-tag {
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  }
  
  .tech-card.advanced:not(.retired) .icon-bg {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%);
  }
  
  .tech-card.advanced:not(.retired):hover .tech-icon {
    filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.6));
  }
  
  .tech-card.advanced:not(.retired) .experience {
    color: rgba(99, 102, 241, 0.7);
  }
  
  .tech-card.advanced:not(.retired):hover .card-title::after {
    background: linear-gradient(to right, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8));
  }
  
  /* RETIRED - Gray theme with hints of original color */
  .tech-card.retired {
    filter: grayscale(85%);
    opacity: 0.75;
    background: rgba(30, 41, 59, 0.3);
    border-top: 2px solid rgba(148, 163, 184, 0.3);
  }
  
  .tech-card.retired:hover {
    filter: grayscale(0%);
    opacity: 1;
    box-shadow: 0 20px 30px -15px rgba(148, 163, 184, 0.5);
    border-color: rgba(148, 163, 184, 0.5);
  }
  
  .tech-card.retired .tech-tag {
    background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
  }
  
  .tech-card.retired .icon-bg {
    background: linear-gradient(135deg, rgba(148, 163, 184, 0.8) 0%, rgba(100, 116, 139, 0.8) 100%);
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
    filter: blur(5px);
  }
  
  .tech-card:hover .icon-bg {
    opacity: 0.5;
    animation: morphBlob 5s linear infinite;
  }
  
  .tech-icon {
    position: relative;
    z-index: 3;
    transition: all 0.3s ease;
    color: rgba(226, 232, 240, 0.8);
  }
  
  .tech-card:hover .tech-icon {
    transform: scale(1.2);
  }
  
  /* Status tag */
  .tech-tag {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 0.25rem 0.5rem;
    font-size: 0.65rem;
    border-radius: 0.5rem;
    color: white;
    font-weight: 600;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 10;
    transform: scale(0.9);
    transition: transform 0.3s ease;
  }
  
  .tech-card:hover .tech-tag {
    transform: scale(1);
  }
  
  /* Text styles */
  .card-title {
    font-weight: 600;
    font-size: 1rem;
    color: rgba(226, 232, 240, 0.9);
    margin-bottom: 0.25rem;
    position: relative;
    display: inline-block;
  }
  
  .card-title::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    transition: width 0.3s ease;
  }
  
  .tech-card:hover .card-title::after {
    width: 100%;
  }
  
  .experience {
    display: block;
    font-size: 0.7rem;
    margin-bottom: 0.75rem;
  }
  
  .description {
    font-size: 0.8rem;
    line-height: 1.4;
    color: rgba(226, 232, 240, 0.6);
    transition: color 0.3s ease;
  }
  
  .tech-card:hover .description {
    color: rgba(226, 232, 240, 0.9);
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