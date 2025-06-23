import "./Footer.css";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaHome,
  FaFilm,
  FaTv,
  FaGamepad,
  FaPhone,
  FaBug,
  FaHeart,
  FaFileContract,
  FaShieldAlt,
} from "react-icons/fa";
import { MdMovie, MdTv } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section footer-brand">
            <h3 className="footer-logo">
              <MdMovie className="logo-icon" />
              PhimHay
            </h3>
            <p className="footer-description">
              Nơi cung cấp những bộ phim hay nhất với chất lượng cao. Xem phim
              miễn phí, không quảng cáo.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Liên kết nhanh</h4>
            <ul className="footer-links">
              <li>
                <a href="/">
                  <FaHome className="link-icon" />
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="/phim-le">
                  <FaFilm className="link-icon" />
                  Phim lẻ
                </a>
              </li>
              <li>
                <a href="/phim-bo">
                  <MdTv className="link-icon" />
                  Phim bộ
                </a>
              </li>
              <li>
                <a href="/hoat-hinh">
                  <FaGamepad className="link-icon" />
                  Hoạt hình
                </a>
              </li>
              <li>
                <a href="/tv-shows">
                  <FaTv className="link-icon" />
                  TV Shows
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h4 className="footer-title">Thể loại phổ biến</h4>
            <ul className="footer-links">
              <li>
                <a href="/the-loai/hanh-dong">Hành động</a>
              </li>
              <li>
                <a href="/the-loai/kinh-di">Kinh dị</a>
              </li>
              <li>
                <a href="/the-loai/hai-huoc">Hài hước</a>
              </li>
              <li>
                <a href="/the-loai/tinh-cam">Tình cảm</a>
              </li>
              <li>
                <a href="/the-loai/khoa-hoc-vien-tuong">Khoa học viễn tưởng</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4 className="footer-title">Hỗ trợ</h4>
            <ul className="footer-links">
              <li>
                <a href="/lien-he">
                  <FaPhone className="link-icon" />
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="/bao-loi">
                  <FaBug className="link-icon" />
                  Báo lỗi
                </a>
              </li>
              <li>
                <a href="/yeu-cau-phim">
                  <FaHeart className="link-icon" />
                  Yêu cầu phim
                </a>
              </li>
              <li>
                <a href="/dieu-khoan">
                  <FaFileContract className="link-icon" />
                  Điều khoản
                </a>
              </li>
              <li>
                <a href="/chinh-sach">
                  <FaShieldAlt className="link-icon" />
                  Chính sách
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2025 PhimHay. Tất cả quyền được bảo lưu.
            </p>
            <div className="footer-bottom-links">
              <a href="/dieu-khoan">Điều khoản sử dụng</a>
              <span className="separator">|</span>
              <a href="/chinh-sach">Chính sách bảo mật</a>
              <span className="separator">|</span>
              <a href="/lien-he">Liên hệ</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
