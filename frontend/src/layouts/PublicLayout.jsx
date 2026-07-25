import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Fotter.jsx";

const PublicLayout = ({ children }) => {
  return (
<div className="min-h-screen overflow-x-hidden bg-[#F0F2F5] text-[#0D3A1D] font-sans selection:bg-[#93B733] selection:text-white">        <Navbar />

      {/* Public Page Content */}
      <main>{children}</main>

      {/* Global Public Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;