import instance from "common/config/api";

const itemsService = {
  search: async () => {
    const response = await instance.get("/itens");

    return response.data;
  },
  updateFavorite: async (id, updateItem) => {
    try {
      const response = await instance.put(`itens/${id}`, updateItem);
      return response.data;
    } catch (error) {
      console.log("Erro ao favoritar:", error);
    }
  },
};

export default itemsService;
