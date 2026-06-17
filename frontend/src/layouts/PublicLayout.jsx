import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Fotter.jsx";

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0b1020] text-white">
      {/* Global Public Navbar */}
      <Navbar />

      {/* Public Page Content */}
      <main>{children}</main>

      {/* Global Public Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;