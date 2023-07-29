import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchCategories } from "store/reducers/categories";
import { searchItems } from "store/reducers/items";

const useFetchData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchCategories());
    dispatch(searchItems());
  }, [dispatch]);
};

export default useFetchData;
