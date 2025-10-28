
<script setup>
import Header from "./Header.vue";
import { ref } from "vue";
import SideBar from "./SideBar1.vue";

const isSideBar = ref(false);
const darkMode = ref(false);


function toggleDarkMode() {
  darkMode.value = !darkMode.value;
  const root = document.documentElement;
  if (darkMode.value) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

function openSideMenu() {
  isSideBar.value = !isSideBar.value;
}
</script>



<template>
  < <div
    :class="[
      darkMode ? 'dark' : '',
      'bg-gray-50 dark:bg-[#292827] dark:text-gray-100 pb-6 min-h-screen'
    ]"
  >
    <Header
      :toggleDarkMode="toggleDarkMode"
      :darkMode="darkMode"
      :openSideMenu="openSideMenu"
      :isSideBar="isSideBar"
    />
    <div class="layout-content">
      <SideBar
        :isSideBar="isSideBar"
        :openSideMenu="openSideMenu"
      />
      <main class="pt-10 mx-4 lg:ml-70 z-40">
        <slot />
        <router-view />
      </main>
    </div>
  </div>
</template>

