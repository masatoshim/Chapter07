import './App.css';
import HomePage from './components/HomePage.js';
import DetailPage from './components/DetailPage.js'
import ContactPage from './components/ContactPage.js';
import { Link,Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <header className="header">
        <Link to={`/`} className="header-link">Blog</Link>
        <Link to={`/contact`} className="header-link">お問い合わせ</Link>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:id" element={<DetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}
