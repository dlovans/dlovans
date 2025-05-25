<script>
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import ProjectCard from "$lib/components/ProjectCard.svelte";

    const { projects } = $props();
    
    // Project list state
    let { 
      projectsVisible,
      projectsObserverDisconnected
    } = $state({
      projectsVisible: false,
      projectsObserverDisconnected: false
    });
    
    // Create a viewport intersection action
    function viewport(node, options = {}) {
      const { once = false, threshold = 0, inView = () => {}, outView = () => {} } = options;
      
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            inView();
            if (once) {
              observer.disconnect();
              projectsObserverDisconnected = true;
            }
          } else {
            outView();
          }
        });
      }, { threshold });
      
      observer.observe(node);
      
      return {
        destroy() {
          if (!projectsObserverDisconnected) {
            observer.disconnect();
          }
        }
      };
    }
</script>

<style>
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }
  
  .project-wrapper {
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .project-wrapper:hover {
    transform: translateY(-8px);
  }
  
  /* Staggered animation delays */
  .stagger-delay-1 { animation-delay: 100ms; }
  .stagger-delay-2 { animation-delay: 200ms; }
  .stagger-delay-3 { animation-delay: 300ms; }
  .stagger-delay-4 { animation-delay: 400ms; }
  .stagger-delay-5 { animation-delay: 500ms; }
  .stagger-delay-6 { animation-delay: 600ms; }
  
  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }
</style>

<!-- Projects Section -->
<section id="projects" class="py-24 relative overflow-visible"
  use:viewport={{
    once: true,
    threshold: 0.3,
    inView: () => {
      projectsVisible = true;
    }
  }}
>
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 box-border">
    <!-- Section Header -->
    {#if projectsVisible}
      <div class="max-w-3xl mx-auto text-center tech-header mb-8" transition:fly={{ y: 30, duration: 800, delay: 200 }}>
        <p class="text-sm font-medium text-indigo-300 mb-2 uppercase tracking-wider">My Digital Children</p>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          <span class="tech-section-highlight text-indigo-300">Stuff I Built That Almost Works</span>
        </h2>
        <p class="text-gray-400 text-lg">
          60% of the time, they work every time. No refunds.
        </p>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid" transition:fly={{ y: 40, duration: 800, delay: 400 }}>
        {#each projects as project, i}
          <div 
            class="project-wrapper stagger-delay-{(i % 6) + 1}" 
            in:fade={{ duration: 600, delay: 200 + (i * 100) }}
            role="group"
            aria-label="Project card"
          >
            <ProjectCard
              title={project.title}
              shortDescription={project.shortDescription}
              longDescription={project.longDescription}
              technologies={project.technologies}
              githubUrl={project.githubUrl}
              productUrl={project.productUrl}
              image={project.image}
              isWip={project.isWip}
            />
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>