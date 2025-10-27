import { defineStore } from "pinia";

export const useTicketsStore = defineStore("tickets", {
  state: () => ({
    tickets: JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]"),
  }),

  actions: {
    save() {
      localStorage.setItem("ticketapp_tickets", JSON.stringify(this.tickets));
    },

    getTickets() {
      return [...this.tickets];
    },

    createTicket(data) {
      const newTicket = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.tickets.unshift(newTicket);
      this.save();
    },

    updateTicket(id, updates) {
      const idx = this.tickets.findIndex((t) => t.id === id);
      if (idx === -1) throw new Error("Ticket not found");

      this.tickets[idx] = {
        ...this.tickets[idx],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      this.save();
    },

    deleteTicket(id) {
      this.tickets = this.tickets.filter((t) => t.id !== id);
      this.save();
    },
  },
});
