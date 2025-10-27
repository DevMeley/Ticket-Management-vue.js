
<script setup>
import { ref, watch, onMounted } from "vue";
import { useTicketsStore } from "../stores/ticket";

const props = defineProps({
  initial: Object,
  submitLabel: {
    type: String,
    default: "Create",
  },
  onCreate: Function,
});

const store = useTicketsStore();
const allowed = ["open", "in_progress", "closed"];

const title = ref("");
const description = ref("");
const status = ref("open");
const priority = ref("medium");
const errors = ref({});

onMounted(() => {
  if (props.initial) {
    title.value = props.initial.title;
    description.value = props.initial.description || "";
    status.value = props.initial.status;
    priority.value = props.initial.priority || "medium";
  }
});

function validate() {
  const e = {};
  if (!title.value || title.value.trim().length < 3) {
    e.title = "Title required (min 3 chars).";
  }
  if (!status.value || !allowed.includes(status.value)) {
    e.status = "Status must be open, in_progress or closed.";
  }
  if (description.value && description.value.length > 2000) {
    e.description = "Description too long.";
  }
  errors.value = e;
  return Object.keys(e).length === 0;
}

function handleSubmit() {
  if (!validate()) return;

  const payload = {
    title: title.value.trim(),
    description: description.value.trim(),
    status: status.value,
    priority: priority.value,
  };

  props.onCreate(payload);

  if (!props.initial) {
    title.value = "";
    description.value = "";
    status.value = "open";
    priority.value = "medium";
  }
}
</script>


<template>
  <form @submit.prevent="handleSubmit" class="space-y-3">
    <h3 class="font-semibold mb-4">{{ submitLabel }}</h3>

    <!-- Title -->
    <div>
      <label class="block  dark:text-white text-black text-sm">Title</label>
      <input
        v-model="title"
        class="w-full p-2 border  dark:border-gray-500 rounded"
        :class="{
          'border-red-400': errors.title,
          'border-slate-200': !errors.title,
        }"
      />
      <div v-if="errors.title" class="text-sm text-red-600">
        {{ errors.title }}
      </div>
    </div>

    <!-- Status + Priority -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label class="block text-sm  dark:text-white text-black">Status</label>
        <select
          v-model="status"
          class="w-full p-2 border dark:border-gray-500 rounded"
          :class="{
            'border-red-400': errors.status,
            'border-slate-200': !errors.status,
          }"
        >
          <option value="open">open</option>
          <option value="in_progress">in_progress</option>
          <option value="closed">closed</option>
        </select>
        <div v-if="errors.status" class="text-sm text-red-600">
          {{ errors.status }}
        </div>
      </div>

      <div>
        <label class="block text-sm">Priority</label>
        <select v-model="priority" class="w-full p-2 border rounded">
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </div>
    </div>

    <!-- Description -->
    <div>
      <label class="block text-sm">Description (optional)</label>
      <textarea
        v-model="description"
        rows="4"
        class="w-full p-2 border dark:border-gray-500 rounded"
        :class="{
          'border-red-400': errors.description,
          'border-slate-200': !errors.description,
        }"
      ></textarea>
      <div v-if="errors.description" class="text-sm text-red-600">
        {{ errors.description }}
      </div>
    </div>

    <!-- Submit -->
    <div class="flex items-center gap-3 justify-end">
      <button
        type="submit"
        class="px-4 py-2 bg-orange-400 text-white rounded w-full md:w-auto"
      >
        {{ submitLabel }}
      </button>
    </div>
  </form>
</template>
