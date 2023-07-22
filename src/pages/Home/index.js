import Header from "components/Header";
import styles from "./home.module.scss";
import watch from "assets/gamer1.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "components/Button";
import { useEffect } from "react";
import { searchCategories } from "store/reducers/categories";
import { searchItems } from "store/reducers/items";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchCategories());
    dispatch(searchItems());
    searchItems();
  }, [dispatch, searchItems]);

  return (
    <div>
      <Header
        title="Bem-vindo ao TechZone"
        describe="Compre e anuncie seus produtos no principal site para entusiastas de tecnologia no Brasil."
        className={styles.header}
        img={watch}
      >
        <Button onClick={() => navigate("/anuncie")}>Quero Anunciar</Button>
      </Header>

    </div>
  );
}
