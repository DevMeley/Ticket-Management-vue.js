<script setup>
import Footer from '../components/Footer.vue';
import Hero from '../components/Hero.vue';
import HomeHeader from '../components/HomeHeader.vue';
import { MonitorSmartphone, Ticket, History } from 'lucide-vue-next';
 
</script>

<template>
  <HomeHeader/>
  <Hero/>
  <section class="container-centered py-12 grid gap-6 lg:grid-cols-3">
    <div class="card flex flex-col gap-4">
      <h4 class="font-semibold text-2xl flex items-center gap-4">
        <MonitorSmartphone />
        Fast setup
      </h4>
      <p class="mt-2 text-sm text-slate-600">
        Start with the provided test user or sign up.
      </p>
    </div>

    <div class="card flex flex-col gap-4">
      <h4 class="font-semibold text-2xl flex items-center gap-4">
        <Ticket />
        Create Tickets
      </h4>
      <p class="mt-2 text-sm text-slate-600">
        Submit new tickets instantly with validation and automatic tracking.
      </p>
    </div>

    <div class="card flex flex-col gap-4">
      <h4 class="font-semibold text-2xl flex items-center gap-4">
        <History />
        View & Manage
      </h4>
      <p class="mt-2 text-sm text-slate-600">
        See open, in-progress, and closed tickets all in one organized dashboard.
      </p>
    </div>
  </section>
  <Footer/>
</template>
