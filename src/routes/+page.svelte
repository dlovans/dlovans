<script>
  // Reactive state using Svelte 5 syntax
  let { name, title, location } = $state({
    name: "Dlovan",
    title: "Web Developer",
    location: "Stockholm, Sweden"
  });
  
  // Import the TechCard component
  import TechCard from '../components/TechCard.svelte';
  import ProjectCard from '../components/ProjectCard.svelte';
  
  // Import Svelte transitions and utilities
  import { onMount } from 'svelte';
  import { fly, fade, scale } from 'svelte/transition';
  import { backOut } from 'svelte/easing';
  
  // Viewport visibility tracking
  let { techSectionVisible, techObserverDisconnected } = $state({
    techSectionVisible: false,
    techObserverDisconnected: false
  });
  
  // Add projectsVisible state
  let { projectsVisible, projectsObserverDisconnected } = $state({
    projectsVisible: false,
    projectsObserverDisconnected: false
  });
  
  // Add aboutVisible state
  let { aboutVisible, aboutObserverDisconnected } = $state({
    aboutVisible: false,
    aboutObserverDisconnected: false
  });
  
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
  
  // Tech stack data with added startYear
  const activeTools = [
    {
      name: "JavaScript",
      icon: "devicon-javascript-plain",
      description: "My bread & butter. Does the job and doesn't complain much.",
      startYear: 2021,
      level: "advanced"
    },
    {
      name: "Firebase",
      icon: "devicon-firebase-plain",
      description: "Backend without the headache. Let Google handle the boring stuff.",
      startYear: 2024,
      level: "intermediate"
    },
    {
      name: "Tailwind CSS",
      icon: "devicon-tailwindcss-plain",
      description: "CSS that actually makes sense. No more spaghetti stylesheets.",
      startYear: 2024,
      level: "intermediate"
    },
    {
      name: "Svelte/SvelteKit",
      icon: "devicon-svelte-plain",
      description: "The framework other frameworks wish they were. Simple, fast, no drama.",
      startYear: 2024,
      level: "advanced"
    },
    {
      name: "Node.js",
      icon: "devicon-nodejs-plain-wordmark colored",
      description: "It's just JavaScript on the server. Nothing magical, just useful.",
      startYear: 2021,
      level: "intermediate"
    },
    {
      name: "Python",
      icon: "devicon-python-plain",
      description: "For when I need to process data without writing an essay of code.",
      startYear: 2023,
      level: "intermediate"
    },
    {
      name: "Go",
      icon: "devicon-go-original-wordmark colored",
      description: "Fast as lightning, but so is my JavaScript when I write it right.",
      startYear: 2025,
      level: "beginner"
    }
  ];
  
  const graveyardTools = [
    {
      name: "React",
      icon: "devicon-react-original",
      description: "Too much ceremony for simple tasks. Left it behind for Svelte's simplicity.",
      startYear: 2023,
      endYear: 2023,
      level: "beginner"
    },
    {
      name: "Next.js",
      icon: "devicon-nextjs-original-wordmark colored",
      description: "Tried it. Cool, but not worth the complexity tax for what I build.",
      startYear: 2023,
      endYear: 2023,
      level: "beginner"
    },
    {
      name: "TypeScript",
      icon: "devicon-typescript-plain",
      description: "I get it, but vanilla JS works fine for me. TS is training wheels I don't need.",
      startYear: 2024,
      endYear: 2024,
      level: "beginner"
    },
    {
      name: "Java",
      icon: "devicon-java-plain",
      description: "Life's too short for verbose syntax and enterprise complexity.",
      startYear: 2024,
      endYear: 2024,
      level: "beginner"
    },
    {
      name: "Kotlin/Jetpack Compose",
      icon: "devicon-kotlin-plain",
      description: "Decent for Android, but decided to stick with web. More reach, less hassle.",
      startYear: 2024,
      endYear: 2024,
      level: "beginner"
    },
    {
      name: "Swift/SwiftUI",
      icon: "devicon-swift-plain",
      description: "Good for Apple stuff. Apple takes 30%. I prefer taking 100%.",
      startYear: 2024,
      endYear: 2024,
      level: "intermediate"
    },
    {
      name: "Express",
      icon: "devicon-express-original",
      description: "Used it, but outgrew it. Nothing wrong with it, just moved on.",
      startYear: 2022,
      endYear: 2024,
      level: "intermediate"
    },
    {
      name: "Web Components",
      icon: "fas fa-screwdriver-wrench",
      description: "Nice idea in theory. Pain in practice. Frameworks exist for a reason.",
      startYear: 2023,
      endYear: 2023,
      level: "intermediate"
    },
    {
      name: "MongoDB/Mongoose",
      icon: "devicon-mongodb-plain",
      description: "Documents are neat until they're not. Moved to more structured data.",
      startYear: 2022,
      endYear: 2024,
      level: "intermediate"
    },
    {
      name: "PostgreSQL",
      icon: "devicon-postgresql-plain",
      description: "Solid database, but Firebase handles my current needs without the setup.",
      startYear: 2024,
      endYear: 2024,
      level: "beginner"
    }
  ];
  
  // Projects data
  const projects = [
    {
      title: "Alentra",
      shortDescription: "AI job matching that doesn't suck. No more keyword stuffing resumes.",
      longDescription: "Alentra uses AI to match people with jobs based on what actually matters, not keyword density. Built it because most job platforms are stuck in 2005, using the same broken matching algorithms that waste everyone's time. Recruiters might want to update their LinkedIn profiles... just kidding, we're making their jobs easier. Maybe.",
      technologies: ["Svelte", "Node.js", "Firebase", "Tailwind CSS"],
      productUrl: "https://www.alentra.app",
      image: "/alentra.png",
      isWip: true
    },
    {
      title: "Trendifi",
      shortDescription: "AI-powered deep insight generator API with customizable data structure.",
      longDescription: "Trendifi uses AI to generate deep insights from fresh data sources. Planned platform too. Coming soon.",
      technologies: ["Svelte", "Node.js", "Firebase", "Tailwind CSS"],
      image: "/trendifi.png",
      productUrl: "https://www.trendifi.app/",
      isWip: true
    },
    {
      title: "Vevra",
      shortDescription: "Community platform that actually gets people to do stuff instead of just talking.",
      longDescription: "Vevra turns passive community members into people who take action. No more endless discussions without results. The platform tracks activities, provides live chat, and organizes projects hierarchically so communities can actually achieve goals instead of just talking about them.",
      technologies: ["SvelteKit", "Node.js", "Firebase", "TailwindCSS"],
      image: "/vevra.png",
      productUrl: "https://www.vevra.app/",
      isWip: true
    },
    {
      title: "ThinkStep",
      shortDescription: "AI agents without the headaches. Because even robots deserve a simpler life.",
      longDescription: "ThinkStep is what happens when you're tired of wiring up AI agents the hard way. I built this because apparently 'simple' and 'AI infrastructure' don't belong in the same sentence elsewhere. It's an Agent-as-Layer API that handles all the boring stuff so you can focus on making your AI actually do something useful. Built on OpenAI's API because reinventing that wheel would be masochistic. Production ready. Actively seeking external funding.",
      technologies: ["Svelte", "Node.js", "Firebase", "Tailwind CSS", "Go"],
      image: "/thinkstep.png",
      productUrl: "thinkstep-proxy-production.up.railway.app",
      isWip: false
    },
    {
      title: "Believers United",
      shortDescription: "Believers United is a community platform designed for Quran-only believers, fostering meaningful connections and discussions in a space built on shared faith and values.",
      longDescription: "Believers United is a community-building platform created for Quran-only believers to connect, share, and grow together in their faith. With a focus on authentic discussion and support, the platform offers a space for members to engage with one another, participate in activities, and collaborate on projects that align with their values. Designed with simplicity and clarity, Believers United encourages learning and unity, all while maintaining a space free from sectarian influence.",
      technologies: ["Svelte", "Node.js", "Firebase", "Tailwind CSS", "Resend API"],
      githubUrl: "",
      productUrl: "https://bu-production-762f.up.railway.app/",
      image: "/bu.png",
      isWip: false
    },
    {
      title: "Axentra",
      shortDescription: "My web agency. We build MVPs fast without the typical agency nonsense.",
      longDescription: "Axentra is my agency for Swedish startups that need MVPs without the fluff. No lengthy discovery phases or endless meetings. We figure out what needs to be built and build it. Simple as that.",
      technologies: ["Svelte", "Node.js", "Firebase", "Tailwind CSS"],
      githubUrl: "https://github.com/dlovans/axentra",
      productUrl: "https://www.axentra.agency",
      image: "/axentra.png"
    },
    {
      title: "TerraTide",
      shortDescription: "iOS app for meetups that aren't lame. Spontaneous gatherings, zero commitment.",
      longDescription: "TerraTide makes it easy to find people to hang out with right now. No planning weeks in advance or dealing with flaky people. Just open the app, see what's happening nearby, and show up if you want.",
      technologies: ["Swift", "SwiftUI", "Firebase", "CoreLocation"],
      githubUrl: "https://github.com/dlovans/terratide",
      image: "/terratide.png"
    },
    {
      title: "Salsabeel",
      shortDescription: "Salsabeel is a faith-driven app that helps you study Quranic verses with clarity and context, offering a clean, intuitive interface.",
      longDescription: "Salsabeel is a religious app designed to help you study Quranic verses in a meaningful way. Unlike many outdated or cluttered religious apps, it offers a clean, straightforward interface focused on providing context and clarity. By organizing verses by topic, Salsabeel allows for a deeper and more accessible exploration of the Quran, making it easier to understand and reflect on its teachings.",
      technologies: ["Svelte", "Node.js", "Firebase", "Tailwind CSS", "Python"],
      githubUrl: "https://github.com/dlovans/sirius",
      image: "/salsabeel.png"
    },
    {
      title: "Aquity",
      shortDescription: "Stock analysis tool using LLMs. On pause because the market's a mess anyway.",
      longDescription: "Aquity was supposed to use AI to analyze stocks for long-term investment. Paused indefinitely because, let's face it, the stock market has its own problems. Might come back to it when I feel like gambling my time again.",
      technologies: ["EJS", "JavaScript", "Node.js", "Express", "MongoDB", "Mongoose", "CSS"],
      githubUrl: "https://github.com/dlovans/quant",
      image: "/aquity.png"
    }
  ];
  
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
  
  // Keep only the relevant UI state management
  let { isGraveyardExpanded } = $state({
    isGraveyardExpanded: false
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
  
  function toggleGraveyard() {
    isGraveyardExpanded = !isGraveyardExpanded;
  }
  
  // No longer needed - removed carousel navigation functions
</script>

<svelte:head>
  <title>{name} | {title}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <!-- Enhanced SEO Meta Tags -->
  <meta name="description" content="Portfolio of {name}, an AI-augmented web developer based in {location} specializing in full-stack development, AI integration, and startup ventures.">
  <meta name="keywords" content="web developer, AI integration, full-stack development, startup ventures, {location}, portfolio, JavaScript, Svelte, Firebase, Node.js">
  <meta name="author" content="{name}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://dlovan.dev/">
  <meta property="og:title" content="{name} | {title}">
  <meta property="og:description" content="Portfolio of {name}, an AI-augmented web developer based in {location} specializing in full-stack development, AI integration, and startup ventures.">
  <meta property="og:image" content="/og-image.svg">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://dlovan.dev/">
  <meta property="twitter:title" content="{name} | {title}">
  <meta property="twitter:description" content="Portfolio of {name}, an AI-augmented web developer based in {location} specializing in full-stack development, AI integration, and startup ventures.">
  <meta property="twitter:image" content="/og-image.svg">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://dlovan.dev/">
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="alternate icon" type="image/png" href="/favicon.png">
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    :root {
      --gradient-primary: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      --main-bg-color: #0f172a;
      --section-overlay-color: rgba(30, 41, 59, 0.3);
    }
    
    body {
      font-family: 'Inter', sans-serif;
      scroll-behavior: smooth;
      background-color: var(--main-bg-color);
      color: #f8fafc;
      overflow-x: hidden;
      width: 100%;
      max-width: 100vw;
      position: relative;
    }
    
    /* New animations for tech section */
    .animate-slow-spin {
      animation: slowSpin 20s linear infinite;
    }
    
    .tech-floating-el {
      animation: floatElement 8s ease-in-out infinite;
    }
    
    @keyframes slowSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes floatElement {
      0% { transform: translateY(0) translateX(0); }
      25% { transform: translateY(-15px) translateX(5px); }
      50% { transform: translateY(0) translateX(10px); }
      75% { transform: translateY(15px) translateX(5px); }
      100% { transform: translateY(0) translateX(0); }
    }
    
    .section-divider {
      height: 1px;
      width: 100%;
      background: linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.2) 50%, transparent 100%);
      margin: 0 auto;
      max-width: 80%;
    }
    
    .section-container {
      position: relative;
      z-index: 1;
      width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
    }
    
    .section-overlay {
      background: var(--section-overlay-color);
      backdrop-filter: blur(8px);
      border-radius: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.3);
    }
    
    .diagonal-gradient {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
      transform: skewY(-6deg);
      transform-origin: top left;
      opacity: 0.5;
      z-index: 0;
    }
    
    .tech-card {
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      background: rgba(30, 41, 59, 0.5);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      position: relative;
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .tech-card:hover {
      transform: translateY(-8px) scale(1.03);
      box-shadow: 0 20px 30px -15px rgba(99, 102, 241, 0.5);
      border-color: rgba(99, 102, 241, 0.5);
      z-index: 2;
    }
    
    .tech-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        135deg,
        transparent 0%,
        rgba(99, 102, 241, 0.15) 50%,
        transparent 100%
      );
      transform: rotate(45deg);
      transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      opacity: 0;
      z-index: -1;
    }
    
    .tech-card:hover::before {
      animation: shine 1.5s ease-out;
      opacity: 1;
    }
    
    .tech-icon-wrapper {
      position: relative;
      margin-bottom: 1rem;
      transition: all 0.3s ease;
    }
    
    .tech-icon {
      position: relative;
      z-index: 2;
      transition: all 0.3s ease;
    }
    
    .tech-card:hover .tech-icon {
      transform: scale(1.15);
      color: white;
    }
    
    .tech-icon-bg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%);
      opacity: 0;
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      filter: blur(5px);
    }
    
    .tech-card:hover .tech-icon-bg {
      opacity: 0.5;
      animation: morphBlob 5s linear infinite;
    }
    
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
    
    .tech-card-title {
      font-weight: 600;
      transition: all 0.3s ease;
      margin-bottom: 0.5rem;
      display: inline-block;
      position: relative;
    }
    
    .tech-card-title::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 0;
      height: 2px;
      background: linear-gradient(to right, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8));
      transition: width 0.3s ease;
    }
    
    .tech-card:hover .tech-card-title::after {
      width: 100%;
    }
    
    .tech-card-desc {
      font-size: 0.8rem;
      line-height: 1.4;
      color: rgba(226, 232, 240, 0.6);
      transition: all 0.3s ease;
    }
    
    .tech-card:hover .tech-card-desc {
      color: rgba(226, 232, 240, 0.9);
    }
    
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
    
    .tech-tag {
      position: absolute;
      top: -8px;
      right: -8px;
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      opacity: 0;
      transform: scale(0.8) translateY(10px);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      z-index: 10;
    }
    
    .tech-card:hover .tech-tag {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    
    .category-pill {
      display: inline-block;
      padding: 0.35rem 0.8rem;
      border-radius: 9999px;
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.2);
      color: rgba(99, 102, 241, 0.8);
      font-size: 0.8rem;
      font-weight: 500;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .category-pill:hover, .category-pill.active {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(168, 85, 247, 0.9) 100%);
      border-color: transparent;
      color: white;
      box-shadow: 0 5px 15px -5px rgba(99, 102, 241, 0.5);
    }
    
    .tool-experience {
      display: block;
      font-size: 0.7rem;
      margin-top: 0.25rem;
      color: rgba(226, 232, 240, 0.4);
      transition: all 0.3s ease;
    }
    
    .tech-card:hover .tool-experience {
      color: rgba(226, 232, 240, 0.7);
    }
    
    .tech-stack-grid {
      display: grid;
      gap: 1.5rem;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    }
    
    /* Specific adjustments for graveyard grid */
    .graveyard-container .tech-stack-grid {
      gap: 1.75rem;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
    
    .tech-section-highlight {
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
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
    
    .tech-graveyard-card {
      filter: grayscale(85%);
      opacity: 0.75;
      transition: all 0.4s ease;
    }
    
    .tech-graveyard-card:hover {
      filter: grayscale(0%);
      opacity: 1;
    }
    
    .floating-element {
      animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
    
    .hero-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: repeat(12, 1fr);
      height: 100%;
      width: 100%;
      position: absolute;
      opacity: 0.3;
      z-index: 0;
      transform: rotateX(45deg) rotateZ(45deg);
      transform-origin: center;
      perspective: 1000px;
    }

    .grid-line-x {
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2), transparent);
    }

    .grid-line-y {
      position: absolute;
      top: 0;
      height: 100%;
      width: 1px;
      background: linear-gradient(180deg, transparent, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2), transparent);
    }
    
    .typewriter {
      border-right: 3px solid rgba(99, 102, 241, 0.75);
      animation: blink 0.75s step-end infinite;
      white-space: nowrap;
      overflow: hidden;
    }

    @keyframes blink {
      from, to { border-color: transparent }
      50% { border-color: rgba(99, 102, 241, 0.75); }
    }
    
    .typewriter-effect span {
      display: inline-block;
      overflow: hidden;
      animation: typist 0.5s steps(40, end);
      white-space: nowrap;
      border-right: 3px solid transparent;
    }
    
    @keyframes typist {
      from { width: 0 }
      to { width: 100% }
    }
    
    .breathe {
      animation: breathe 8s ease-in-out infinite;
    }
    
    @keyframes breathe {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    .pop-in {
      animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      opacity: 0;
      transform: scale(0.6);
    }
    
    @keyframes popIn {
      0% { opacity: 0; transform: scale(0.6); }
      100% { opacity: 1; transform: scale(1); }
    }
    
    .slide-up {
      animation: slideUp 0.8s ease forwards;
      opacity: 0;
      transform: translateY(20px);
    }
    
    @keyframes slideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    .badge {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: 9999px;
      padding: 0.5rem 1rem;
      display: inline-flex;
      align-items: center;
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.9);
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      transition: all 0.3s ease;
    }
    
    .badge:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -10px rgba(99, 102, 241, 0.5);
      border-color: rgba(99, 102, 241, 0.6);
    }
    
    .hero-decoration {
      position: absolute;
      transition: all 0.8s ease;
    }
    
    .orbit {
      animation: orbit 20s linear infinite;
    }
    
    @keyframes orbit {
      0% { transform: rotate(0deg) translateX(150px) rotate(0deg); }
      100% { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
    }
    
    .hero-decoration-1 {
      width: 30px;
      height: 30px;
      border-radius: 5px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.6) 0%, rgba(168, 85, 247, 0.6) 100%);
      top: 20%;
      right: 15%;
      animation: float 6s ease-in-out infinite, pulse 5s ease-in-out infinite alternate;
    }
    
    .hero-decoration-2 {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.6) 0%, rgba(16, 185, 129, 0.6) 100%);
      bottom: 25%;
      left: 10%;
      animation: float 8s ease-in-out infinite, pulse 7s ease-in-out infinite alternate;
      animation-delay: 1s;
    }
    
    .hero-decoration-3 {
      width: 70px;
      height: 70px;
      border-radius: 20px;
      border: 2px solid rgba(99, 102, 241, 0.3);
      bottom: 15%;
      right: 10%;
      animation: rotate 12s linear infinite, float 10s ease-in-out infinite;
      animation-delay: 2s;
    }
    
    .hero-decoration-4 {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      background: linear-gradient(135deg, rgba(236, 72, 153, 0.6) 0%, rgba(225, 29, 72, 0.6) 100%);
      top: 30%;
      left: 15%;
      animation: float 7s ease-in-out infinite, pulse 6s ease-in-out infinite alternate;
      animation-delay: 3s;
    }
    
    @keyframes rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
      0% { opacity: 0.5; }
      100% { opacity: 1; }
    }
    
    .radial-gradient {
      background: radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.05) 40%, transparent 70%);
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
      transform: translateY(-20px);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      width: 100%;
    }
    
    .graveyard-container.expanded {
      max-height: 3000px; /* Much larger value to accommodate all cards */
      opacity: 1;
      transform: translateY(0);
      padding: 1rem 0.5rem;
      margin: 0 -0.5rem;
      width: calc(100% + 1rem);
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Project navigation */
    .project-nav-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      background: rgba(99, 102, 241, 0.2);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .project-nav-button:hover {
      background: rgba(99, 102, 241, 0.4);
    }
    
    .project-nav-button.prev {
      left: 1rem;
    }
    
    .project-nav-button.next {
      right: 1rem;
    }
    
    /* Click handler style */
    .card-click-handler {
      position: absolute;
      inset: 0;
      z-index: 10;
      cursor: pointer;
    }
  </style>
</svelte:head>

<!-- Hero Section -->
<section class="min-h-screen w-full overflow-x-hidden relative py-8 flex flex-col justify-center items-center">
  <div class="absolute inset-0 bg-[var(--main-bg-color)] z-0"></div>
  
  <!-- Grid background -->
  <div class="hero-grid">
    {#each Array(13) as _, i}
      <div class="grid-line-x" style="top: {(100 / 12) * i}%"></div>
    {/each}
    {#each Array(13) as _, i}
      <div class="grid-line-y" style="left: {(100 / 12) * i}%"></div>
    {/each}
  </div>
  
  <!-- Animated background elements -->
  <div class="absolute inset-0 overflow-hidden z-0">
    <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/10 rounded-full filter blur-3xl floating-element"></div>
    <div class="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl floating-element" style="animation-delay: 2s;"></div>
    <div class="absolute top-2/3 left-1/2 w-48 h-48 bg-blue-600/10 rounded-full filter blur-3xl floating-element" style="animation-delay: 4s;"></div>
  </div>
  
  <!-- Decorative elements -->
  <div class="hero-decoration hero-decoration-1"></div>
  <div class="hero-decoration hero-decoration-2"></div>
  <div class="hero-decoration hero-decoration-3"></div>
  <div class="hero-decoration hero-decoration-4"></div>
  
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 box-border overflow-x-hidden">
    <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
      <div class="max-w-2xl text-center lg:text-left">
        <div class="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/30">
          <p class="text-sm text-indigo-300 pop-in" style="animation-delay: 0.2s">
            <span class="mr-2">👋</span>I build stuff
          </p>
        </div>
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animated-gradient-text pop-in" style="animation-delay: 0.4s">
          {name}
        </h1>
        <div class="typewriter-effect mb-4">
          <p class="text-xl md:text-2xl text-indigo-200 pop-in" style="animation-delay: 0.6s">{title}</p>
        </div>
        <p class="text-lg text-indigo-100/80 max-w-xl mx-auto lg:mx-0 mb-6 slide-up" style="animation-delay: 0.8s">
          I turn ideas into code and occasionally convince computers to do what I want. 
          When I'm not fighting with CSS, I'm explaining to clients why their "small change" will take a week.
        </p>
        
        <div class="mb-8 slide-up" style="animation-delay: 1s">
          <a href="#projects" class="badge"><span class="mr-2">🚀</span> Keyboard Smashing</a>
          <a href="#contact" class="badge"><span class="mr-2">🤖</span> AI Prompt Engineering</a>
          <a href="#about" class="badge"><span class="mr-2">⚡</span> Error Message Reading</a>
          <a href="#about" class="badge"><span class="mr-2">💼</span> Professional Excuse-Making</a>
        </div>
        
        <div class="flex flex-wrap justify-center lg:justify-start gap-6 slide-up" style="animation-delay: 1.2s">
          <a href="#projects" class="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0f172a] shadow-lg shadow-indigo-600/20 glowing-btn">
            <span class="flex items-center">
              <span>See My Bugs</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </span>
          </a>
          <a href="#contact" class="px-8 py-4 bg-transparent text-white rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0f172a] border border-indigo-500/50 hover:border-indigo-400 hover:bg-indigo-950/50 glowing-btn">
            <span class="flex items-center">
              <span>Connect</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </span>
          </a>
        </div>
      </div>
      
      <div class="relative w-full max-w-md aspect-square pop-in" style="animation-delay: 1.4s">
        <div class="absolute inset-0 radial-gradient"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-80 h-80 relative">
            <!-- 3D Floating code editor mockup (simplified) -->
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-900/90 to-purple-900/90 rounded-xl shadow-2xl border border-indigo-500/20 backdrop-blur-sm transform rotate-6 breathe">
              <div class="h-6 bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-t-xl flex items-center px-3">
                <div class="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div class="p-4 text-left">
                <!-- Simplified code representation -->
                <div class="h-4 w-full bg-indigo-500/20 rounded mb-2"></div>
                <div class="h-4 w-3/4 bg-purple-500/20 rounded mb-2"></div>
                <div class="h-4 w-5/6 bg-indigo-500/20 rounded mb-2"></div>
                <div class="h-4 w-2/3 bg-blue-500/20 rounded mb-2"></div>
                <div class="h-4 w-full bg-indigo-500/20 rounded mb-2"></div>
                <div class="h-4 w-4/5 bg-purple-500/20 rounded mb-2"></div>
                <div class="h-4 w-3/4 bg-indigo-500/20 rounded mb-2"></div>
                <div class="h-4 w-full bg-blue-500/20 rounded"></div>
              </div>
            </div>
            
            <!-- Orbit elements -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-4 h-4 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50 orbit"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 lg:mt-24 mb-6 relative z-10 slide-up" style="animation-delay: 1.6s">
      <div class="bg-indigo-900/20 backdrop-blur-sm rounded-xl p-4 border border-indigo-500/10 text-center">
        <div class="text-3xl font-bold text-white mb-1">{new Date().getFullYear() - 2022}+</div>
        <div class="text-indigo-200/70 text-sm">Years of Pretending</div>
      </div>
      <div class="bg-indigo-900/20 backdrop-blur-sm rounded-xl p-4 border border-indigo-500/10 text-center">
        <div class="text-3xl font-bold text-white mb-1">{projects.length}+</div>
        <div class="text-indigo-200/70 text-sm">Semi-Working Projects</div>
      </div>
      <div class="bg-indigo-900/20 backdrop-blur-sm rounded-xl p-4 border border-indigo-500/10 text-center">
        <div class="text-3xl font-bold text-white mb-1">{activeTools.length + graveyardTools.length}+</div>
        <div class="text-indigo-200/70 text-sm">Tools I've Prompt-Engineered</div>
      </div>
    </div>
  </div>
  
  <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--main-bg-color)] to-transparent z-10"></div>
</section>

<div class="section-divider"></div>

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
  <!-- Enhanced background elements -->
  <div class="absolute inset-0 overflow-hidden max-w-full">
    <div class="absolute w-full h-full opacity-10">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600/30 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl"></div>
      
      <!-- Add more subtle background elements -->
      <div class="absolute top-1/3 right-1/4 w-48 h-48 bg-blue-600/20 rounded-full filter blur-2xl"></div>
      <div class="absolute bottom-1/4 left-1/3 w-56 h-56 bg-pink-600/20 rounded-full filter blur-2xl"></div>
    </div>
  </div>
  
  <!-- Add animated background decorations -->
  {#if techSectionVisible}
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Code symbols floating around -->
      <div transition:fade={{ duration: 800 }} class="absolute top-20 right-[20%] animate-float" style="animation-delay: 0.5s;">
        <div class="text-indigo-600/10 text-6xl font-mono">{`{}`}</div>
      </div>
      <div transition:fade={{ duration: 800 }} class="absolute bottom-40 left-[15%] animate-float" style="animation-delay: 1.2s;">
        <div class="text-purple-600/10 text-5xl font-mono">{"</>"}</div>
      </div>
      <div transition:fade={{ duration: 800 }} class="absolute top-1/3 left-[10%] animate-float" style="animation-delay: 0.8s;">
        <div class="text-blue-600/10 text-7xl font-mono">{"()"}</div>
      </div>
      
      <!-- Floating circles with tech-related content -->
      <div transition:fly={{ y: 50, duration: 1000, easing: backOut }} class="absolute top-[15%] right-[10%] tech-floating-el">
        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center transform rotate-12 animate-slow-spin">
          <span class="text-indigo-300/20 text-xl">#</span>
        </div>
      </div>
      <div transition:fly={{ y: -50, duration: 1200, easing: backOut }} class="absolute bottom-[20%] right-[30%] tech-floating-el" style="animation-delay: 0.4s;">
        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center animate-slow-spin">
          <span class="text-blue-300/20 text-lg">λ</span>
        </div>
      </div>
      <div transition:fly={{ x: -50, duration: 1400, easing: backOut }} class="absolute top-[40%] left-[5%] tech-floating-el" style="animation-delay: 0.8s;">
        <div class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center transform -rotate-12 animate-slow-spin">
          <span class="text-purple-300/20 text-2xl">$</span>
        </div>
      </div>
    </div>
  {/if}
  
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 box-border overflow-x-hidden">
    {#if techSectionVisible}
      <div class="max-w-3xl mx-auto text-center tech-header mb-12" transition:fly={{ y: 30, duration: 800, delay: 200 }}>
        <p class="text-sm font-medium text-indigo-400 mb-2 uppercase tracking-wider">My Digital Weapons</p>
        <h2 class="text-3xl md:text-4xl font-bold mb-4 animated-gradient-text">
          <span class="tech-section-highlight">Tech I Pretend to Understand</span>
        </h2>
        <p class="text-indigo-100/70 max-w-2xl mx-auto">
          Documentation? Who reads that? These are the tools I use after asking AI to explain them to me.
        </p>
      </div>
    
      <!-- Active Tools Section -->
      <div class="mb-20" transition:fly={{ y: 40, duration: 800, delay: 400 }}>
        <div class="flex items-center justify-center md:justify-start mb-10">
          <h3 class="text-2xl font-semibold tech-section-title inline-flex items-center">
            <span class="text-green-400 mr-2">●</span> 
            <span class="animated-gradient-text">Current Obsessions</span>
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
      <div class="mb-12 flex flex-col items-center" transition:fly={{ y: 50, duration: 800, delay: 600 }}>
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

<div class="section-divider"></div>

<!-- Projects Section -->
<section id="projects" class="py-24 relative"
  use:viewport={{
    once: true,
    threshold: 0.3,
    inView: () => {
      projectsVisible = true;
      console.log('Projects section in view');
    }
  }}
>
  <!-- Enhanced background elements to match tech section -->
  <div class="absolute inset-0 overflow-hidden max-w-full">
    <div class="absolute w-full h-full opacity-10">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600/30 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl"></div>
      <div class="absolute top-1/3 right-1/4 w-48 h-48 bg-blue-600/20 rounded-full filter blur-2xl"></div>
      <div class="absolute bottom-1/4 left-1/3 w-56 h-56 bg-pink-600/20 rounded-full filter blur-2xl"></div>
    </div>
  </div>
  
  <!-- Add animated background decorations -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <!-- Code symbols floating around -->
    <div class="absolute top-40 right-[15%] tech-floating-el" style="animation-delay: 0.5s;">
      <div class="text-indigo-600/10 text-6xl font-mono">{"</>"}</div>
    </div>
    <div class="absolute bottom-60 left-[10%] tech-floating-el" style="animation-delay: 1.2s;">
      <div class="text-purple-600/10 text-5xl font-mono">{"{ }"}</div>
    </div>
    
    <!-- Floating circles with project-related content -->
    <div class="absolute top-[25%] right-[5%] tech-floating-el">
      <div class="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center transform rotate-12 animate-slow-spin">
        <span class="text-indigo-300/20 text-xl">⚙️</span>
      </div>
    </div>
    <div class="absolute bottom-[15%] right-[25%] tech-floating-el" style="animation-delay: 0.4s;">
      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center animate-slow-spin">
        <span class="text-blue-300/20 text-lg">🚀</span>
      </div>
    </div>
  </div>
  
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 box-border overflow-x-hidden">
    <!-- Section Header -->
    {#if projectsVisible}
      <div class="max-w-3xl mx-auto text-center tech-header mb-16" transition:fly={{ y: 30, duration: 800, delay: 200 }}>
        <p class="text-sm font-medium text-indigo-400 mb-2 uppercase tracking-wider">My Digital Children</p>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          <span class="tech-section-highlight">Stuff I Built That Almost Works</span>
        </h2>
        <p class="text-indigo-100/70 max-w-2xl mx-auto">
          60% of the time, they work every time. No refunds.
        </p>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-12" transition:fly={{ y: 40, duration: 800, delay: 400 }}>
        {#each projects.slice(0, 8) as project, i}
          <div 
            class="transform transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1"
            style="animation-delay: {i * 0.1}s" 
            transition:scale={{ start: 0.9, duration: 500, delay: 500 + (i * 100), easing: backOut }}
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

<div class="section-divider"></div>

<!-- About Section -->
<section id="about" class="py-20 relative"
  use:viewport={{
    once: true,
    threshold: 0.25,
    inView: () => {
      aboutVisible = true;
      console.log('About section in view');
    }
  }}
>
  <!-- Subtle background elements -->
  <div class="absolute inset-0 overflow-hidden max-w-full">
    <div class="absolute w-full h-full opacity-10">
      <div class="absolute -left-20 top-40 w-72 h-72 bg-indigo-600/30 rounded-full filter blur-3xl"></div>
      <div class="absolute right-10 bottom-10 w-64 h-64 bg-purple-600/20 rounded-full filter blur-3xl"></div>
    </div>
  </div>
  
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 box-border overflow-x-hidden">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {#if aboutVisible}
        <div transition:fly={{ y: 30, duration: 800, delay: 200 }}>
          <h2 class="text-3xl md:text-4xl font-bold mb-8 animated-gradient-text">About Me</h2>
          <p class="text-indigo-100/80 mb-6 leading-relaxed">
            Coding since 2022, which in tech years makes me either a baby or a genius, depending on whom you ask.
            I prefer "experienced enough to be dangerous" as my LinkedIn headline.
          </p>
          <p class="text-indigo-100/80 mb-6 leading-relaxed">
            Based in {location}, where I run a web agency between existential crises and debugging sessions. 
            I build MVPs faster than you can say "scope creep" and occasionally launch projects when the stars align.
          </p>
          <p class="text-indigo-100/80 mb-6 leading-relaxed">
            My AI assistant writes 90% of my code while I take all the credit. I've mastered the art of 
            crafting perfect prompts and convincing myself I fully understand what the generated code does.
          </p>
          
          <div class="mt-8 pt-6 border-t border-indigo-800/20">
            <h4 class="text-lg font-medium text-indigo-200 mb-3">Current Distractions</h4>
            <div class="flex flex-wrap gap-2">
              <div class="badge"><span class="mr-2">🤖</span> Teaching AI to Do My Job</div>
              <div class="badge"><span class="mr-2">⚡</span> Making Slow Sites Less Slow</div>
              <div class="badge"><span class="mr-2">☁️</span> Moving Stuff to "The Cloud"</div>
              <div class="badge"><span class="mr-2">💼</span> Pretending to Be an Entrepreneur</div>
            </div>
          </div>
          
          <div class="flex items-center mt-8">
            <div class="mr-4 h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <p class="text-indigo-200/70 italic">"If it works on my machine, that's good enough."</p>
          </div>
          
          <p class="text-xs text-indigo-300/50 mt-12 italic">
            BTW: HR is just corporate cops with worse outfits.
          </p>
        </div>
        
        <div class="section-overlay p-8" transition:fly={{ y: 40, duration: 800, delay: 400 }}>
          <h3 class="text-2xl font-semibold mb-8 animated-gradient-text">My Universe of Skills</h3>
          
          <div class="space-y-8">
            <div class="skill-constellation" transition:scale={{ start: 0.9, duration: 500, delay: 600, easing: backOut }}>
              <div class="flex justify-between items-center mb-3">
                <span class="text-indigo-100 font-medium">🧩 Problem Creating</span>
                <span class="text-xs text-indigo-300 bg-indigo-900/40 px-2 py-1 rounded-full">
                  Master Level
                </span>
              </div>
              <p class="text-indigo-200/70 text-sm">
                Making two new bugs while fixing one. It's called job security.
              </p>
            </div>
            
            <div class="skill-constellation" transition:scale={{ start: 0.9, duration: 500, delay: 750, easing: backOut }}>
              <div class="flex justify-between items-center mb-3">
                <span class="text-indigo-100 font-medium">🔄 Adaptability</span>
                <span class="text-xs text-indigo-300 bg-indigo-900/40 px-2 py-1 rounded-full">
                  Expert Level
                </span>
              </div>
              <p class="text-indigo-200/70 text-sm">
                Seamlessly switching between "I know what I'm doing" and "What am I doing?" multiple times per hour.
              </p>
            </div>
            
            <div class="skill-constellation" transition:scale={{ start: 0.9, duration: 500, delay: 900, easing: backOut }}>
              <div class="flex justify-between items-center mb-3">
                <span class="text-indigo-100 font-medium">🔭 Technical Vision</span>
                <span class="text-xs text-indigo-300 bg-indigo-900/40 px-2 py-1 rounded-full">
                  Guru Level
                </span>
              </div>
              <p class="text-indigo-200/70 text-sm">
                Predicting which part of my code will break next with surprising accuracy.
              </p>
            </div>
            
            <div class="skill-constellation" transition:scale={{ start: 0.9, duration: 500, delay: 1050, easing: backOut }}>
              <div class="flex justify-between items-center mb-3">
                <span class="text-indigo-100 font-medium">💡 Prompt Engineering</span>
                <span class="text-xs text-indigo-300 bg-indigo-900/40 px-2 py-1 rounded-full">
                  Wizard Level
                </span>
              </div>
              <p class="text-indigo-200/70 text-sm">
                Expertly explaining to AI what I want, then claiming I wrote it myself.
              </p>
            </div>
            
            <div class="skill-constellation" transition:scale={{ start: 0.9, duration: 500, delay: 1200, easing: backOut }}>
              <div class="flex justify-between items-center mb-3">
                <span class="text-indigo-100 font-medium">📢 Communication</span>
                <span class="text-xs text-indigo-300 bg-indigo-900/40 px-2 py-1 rounded-full">
                  Pro Level
                </span>
              </div>
              <p class="text-indigo-200/70 text-sm">
                Nodding confidently while thinking "I have no idea what they're talking about."
              </p>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>

<div class="section-divider"></div>

<!-- Contact Section -->
<section id="contact" class="py-20 relative"
  use:viewport={{
    once: true,
    threshold: 0.2,
    inView: () => {
      contactVisible = true;
      console.log('Contact section in view');
    }
  }}
>
  <!-- Subtle background elements -->
  <div class="absolute inset-0 overflow-hidden max-w-full">
    <div class="absolute w-full h-full opacity-10">
      <div class="absolute -right-20 -top-20 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-3xl"></div>
      <div class="absolute left-40 bottom-0 w-80 h-80 bg-purple-600/20 rounded-full filter blur-3xl"></div>
    </div>
  </div>
  
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 box-border overflow-x-hidden">
    {#if contactVisible}
      <div class="max-w-3xl mx-auto text-center mb-16" transition:fly={{ y: 30, duration: 800, delay: 200 }}>
        <h2 class="text-3xl md:text-4xl font-bold mb-6 animated-gradient-text">Get in Touch</h2>
        <p class="text-indigo-100/70 max-w-2xl mx-auto">
          Got something interesting? Hit me up. Not into spam or "quick calls to discuss opportunities."
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div class="space-y-8" transition:fly={{ x: -30, duration: 800, delay: 400 }}>
          <div class="section-overlay p-6" transition:scale={{ start: 0.95, duration: 500, delay: 600, easing: backOut }}>
            <h3 class="text-xl font-semibold mb-4 text-indigo-200">Location</h3>
            <p class="text-indigo-200/70 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </p>
          </div>
          
          <div class="section-overlay p-6" transition:scale={{ start: 0.95, duration: 500, delay: 800, easing: backOut }}>
            <h3 class="text-xl font-semibold mb-4 text-indigo-200">Connect</h3>
            <div class="space-y-4">
              <p class="text-indigo-200/70 flex items-center">
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
          
          <div class="section-overlay p-6" transition:scale={{ start: 0.95, duration: 500, delay: 1000, easing: backOut }}>
            <h3 class="text-xl font-semibold mb-4 text-indigo-200">Startup Ideas?</h3>
            <p class="text-indigo-100/80 mb-4">
              If you've got something worth building, I might be interested. No introductory calls, just solid ideas.
            </p>
            <div class="space-y-4">
              <p class="text-indigo-200/70 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <a href="https://www.axentra.agency" target="_blank" rel="noopener noreferrer" class="hover:text-indigo-300 transition-colors">www.axentra.agency</a>
              </p>
              <p class="text-indigo-200/70 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:dlovan@axentra.agency" class="hover:text-indigo-300 transition-colors">dlovan@axentra.agency</a>
              </p>
            </div>
          </div>
        </div>
        
        <div class="section-overlay p-8 min-h-[450px] flex items-center justify-center" transition:fly={{ x: 30, duration: 800, delay: 400 }}>
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

<!-- Footer -->
<footer class="py-10 border-t border-indigo-900/30">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row justify-between items-center">
      <p class="text-indigo-200/50 mb-4 md:mb-0">© {new Date().getFullYear()} {name}. All rights reserved.</p>
      <p class="text-indigo-200/50 text-sm">Built with just enough care to make it work well.</p>
    </div>
  </div>
</footer>
