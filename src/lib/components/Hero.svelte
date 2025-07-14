<script>
  let { title, name, location, projects, activeTools, graveyardTools } = $props();
</script>

<style>
  /* Hero section styles */
  :global(:root) {
    --gradient-primary: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    --main-bg-color: #0f172a;
    --section-overlay-color: rgba(30, 41, 59, 0.3);
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

  .animated-gradient-text {
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
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

  .breathe {
    animation: breathe 8s ease-in-out infinite;
  }
  
  @keyframes breathe {
    0%, 100% { transform: scale(1) rotate(6deg); }
    50% { transform: scale(1.05) rotate(6deg); }
  }

  .orbit {
    animation: orbit 20s linear infinite;
  }
  
  @keyframes orbit {
    0% { transform: rotate(0deg) translateX(150px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
  }

  .radial-gradient {
    background: radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.05) 40%, transparent 70%);
  }


  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes pulse {
    0% { opacity: 0.5; }
    100% { opacity: 1; }
  }

  .glowing-btn {
    position: relative;
    overflow: hidden;
  }

  .glowing-btn::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.3), transparent);
    transform: rotate(45deg);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .glowing-btn:hover::after {
    animation: shine 1.5s ease-out;
    opacity: 1;
  }

  @keyframes shine {
    0% {
      transform: translateX(-100%) rotate(45deg);
    }
    100% {
      transform: translateX(100%) rotate(45deg);
    }
  }
</style>

<section class="min-h-screen w-full overflow-x-hidden relative py-8 flex flex-col justify-center items-center">
    

    
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
            <p class="text-xl md:text-2xl text-indigo-200 pop-in typewriter" style="animation-delay: 0.6s">{title}</p>
          </div>
          <p class="text-lg text-indigo-100/80 max-w-xl mx-auto lg:mx-0 mb-6 slide-up" style="animation-delay: 0.8s">
            I turn ideas into code and occasionally convince computers to do what I want. 
            When I'm not optimizing database queries, I'm explaining to clients why their "simple API change" will take a week.
          </p>
          
          <div class="mb-8 slide-up" style="animation-delay: 1s">
            <a href="#projects" class="badge"><span class="mr-2">⚙️</span> Systems Architecture</a>
            <a href="#contact" class="badge"><span class="mr-2">🗄️</span> Backend Development</a>
            <a href="#about" class="badge"><span class="mr-2">🚁</span> Drone Software</a>
            <a href="#about" class="badge"><span class="mr-2">⚡</span> Error Message Reading</a>
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
          <div class="text-3xl font-bold text-white mb-1">4+</div>
          <div class="text-indigo-200/70 text-sm">Years of Pretending</div>
        </div>
        <div class="bg-indigo-900/20 backdrop-blur-sm rounded-xl p-4 border border-indigo-500/10 text-center">
          <div class="text-3xl font-bold text-white mb-1">{projects.length}+</div>
          <div class="text-indigo-200/70 text-sm">Semi-Working Projects</div>
        </div>
        <div class="bg-indigo-900/20 backdrop-blur-sm rounded-xl p-4 border border-indigo-500/10 text-center">
          <div class="text-3xl font-bold text-white mb-1">{activeTools.length + graveyardTools.length}+</div>
          <div class="text-indigo-200/70 text-sm">Tools I've Actually Mastered</div>
        </div>
      </div>
    </div>
</section>