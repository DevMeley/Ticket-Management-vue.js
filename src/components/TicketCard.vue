
<script setup>
import Badge from './Badge.vue'; 
import { Pencil, Trash } from 'lucide-vue-next';
defineProps({
  ticket: Object
});
</script>

<template>
  <article class="card flex flex-col dark:bg-[#3a3734]">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h3 class="font-semibold">{{ ticket.title }}</h3>
        <p class="text-sm text-slate-500 mt-2">
          {{ ticket.description?.slice(0, 120) }}
        </p>
      </div>
      <div class="flex flex-col items-end gap-2">
        <Badge :status="ticket.status" />
        <div class="text-xs text-slate-400">
          {{ new Date(ticket.createdAt).toLocaleString() }}
        </div>
      </div>
    </div>

    <div class="mt-4 flex gap-2">
      <button @click="$emit('edit')" class="px-3 py-1 text-green-400 border rounded">
        <Pencil />
      </button>
      <button @click="$emit('delete')" class="px-3 py-1 border rounded text-red-600">
        <Trash/>
      </button>
    </div>
  </article>
</template> 

