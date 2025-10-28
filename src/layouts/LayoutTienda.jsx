import { Outlet } from "react-router-dom";
import Header from "../pages/Header";
import Footer from "../pages/Footer";

export default function LayoutTienda() {
  return (
    <>
      <Header />
      <main className="container my-5 pt-5">
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
}