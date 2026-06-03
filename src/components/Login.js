import { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import cookie from "react-cookies";

import Apis, { authApis, endpoints } from "../configs/Apis.js";
import MySpinner from "./layout/MySpinner";
import { MyDispatchContext } from "../contexts/Contexts";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useContext(MyDispatchContext);

  const handleChange = (field, value) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await Apis.post(endpoints.login, credentials);
      const token = res.data.token;
      cookie.save("token", token, { path: "/" });
      const userRes = await authApis().get(endpoints.currentUser);
      dispatch({ type: "login", payload: userRes.data });
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      setErrorMsg("Tên đăng nhập hoặc mật khẩu không đúng!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f3460 100%)',
      padding: '20px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 999,
    }}>
      {/* Background orbs */}
      <div style={{
        position: 'absolute', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(231,87,2,0.08) 0%, transparent 70%)',
        top: '-200px', right: '-200px', borderRadius: '50%', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
        bottom: '-100px', left: '-100px', borderRadius: '50%', pointerEvents: 'none'
      }} />

      <div style={{
        background: 'rgba(18, 18, 30, 0.9)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(231,87,2,0.2)',
        borderRadius: '24px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(231,87,2,0.05)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px', height: '64px',
            background: 'linear-gradient(135deg, #e75702, #ff7a30)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(231,87,2,0.4)',
          }}>
            <i className="fa-solid fa-bus" style={{ fontSize: '28px', color: '#fff' }}></i>
          </div>
          <h1 style={{
            fontSize: '1.8rem', fontWeight: 900, color: '#fff',
            marginBottom: '8px', letterSpacing: '-0.5px'
          }}>
            Đăng nhập
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
            Chào mừng trở lại! Vui lòng đăng nhập.
          </p>
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '20px',
            color: '#fca5a5',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <i className="fa-solid fa-circle-exclamation"></i>
            {errorMsg}
          </div>
        )}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-4">
            <Form.Label style={{
              color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px'
            }}>
              Tên đăng nhập
            </Form.Label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                color: '#64748b', fontSize: '1rem', pointerEvents: 'none'
              }}>
                <i className="fa-solid fa-user"></i>
              </span>
              <Form.Control
                type="text"
                placeholder="Nhập tên đăng nhập..."
                value={credentials.username}
                onChange={(e) => handleChange("username", e.target.value)}
                required
                autoComplete="username"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#f1f5f9',
                  borderRadius: '12px',
                  padding: '14px 16px 14px 46px',
                  fontSize: '0.95rem',
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label style={{
              color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px'
            }}>
              Mật khẩu
            </Form.Label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                color: '#64748b', fontSize: '1rem', pointerEvents: 'none'
              }}>
                <i className="fa-solid fa-lock"></i>
              </span>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu..."
                value={credentials.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
                autoComplete="current-password"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#f1f5f9',
                  borderRadius: '12px',
                  padding: '14px 46px 14px 46px',
                  fontSize: '0.95rem',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: '#64748b', cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <i className={`fa-solid fa-eye${showPassword ? '-slash' : ''}`}></i>
              </button>
            </div>
          </Form.Group>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <MySpinner />
            </div>
          ) : (
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #e75702, #ff7a30)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(231,87,2,0.4)',
                transition: 'all 0.3s ease',
                letterSpacing: '0.3px',
              }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 30px rgba(231,87,2,0.55)'; }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 24px rgba(231,87,2,0.4)'; }}
            >
              <i className="fa-solid fa-right-to-bracket me-2"></i>
              Đăng nhập
            </button>
          )}

          <p style={{ textAlign: 'center', marginTop: '24px', color: '#64748b', fontSize: '0.9rem' }}>
            Chưa có tài khoản?{' '}
            <Link to="/register" style={{ color: '#ff7a30', fontWeight: 600, textDecoration: 'none' }}>
              Đăng ký ngay
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
