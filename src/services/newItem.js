import instance from "common/config/api";

const newItemService = {
  add: async (newItem) => {
    try {
      const response = await instance.post("/itens", newItem);
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  },

  // delete: async (id) => {
  //   try {
  //     const response = await instance.delete(`/itens/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Erro ao deletar item:", error);
  //   }
  // },
};

export default newItemService;
