<script>
    import { onMount } from 'svelte';
    import { fly, fade, scale } from 'svelte/transition';
    import { backOut } from 'svelte/easing';

    const { location } = $props();

    // Add contactVisible state
  let { contactVisible, contactObserverDisconnected } = $state({
    contactVisible: false,
    contactObserverDisconnected: false
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
          contactObserverDisconnected = true;
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
  
  // Form state
  let { formData, formSubmitted } = $state({
    formData: {
      name: "",
      email: "",
      message: ""
    },
    formSubmitted: false
  });
  
  // Add form validation and status states
  let { formErrors, isSubmitting, submitError, submitSuccess } = $state({
    formErrors: {
      name: "",
      email: "",
      message: ""
    },
    isSubmitting: false,
    submitError: "",
    submitSuccess: ""
  });
  
  // Handle form submission
  async function handleSubmit() {
    // Reset errors and status
    submitError = "";
    submitSuccess = "";
    formErrors = { name: "", email: "", message: "" };
    
    // Validate form
    let isValid = true;
    
    if (!formData.name.trim()) {
      formErrors.name = "Name is required";
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      formErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      formErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      formErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }
    
    if (!isValid) return;
    
    // Submit form
    isSubmitting = true;
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        submitSuccess = result.message;
        formSubmitted = true;
        
        // Reset form after 5 seconds
        setTimeout(() => {
          formSubmitted = false;
          submitSuccess = "";
          formData = {
            name: "",
            email: "",
            message: ""
          };
        }, 5000);
      } else {
        submitError = result.message || "Failed to send message. Please try again.";
      }
    } catch (error) {
      console.error("Form submission error:", error);
      submitError = "An unexpected error occurred. Please try again later.";
    } finally {
      isSubmitting = false;
    }
  }
  
  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
</script>

<!-- Contact Section -->
<section id="contact" class="py-20 relative overflow-visible"
  use:viewport={{
    once: true,
    threshold: 0.2,
    inView: () => {
      contactVisible = true;
      console.log('Contact section in view');
    }
  }}
> 
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 box-border">
    {#if contactVisible}
      <div class="max-w-3xl mx-auto text-center mb-16" transition:fly={{ y: 30, duration: 800, delay: 200 }}>
        <p class="text-sm font-medium text-indigo-300 mb-2 uppercase tracking-wider">Say Hello</p>
        <h2 class="text-3xl md:text-4xl font-bold mb-6"><span class="tech-section-highlight text-indigo-300">Get in Touch</span></h2>
        <p class="text-indigo-300 max-w-2xl mx-auto">
          Got something interesting? Hit me up. Not into spam or "quick calls to discuss opportunities."
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div class="space-y-8" transition:fly={{ x: -30, duration: 800, delay: 400 }}>
          <div class="section-overlay p-6 bg-indigo-900/20 backdrop-blur-sm rounded-xl border border-indigo-500/10" transition:scale={{ start: 0.95, duration: 500, delay: 600, easing: backOut }}>
            <h3 class="text-xl font-semibold mb-4 text-indigo-300">Location</h3>
            <p class="text-indigo-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </p>
          </div>
          
          <div class="section-overlay p-6 bg-indigo-900/20 backdrop-blur-sm rounded-xl border border-indigo-500/10" transition:scale={{ start: 0.95, duration: 500, delay: 800, easing: backOut }}>
            <h3 class="text-xl font-semibold mb-4 text-indigo-300">Connect</h3>
            <div class="space-y-4">
              <p class="text-indigo-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:dlo@dlovan.dev" class="hover:text-indigo-300 transition-colors">dlo@dlovan.dev</a>
              </p>
            </div>
            
            <div class="flex mt-8 space-x-5">
              <a href="https://www.linkedin.com/in/dlovan-sharif-11ab57270/" aria-label="LinkedIn" class="text-indigo-300/70 hover:text-indigo-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                </svg>
              </a>
              <a href="https://github.com/dlovans" aria-label="GitHub" class="text-indigo-300/70 hover:text-indigo-300 transition-colors">
                <!-- Updated GitHub icon with a more reliable implementation -->
                <svg class="h-6 w-6" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div class="section-overlay p-6 bg-indigo-900/20 backdrop-blur-sm rounded-xl border border-indigo-500/10" transition:scale={{ start: 0.95, duration: 500, delay: 1000, easing: backOut }}>
            <h3 class="text-xl font-semibold mb-4 text-indigo-300">Startup Ideas?</h3>
            <p class="text-indigo-300 mb-4">
              If you've got something worth building, I might be interested. No introductory calls, just solid ideas.
            </p>
            <div class="space-y-4">
              <p class="text-indigo-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <a href="https://www.axentra.agency" target="_blank" rel="noopener noreferrer" class="hover:text-indigo-300 transition-colors">www.axentra.agency</a>
              </p>
              <p class="text-indigo-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:dlovan@axentra.agency" class="hover:text-indigo-300 transition-colors">dlovan@axentra.agency</a>
              </p>
            </div>
          </div>
        </div>
        
        <div class="section-overlay p-8 min-h-[450px] flex items-center justify-center bg-indigo-900/20 backdrop-blur-sm rounded-xl border border-indigo-500/10" transition:fly={{ x: 30, duration: 800, delay: 400 }}>
          <div class="w-full">
            {#if formSubmitted}
              <div class="text-center py-10 absolute inset-0 flex flex-col items-center justify-center transition-all duration-500" 
                   in:scale={{ start: 0.9, duration: 500 }}
                   out:fade={{ duration: 300 }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-green-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="text-xl font-semibold mb-3 text-indigo-100">Message Sent!</h3>
                <p class="text-indigo-200/70">{submitSuccess || "Thank you for reaching out. I'll get back to you soon."}</p>
              </div>
            {/if}
            
            <form 
              onsubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              class="space-y-6 transition-opacity duration-500"
              style="opacity: {formSubmitted ? '0' : '1'}; pointer-events: {formSubmitted ? 'none' : 'auto'};"
              novalidate
            >
              {#if submitError}
                <div class="p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-200 text-sm mb-4">
                  <p class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    {submitError}
                  </p>
                </div>
              {/if}
              
              <div>
                <label for="name" class="block text-sm font-medium text-indigo-200 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  bind:value={formData.name} 
                  class="w-full px-4 py-3 bg-indigo-950/50 border {formErrors.name ? 'border-red-500/50' : 'border-indigo-800/30'} rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-indigo-100 placeholder-indigo-300/30"
                  placeholder="Your name"
                  disabled={isSubmitting}
                />
                {#if formErrors.name}
                  <p class="mt-1 text-sm text-red-400">{formErrors.name}</p>
                {/if}
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-indigo-200 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  bind:value={formData.email} 
                  class="w-full px-4 py-3 bg-indigo-950/50 border {formErrors.email ? 'border-red-500/50' : 'border-indigo-800/30'} rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-indigo-100 placeholder-indigo-300/30"
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
                {#if formErrors.email}
                  <p class="mt-1 text-sm text-red-400">{formErrors.email}</p>
                {/if}
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-indigo-200 mb-2">Message</label>
                <textarea 
                  id="message" 
                  bind:value={formData.message} 
                  rows="5" 
                  class="resize-none w-full px-4 py-3 bg-indigo-950/50 border {formErrors.message ? 'border-red-500/50' : 'border-indigo-800/30'} rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-indigo-100 placeholder-indigo-300/30"
                  placeholder="Your message here..."
                  disabled={isSubmitting}
                ></textarea>
                {#if formErrors.message}
                  <p class="mt-1 text-sm text-red-400">{formErrors.message}</p>
                {/if}
              </div>
              
              <button 
                type="submit"
                class="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0f172a] shadow-lg shadow-indigo-600/20 relative"
                disabled={isSubmitting}
              >
                {#if isSubmitting}
                  <span class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                {:else}
                  Send Message
                {/if}
              </button>
            </form>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>