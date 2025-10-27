
<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();
const formData = ref({
  name: auth.session?.user?.name || "",
  email: auth.session?.user?.email || "",
  notifications: {
    email: true,
    push: true,
  },
  theme: "system",
});

function handleSubmit() {
  console.log("Settings updated:", formData.value);
}

function confirmDelete() {
  if (window.confirm("Are you sure? This action cannot be undone.")) {
    auth.logout();
  }
}
</script>


<template>
  <main class="container-centered py-6">
    <h1 class="text-2xl font-semibold mb-6">Settings</h1>

    <div class="max-w-2xl">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Profile Section -->
        <section class="card dark:bg-[#3a3734]">
          <h2 class="text-lg font-semibold mb-4">Profile Settings</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                v-model="formData.name"
                class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label class="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                v-model="formData.email"
                class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </section>

        <!-- Theme Settings -->
        <section class="card dark:bg-[#3a3734]">
          <h2 class="text-lg font-semibold mb-4">Theme Preferences</h2>
          <div class="space-y-2">
            <label class="block text-sm mb-2">Choose Theme</label>
            <select
              name="theme"
              v-model="formData.theme"
              class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="system">System Default</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </section>

        <!-- Notification Settings -->
        <section class="card dark:bg-[#3a3734]">
          <h2 class="text-lg font-semibold mb-4">Notification Settings</h2>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium">Email Notifications</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Receive updates via email
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="formData.notifications.email"
                  class="sr-only peer"
                />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"
                ></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium">Push Notifications</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Receive instant push notifications
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="formData.notifications.push"
                  class="sr-only peer"
                />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"
                ></div>
              </label>
            </div>
          </div>
        </section>

        <!-- Save Button -->
        <div class="flex justify-end">
          <button
            type="submit"
            class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>

      <!-- Danger Zone -->
      <section
        class="mt-8 card border-red-200 dark:border-red-900/50 dark:bg-[#3a3734]"
      >
        <h2 class="text-lg font-semibold mb-4 text-red-600 dark:text-red-400">
          Danger Zone
        </h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <option value="" class="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" "></option>
              <select>
                <option value="system">System Default</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <!-- Notification Settings -->
      <section class="card dark:bg-[#3a3734]">
        <h2 class="text-lg font-semibold mb-4">Notification Settings</h2>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium">Email Notifications</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Receive updates via email
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="formData.notifications.email"
                class="sr-only peer"
              />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"
              ></div>
            </label>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium">Push Notifications</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Receive instant push notifications
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="formData.notifications.push"
                class="sr-only peer"
              />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"
              ></div>
            </label>
          </div>
        </div>
      </section>

      <!-- Save Button -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          Save Changes
        </button>
      </div>

      <!-- Danger Zone -->
      <section
        class="mt-8 card border-red-200 dark:border-red-900/50 dark:bg-[#3a3734]"
      >
        <h2 class="text-lg font-semibold mb-4 text-red-600 dark:text-red-400">
          Danger Zone
        </h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium">Delete Account</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Permanently delete your account and all data
              </p>
            </div>
            <button
              @click="confirmDelete"
              class="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
