import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const session_checkout = defineStore("session_checkout", {
  state: () => ({
    guid: uuidv4(),
  }),
  actions: {},
});
