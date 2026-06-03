import { useContext, useEffect, useState } from "react";
import { Container, Image, Nav, Navbar, NavDropdown, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MyDispatchContext, MyUserContext } from "../../contexts/Contexts";
import RoleBasedComponent from "../common/RoleBasedComponent";
import { ROLES } from "../../utils/roleUtils";
import { FaBell } from 'react-icons/fa';
import "../../index.css";

const Header = () => {
  const nav = useNavigate();
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);
  const [unreadCount, setUnreadCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const calculateUnreadCount = () => {
    if (!user) return 0;
    const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    return storedNotifications.filter(n => !n.read).length;
  };

  useEffect(() => {
    setUnreadCount(calculateUnreadCount());
    const handleStorageChange = (e) => {
      if (e.key === 'notifications' || e.key === null) setUnreadCount(calculateUnreadCount());
    };
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user]);

  return (
    <Navbar expand="lg" style={{
      background: scrolled ? 'rgba(10,10,15,0.97)' : 'rgba(10,10,15,0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : '0 2px 20px rgba(0,0,0,0.2)',
      padding: '12px 0',
      transition: 'all 0.3s ease',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '38px', height: '38px',
            background: 'linear-gradient(135deg, #d4a853, #FFD700, #B8860B)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(212,168,83,0.45)',
            flexShrink: 0,
          }}>
            <i className="fa-solid fa-bus" style={{ fontSize: '18px', color: '#1a1000' }}></i>
          </div>
          <span style={{
            fontSize: '1.3rem', fontWeight: 900, color: '#f5f0e8',
            letterSpacing: '-0.5px', lineHeight: 1,
          }}>
            Xe<span style={{
              background: 'linear-gradient(135deg, #d4a853, #FFD700)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Khách</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" style={{
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '8px', padding: '6px 10px',
          color: '#fff',
        }} />

        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto align-items-center" style={{ gap: '2px' }}>
            <Nav.Link as={Link} to="/" style={navLinkStyle}>
              <i className="fa-solid fa-house me-1"></i> Trang chủ
            </Nav.Link>
            <Nav.Link as={Link} to="/trips" style={navLinkStyle}>
              <i className="fa-solid fa-route me-1"></i> Chuyến đi
            </Nav.Link>
            <Nav.Link as={Link} to="/routes" style={navLinkStyle}>
              <i className="fa-solid fa-map me-1"></i> Tuyến đường
            </Nav.Link>

            {/* Manager/Admin/Staff menu */}
            <RoleBasedComponent allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF]}>
              <NavDropdown title={
                <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                  <i className="fa-solid fa-gears me-1"></i> Quản lý
                </span>
              } id="manager-dropdown" style={{ marginLeft: '2px' }}>
                <NavDropdown.Item as={Link} to="/bus-management" style={dropdownItemStyle}>
                  <i className="fa-solid fa-bus me-2" style={{ color: '#e75702' }}></i>Quản lý Xe khách
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/trip-management" style={dropdownItemStyle}>
                  <i className="fa-solid fa-route me-2" style={{ color: '#e75702' }}></i>Quản lý Chuyến đi
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/manager/routes" style={dropdownItemStyle}>
                  <i className="fa-solid fa-map-marked-alt me-2" style={{ color: '#e75702' }}></i>Quản lý Tuyến đường
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/manager/schedules" style={dropdownItemStyle}>
                  <i className="fa-solid fa-calendar-days me-2" style={{ color: '#e75702' }}></i>Quản lý Lịch trình
                </NavDropdown.Item>
                <NavDropdown.Divider style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
                <NavDropdown.Item as={Link} to="/user-management" style={dropdownItemStyle}>
                  <i className="fa-solid fa-users me-2" style={{ color: '#3b82f6' }}></i>Quản lý Người dùng
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/manager/reviews" style={dropdownItemStyle}>
                  <i className="fa-solid fa-star me-2" style={{ color: '#f59e0b' }}></i>Quản lý Đánh giá
                </NavDropdown.Item>
                <NavDropdown.Divider style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
                <NavDropdown.Item as={Link} to="/bus-stations" style={dropdownItemStyle}>
                  <i className="fa-solid fa-building me-2" style={{ color: '#22c55e' }}></i>Bến xe
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/transfer-points" style={dropdownItemStyle}>
                  <i className="fa-solid fa-code-branch me-2" style={{ color: '#22c55e' }}></i>Điểm trung chuyển
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/trip-transfer" style={dropdownItemStyle}>
                  <i className="fa-solid fa-arrows-split-up-and-left me-2" style={{ color: '#22c55e' }}></i>Trung chuyển xe
                </NavDropdown.Item>
              </NavDropdown>
            </RoleBasedComponent>

            {/* Driver */}
            <RoleBasedComponent allowedRoles={[ROLES.DRIVER]}>
              <Nav.Link as={Link} to="/driver/schedules" style={navLinkStyle}>
                <i className="fa-solid fa-steering-wheel me-1"></i> Lịch chạy xe
              </Nav.Link>
            </RoleBasedComponent>

            {/* Passenger */}
            <RoleBasedComponent allowedRoles={[ROLES.PASSENGER]}>
              <Nav.Link as={Link} to="/bookings-history" style={navLinkStyle}>
                <i className="fa-solid fa-ticket me-1"></i> Vé của tôi
              </Nav.Link>
            </RoleBasedComponent>

            {/* Notification bell */}
            {user && (
              <Nav.Link as={Link} to="/notifi" style={{ ...navLinkStyle, position: 'relative', marginLeft: '4px' }}>
                <FaBell style={{ fontSize: '1.1rem' }} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-2px', right: '-2px',
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    color: '#fff', fontSize: '0.65rem', fontWeight: 700,
                    width: '18px', height: '18px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid rgba(10,10,15,0.9)',
                  }}>{unreadCount}</span>
                )}
              </Nav.Link>
            )}
          </Nav>

          {/* Auth section */}
          <Nav className="align-items-center" style={{ gap: '8px' }}>
            {user === null ? (
              <>
                <Nav.Link as={Link} to="/register" style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 600,
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                >
                  Đăng ký
                </Nav.Link>
                <Link to="/login" style={{
                  background: 'linear-gradient(135deg, #d4a853, #FFD700, #B8860B)',
                  color: '#1a1000', fontWeight: 800,
                  padding: '9px 20px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(212,168,83,0.4)',
                  transition: 'all 0.3s ease',
                  display: 'inline-block',
                  letterSpacing: '0.5px',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(212,168,83,0.6)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(212,168,83,0.4)'; }}
                >
                  <i className="fa-solid fa-right-to-bracket me-1"></i> Đăng nhập
                </Link>
              </>
            ) : (
              <>
                <NavDropdown
                  title={
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {user.avatar ? (
                        <Image src={user.avatar} alt="Avatar" roundedCircle width="34" height="34"
                          style={{ border: '2px solid rgba(231,87,2,0.5)', objectFit: 'cover' }} />
                      ) : (
                        <div style={{
                          width: '34px', height: '34px',
                          background: 'linear-gradient(135deg, #e75702, #ff7a30)',
                          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#fff', fontWeight: 800, fontSize: '0.9rem',
                        }}>
                          {user.username?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                        {user.username}
                      </span>
                    </span>
                  }
                  id="user-nav-dropdown"
                  align="end"
                >
                  <div style={{ padding: '12px 16px 8px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '4px' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                      Tài khoản
                    </div>
                    <div style={{ color: '#f1f5f9', fontWeight: 700, marginTop: '2px' }}>{user.username}</div>
                  </div>
                  <NavDropdown.Item as={Link} to="/profile" style={dropdownItemStyle}>
                    <i className="fa-solid fa-id-card me-2" style={{ color: '#3b82f6' }}></i>Thông tin tài khoản
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/bookings-history" style={dropdownItemStyle}>
                    <i className="fa-solid fa-ticket me-2" style={{ color: '#22c55e' }}></i>Lịch sử mua vé
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/payments-history" style={dropdownItemStyle}>
                    <i className="fa-solid fa-wallet me-2" style={{ color: '#f59e0b' }}></i>Lịch sử giao dịch
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/my-reviews" style={dropdownItemStyle}>
                    <i className="fa-solid fa-star me-2" style={{ color: '#f59e0b' }}></i>Đánh giá của tôi
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/change-password" style={dropdownItemStyle}>
                    <i className="fa-solid fa-key me-2" style={{ color: '#a78bfa' }}></i>Đổi mật khẩu
                  </NavDropdown.Item>
                  <NavDropdown.Divider style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
                  <NavDropdown.Item
                    onClick={() => { dispatch({ type: "logout" }); nav("/login"); }}
                    style={{ ...dropdownItemStyle, color: '#fca5a5 !important' }}
                  >
                    <i className="fa-solid fa-right-from-bracket me-2" style={{ color: '#ef4444' }}></i>
                    <span style={{ color: '#fca5a5' }}>Đăng xuất</span>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Styles
const navLinkStyle = {
  color: 'rgba(255,255,255,0.75)',
  fontWeight: 500,
  fontSize: '0.9rem',
  padding: '8px 12px',
  borderRadius: '8px',
  transition: 'all 0.25s ease',
  textDecoration: 'none',
};

const dropdownItemStyle = {
  color: '#94a3b8',
  padding: '10px 16px',
  borderRadius: '8px',
  fontSize: '0.9rem',
  fontWeight: 500,
  transition: 'all 0.2s ease',
};

export default Header;