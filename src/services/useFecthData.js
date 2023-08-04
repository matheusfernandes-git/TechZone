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
    const theresCategories = categories.length > 0;
    const theresItems = items.length > 0;
    if (!theresCategories) {
      dispatch(searchCategories());
    }
    if (!theresItems) {
      dispatch(searchItems());
    }
  }, [dispatch, categories.length, items.length]);
};

export default useFetchData;
