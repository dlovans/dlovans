<script>
  const { name } = $props()
</script>

<!-- Footer -->
<footer class="py-10 border-t border-indigo-900/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-indigo-200/50 mb-4 md:mb-0">© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <p class="text-indigo-200/50 text-sm">Built with just enough care to make it work well.</p>
      </div>
    </div>
  </footer>