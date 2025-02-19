import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const UniqueGuid = defineStore("UniqueGuid", {
  state: () => ({
    guid: uuidv4().toUpperCase(),
  }),
  actions: {
    updateGuid() {
      this.guid = uuidv4().toUpperCase();
    },
  },
});
