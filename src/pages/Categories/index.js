import Header from "components/Header";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./categories.module.scss";
import Item from "components/Item";
import Button from "components/Button";
import useFetchData from "services/useFecthData";
import { saveCartToLocalStorage } from "utils/cartItems";

export default function Categories() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { categories, items, cart } = useSelector((state) => {
    const regExp = new RegExp(state.search, "i"); //filtrando no campo de busca
    return {
      categories:
        state.categories.find((category) => category.id === categoryName) || {},
      items: state.items.filter(
        (item) => item.categoria === categoryName && item.titulo.match(regExp)
      ),
      cart: state.cart,
    };
  });

  //buscando dados
  useFetchData();

  //adicionando os itens do carrinho no localStorage.
  saveCartToLocalStorage(cart);

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
      <div onClick={() => console.log(items)} className={styles.items}>
        {items?.map((item) => (
          <Item key={item.id} {...item} preco={item?.preco} />
        ))}
      </div>
    </div>
  );
}
