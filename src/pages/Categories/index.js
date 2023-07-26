import Header from "components/Header";
import { useSelector } from "react-redux";
import { json, useNavigate, useParams } from "react-router-dom";
import styles from "./categories.module.scss";
import Item from "components/Item";
import Button from "components/Button";
import useFetchData from "services/useFecthData";
import { useEffect, useState } from "react";

export default function Categories() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState(null);
  const { categories, items } = useSelector((state) => {
    const regExp = new RegExp(state.search, "i"); //filtrando no campo de busca
    return {
      categories:
        state.categories.find((category) => category.id === categoryName) || {},
      items: state.items.filter(
        (item) => item.categoria === categoryName && item.titulo.match(regExp)
      ),
    };
  });
  //buscando dados
  useFetchData();

  useEffect(() => {
    // Retrieve the new item from localStorage and set it to the state
    const storedItem = localStorage.getItem("newItem");
    if (storedItem) {
      const parsedItem = JSON.parse(storedItem);
      setNewItem(parsedItem);
    }
  }, []);

  return (
    <div>
      <Header
        title={categories.nome}
        describe={categories.descricao}
        img={categories.header}
        className={styles.header}
      >
        <Button onClick={() => navigate(`/anuncie/${categoryName}`)}>
          Quero anunciar
        </Button>
      </Header>
      <div className={styles.items}>
        {/* {newItem && (
          <Item key={newItem.id} {...newItem} preco={newItem.preco} />
        )} */}
        {items?.map((item) => (
          <Item key={item.id} {...item} preco={item?.preco || 0} />
        ))}
      </div>
    </div>
  );
}
