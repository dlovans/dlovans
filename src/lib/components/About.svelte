<script>
    import { onMount } from 'svelte';
    import { fly, fade, scale } from 'svelte/transition';
    import { backOut } from 'svelte/easing';

    const { location } = $props();

      // Add aboutVisible state
  let { aboutVisible, aboutObserverDisconnected } = $state({
    aboutVisible: false,
    aboutObserverDisconnected: false
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
          aboutObserverDisconnected = true;
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
</script>

<!-- About Section -->
<section id="about" class="py-20 relative overflow-visible"
  use:viewport={{
    once: true,
    threshold: 0.25,
    inView: () => {
      aboutVisible = true;
      console.log('About section in view');
    }
  }}
>
  
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 box-border">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {#if aboutVisible}
        <div transition:fly={{ y: 30, duration: 800, delay: 200 }}>
          <h2 class="text-3xl md:text-4xl font-bold mb-8"><span class="tech-section-highlight text-indigo-300">About Me</span></h2>
          <p class="text-indigo-300 mb-6 leading-relaxed">
            Coding since 2022, which in tech years makes me either a baby or a genius, depending on whom you ask.
            I prefer "experienced enough to be dangerous" as my LinkedIn headline.
          </p>
          <p class="text-indigo-300 mb-6 leading-relaxed">
            Based in {location}, where I run a web agency between existential crises and debugging sessions. 
            I build MVPs faster than you can say "scope creep" and occasionally launch projects when the stars align.
          </p>
          <p class="text-indigo-300 mb-6 leading-relaxed">
            My AI assistant writes 90% of my code while I take all the credit. I've mastered the art of 
            crafting perfect prompts and convincing myself I fully understand what the generated code does.
          </p>
          
          <div class="mt-8 pt-6 border-t border-indigo-800/20">
            <h4 class="text-lg font-medium text-indigo-300 mb-3">Current Distractions</h4>
            <div class="flex flex-wrap gap-2">
              <div class="px-3 py-1.5 rounded-full bg-indigo-900/30 text-indigo-300 border border-indigo-500/20 text-sm"><span class="mr-2">🤖</span> Teaching AI to Do My Job</div>
              <div class="px-3 py-1.5 rounded-full bg-indigo-900/30 text-indigo-300 border border-indigo-500/20 text-sm"><span class="mr-2">⚡</span> Making Slow Sites Less Slow</div>
              <div class="px-3 py-1.5 rounded-full bg-indigo-900/30 text-indigo-300 border border-indigo-500/20 text-sm"><span class="mr-2">☁️</span> Moving Stuff to "The Cloud"</div>
              <div class="px-3 py-1.5 rounded-full bg-indigo-900/30 text-indigo-300 border border-indigo-500/20 text-sm"><span class="mr-2">💼</span> Pretending to Be an Entrepreneur</div>
            </div>
          </div>
          
          <div class="flex items-center mt-8">
            <div class="mr-4 h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <p class="text-indigo-300 italic">"If it works on my machine, that's good enough."</p>
          </div>
          
          <p class="text-xs text-indigo-300 mt-12 italic">
            BTW: HR is just corporate cops with worse outfits.
          </p>
        </div>
        
        <div class="section-overlay p-8 bg-indigo-900/20 backdrop-blur-sm rounded-xl border border-indigo-500/10" transition:fly={{ y: 40, duration: 800, delay: 400 }}>
          <h3 class="text-2xl font-semibold mb-8"><span class="tech-section-highlight text-indigo-300">My Universe of Skills</span></h3>
          
          <div class="space-y-8">
            <div class="skill-constellation bg-indigo-900/30 p-4 rounded-lg border border-indigo-500/10" transition:scale={{ start: 0.9, duration: 500, delay: 600, easing: backOut }}>
              <div class="flex justify-between items-center mb-3">
                <span class="text-indigo-300 font-medium">🧩 Problem Creating</span>
                <span class="text-xs text-indigo-300 bg-indigo-900/40 px-2 py-1 rounded-full">
                  Master Level
                </span>
              </div>
              <p class="text-indigo-300 text-sm">
                Making two new bugs while fixing one. It's called job security.
              </p>
            </div>
            
            <div class="skill-constellation bg-indigo-900/30 p-4 rounded-lg border border-indigo-500/10" transition:scale={{ start: 0.9, duration: 500, delay: 750, easing: backOut }}>
              <div class="flex justify-between items-center mb-3">
                <span class="text-indigo-300 font-medium">🔄 Adaptability</span>
                <span class="text-xs text-indigo-300 bg-indigo-900/40 px-2 py-1 rounded-full">
                  Expert Level
                </span>
              </div>
              <p class="text-indigo-300 text-sm">
                Seamlessly switching between "I know what I'm doing" and "What am I doing?" multiple times per hour.
              </p>
            </div>
            
            <div class="skill-constellation bg-indigo-900/30 p-4 rounded-lg border border-indigo-500/10" transition:scale={{ start: 0.9, duration: 500, delay: 900, easing: backOut }}>
              <div class="flex justify-between items-center mb-3">
                <span class="text-indigo-300 font-medium">🔭 Technical Vision</span>
                <span class="text-xs text-indigo-300 bg-indigo-900/40 px-2 py-1 rounded-full">
                  Guru Level
                </span>
              </div>
              <p class="text-indigo-300 text-sm">
                Predicting which part of my code will break next with surprising accuracy.
              </p>
            </div>
            
            <div class="skill-constellation bg-indigo-900/30 p-4 rounded-lg border border-indigo-500/10" transition:scale={{ start: 0.9, duration: 500, delay: 1050, easing: backOut }}>
              <div class="flex justify-between items-center mb-3">
                <span class="text-indigo-300 font-medium">💡 Prompt Engineering</span>
                <span class="text-xs text-indigo-300 bg-indigo-900/40 px-2 py-1 rounded-full">
                  Wizard Level
                </span>
              </div>
              <p class="text-indigo-300 text-sm">
                Expertly explaining to AI what I want, then claiming I wrote it myself.
              </p>
            </div>
            
            <div class="skill-constellation bg-indigo-900/30 p-4 rounded-lg border border-indigo-500/10" transition:scale={{ start: 0.9, duration: 500, delay: 1200, easing: backOut }}>
              <div class="flex justify-between items-center mb-3">
                <span class="text-indigo-300 font-medium">📢 Communication</span>
                <span class="text-xs text-indigo-300 bg-indigo-900/40 px-2 py-1 rounded-full">
                  Pro Level
                </span>
              </div>
              <p class="text-indigo-300 text-sm">
                Nodding confidently while thinking "I have no idea what they're talking about."
              </p>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>