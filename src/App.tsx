import './App.css';
import HomePage from './components/HomePage';
import DetailPage from './components/DetailPage'
import ContactPage from './components/ContactPage';
import { Link, Routes, Route } from "react-router-dom";

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
