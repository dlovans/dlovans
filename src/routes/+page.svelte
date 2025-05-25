<script>
  // Import Svelte transitions and utilities
  import { onMount } from 'svelte';
  import { fly, fade, scale } from 'svelte/transition';
  import { backOut } from 'svelte/easing';

  import UnifiedBackground from '$lib/components/UnifiedBackground.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import TechStack from '$lib/components/TechStack.svelte';
  import ProjectStack from '$lib/components/ProjectStack.svelte';
  import About from '$lib/components/About.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Footer from '$lib/components/Footer.svelte';


  // Reactive state using Svelte 5 syntax
  let { name, title, location } = $state({
    name: "Dlovan",
    title: "Web Developer",
    location: "Stockholm, Sweden"
  });  

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
      longDescription: "ThinkStep is what happens when you're tired of wiring up AI agents the hard way. I built this because apparently 'simple' and 'AI infrastructure' don't belong in the same sentence elsewhere. It's an Agent-as-Layer API that handles all the boring stuff so you can focus on making your AI actually do something useful. Production ready.",
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
</svelte:head>

<UnifiedBackground />
<Hero title={title} name={name} location={location} projects={projects} activeTools={activeTools} graveyardTools={graveyardTools} />
<TechStack activeTools={activeTools} graveyardTools={graveyardTools} />
<ProjectStack projects={projects} />
<About location={location} />
<Contact location={location} />
<Footer name={name} />
