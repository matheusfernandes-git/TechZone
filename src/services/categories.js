import instance from "common/config/api";

const categoriesService = {
  search: async () => {
    const response = await instance.get("/categorias");

    return response.data;
  },
};

export default categoriesService;
