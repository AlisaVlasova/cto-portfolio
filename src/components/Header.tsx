import { Link, useLocation } from "react-router-dom";
import { FaHome, FaInstagram } from "react-icons/fa";
import { pages } from "../pages";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const currentPage =
    pages.find((p) => p.path === location.pathname) || pages[0];
  
  const currentHref =
    pages.find((p) => p.path === location.pathname)?.href || pages[0]?.href || '';

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">
          <FaHome size={24} />
        </Link>

        <div className="nav-right">
          <span className="name">{currentPage.name}</span>
          <a
            href={currentHref}
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
