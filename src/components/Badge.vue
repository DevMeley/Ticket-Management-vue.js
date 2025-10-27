<script setup>
defineProps({
  status: String,
});

const statusClass = {
  open: "bg-green-50 text-green-600",
  in_progress: "bg-amber-50 text-amber-600",
  closed: "bg-slate-100 text-slate-600",
};
</script>

<template>
  <span
    :class="[
      'px-3 py-1 rounded-full text-sm font-semibold',
      statusClass[status] || '',
    ]"
  >
    {{ status }}
  </span>
</template>
