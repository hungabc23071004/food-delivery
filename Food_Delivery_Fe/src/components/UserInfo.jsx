import React, { useState } from "react";

const UserInfo = () => {
  const [form, setForm] = useState({
    username: "hungxuan",
    gender: "",
    email: "",
    password: "********",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thông tin đã được lưu!");
  };
  return (
    <div className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl mx-auto flex flex-col items-center">
      <h2 className="text-xl font-bold mb-8 text-[#cc3333] text-center tracking-tight">
        Thông tin người dùng
      </h2>
      {/* Ảnh đại diện */}
      <div className="flex flex-col items-center mb-8 w-full">
        <img
          src="https://tse1.mm.bing.net/th/id/OIP.C6kSV1Gpk1wAWUnp-K_ePQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="avatar"
          className="w-28 h-28 rounded-full object-cover border-4 border-[#cc3333] shadow mb-4"
        />
        <label className="block font-medium mb-2 text-gray-700 text-sm">
          Tải lên từ
        </label>
        <input type="file" className="mb-1 text-sm" accept="image/*" />
        <div className="text-gray-400 text-xs mb-2">
          Chấp nhận GIF, JPEG, PNG, BMP tối đa 5MB
        </div>
        <button
          type="button"
          className="bg-[#cc3333] text-white px-3 py-1 rounded hover:bg-[#b82d2d] font-medium text-sm"
        >
          Cập nhật
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {/* Tên */}
        <div className="flex items-center space-x-2 mb-4">
          <label className="block font-semibold w-28 mb-0 text-gray-700 text-base">
            Tên
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            disabled
            className="flex-1 border rounded-lg p-2 bg-gray-100 text-base"
          />
        </div>
        {/* Ngày sinh */}
        <div className="flex items-center space-x-2 mb-4">
          <label className="block font-semibold w-28 mb-0 text-gray-700 text-base">
            Ngày sinh
          </label>
          <input
            type="date"
            name="dob"
            value={form.dob || ""}
            onChange={handleChange}
            className="flex-1 border rounded-lg p-2 text-base"
          />
        </div>

        {/* Email */}
        <div className="flex items-center space-x-2">
          <label className="block font-semibold w-28 mb-0 text-gray-700 text-base">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Nhập email"
            className="flex-1 border rounded-lg p-2 text-base"
          />
          <button
            type="button"
            className="text-[#cc3333] underline font-semibold"
          >
            Cập nhật mail
          </button>
        </div>

        {/* Mật khẩu */}
        <div className="flex items-center space-x-2">
          <label className="block font-semibold w-28 mb-0 text-gray-700 text-base">
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            disabled
            className="flex-1 border rounded-lg p-2 bg-gray-100 text-base"
          />
          <button
            type="button"
            className="text-[#cc3333] underline font-semibold"
            onClick={() => setShowChangePassword(!showChangePassword)}
          >
            Đổi mật khẩu
          </button>
        </div>
        {/* Nếu bấm Đổi mật khẩu thì hiện thêm 2 input, mỗi input nằm dưới input trước đó */}
        {showChangePassword && (
          <div className="space-y-4 mt-2">
            <div className="flex items-center space-x-2">
              <label className="block font-semibold w-28 mb-0 text-gray-700 text-base">
                Mật khẩu mới
              </label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu mới"
                className="flex-1 border rounded-lg p-2 text-base"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="block font-semibold w-28 mb-0 text-gray-700 text-base">
                Nhập lại mật khẩu
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                value={form.confirmNewPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu mới"
                className="flex-1 border rounded-lg p-2 text-base"
              />
            </div>
          </div>
        )}

        {/* Nút lưu */}
        <button
          type="submit"
          className="bg-[#cc3333] text-white px-5 py-2 rounded-lg hover:bg-[#b82d2d] font-semibold text-base w-full mt-4"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default UserInfo;
