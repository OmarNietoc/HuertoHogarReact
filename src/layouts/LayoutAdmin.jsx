import { Outlet } from "react-router-dom";
import HeaderAdmin from "../pages/admin/HeaderAdmin";
import Footer from "../pages/Footer";

export default function LayoutAdmin() {
  return (
    <>
      <HeaderAdmin />
      <main className="container my-5 pt-5">
        <Outlet /> {/* Aquí se carga AdminHome, Usuarios, etc. */}
      </main>
      <Footer />
    </>
  );
}
