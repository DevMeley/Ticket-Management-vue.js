
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import TicketCard from "../components/TicketCard.vue";
import TicketForm from "../components/TicketForm.vue";
import { useTicketsStore } from "../stores/ticket";
import { useToast } from "../utils/Toast";
import { X } from "lucide-vue-next";

const ticketsStore = useTicketsStore();

const toast = useToast()

const tickets = ref([]);
const filter = ref("all");
const search = ref("");
const editing = ref(null);

function refresh() {
  tickets.value = ticketsStore.getTickets();
}

onMounted(refresh);

watch(editing, (val) => {
  if (!val) return;
  const onKey = (e) => {
    if (e.key === "Escape") editing.value = null;
  };
  window.addEventListener("keydown", onKey);
  watch(editing, (v) => {
    if (!v) window.removeEventListener("keydown", onKey);
  });
});

function handleCreate(data) {
  try {
    ticketsStore.createTicket(data);
    refresh();
    toast.showToast("Ticket created", "success");
  } catch (err) {
    toast.showToast(err.message, "error");
  }
}

function handleUpdate(id, updates) {
  try {
    ticketsStore.updateTicket(id, updates);
    refresh();
    toast.showToast("Ticket updated", "success");
    editing.value = null;
  } catch (err) {
    toast.showToast(err.message, "error");
  }
}

function handleDelete(id) {
  if (!confirm("Are you sure you want to delete this ticket?")) return;
  try {
    ticketsStore.deleteTicket(id);
    refresh();
    toast.showToast("Ticket removed", "success");
  } catch (err) {
    toast.showToast(err.message, "error");
  }
}

function startEdit(ticket) {
  editing.value = ticket;
}

const visible = computed(() =>
  tickets.value.filter((t) => {
    if (filter.value !== "all" && t.status !== filter.value) return false;
    if (
      search.value &&
      !t.title.toLowerCase().includes(search.value.toLowerCase())
    )
      return false;
    return true;
  })
);
</script>


<template>
  <main class="container-centered py-4 lg:p-10">
    <header class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">Tickets</h1>
    </header>

    <section class="flex flex-col md:flex-row gap-8">
      <!-- Left side - Ticket Cards -->
      <section class="flex-1">
        <div class="flex gap-2 mb-4">
          <select v-model="filter" class="p-2 border rounded">
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="in_progress">In progress</option>
            <option value="closed">Closed</option>
          </select>
          <input
            v-model="search"
            placeholder="Search title"
            class="p-2 border rounded w-[120px]"
          />
        </div>

        <section class="space-y-4">
          <div v-if="visible.length === 0" class="text-slate-500">
            No tickets found.
          </div>
          <TicketCard
            v-for="ticket in visible"
            :key="ticket.id"
            :ticket="ticket"
            @edit="startEdit(ticket)"
            @delete="handleDelete(ticket.id)"
            class="dark:text-white text-black"
          />
        </section>
      </section>

      <!-- Right side - Ticket Form -->
      <section class="w-full md:w-96 self-start">
        <TicketForm @create="handleCreate" />
      </section>

      <!-- Edit Modal -->
      <div
        v-if="editing"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        @click="editing = null"
      >
        <div class="w-full max-w-xl p-4" @click.stop>
          <div class="card" style="background-color: rgba(255, 255, 255, 0.95)">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-semibold">Edit Ticket</h3>
              <button @click="editing = null" class="px-3 py-1 border rounded">
                <X/>
              </button>
            </div>
            <TicketForm
              :initial="editing"
              submit-label="Update"
              class="dark:text-white text-black"
              @create="(data) => handleUpdate(editing.id, data)"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
