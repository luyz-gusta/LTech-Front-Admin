import {
  Menu,
  menuClasses,
  MenuItem,
  Sidebar,
  sidebarClasses,
} from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegFolder, FaRegUser } from "react-icons/fa";
import { LuTags } from "react-icons/lu";
import { AiOutlineShop } from "react-icons/ai";
import { GoGear } from "react-icons/go";
import { IoExitOutline } from "react-icons/io5";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/logo-nav.svg";
import styles from "./styles.module.scss";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth()

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar
      backgroundColor="#0e0520"
      style={{ border: "none !important" }}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: '12px',
          border: "none !important",
          height: "100% !important",
          minHeight: "100vh",
        },
        [`.${sidebarClasses.root}`]: {
          border: "none !important",
        },
      }}
    >
      <div className={`${styles.containerMenu}`}>
        <div className={styles.boxImg}>
          <img src={logo} onClick={() => navigate("/")} alt="Logo da ltech" />
        </div>
        <Menu
          menuItemStyles={{
            button: ({ level, active }) => {
              if (level === 0)
                return {
                  backgroundColor: active ? "#814DE5" : undefined,
                  borderRadius: "6px",
                };
            },
          }}
          rootStyles={{
            [`.${menuClasses.menuItemRoot}`]: {
              color: "#fff !important",
              margin: "8px 0px",
              padding: "0px 20px",

              "&:first-of-type": {
                marginTop: "32px !important",
              },
            },
            [`.${menuClasses.button}`]: {
              transition: "all 0.3s",
              paddingLeft: "0px !important",
              paddingRight: "0px !important",
              "& > span": {
                zIndex: 100,
              },
              "&:hover": {
                backgroundColor: "#814DE5",
              },
            },
          }}
        >
          <MenuItem
            icon={<FaRegUser size={20} />}
            component={<Link to="/admin" />}
            active={isActive("/admin")}
          >
            Usuários
          </MenuItem>
          <MenuItem
            icon={<LuTags size={20} />}
            active={isActive("/admin/marcas")}
            component={<Link to="/admin/marcas" />}
          >
            Marcas
          </MenuItem>
          <MenuItem
            icon={<FaRegFolder size={20} />}
            component={<Link to="/admin/categorias" />}
            active={isActive("/admin/categorias")}
          >
            Categorias
          </MenuItem>
          <MenuItem
            icon={<AiOutlineShop size={22} />}
            component={<Link to="/admin/produtos" />}
            active={isActive("/admin/produtos")}
          >
            Produtos
          </MenuItem>
        </Menu>
      </div>
      <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            if (level === 0)
              return {
                backgroundColor: active ? "#814DE5" : undefined,
                borderRadius: "6px",
              };
          },
        }}
        rootStyles={{
          [`.${menuClasses.menuItemRoot}`]: {
            color: "#fff !important",
            margin: "8px 0px",
            padding: "0px 20px",

            "&:first-of-type": {
              marginTop: "32px !important",
            },
          },
          [`.${menuClasses.button}`]: {
            transition: "all 0.3s",
            paddingLeft: "0px !important",
            paddingRight: "0px !important",
            "& > span": {
              zIndex: 100,
            },
            "&:hover": {
              backgroundColor: "#814DE5",
            },
          },
        }}
      >
        <MenuItem
          icon={<GoGear size={20} />}
          component={<Link to="/admin/conta" />}
        >
          Configurações
        </MenuItem>
        <MenuItem
          icon={<IoExitOutline size={20} />}
          onClick={auth.logout}
        >
          Sair
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
