import styles from "./Navbar.module.scss";
import logo from "../../assets/logo.png";
import mobileLogo from "../../assets/mobileLogo.png";
import classNames from "classnames";
import { RiShoppingCart2Line, RiShoppingCartFill } from "react-icons/ri";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Search from "components/Search";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { iconMap } from "./iconMap";

const iconeProps = {
  color: "white",
  size: 26,
};

export default function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuBlur, setIsMenuBlur] = useState(false);
  const categories = useSelector((state) => state.categories);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsMenuBlur(!isMenuBlur);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {isMenuBlur && (
        <div className={styles.blurOverlay} onClick={handleMenu}></div>
      )}
      <div className={isMenuBlur ? styles.blurContent : ""}>
        <nav className={isHomePage ? styles.homeNav : styles.nav}>
          <div className={styles.containerLogo}>
            <Link to="/">
              {isHomePage ? (
                <img src={logo} className={styles.logo} />
              ) : (
                <picture>
                  <source srcSet={mobileLogo} media="(max-width: 768px)" />
                  <img src={logo} className={styles.logo} />
                </picture>
              )}
            </Link>
          </div>
          <div className={styles.containerIcones}>
            <div className={styles.containerBurguer}>
              <Link to="#" className={styles.burguer}>
                <AiOutlineMenu {...iconeProps} onClick={handleMenu} />
              </Link>
            </div>
            <div className={styles.busca}>
              <Search />
            </div>
            <div className={styles.icones}>
              <Link to="/carrinho">
                {location.pathname === "/carrinho" ? (
                  <RiShoppingCartFill {...iconeProps} />
                ) : (
                  <RiShoppingCart2Line {...iconeProps} />
                )}
              </Link>
            </div>
          </div>
          <div className={isMenuOpen ? styles.menuActive : styles.navMenu}>
            <ul className={styles.menuItems}>
              <li className={styles.navbarToggle}>
                <Link to="#" className={styles.menuBars} onClick={handleMenu}>
                  <AiOutlineClose {...iconeProps} />
                </Link>
              </li>
              {categories.map((category) => {
                const Icon = iconMap[category.id];
                return (
                  <li className={styles.links} key={category.id}>
                    <Link
                      to={`/categoria/${category.id}`}
                      className={classNames(styles.link, {
                        [styles.selected]: location.pathname === "/",
                      })}
                    >
                      {Icon && <Icon className={styles.menuIcons} />}
                      {category.nome}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
