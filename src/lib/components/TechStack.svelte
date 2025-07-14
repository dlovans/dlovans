<script>
    import { onMount } from 'svelte'
    import { fly, fade, scale } from 'svelte/transition';
    import { backOut } from 'svelte/easing';

    import TechCard from "$lib/components/TechCard.svelte";

    const { activeTools, graveyardTools } = $props();
    
      // Viewport visibility tracking
  let { techSectionVisible, techObserverDisconnected } = $state({
    techSectionVisible: false,
    techObserverDisconnected: false
  });

    // Create a viewport intersection action
    function viewport(node, options = {}) {
    const { once = false, root = null, rootMargin = '0px', threshold = 0.1 } = options;
    
    let observer;
    
    function handleIntersect(entries) {
      const entry = entries[0];
      const isIntersecting = entry.isIntersecting;
      
      if (isIntersecting) {
        options.inView(node);
        if (once) {
          observer.disconnect();
          techObserverDisconnected = true;
        }
      } else if (!once) {
        options.outView?.(node);
      }
    }
    
    onMount(() => {
      observer = new IntersectionObserver(handleIntersect, {
        root,
        rootMargin,
        threshold
      });
      
      observer.observe(node);
      
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    });
  }

    let { isGraveyardExpanded } = $state({
    isGraveyardExpanded: false
  });

    function toggleGraveyard() {
    isGraveyardExpanded = !isGraveyardExpanded;
  }
    
</script>

<style>
  /* Tech Stack Section Styles */

  .tech-header {
    position: relative;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
  }

  .tech-header::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 200px;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent);
  }

  .tech-section-highlight {
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    position: relative;
    display: inline-block;
  }

  .tech-section-highlight::before {
    content: '';
    position: absolute;
    left: -10%;
    top: -10%;
    right: -10%;
    bottom: -10%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    z-index: -1;
  }

  .tech-stack-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  /* Graveyard section styles */
  .graveyard-toggle {
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    border: 1px solid rgba(99, 102, 241, 0.1);
    background: rgba(30, 41, 59, 0.2);
    display: inline-flex;
    align-items: center;
    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4px);
  }

  .graveyard-toggle:hover {
    background: rgba(30, 41, 59, 0.4);
    border-color: rgba(99, 102, 241, 0.3);
    box-shadow: 0 8px 20px -8px rgba(99, 102, 241, 0.3);
  }

  .toggle-icon {
    transition: transform 0.3s ease;
  }

  .toggle-icon.expanded {
    transform: rotate(180deg);
  }

  .graveyard-container {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transform: translateY(20px); /* Changed from -20px to 20px to make it expand downwards */
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
  }

  .graveyard-container.expanded {
    max-height: none; /* Remove fixed height constraint */
    opacity: 1;
    transform: translateY(0);
    padding: 1rem 0.5rem;
    margin: 0 -0.5rem;
    width: calc(100% + 1rem);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Specific adjustments for graveyard grid */
  .graveyard-container .tech-stack-grid {
    gap: 1.75rem;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
</style>

<!-- Tech Stack Section -->
<section id="tech-stack" class="py-24 relative" 
  use:viewport={{
    once: true,
    threshold: 0.2,
    inView: () => {
      techSectionVisible = true;
      console.log('Tech section in view');
    }
  }}
>
  

  
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 box-border overflow-x-hidden">
    {#if techSectionVisible}
      <div class="max-w-3xl mx-auto text-center tech-header mb-12" transition:fly={{ y: 30, duration: 800, delay: 200 }}>
        <p class="text-sm font-medium text-indigo-400 mb-2 uppercase tracking-wider">My Digital Weapons</p>
        <h2 class="text-3xl md:text-4xl font-bold mb-4 animated-gradient-text">
          <span class="tech-section-highlight">Tech I Pretend to Understand</span>
        </h2>
        <p class="text-indigo-100/70 max-w-2xl mx-auto">
          Documentation? Who reads that? These are the tools I use to build systems that actually scale.
        </p>
      </div>
    
      <!-- Active Tools Section -->
      <div class="mb-20" transition:fly={{ y: 40, duration: 800, delay: 400 }}>
        <div class="flex items-center justify-center md:justify-start mb-10">
          <h3 class="text-2xl font-semibold tech-section-title inline-flex items-center">
            <span class="text-green-400 mr-2">●</span> 
            <span class="text-indigo-300">Current Obsessions</span>
          </h3>
        </div>
      
        <!-- Categories (Optional - you can add filtering functionality later) -->
        <!-- Removing this entire div with the category pills -->
      
        <div class="tech-stack-grid">
          {#each activeTools as tech, i}
            <div style="animation-delay: {i * 0.1}s" transition:scale={{ start: 0.9, duration: 500, delay: 500 + (i * 100), easing: backOut }}>
              <TechCard 
                name={tech.name}
                icon={tech.icon}
                description={tech.description}
                startYear={tech.startYear}
                endYear={tech.endYear}
                isActive={true}
                level={tech.level}
              />
            </div>
          {/each}
        </div>
      </div>
    
      <!-- Graveyard Tools Section - Improved Design -->
      <div class="flex flex-col items-center" transition:fly={{ y: 50, duration: 800, delay: 600 }}>
        <div 
          class="graveyard-toggle mb-8" 
          onclick={toggleGraveyard}
          onkeydown={(e) => e.key === 'Enter' && toggleGraveyard()}
          tabindex="0"
          role="button"
          aria-expanded={isGraveyardExpanded}
          aria-controls="graveyard-tools"
        >
          <div class="flex items-center">
            <span class="text-gray-500 mr-2">○</span> 
            <span class="text-gray-300 font-semibold">Tech Breakup Stories</span>
            <span class="ml-2 text-sm text-gray-400">(It's not you, it's me... actually, it's you)</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5 ml-3 text-gray-400 toggle-icon {isGraveyardExpanded ? 'expanded' : ''}" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div 
          id="graveyard-tools" 
          class="graveyard-container {isGraveyardExpanded ? 'expanded' : ''}"
          aria-hidden={!isGraveyardExpanded}
        >
          <div class="tech-stack-grid mt-8 px-2">
            {#each graveyardTools as tech, i}
              <div style="animation-delay: {i * 0.1}s" transition:scale={{ start: 0.9, duration: 500, delay: 500 + (i * 100), easing: backOut }}>
                <TechCard 
                  name={tech.name}
                  icon={tech.icon}
                  description={tech.description}
                  startYear={tech.startYear}
                  endYear={tech.endYear}
                  isActive={false}
                  level={tech.level}
                />
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>