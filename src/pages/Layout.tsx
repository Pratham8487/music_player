import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import { SearchProvider } from "../context/SearchContext";

const Layout = () => {
  return (
    <SearchProvider>
      <div className="bg-black text-white ">
        <Navbar />
        <div>
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    </SearchProvider>
  );
};

export default Layout;
