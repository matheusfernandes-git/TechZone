import instance from "common/config/api";

const newItemService = {
  search: async (newItem) => {
    const response = await instance.post("/itens", newItem);
    return response.data;
  },

  delete: async (newItem) => {
    const response = await instance.delete("/itens", newItem);
    return response.data;
  },
};

export default newItemService;
