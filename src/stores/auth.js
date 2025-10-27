import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    session: JSON.parse(localStorage.getItem("ticketapp_session") || "null"),
  }),
  getters: {
    isAuthenticated: (state) => !!state.session,
  },
  actions: {
    login(email, password) {
      const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) throw new Error("Invalid credentials");
      const session = {
        token: Math.random().toString(36).slice(2),
        user: { id: user.id, name: user.name, email: user.email },
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString(),
      };
      localStorage.setItem("ticketapp_session", JSON.stringify(session));
      this.session = session;
    },
    signup(name, email, password) {
      const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
      if (users.find((u) => u.email === email))
        throw new Error("Email already exists");
      const newUser = { id: Date.now().toString(), name, email, password };
      users.push(newUser);
      localStorage.setItem("ticketapp_users", JSON.stringify(users));
    },
    logout() {
      localStorage.removeItem("ticketapp_session");
      this.session = null;
    },
  },
});
