import HeaderItem from "./HeaderItem";
import "./header.css"
/**
 * Renders a header component (navigation) with a list of items.
 *
 * @return {JSX.Element} The rendered header component.
 */

const Header = () => {
  const items = [
    {
      label: `Главная`,
      link: `/`,
    },
    {
      label: `Страница создания`,
      link: `/posts/new`,
    },
  ];

  return (
    <nav className="header__container">
      <ul className="menu__list">
        {items.map(({ label, link }) => (
          <HeaderItem key={label} label={label} link={link} />
        ))}
      </ul>
    </nav>
  );
};

export default Header;