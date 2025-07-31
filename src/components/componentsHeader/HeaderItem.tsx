
import { NavLink } from "react-router-dom";
import type { ItemProps } from "./type/ItemsProps";
/**
 * Renders a header item with a label and link.
 *
 * @param {ItemProps} label - The title text for the header item
 * @param {ItemProps} link - The link for the header item
 * @return {JSX.Element} A header item component
 */
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
