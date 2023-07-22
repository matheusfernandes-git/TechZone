import Header from "components/Header";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./categories.module.scss";
import Item from "components/Item";
import Button from "components/Button";
import useFetchData from "services/useFecthData";

export default function Categories() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  useFetchData();
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

  const teste = () => {
    console.log(items);
  }

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
      <div onClick={teste} className={styles.items}>
        {items?.map((item) => (
          <Item key={item.id} {...item} preco={item?.preco || 0} /> 
        ))}
      </div>
    </div>
  );
}
