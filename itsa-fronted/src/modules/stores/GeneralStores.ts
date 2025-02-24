import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const GeneralStores = defineStore("GeneralStores", {
  state: () => ({
    data: {
      guid: uuidv4().toUpperCase(),
    },
  }),
  actions: {
    updateGuid() {
      this.data.guid = uuidv4().toUpperCase();
    },
  },
});
