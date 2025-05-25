<script>
  // Using Svelte 5 reactive primitives for props
  let {
    title = "",
    shortDescription = "",
    longDescription = "",
    technologies = [],
    githubUrl = null,
    productUrl = null,
    image = "",
    isWip = false
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
    class="relative w-full h-[350px] transition-transform duration-700 transform-style-3d cursor-pointer {isFlipped ? 'rotate-y-180' : ''}"
    onclick={toggleFlip}
    onkeydown={(e) => e.key === 'Enter' && toggleFlip()}
    tabindex="0"
    role="button"
    aria-label="Toggle card view"
  >
    <!-- Front of Card -->
    <div class="absolute inset-0 backface-hidden rounded-xl shadow-lg shadow-indigo-500/20 border border-indigo-500/30 overflow-hidden backdrop-blur-md bg-gradient-to-b from-indigo-950/70 to-slate-950/80">
      <!-- Project Image with Enhanced Styling -->
      <div class="relative h-40 w-full overflow-hidden group">
        <img 
          src={image} 
          alt={title} 
          class="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:filter group-hover:brightness-110"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-700"></div>
        
        <!-- Title overlaid on image with improved styling -->
        <div class="absolute bottom-0 left-0 right-0 p-4">
          <h3 class="text-base font-bold text-white mb-1 drop-shadow-md transition-all duration-300 group-hover:text-indigo-200 group-hover:translate-x-1">{title}</h3>
          <div class="flip-hint text-xs text-indigo-300/80 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 1l4 4-4 4"></path>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <path d="M7 23l-4-4 4-4"></path>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
            <span>Click to flip</span>
          </div>
        </div>
      </div>
      
      <!-- Content -->
      <div class="p-4">
        <p class="text-slate-300 text-xs line-clamp-3 mb-3">{shortDescription}</p>
        
        <!-- Tech Stack with improved styling -->
        <div class="flex flex-wrap gap-1.5">
          {#each technologies as tech, i}
            <span class="tech-tag" style="--index: {i};">
              {tech}
            </span>
          {/each}
        </div>
        
        <!-- Flip Hint with improved styling -->
        <div class="absolute bottom-3 right-3 flex items-center text-slate-300 text-xs bg-indigo-900/50 px-2 py-1 rounded-full shadow-md backdrop-blur-md border border-indigo-500/30 transition-all duration-300 hover:bg-indigo-800/60 hover:border-indigo-400/40 hover:scale-105 hover:shadow-indigo-500/20 group-hover:translate-y-0 translate-y-8 opacity-0 group-hover:opacity-100">
          <span>Details</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        
        <!-- WIP indicator - only shown if isWip prop is true -->
        {#if isWip}
          <div class="absolute top-3 left-3 flex items-center text-amber-300 text-xs bg-amber-900/60 px-2 py-1 rounded-full shadow-md backdrop-blur-md border border-amber-500/40 animate-pulse-slow">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>WIP</span>
          </div>
        {/if}
      </div>
    </div>
    
    <!-- Back of Card -->
    <div class="absolute inset-0 backface-hidden rotate-y-180 rounded-xl shadow-xl overflow-hidden">
      <!-- Gradient background with improved styling -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 backdrop-blur-md"></div>
      
      <!-- Enhanced decorative elements -->
      <div class="absolute top-0 right-0 w-40 h-40 bg-indigo-600/20 rounded-full filter blur-xl transform translate-x-1/2 -translate-y-1/2 animate-blob-slow"></div>
      <div class="absolute bottom-0 left-0 w-32 h-32 bg-purple-600/20 rounded-full filter blur-xl transform -translate-x-1/2 translate-y-1/2 animate-blob-slow animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-600/15 rounded-full filter blur-xl animate-blob-slow animation-delay-4000"></div>
      
      <!-- Content -->
      <div class="relative h-full p-5 flex flex-col z-10">
        <h3 class="text-base font-bold text-white mb-2 border-b border-indigo-500/30 pb-2">{title}</h3>
        
        <!-- Detailed Description -->
        <div class="flex-1 overflow-y-auto custom-scrollbar mb-4 pr-1">
          <p class="text-slate-300 text-xs leading-relaxed">{longDescription}</p>
        </div>
        
        <!-- Project Links with improved styling -->
        <div class="mt-auto flex justify-center gap-3 pb-12">
          {#if githubUrl}
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800/80 text-white hover:bg-slate-700/90 transition-all border border-slate-700/50 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-900/20 hover:translate-y-[-2px]"
              onclick={(e) => e.stopPropagation()}
            >
              <!-- GitHub SVG -->
              <svg class="h-4 w-4 mr-1" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              GitHub
            </a>
          {/if}
          
          {#if productUrl}
            <a 
              href={productUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 hover:translate-y-[-2px]"
              onclick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit Site
            </a>
          {/if}
        </div>
        
        <!-- Flip back hint with improved styling -->
        <div class="absolute bottom-3 right-3 flex items-center text-indigo-300 text-xs bg-indigo-950/80 px-2 py-1 rounded-full border border-indigo-500/40 hover:bg-indigo-900/60 transition-all hover:scale-105 hover:border-indigo-400/50 hover:shadow-lg hover:shadow-indigo-900/20">
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
    max-width: 100%;
    margin: 0 auto;
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
  
  /* Responsive width adjustments */
  @media (min-width: 1024px) {
    .perspective {
      max-width: 90%;
    }
  }
  
  @media (min-width: 1280px) {
    .perspective {
      max-width: 85%;
    }
  }
  
  @media (min-width: 1536px) {
    .perspective {
      max-width: 80%;
    }
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
    background: rgba(79, 70, 229, 0.15);
    color: rgb(199, 210, 254);
    border: 1px solid rgba(99, 102, 241, 0.25);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 0.125rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    animation: fadeIn 0.5s ease forwards;
    animation-delay: calc(0.1s * var(--index));
    opacity: 0;
    backdrop-filter: blur(4px);
  }
  
  /* Removed unused .more-tag selector */
  
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 8px rgba(99, 102, 241, 0.3);
    background: rgba(79, 70, 229, 0.25);
    border-color: rgba(99, 102, 241, 0.5);
    color: rgb(224, 231, 255);
    text-shadow: 0 0 8px rgba(99, 102, 241, 0.5);
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
  
  @keyframes pulse-slow {
    0%, 100% {
      opacity: 0.7;
    }
    50% {
      opacity: 0.9;
    }
  }
  
  @keyframes blob-slow {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(20px, -10px) scale(1.1);
    }
    66% {
      transform: translate(-10px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  
  /* Removed unused .animate-pulse-gentle selector */
  
  .animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
  }
  
  .animate-blob-slow {
    animation: blob-slow 15s infinite ease-in-out;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
</style> 