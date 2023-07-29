import styles from "./Item.module.scss";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineCheck,
  AiFillEdit,
  AiFillCloseCircle,
} from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { changeFavorite, changeItem, deleteItem } from "store/reducers/items";
import { useDispatch, useSelector } from "react-redux";
import { changeAmount, changeCart, deleteCartItem } from "store/reducers/cart";
import classNames from "classnames";
import { useState } from "react";
import Input from "components/Input";
import newItemService from "services/newItem";

const iconeProps = {
  size: 24,
  color: "#041833",
};

const amountProps = {
  size: 30,
  color: "#FF6500",
};

export default function Item(props) {
  const { titulo, foto, preco, favorito, id, cart, amount, novo } = props;
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(titulo);
  const [newPrice, setNewPrice] = useState(preco);
  const dispatch = useDispatch();
  const isInCart = useSelector((state) =>
    state.cart.some((itemInCart) => itemInCart.id === id)
  );

  const handleFavorite = () => {
    dispatch(changeFavorite(id));
  };

  const handleCart = () => {
    dispatch(changeCart(id));
  };

  const handleDecrement = () => {
    if (amount >= 1) {
      dispatch(changeAmount({ id, amount: -1 }));
    }
  };

  const handleIncrement = () => {
    dispatch(changeAmount({ id, amount: +1 }));
  };

  const handleDeleteItem = async () => {
    if (novo && !cart) {
      await newItemService.delete(id);
      dispatch(deleteItem(id));
    } else {
      dispatch(deleteCartItem(id));
    }
  };

  const editNewItem = async () => {
    // const itemId = id;
    await newItemService.edit(id, newTitle, newPrice);
    setEditMode(false);
    dispatch(
      changeItem({
        id: id,
        item: { title: newTitle, price: newPrice },
      })
    );
  };

  const editModeComponent = (
    <>
      {editMode ? (
        <AiOutlineCheck
          onClick={editNewItem}
          {...iconeProps}
          className={styles.acao}
        />
      ) : (
        <AiFillEdit
          onClick={() => setEditMode(!editMode)}
          {...iconeProps}
          className={styles.acao}
        />
      )}
    </>
  );

  return (
    <div
      className={classNames(styles.item, {
        [styles.itemNoCarrinho]: cart,
      })}
    >
      {(novo || cart) && (
        <AiFillCloseCircle
          {...iconeProps}
          className={`${styles.acao} ${styles["item-deletar"]}`}
          onClick={handleDeleteItem}
        />
      )}
      <div className={styles.imagem}>
        <img src={foto} alt={titulo} />
      </div>
      <div className={styles.descricao}>
        <div className={styles.titulo}>
          {editMode ? (
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          ) : (
            <h2>{titulo}</h2>
          )}
        </div>
        <div className={styles.info}>
          <div className={styles.preco}>
            {editMode ? (
              <Input
                style={{ width: "140px" }}
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(parseFloat(e.target.value))}
              />
            ) : (
              <>R$ ${preco.toFixed(2)}</>
            )}
          </div>
          <div className={styles.acoes}>
            <div className={styles.item_favorite}>
              {favorito ? (
                <AiFillHeart
                  {...iconeProps}
                  color="#ff0000"
                  className={styles.acao}
                  onClick={handleFavorite}
                />
              ) : (
                <AiOutlineHeart
                  {...iconeProps}
                  className={styles.acao}
                  onClick={handleFavorite}
                />
              )}
            </div>
            {cart ? (
              <div className={styles.quantidade}>
                <AiFillMinusCircle {...amountProps} onClick={handleDecrement} />
                <span>{String(amount || 0).padStart(2, "0")}</span>
                <AiFillPlusCircle {...amountProps} onClick={handleIncrement} />
              </div>
            ) : (
              <>
                <FaCartPlus
                  {...iconeProps}
                  color={isInCart ? "#FF6500" : iconeProps.color}
                  className={styles.acao}
                  onClick={handleCart}
                />
                {novo && editModeComponent}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
