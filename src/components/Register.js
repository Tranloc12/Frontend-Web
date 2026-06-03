import { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

import Apis, { endpoints } from "../configs/Apis.js";
import MySpinner from "./layout/MySpinner";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    dob: "",
    userRole: "ROLE_PASSENGER",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (form.password !== form.confirmPassword) {
      setMsg("Mật khẩu xác nhận không khớp!");
      return false;
    }
    if (form.password.length < 6) {
      setMsg("Mật khẩu phải có ít nhất 6 ký tự!");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setMsg(null);

    try {
      const payload = {
        username: form.username,
        password: form.password,
        email: form.email,
        dob: form.dob,
        userRole: form.userRole,
      };

      const res = await Apis.post(endpoints.register, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 201 || res.status === 200) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error("Lỗi khi đăng ký:", err.response);
      const errMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        (typeof err.response?.data === "string" && err.response.data) ||
        "Đăng ký thất bại, vui lòng thử lại.";
      setMsg(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#f1f5f9',
    borderRadius: '12px',
    padding: '13px 16px 13px 46px',
    fontSize: '0.95rem',
    width: '100%',
    outline: 'none',
    transition: 'all 0.3s ease',
  };

  const labelStyle = {
    color: '#94a3b8',
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '8px',
    display: 'block',
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
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 999,
      overflowY: 'auto',
    }}>
      {/* Decorative orbs */}
      <div style={{
        position: 'fixed', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(231,87,2,0.07) 0%, transparent 70%)',
        top: '-150px', right: '-150px', borderRadius: '50%', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'fixed', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
        bottom: '-100px', left: '-100px', borderRadius: '50%', pointerEvents: 'none'
      }} />

      <div style={{
        background: 'rgba(18, 18, 30, 0.92)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(231,87,2,0.2)',
        borderRadius: '24px',
        padding: '40px 36px',
        width: '100%',
        maxWidth: '480px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
        position: 'relative',
        zIndex: 1,
        margin: '20px auto',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '60px', height: '60px',
            background: 'linear-gradient(135deg, #e75702, #ff7a30)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
            boxShadow: '0 8px 24px rgba(231,87,2,0.4)',
          }}>
            <i className="fa-solid fa-user-plus" style={{ fontSize: '24px', color: '#fff' }}></i>
          </div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#fff', marginBottom: '6px' }}>
            Tạo tài khoản
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0 }}>
            Tham gia ngay để đặt vé nhanh chóng!
          </p>
        </div>

        {/* Success message */}
        {success && (
          <div style={{
            background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.35)',
            borderRadius: '12px', padding: '14px 18px', marginBottom: '20px',
            color: '#86efac', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <i className="fa-solid fa-circle-check fa-lg"></i>
            <span>Đăng ký thành công! Đang chuyển đến trang đăng nhập...</span>
          </div>
        )}

        {/* Error message */}
        {msg && !success && (
          <div style={{
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '12px', padding: '12px 16px', marginBottom: '20px',
            color: '#fca5a5', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <i className="fa-solid fa-circle-exclamation"></i>
            {msg}
          </div>
        )}

        <Form onSubmit={handleRegister}>
          {/* Username */}
          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}>Tên đăng nhập</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                <i className="fa-solid fa-user"></i>
              </span>
              <input type="text" placeholder="Tên đăng nhập..." value={form.username}
                onChange={(e) => handleChange("username", e.target.value)} required style={inputStyle}
                onFocus={e => { e.target.style.borderColor = '#e75702'; e.target.style.background = 'rgba(231,87,2,0.05)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}>Email</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input type="email" placeholder="your@email.com" value={form.email}
                onChange={(e) => handleChange("email", e.target.value)} required style={inputStyle}
                onFocus={e => { e.target.style.borderColor = '#e75702'; e.target.style.background = 'rgba(231,87,2,0.05)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
              />
            </div>
          </div>

          {/* DOB */}
          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}>Ngày sinh</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                <i className="fa-solid fa-calendar"></i>
              </span>
              <input type="date" value={form.dob}
                onChange={(e) => handleChange("dob", e.target.value)} required
                style={{ ...inputStyle, colorScheme: 'dark' }}
                onFocus={e => { e.target.style.borderColor = '#e75702'; e.target.style.background = 'rgba(231,87,2,0.05)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}>Mật khẩu</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                <i className="fa-solid fa-lock"></i>
              </span>
              <input type={showPass ? "text" : "password"} placeholder="Tối thiểu 6 ký tự..." value={form.password}
                onChange={(e) => handleChange("password", e.target.value)} required
                style={{ ...inputStyle, paddingRight: '46px' }}
                onFocus={e => { e.target.style.borderColor = '#e75702'; e.target.style.background = 'rgba(231,87,2,0.05)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <i className={`fa-solid fa-eye${showPass ? '-slash' : ''}`}></i>
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '28px' }}>
            <label style={labelStyle}>Xác nhận mật khẩu</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                <i className="fa-solid fa-shield-halved"></i>
              </span>
              <input type={showConfirmPass ? "text" : "password"} placeholder="Nhập lại mật khẩu..." value={form.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)} required
                style={{ ...inputStyle, paddingRight: '46px' }}
                onFocus={e => { e.target.style.borderColor = '#e75702'; e.target.style.background = 'rgba(231,87,2,0.05)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
              />
              <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <i className={`fa-solid fa-eye${showConfirmPass ? '-slash' : ''}`}></i>
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <MySpinner />
            </div>
          ) : (
            <button type="submit" style={{
              width: '100%', padding: '14px',
              background: 'linear-gradient(135deg, #e75702, #ff7a30)',
              border: 'none', borderRadius: '12px', color: '#fff',
              fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(231,87,2,0.4)',
              transition: 'all 0.3s ease', letterSpacing: '0.3px',
            }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 30px rgba(231,87,2,0.55)'; }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 24px rgba(231,87,2,0.4)'; }}
            >
              <i className="fa-solid fa-user-plus me-2"></i>
              Tạo tài khoản
            </button>
          )}

          <p style={{ textAlign: 'center', marginTop: '20px', color: '#64748b', fontSize: '0.9rem' }}>
            Đã có tài khoản?{' '}
            <Link to="/login" style={{ color: '#ff7a30', fontWeight: 600, textDecoration: 'none' }}>
              Đăng nhập ngay
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Register;
