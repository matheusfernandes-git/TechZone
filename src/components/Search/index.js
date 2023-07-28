import { changeSearch, resetSearch } from "store/reducers/search";
import styles from "./Busca.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Search() {
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(resetSearch());
  }, [location.pathname, dispatch]);
  return (
    <div className={styles.busca}>
      <input
        className={styles.input}
        placeholder="Buscar"
        value={search}
        onChange={(e) => dispatch(changeSearch(e.target.value))}
      />
    </div>
  );
}
