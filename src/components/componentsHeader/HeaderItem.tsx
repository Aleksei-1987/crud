
import { NavLink } from "react-router-dom";
import type { ItemProps } from "./type/ItemsProps";

const HeaderItem = ({ label, link }: ItemProps) => {
    const active = ({ isActive }: { isActive: boolean }): string => {
        return isActive ? "menu_item__active" : "menu_item";
    };

    return (
        <NavLink to={link} className={active}>
            {label}
        </NavLink>
    );
};

export default HeaderItem;
