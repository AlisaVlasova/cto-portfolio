import { Link, useLocation } from "react-router-dom";
import { FaHome, FaInstagram } from "react-icons/fa";
import { pages } from "../pages"; // твій масив сторінок
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const currentPage =
    pages.find((p) => p.path === location.pathname) || pages[0];

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">
          <FaHome size={24} />
        </Link>

        <div className="nav-right">
          <span className="name">{currentPage.name}</span>
          <a
            href="https://www.instagram.com/garnajinka"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </nav>
    </header>
  );
}
