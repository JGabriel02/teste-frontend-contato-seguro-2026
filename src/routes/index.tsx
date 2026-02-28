import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthorsPage from "../pages/AuthorsPage";
import BooksPage from "../pages/BooksPage";
import MainLayout from "../components/layout/MainLayout";

/**
 * Componente que contém as rotas da aplicação e o layout principal.
 */
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<AuthorsPage />} />
          <Route path="/books" element={<BooksPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
