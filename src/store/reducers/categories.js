import { createStandaloneToast } from "@chakra-ui/toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriesService from "services/categories";

const { toast } = createStandaloneToast();

const isFirstTimeVisit = () => {
  const isFirstTime = localStorage.getItem('isFirstTimeVisit');
  return isFirstTime === null || isFirstTime === 'true';  //se for null ou true é a primeira vez do usuário.
}

export const searchCategories = createAsyncThunk(
  "categorias/buscar",
  async () => {
    const response = await categoriesService.search();
    if (isFirstTimeVisit()) {
      toast({
        title: "Carregando categorias!",
        status: "loading",
        duration: 4000,
        isClosable: true,
      });
    }
    return response;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: [],
  extraReducers: (builder) => {
    builder
    .addCase(searchCategories.fulfilled, (state, { payload }) => {
      if (isFirstTimeVisit()) {
        toast({
          title: "Sucesso!",
          description: "Categorias carregadas com sucesso!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        // Atualizar a flag para indicar que o usuário já acessou o site antes
        localStorage.setItem("isFirstTimeVisit", "false");
      }
      return payload;
    })
    .addCase(searchCategories.rejected, (state, { payload }) => {
      // Verificar se é a primeira vez do usuário e exibir os toasts se necessário
      if (isFirstTimeVisit()) {
        toast({
          title: "Erro!",
          description: "Erro na busca de categorias!",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        localStorage.setItem("isFirstTimeVisit", "false");
      }
    });
  },
});

export default categoriesSlice.reducer;
