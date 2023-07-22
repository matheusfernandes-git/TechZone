import instance from "common/config/api";

const itemsService = {
  search: async () => {
    const response = await instance.get("/itens");

    return response.data;
  },
};

export default itemsService;
