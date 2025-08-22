import React, { useState } from "react";

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    email: "",
    phone: "",
    // dob: "" // Uncomment if you want to use date of birth
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (
      !form.username ||
      !form.password ||
      !form.confirmPassword ||
      !form.fullName ||
      !form.email ||
      !form.phone
    ) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (form.password.length < 6) {
      setError("Mật khẩu phải từ 6 ký tự trở lên.");
      return;
    }
    if (form.username.length < 4) {
      setError("Tên tài khoản phải từ 4 ký tự trở lên.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    setError("");
    // TODO: Gọi API đăng ký ở đây
    alert("Đăng ký thành công!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
          Đăng ký tài khoản
        </h2>
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Tên tài khoản
          </label>
          <input
            type="text"
            name="username"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={form.username}
            onChange={handleChange}
            placeholder="Nhập tên tài khoản"
            autoComplete="username"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={form.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
            autoComplete="new-password"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu"
            autoComplete="new-password"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Họ và tên
          </label>
          <input
            type="text"
            name="fullName"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Nhập họ và tên"
            autoComplete="name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={form.email}
            onChange={handleChange}
            placeholder="Nhập email"
            autoComplete="email"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">
            Số điện thoại
          </label>
          <input
            type="tel"
            name="phone"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={form.phone}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
            autoComplete="tel"
          />
        </div>
        {/* Uncomment nếu muốn dùng ngày sinh */}
        {/*
        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Ngày sinh</label>
          <input
            type="date"
            name="dob"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={form.dob}
            onChange={handleChange}
            placeholder="Chọn ngày sinh"
            autoComplete="bday"
          />
        </div>
        */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600 transition"
        >
          Đăng ký
        </button>
        <div className="mt-4 text-center text-sm text-gray-500">
          Đã có tài khoản?{" "}
          <span className="text-orange-500 cursor-pointer">Đăng nhập</span>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
