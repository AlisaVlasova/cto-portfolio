import { HashRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { pages } from "./pages";
import { useState } from "react";
// import Lightbox from "./Lightbox";
import Header from "./components/Header";

import './index.css';

const Home: React.FC = () => (
  <div className="home">
    <div className="home-inner">
      <img src="/image.png" className="home-logo" alt="" />
      <ul className="home-links">
        {pages.filter(p => p.path !== '/').map(p => (
          <li key={p.path}>
            <NavLink to={p.path}>{p.name}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ImageCard: React.FC<{ src: string; onClick?: () => void }> = ({ src, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="grid-item" onClick={onClick}>
      {!loaded && <div className="skeleton" />}
      <img
        src={src}
        alt=""
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={"grid-img" + (loaded ? " loaded" : "")}
      />
    </div>
  );
};

const ImageGrid: React.FC<{ folder: string; imageCount: number }> = ({ folder, imageCount }) => {
  // const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
// було: `${folder}/img${i + 1}.png` або з лідинг /
// стало (під .jpeg після нормалізації і з base):
const base = import.meta.env.BASE_URL;
const images = Array.from({ length: imageCount }, (_, i) => `${base}${folder}/img${i + 1}.jpeg`);

  return (
    <main className="main">
      <div className="grid-container">
        {images.map((src, i) => (
          <ImageCard key={i} src={src} />
        ))}
      </div>
      {/* <Lightbox src={lightboxSrc} alt="preview" onClose={() => setLightboxSrc(null)} /> */}
    </main>
  );
};

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      {pages.filter(p => p.path !== '/').map((p) => (
        <Route
          key={p.path}
          path={p.path}
          element={
            <>
              <Header />
              <ImageGrid folder={p.folder} imageCount={p.imageCount} />
            </>
          }
        />
      ))}
    </Routes>
  </Router>
);

export default App;
