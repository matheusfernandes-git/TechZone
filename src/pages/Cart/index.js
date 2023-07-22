import Header from "components/Header";
import styles from "./Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Item from "components/Item";
import { resetCart } from "store/reducers/cart";
import { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsCreditCard } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { TfiMoney } from "react-icons/tfi";
import { GoLocation } from "react-icons/go";
import Button from "components/Button";
import Input from "components/Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const iconsProps = {
  color: "#FF6500",
  size: 25,
};

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [paymentError, setPaymentError] = useState();
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const { cart, totalItens, totalFrete } = useSelector((state) => {
    let total = 0;
    let frete = 15.8;
    const regExp = new RegExp(state.search, "i");
    const cartReduce = state.cart.reduce((items, itemInCart) => {
      const item = state.items.find((item) => item.id === itemInCart.id);
      total += item.preco * itemInCart.amount;
      if (item.titulo.match(regExp)) {
        items.push({
          ...item,
          amount: itemInCart.amount,
        });
      }
      return items;
    }, []);
    return {
      cart: cartReduce,
      totalItens: total,
      totalFrete: total + frete,
    };
  });
  const { register, handleSubmit, formState, reset } = useForm({});

  const handleFormsSubmit = (data) => {
    if (!data.paymentOption) {
      setPaymentError("Escolha uma opção de pagamento");
      return;
    }
    setFormValues(data);
    console.log(data);
    dispatch(resetCart());
    setCompleted(!completed);
    reset();
  };

  const handlePaymentOptionChange = (event) => {
    setSelectedPaymentOption(event.target.value);
  };

  const divisionOptions = [
    {
      option: `À vista - R$ ${totalFrete.toFixed(2)}`,
      id: 1,
    },
    {
      option: `2x sem juros - R$ ${(totalFrete / 2).toFixed(2)}`,
      id: 2,
    },
    {
      option: `3x sem juros - R$ ${(totalFrete / 3).toFixed(2)}`,
      id: 3,
    },
    {
      option: `4x sem juros - R$ ${(totalFrete / 4).toFixed(2)}`,
      id: 4,
    },
    {
      option: `5x sem juros - R$ ${(totalFrete / 5).toFixed(2)}`,
      id: 5,
    },
    {
      option: `6x sem juros - R$ ${(totalFrete / 6).toFixed(2)}`,
      id: 6,
    },
    {
      option: `7x sem juros - R$ ${(totalFrete / 7).toFixed(2)}`,
      id: 7,
    },
    {
      option: `8x sem juros - R$ ${(totalFrete / 8).toFixed(2)}`,
      id: 8,
    },
  ];

  const { errors } = formState;

  return (
    <>
      {completed ? (
        <Header
          title="Compra Finalizada"
          describe="Obrigado por comprar com a TechZone!"
        />
      ) : (
        <Header
          title="Carrinho de compras"
          describe="Confira os produtos que você adicionou no carrinho"
        />
      )}
      <section className={styles.container}>
        {cart.length > 0 && (
          <div className={styles.containerExtras}>
            <div className={styles.containerAdress}>
              <h4>
                <CiLocationOn {...iconsProps} /> Endereço de Entrega
              </h4>
              <form
                className={styles.adressForm}
                onSubmit={handleSubmit(handleFormsSubmit)}
              >
                <Input
                  error={errors.cep}
                  type="number"
                  {...register("cep", { required: "Informe o CEP" })}
                  placeholder="CEP"
                  inputclass={styles.cepInput}
                />
                {errors.cep && (
                  <span className={styles.msgError}>{errors.cep.message}</span>
                )}
                <Input
                  error={errors.rua}
                  {...register("rua", { required: "Informe a rua" })}
                  placeholder="Rua"
                />
                {errors.rua && (
                  <span className={styles.msgError}>{errors.rua.message}</span>
                )}
                <div className={styles.smallerInputs}>
                  <div className={styles.inputContainer}>
                    <Input
                      error={errors.numero}
                      type="number"
                      {...register("numero", {
                        required: "Informe o número",
                      })}
                      placeholder="Número"
                      inputclass={styles.smallerInput}
                    />
                    {errors.numero && (
                      <span className={styles.msgError}>
                        {errors.numero.message}
                      </span>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <Input
                      error={errors.complemento}
                      {...register("complemento")}
                      placeholder="Complemento (opcional)"
                      inputclass={styles.compleInput}
                    />
                  </div>
                </div>
                <div className={styles.smallerInputs}>
                  <div className={styles.inputContainer}>
                    <Input
                      error={errors.bairro}
                      {...register("bairro", {
                        required: "Informe o bairro",
                      })}
                      placeholder="Bairro"
                      inputclass={styles.smallerInput}
                    />
                    {errors.bairro && (
                      <span className={styles.msgError}>
                        {errors.bairro.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className={styles.inputContainer}>
                      <Input
                        error={errors.cidade}
                        {...register("cidade", {
                          required: "Informe a cidade",
                        })}
                        placeholder="Cidade"
                        inputclass={styles.cityInput}
                      />
                      {errors.cidade && (
                        <span className={styles.msgError}>
                          {errors.cidade.message}
                        </span>
                      )}
                    </div>
                    <div className={styles.inputContainer}>
                      <Input
                        error={errors.uf}
                        {...register("uf", {
                          required: "Informe a UF",
                        })}
                        placeholder="UF"
                        inputclass={styles.ufInput}
                      />
                      {errors.uf && (
                        <span className={styles.msgError}>
                          {errors.uf.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <section className={styles.containerPayment}>
              <h4>
                <TfiMoney {...iconsProps} /> Pagamento
              </h4>
              <p>Escolha a forma que deseja pagar</p>
              <form
                className={styles.payment}
                onSubmit={handleSubmit(handleFormsSubmit)}
              >
                <label>
                  <Input
                    paymentinputs={styles.radioInput}
                    type="radio"
                    value="Cartao"
                    {...register("paymentOption", {
                      required: "Escolha uma opção de pagamento",
                    })}
                    onChange={handlePaymentOptionChange}
                  />
                  Cartão
                </label>
                {selectedPaymentOption === "Cartao" ? (
                  <section className={styles.containerCard}>
                    <div className={styles.formCard}>
                      <Input
                        error={errors.nomeCartao}
                        {...register("nomeCartao", {
                          required: "Informe o nome",
                        })}
                        cardinput={styles.cardName}
                        type="text"
                        placeholder="Nome do cartão"
                      />
                      {errors.nomeCartao && (
                        <span className={styles.msgError}>
                          {errors.nomeCartao.message}
                        </span>
                      )}
                      <Input
                        error={errors.numCartao}
                        {...register("numCartao", {
                          required: "Informe o número",
                        })}
                        cardinput={styles.cardNumber}
                        type="number"
                        placeholder="Número do cartão"
                      />
                      {errors.numCartao && (
                        <span className={styles.msgError}>
                          {errors.numCartao.message}
                        </span>
                      )}
                      <div className={styles.cardSmallerInputs}>
                        <div className={styles.containerSmallers}>
                          <Input
                            error={errors.mesCartao}
                            {...register("mesCartao", {
                              required: "Informe o mês",
                            })}
                            cardinputs={styles.cardMonth}
                            type="number"
                            placeholder="Mês"
                          />
                          {errors.mesCartao && (
                            <span className={styles.msgError}>
                              {errors.mesCartao.message}
                            </span>
                          )}
                        </div>
                        <div className={styles.containerSmallers}>
                          <Input
                            error={errors.anoCartao}
                            {...register("anoCartao", {
                              required: "Informe o ano",
                            })}
                            cardinputs={styles.cardYear}
                            type="number"
                            placeholder="Ano"
                          />
                          {errors.anoCartao && (
                            <span className={styles.msgError}>
                              {errors.anoCartao.message}
                            </span>
                          )}
                        </div>
                        <div className={styles.containerSmallers}>
                          <Input
                            error={errors.cvc}
                            {...register("cvc", { required: "Informe o cvc" })}
                            cardinputs={styles.cardCvc}
                            type="number"
                            placeholder="CVC"
                          />
                          {errors.cvc && (
                            <span className={styles.msgError}>
                              {errors.cvc.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <select
                        className={errors.divisao && styles["input-erro"]}
                        {...register("divisao", {
                          required: "Selecione uma Forma de pagamento",
                        })}
                      >
                        {divisionOptions.map((installment) => (
                          <option
                            key={installment.id}
                            value={installment.option}
                          >
                            {installment.option}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.divisao && (
                      <span className={styles.msgError}>
                        {errors.divisao.message}
                      </span>
                    )}
                  </section>
                ) : (
                  ""
                )}
                <label>
                  <Input
                    paymentinputs={styles.radioInput}
                    type="radio"
                    value="Boleto"
                    {...register("paymentOption", {
                      required: "Escolha uma opção de pagamento",
                    })}
                    onChange={handlePaymentOptionChange}
                  />
                  Boleto
                </label>
                <label>
                  <Input
                    paymentinputs={styles.radioInput}
                    type="radio"
                    value="PIX"
                    {...register("paymentOption", {
                      required: "Escolha uma opção de pagamento",
                    })}
                    onChange={handlePaymentOptionChange}
                  />
                  PIX
                </label>
                {errors.paymentOption && (
                  <div className={styles.msgError}>
                    <span>{errors.paymentOption.message}</span>
                  </div>
                )}
              </form>
            </section>
          </div>
        )}
        {!completed && cart.length > 0 && (
          <div className={styles.carrinho}>
            {cart.map((item) => (
              <Item key={item.id} {...item} cart />
            ))}
            <div className={styles.total}>
              <strong className={styles.totalTitulo}>Resumo da compra</strong>
              <span>
                Total de itens: <strong>R$ {totalItens.toFixed(2)}</strong>
              </span>
              <span>
                Entrega: <strong>R$ 15.80</strong>
              </span>
              <span>
                Subtotal: <strong> R$ {totalFrete.toFixed(2)} </strong>
              </span>
            </div>
            <Button type="submit" onClick={handleSubmit(handleFormsSubmit)}>
              Finalizar compra
            </Button>
          </div>
        )}
        {!completed && cart.length === 0 && (
          <div className={styles.withoutProduct}>
            <h2>O seu carrinho está vazio.</h2>
            <div className={styles.emptyBtn}>
              <Button onClick={() => navigate("/")}>Compre ou anuncie</Button>
            </div>
          </div>
        )}
        {completed && (
          <section className={styles.completedPurchase}>
            <div className={styles.tituloCompleted}>
              <h2>
                Eba!{" "}
                <strong style={{ color: "#FF6500" }}>Pedido confirmado</strong>
              </h2>
              <p>Agora é só aguardar que logo chegará até você</p>
            </div>
            <div className={styles.containerCompleted}>
              <span>
                <GoLocation {...iconsProps} />
                <p>
                  Entregar em{" "}
                  <strong>
                    {formValues.rua}, {formValues.numero} <br />
                    {formValues.bairro} - {formValues.uf.toUpperCase()}
                  </strong>
                </p>
              </span>
              <span>
                <AiOutlineClockCircle {...iconsProps} />
                <p>
                  Previsão de entrega: <strong>8 a 15 dias</strong>
                </p>
              </span>
              <span>
                <TfiMoney {...iconsProps} />
                <p>
                  Pagamento: <strong>{selectedPaymentOption}</strong>
                </p>
              </span>
            </div>
          </section>
        )}
      </section>
    </>
  );
}
