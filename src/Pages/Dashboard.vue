
<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useTicketsStore } from "../stores/ticket";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import TicketCard from "../components/TicketCard.vue";

const auth = useAuthStore();
const ticketsStore = useTicketsStore();
const { tickets } = storeToRefs(ticketsStore);
const router = useRouter();

function logout() {
  auth.logout();
  router.push("/auth/login");
}

const openCount = computed(
  () => tickets.value.filter((t) => t.status === "open").length
);
const closedCount = computed(
  () => tickets.value.filter((t) => t.status === "closed").length
);
</script>


<template>
  <main class="container-centered py-10">
    <header class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">Dashboard</h1>
      <button class="btn btn-outline" @click="logout">Logout</button>
    </header>

    <section class="grid gap-6 md:grid-cols-3">
      <div class="card dark:bg-[#3a3734]">
        <h3 class="text-sm text-slate-500">Total tickets</h3>
        <div class="text-3xl font-bold mt-2">{{ tickets.length }}</div>
      </div>
      <div class="card dark:bg-[#3a3734]">
        <h3 class="text-sm text-slate-500">Open</h3>
        <div class="text-3xl font-bold mt-2">{{ openCount }}</div>
      </div>
      <div class="card dark:bg-[#3a3734]">
        <h3 class="text-sm text-slate-500">Resolved</h3>
        <div class="text-3xl font-bold mt-2">{{ closedCount }}</div>
      </div>
    </section>

    <section class="mt-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold">Recent Tickets</h2>
        <router-link to="/tickets" class="text-sm text-slate-500">
          View all
        </router-link>
      </div>

      <div v-if="tickets.length === 0" class="text-slate-500">
        No recent tickets.
      </div>
      <div v-else class="grid gap-4 md:grid-cols-3">
        <TicketCard
          v-for="t in tickets.slice(0, 3)"
          :key="t.id"
          :ticket="t"
        />
      </div>
    </section>
  </main>
</template>

