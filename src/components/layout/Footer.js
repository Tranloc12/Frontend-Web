import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #07070f 0%, #0d0d1a 100%)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      color: '#94a3b8',
      fontFamily: "'Inter', sans-serif",
      paddingTop: '60px',
      paddingBottom: '0',
    }}>
      <Container>
        <Row className="g-4 pb-5">
          {/* Brand */}
          <Col md={4}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '42px', height: '42px',
                background: 'linear-gradient(135deg, #e75702, #ff7a30)',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(231,87,2,0.35)',
              }}>
                <i className="fa-solid fa-bus" style={{ fontSize: '20px', color: '#fff' }}></i>
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>
                Xe<span style={{
                  background: 'linear-gradient(135deg, #e75702, #ff7a30)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>Khách</span>
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '24px' }}>
              Hệ thống đặt vé xe khách trực tuyến tiện lợi và nhanh chóng.
              Đặt vé dễ dàng, an toàn và tiết kiệm thời gian cho hành trình của bạn!
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { href: 'https://facebook.com', icon: <FaFacebook size={18} />, color: '#1877f2' },
                { href: 'https://twitter.com', icon: <FaTwitter size={18} />, color: '#1da1f2' },
                { href: 'https://instagram.com', icon: <FaInstagram size={18} />, color: '#e4405f' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  width: '40px', height: '40px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#64748b',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = s.color + '22'; e.currentTarget.style.borderColor = s.color + '55'; e.currentTarget.style.color = s.color; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#64748b'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </Col>

          {/* Quick links */}
          <Col md={2} xs={6}>
            <h6 style={{ color: '#fff', fontWeight: 700, marginBottom: '20px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Điều hướng
            </h6>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { to: '/', label: 'Trang chủ' },
                { to: '/trips', label: 'Danh sách chuyến' },
                { to: '/routes', label: 'Tuyến đường' },
                { to: '/bookings-history', label: 'Vé của tôi' },
              ].map((l, i) => (
                <Link key={i} to={l.to} style={{
                  color: '#64748b', textDecoration: 'none', fontSize: '0.9rem',
                  transition: 'all 0.25s ease', display: 'flex', alignItems: 'center', gap: '6px',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#ff7a30'; e.currentTarget.style.paddingLeft = '6px'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.paddingLeft = '0'; }}
                >
                  <span style={{ width: '4px', height: '4px', background: '#e75702', borderRadius: '50%', flexShrink: 0 }}></span>
                  {l.label}
                </Link>
              ))}
            </nav>
          </Col>

          {/* Services */}
          <Col md={2} xs={6}>
            <h6 style={{ color: '#fff', fontWeight: 700, marginBottom: '20px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Dịch vụ
            </h6>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { to: '/login', label: 'Đăng nhập' },
                { to: '/register', label: 'Đăng ký' },
                { to: '/my-reviews', label: 'Đánh giá' },
                { to: '/payments-history', label: 'Giao dịch' },
              ].map((l, i) => (
                <Link key={i} to={l.to} style={{
                  color: '#64748b', textDecoration: 'none', fontSize: '0.9rem',
                  transition: 'all 0.25s ease', display: 'flex', alignItems: 'center', gap: '6px',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#ff7a30'; e.currentTarget.style.paddingLeft = '6px'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.paddingLeft = '0'; }}
                >
                  <span style={{ width: '4px', height: '4px', background: '#e75702', borderRadius: '50%', flexShrink: 0 }}></span>
                  {l.label}
                </Link>
              ))}
            </nav>
          </Col>

          {/* Contact */}
          <Col md={4}>
            <h6 style={{ color: '#fff', fontWeight: 700, marginBottom: '20px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Liên hệ
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: <FaEnvelope />, text: 'support@xekhach.com', color: '#e75702' },
                { icon: <FaPhone />, text: '1900 6067', color: '#22c55e' },
                { icon: <FaMapMarkerAlt />, text: 'TP. Hồ Chí Minh, Việt Nam', color: '#3b82f6' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px', flexShrink: 0,
                    background: c.color + '18',
                    border: `1px solid ${c.color}30`,
                    borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: c.color, fontSize: '0.9rem',
                  }}>
                    {c.icon}
                  </div>
                  <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{c.text}</span>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '20px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ color: '#475569', fontSize: '0.85rem', margin: 0 }}>
            © {year} <span style={{ color: '#ff7a30', fontWeight: 600 }}>XeKhách</span>. All rights reserved.
          </p>
          <p style={{ color: '#334155', fontSize: '0.82rem', margin: 0 }}>
            Built with <span style={{ color: '#ef4444' }}>❤️</span> by Nhóm 12
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
