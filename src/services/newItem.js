import instance from "common/config/api";

const newItemService = {
  add: async (newItem) => {
    try {
      const response = await instance.post("/itens", newItem);
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
      throw error;
    }
  },
  edit: async (id, newTitle, newPrice) => {
    try {
      const response = await instance.put(`/itens/${id}`, {
        title: newTitle,
        price: newPrice,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao editar item:", error);
      throw error;
    }
  },
  delete: async (id) => {
    try {
      const response = await instance.delete(`/itens/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar item:", error);
      throw error;
    }
  },
};

export default newItemService;
