import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";


export default function Layout() {
  return (
    <div className="max-w-[1500px] mx-auto "> 
      {/* px-4 taaki chhoti screen par thoda padding ho */}
      <Navbar />
      <main className="min-h-screen w-full pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
