
<script setup>
import { Menu, Moon, Sun, X } from 'lucide-vue-next';

const props = defineProps({
  toggleDarkMode: Function,
  darkMode: Boolean,
  openSideMenu: Function,
  isSideBar: Boolean
});
</script>

<template>
  <div class="relative">
    <nav
      class="bg-white h-14 fixed z-50 left-0 right-0 border-b border-gray-200
      dark:border-gray-700 dark:bg-[#292827] top-0 mb-80 pl-2 pr-2 lg:pl-7 lg:pr-7"
    >
      <div class="flex items-center justify-between gap-2 mt-2">
        <div class="flex items-center gap-2">
          <button
            @click="openSideMenu"
            class="border border-gray-400 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 lg:hidden"
          >
            <component
              :is="isSideBar ? X : Menu"
              class="dark:text-white"
            />
          </button>
          <router-link to="/">
            <span class="font-extrabold text-orange-300 lg:text-2xl">
              TicketFlow
            </span>
          </router-link>
        </div>

        <div>
          <input
            type="text"
            class="bg-gray-200 dark:bg-gray-500 border-none outline-0 p-2 rounded-lg w-30 lg:w-70"
            placeholder="Search..."
          />
        </div>

        <div class="flex items-center gap-8">
          <button @click="toggleDarkMode">
            <component
              :is="darkMode ? Sun : Moon"
              class="dark:text-white size-5"
            />
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

