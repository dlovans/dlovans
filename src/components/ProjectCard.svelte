<script>
  // Using Svelte 5 reactive primitives for props
  let {
    title = "",
    shortDescription = "",
    longDescription = "",
    technologies = [],
    githubUrl = null,
    productUrl = null,
    image = ""
  } = $props();

  // State using Svelte 5 reactive primitive
  let isFlipped = $state(false);

  // Toggle card flip
  function toggleFlip() {
    isFlipped = !isFlipped;
  }
</script>

<div class="project-card-container w-full max-w-full perspective">
  <div 
    class="relative w-full h-[380px] transition-transform duration-700 transform-style-3d cursor-pointer {isFlipped ? 'rotate-y-180' : ''}"
    onclick={toggleFlip}
    onkeydown={(e) => e.key === 'Enter' && toggleFlip()}
    tabindex="0"
    role="button"
    aria-label="Toggle card view"
  >
    <!-- Front of Card -->
    <div class="absolute inset-0 backface-hidden rounded-xl shadow-lg shadow-indigo-500/10 border border-indigo-500/20 overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900">
      <!-- Project Image with Enhanced Styling -->
      <div class="relative h-40 w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
        
        <!-- Glowing accent -->
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        
        <!-- Title overlaid on image -->
        <div class="absolute bottom-0 left-0 right-0 p-4">
          <h3 class="text-base font-bold text-white mb-1 drop-shadow-md">{title}</h3>
        </div>
      </div>
      
      <!-- Content -->
      <div class="p-4">
        <p class="text-slate-300 text-xs line-clamp-3 mb-3">{shortDescription}</p>
        
        <!-- Tech Stack with improved styling -->
        <div class="flex flex-wrap gap-1.5">
          {#each technologies.slice(0, 4) as tech, i}
            <span class="tech-tag" style="--index: {i};">
              {tech}
            </span>
          {/each}
          {#if technologies.length > 4}
            <span class="tech-tag more-tag">+{technologies.length - 4}</span>
          {/if}
        </div>
        
        <!-- Flip Hint with improved styling -->
        <div class="absolute bottom-3 right-3 flex items-center text-slate-400 text-xs bg-indigo-900/40 px-2 py-1 rounded-full shadow-sm backdrop-blur-sm border border-indigo-500/20 animate-pulse-gentle">
          <span>Details</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      </div>
    </div>
    
    <!-- Back of Card -->
    <div class="absolute inset-0 backface-hidden rotate-y-180 rounded-xl shadow-xl overflow-hidden">
      <!-- Gradient background -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900"></div>
      
      <!-- Decorative elements -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full filter blur-xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-purple-600/10 rounded-full filter blur-xl transform -translate-x-1/2 translate-y-1/2"></div>
      
      <!-- Content -->
      <div class="relative h-full p-5 flex flex-col z-10">
        <h3 class="text-base font-bold text-white mb-2">{title}</h3>
        
        <!-- Detailed Description -->
        <div class="flex-1 overflow-y-auto custom-scrollbar mb-4">
          <p class="text-slate-300 text-xs leading-relaxed">{longDescription}</p>
        </div>
        
        <!-- Project Links - moved up with increased bottom padding -->
        <div class="mt-auto flex justify-center gap-3 pb-12">
          {#if githubUrl}
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800/70 text-white hover:bg-slate-700 transition-colors border border-slate-700/50 hover:border-indigo-500/50"
              onclick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.756.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          {/if}
          
          {#if productUrl}
            <a 
              href={productUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/20"
              onclick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit Site
            </a>
          {/if}
        </div>
        
        <!-- Flip back hint (returned to bottom-right) -->
        <div class="absolute bottom-3 right-3 flex items-center text-indigo-300/80 text-xs bg-indigo-950/70 px-2 py-1 rounded-full border border-indigo-500/30 hover:bg-indigo-900/50 transition-colors">
          <span>Close</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Needed CSS for 3D transforms because Tailwind doesn't cover these */
  .perspective {
    perspective: 1000px;
  }
  
  .transform-style-3d {
    transform-style: preserve-3d;
  }
  
  .backface-hidden {
    backface-visibility: hidden;
  }
  
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
  
  /* Custom scrollbar for description */
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(30, 41, 59, 0.2);
    border-radius: 20px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.3);
    border-radius: 20px;
  }
  
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(99, 102, 241, 0.3) rgba(30, 41, 59, 0.2);
  }
  
  /* Enhanced styling for tech tags */
  .tech-tag {
    display: inline-block;
    padding: 0.125rem 0.375rem;
    font-size: 0.65rem;
    font-weight: 500;
    border-radius: 0.25rem;
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(99, 102, 241, 0.3) 100%);
    color: rgb(199, 210, 254);
    border: 1px solid rgba(99, 102, 241, 0.3);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 0.125rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    animation: fadeIn 0.5s ease forwards;
    animation-delay: calc(0.1s * var(--index));
    opacity: 0;
  }
  
  .more-tag {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.4) 100%);
    border-color: rgba(139, 92, 246, 0.4);
    animation-delay: 0.5s;
  }
  
  .tech-tag::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: 0.5s;
  }
  
  .tech-tag:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.3) 0%, rgba(99, 102, 241, 0.4) 100%);
    border-color: rgba(99, 102, 241, 0.5);
  }
  
  .tech-tag:hover::before {
    left: 100%;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse-gentle {
    0%, 100% {
      opacity: 0.8;
    }
    50% {
      opacity: 1;
    }
  }
  
  .animate-pulse-gentle {
    animation: pulse-gentle 3s ease-in-out infinite;
  }
</style> 