import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Utensils,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";
const Footer = () => {
  // Scroll to top handler
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="bg-gradient-to-r from-[#ee4d2d] via-[#ee4d2d] to-orange-500 text-white pt-12 pb-8 mt-16 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between gap-8">
        {/* Logo + giới thiệu */}
        <div className="flex-1 min-w-[200px] flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Utensils
              size={32}
              className="text-white bg-[#ee4d2d] rounded-full p-1"
            />
            <h2 className="text-2xl font-bold text-[#ee4d2d]">FoodGo</h2>
          </div>
          <p className="text-sm opacity-90">
            Đặt món ăn, giao hàng tận nơi nhanh chóng chỉ trong vài phút.
          </p>
        </div>

        {/* Về chúng tôi */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Utensils size={18} /> Về chúng tôi
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                className="hover:underline hover:text-yellow-200 transition-colors flex items-center gap-1"
              >
                <Utensils size={14} /> Giới thiệu
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-yellow-200 transition-colors flex items-center gap-1"
              >
                <Utensils size={14} /> Tin tức
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-yellow-200 transition-colors flex items-center gap-1"
              >
                <Utensils size={14} /> Tuyển dụng
              </a>
            </li>
          </ul>
        </div>

        {/* Hỗ trợ */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Mail size={18} /> Hỗ trợ
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                className="hover:underline hover:text-yellow-200 transition-colors flex items-center gap-1"
              >
                <Mail size={14} /> Trung tâm trợ giúp
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-yellow-200 transition-colors flex items-center gap-1"
              >
                <Phone size={14} /> Hướng dẫn đặt hàng
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-yellow-200 transition-colors flex items-center gap-1"
              >
                <MapPin size={14} /> Liên hệ
              </a>
            </li>
            <li className="mt-2 flex flex-col gap-1 text-xs text-white/80">
              <span className="flex items-center gap-1">
                <Mail size={12} /> Email: hungabc2307@gmail.com
              </span>
              <span className="flex items-center gap-1">
                <Phone size={12} /> Hotline: 0399897208
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={12} /> Địa chỉ:Chợ Mỗ Lao, Hà Đông
              </span>
            </li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Facebook size={18} /> Kết nối
          </h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-white/10 rounded-full p-2 hover:bg-[#ee4d2d] hover:text-white transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="bg-white/10 rounded-full p-2 hover:bg-[#ee4d2d] hover:text-white transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="bg-white/10 rounded-full p-2 hover:bg-[#ee4d2d] hover:text-white transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="bg-white/10 rounded-full p-2 hover:bg-[#ee4d2d] hover:text-white transition-colors duration-200"
              aria-label="Youtube"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Điều khoản & Copyright */}
      <div className="mt-10 border-t border-[#ee4d2d]/50 pt-5 text-center text-sm text-white/80 flex flex-col items-center gap-2">
        <div className="flex gap-4 flex-wrap justify-center">
          <a
            href="#"
            className="hover:underline hover:text-yellow-200 transition-colors"
          >
            Điều khoản sử dụng
          </a>
          <a
            href="#"
            className="hover:underline hover:text-yellow-200 transition-colors"
          >
            Chính sách bảo mật
          </a>
        </div>
        <span>Cảm ơn quý khách đã trải nghiệm dịch vụ của FoodGo </span>
        <button
          onClick={handleScrollTop}
          className="mt-2 flex items-center gap-1 px-3 py-1 bg-[#ee4d2d] text-white rounded-full hover:bg-orange-500 transition-colors text-xs shadow"
        >
          <ArrowUp size={16} /> Lên đầu trang
        </button>
      </div>
    </footer>
  );
};

export default Footer;
