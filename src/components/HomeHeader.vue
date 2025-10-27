
<script setup>
import { ref } from "vue";
import { Menu as HiMenu, X as HiX } from "lucide-vue-next";

const menuOpen = ref(false);
</script>


<template>
  <header
    class="flex items-center justify-between px-6 py-4 bg-white shadow-md relative"
  >
    <router-link to="/">
      <span class="font-extrabold text-orange-400 text-2xl tracking-wide">
        TicketFlow
      </span>
    </router-link>

    <nav class="hidden md:flex items-center gap-8">
      <a
        href="#features"
        class="text-foreground hover:text-primary transition-colors font-medium"
      >
        Features
      </a>
      <a
        href="#how-it-works"
        class="text-foreground hover:text-primary transition-colors font-medium"
      >
        How It Works
      </a>
      <a
        href="#pricing"
        class="text-foreground hover:text-primary transition-colors font-medium"
      >
        Pricing
      </a>
    </nav>

    <div class="flex items-center gap-4">
      <router-link
        to="/auth/signin"
        class="hidden lg:block px-4 py-2 bg-amber-400 text-white rounded-lg border border-slate-200 font-semibold"
      >
        <button>Get Started</button>
      </router-link>
    </div>

    <!-- Mobile Menu Button -->
    <button
      class="md:hidden text-3xl text-orange-800 focus:outline-none"
      @click="menuOpen = !menuOpen"
      aria-label="Toggle menu"
    >
      <component :is="menuOpen ? HiX : HiMenu" />
    </button>

    <!-- Mobile Nav -->
    <nav
      v-if="menuOpen"
      class="p-4 absolute top-full left-0 w-full bg-white shadow-md z-50 md:hidden animate-fade-in"
    >
      <ul
        class="flex flex-col gap-4 py-4 px-8 text-gray-700 dark:text-gray-200 font-medium"
      >
        <li
          class="hover:text-blue-800 transition-colors cursor-pointer"
          @click="menuOpen = false"
        >
          Home
        </li>
        <li
          class="hover:text-blue-800 transition-colors cursor-pointer"
          @click="menuOpen = false"
        >
          Features
        </li>
        <li
          class="hover:text-blue-800 transition-colors cursor-pointer"
          @click="menuOpen = false"
        >
          About
        </li>
        <li
          class="hover:text-blue-800 transition-colors cursor-pointer"
          @click="menuOpen = false"
        >
          Contact
        </li>
      </ul>
      <router-link
        to="/auth/signin"
        class="px-4 py-2 bg-amber-400 text-white rounded-lg border border-slate-200 font-semibold"
      >
        <button>Get Started</button>
      </router-link>
    </nav>
  </header>
</template>
