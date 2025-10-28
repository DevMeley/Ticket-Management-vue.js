
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { LogIn } from "lucide-vue-next";


const props = defineProps({
  isSideBar: Boolean,
  openSideMenu: Function,
});

const route = useRoute();
const auth = useAuthStore();
const session = computed(() => auth.session);
const logout = auth.logout;

const menu = [
  { item: "Dashboard", link: "/dashboard", icon: "tachometer-alt" },
  { item: "Ticket", link: "/dashboard/tickets", icon: "ticket-alt" },
  { item: "Settings", link: "/dashboard/setting", icon: "cog" },
];
</script>


<template>
  <div
    :class="[
      'z-40 fixed bg-white dark:bg-[#292827] top-0 left-0 border-r border-gray-400 w-62 h-screen mt-10 pt-10 sm:translate-x-0 transition-transform',
      isSideBar ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <ul
      class="dark:text-gray-200 mx-4 text-gray-800 text-lg font-bold flex flex-col gap-4"
    >
      <router-link
        v-for="item in menu"
        :key="item.item"
        :to="item.link"
        @click="openSideMenu(false)"
      >
        <li
          :class="[
            'p-2 rounded-lg flex gap-2 items-center transition-colors',
            route.path === item.link
              ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-200'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 dark:hover:text-gray-200',
          ]"
        >
          <font-awesome-icon :icon="item.icon" />
          {{ item.item }}
        </li>
      </router-link>
    </ul>

    <div
      v-if="session?.user"
      class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#292827]"
    >
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-orange-600 dark:text-orange-200 font-semibold"
          >
            {{ session.user.name.charAt(0).toUpperCase() }}
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-semibold dark:text-gray-200">
              {{ session.user.name }}
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400">
              {{ session.user.email }}
            </span>
          </div>
        </div>

        <button
          @click="logout"
          class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors w-full"
        >
         <LogIn class="text-gray-500" />
          <span>Logout</span>
        </button>

        <div class="text-xs text-gray-400 dark:text-gray-500">
          Session expires:
          {{
            new Date(session.expiresAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          }}
        </div>
      </div>
    </div>
  </div>
</template>
