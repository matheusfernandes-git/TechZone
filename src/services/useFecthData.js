// services/useFetchData.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCategories } from "store/reducers/categories";
import { searchItems } from "store/reducers/items";

const useFetchData = () => {
  const dispatch = useDispatch();
  const { categories, items } = useSelector((state) => {
    return {
      categories: state.categories,
      items: state.items,
    };
  });

  useEffect(() => {
    const categoriesFetched = categories.length > 0;
    const itemsFetched = items.length > 0;

    if (!categoriesFetched) { //se não tem categoria, faz a requisição
      dispatch(searchCategories());
    }

    if (!itemsFetched) {    //se não tem item, faz a requisição
      dispatch(searchItems());
    }
  }, [dispatch, categories.length, items.length]);
};

export default useFetchData;
