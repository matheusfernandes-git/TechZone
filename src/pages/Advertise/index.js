import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Advertise.module.scss";
import { BiArrowBack } from "react-icons/bi";
import Button from "components/Button";
import { useForm } from "react-hook-form"; //react form library
import { addNewItem } from "store/reducers/items";
import { useNavigate, useParams } from "react-router-dom";
import Input from "components/Input";
import { useState } from "react";
import useFetchData from "services/useFecthData";
import newItemService from "services/newItem";
import { v4 as uuid } from "uuid";

export default function Advertise() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryName = "" } = useParams();
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showRegisterBtn, setRegisterBtn] = useState(true);
  const { categories, itemId } = useSelector((state) => {
    return {
      categories: state.categories.map(({ nome, id }) => ({ nome, id })),
      itemId: state.items.length > 0 ? uuid() : 1,
    };
  });

  useFetchData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      categoria: categoryName,
    },
  });

  const registerProduct = async (product) => {
    const newItem = { ...product, novo: true, id: itemId };
    await newItemService.add(newItem); //adiciona o item na API
    dispatch(addNewItem(newItem));  //adiciona no estado do redux
    reset();
    setRegisterBtn(false);
    setShowSuccessMsg(true);
  };

  const handleInputFocus = () => {
    setShowSuccessMsg(false);
    setRegisterBtn(true);
  };

  const showh2Component = (
    <>
      {showSuccessMsg && !categoryName && (
        <h2 className={styles.successMsg}>Produto cadastrado com sucesso!</h2>
      )}
    </>
  );

  const showProductBtnComponent = (
    <>
      {showSuccessMsg && categoryName && (
        <Button onClick={() => navigate(`/categoria/${categoryName}`)}>
          <BiArrowBack className={styles.backIcon} size={24} />
          Ver produto cadastrado
        </Button>
      )}
    </>
  );

  return (
    <div className={styles.container}>
      <Header
        title="Anuncie aqui"
        describe="anuncie seu produto no melhor site do Brasil!"
      />
      <form className={styles.form} onSubmit={handleSubmit(registerProduct)}>
        <Input
          error={errors.titulo}
          {...register("titulo", { required: "Informe um nome" })}
          placeholder="Nome do produto"
          onFocus={handleInputFocus}
        />
        {errors.titulo && (
          <span className={styles["msg-erro"]}>{errors.titulo.message}</span>
        )}
        <Input
          error={errors.foto}
          {...register("foto", { required: "Insira uma foto do produto" })}
          placeholder="URL da imagem do produto"
          onFocus={handleInputFocus}
        />
        {errors.foto && (
          <span className={styles["msg-erro"]}>{errors.foto.message}</span>
        )}
        <select
          className={errors.categoria && styles["input-erro"]}
          {...register("categoria", { required: "Selecione uma categoria" })}
          disabled={categoryName}
        >
          <option value="">Selecione a categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.nome}
            </option>
          ))}
        </select>
        {errors.categoria && (
          <span className={styles["msg-erro"]}>{errors.categoria.message}</span>
        )}
        <Input
          error={errors.preco}
          {...register("preco", {
            required: "Informe um preço",
            valueAsNumber: true,
          })}
          type="number"
          placeholder="Preço do produto"
          onFocus={handleInputFocus}
        />
        {errors.preco && (
          <span className={styles["msg-erro"]}>{errors.preco.message}</span>
        )}
        {showRegisterBtn && <Button type="submit">Cadastrar produto</Button>}
        {showh2Component}
        {showProductBtnComponent}
      </form>
    </div>
  );
}
