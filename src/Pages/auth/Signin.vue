
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const auth = useAuthStore();

function handleLogin() {
  try {
    auth.login(email.value, password.value);
    router.push("/dashboard");
  } catch (e) {
    error.value = e.message;
  }
}
</script>

<template>
  <main class="min-h-screen flex items-center justify-center py-12">
    <form @submit.prevent="handleLogin" class="w-full max-w-md card">
      <h2 class="text-3xl font-semibold mb-4 text-center">Welcome Back</h2>

      <div class="block mt-3">
        <div class="text-sm mb-1">Email</div>
        <input
          v-model="email"
          type="email"
          :class="[
            'w-full p-2 border rounded',
            error ? 'border-red-400' : 'border-slate-200'
          ]"
        />
        <div v-if="error" class="text-sm text-red-600 mt-1">{{ error }}</div>
      </div>

      <div class="block mt-3">
        <div class="text-sm mb-1">Password</div>
        <input
          v-model="password"
          type="password"
          :class="[
            'w-full p-2 border rounded',
            error ? 'border-red-400' : 'border-slate-200'
          ]"
        />
      </div>
       <div v-if="error" class="text-sm text-red-600 mt-1">{{ error }}</div>

      <div class="mt-6 flex items-center justify-center">
        <button class="px-12 py-2 bg-primary text-white rounded bg-orange-400">
          Sign in
        </button>
      </div>

      <div class="mt-6 text-center text-sm">
        Don't have an account?
        <router-link to="/auth/signup">
          <span class="text-blue-700"> Sign Up</span>
        </router-link>
      </div>
    </form>
  </main>
</template>


