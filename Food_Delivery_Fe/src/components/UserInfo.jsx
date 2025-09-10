import React, { useState, useEffect } from "react";
import { getMyInfo, changeAvatar, updateUser } from "../api/User"; // ✅ thêm updateUser
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const [avatarFile, setAvatarFile] = useState(null);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    avatarUrl: null,
    password: "********", // chỉ để hiển thị
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate();

  // Lấy thông tin user
  const fetchUser = async () => {
    try {
      const res = await getMyInfo();
      if (res && res.result) {
        setForm((f) => ({
          ...f,
          username: res.result.username || "",
          fullName: res.result.fullName || "",
          email: res.result.email || "",
          phone: res.result.phone || "",
          dob: res.result.dob || "",
          avatarUrl: res.result.avatarUrl || null,
        }));
      }
    } catch (err) {
      console.error("Lỗi khi fetch user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const req = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      dob: form.dob,
    };

    // Nếu đổi mật khẩu thì gửi thêm
    if (showChangePassword) {
      if (!form.oldPassword || !form.newPassword || !form.confirmNewPassword) {
        alert("Vui lòng nhập đầy đủ thông tin đổi mật khẩu!");
        return;
      }
      req.oldPassword = form.oldPassword;
      req.password = form.newPassword;
      req.repeatPassword = form.confirmNewPassword;
    }

    try {
      await updateUser(req);
      fetchUser(); // reload lại form
    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl mx-auto flex flex-col items-center">
      <h2 className="text-xl font-bold mb-8 text-[#cc3333] text-center tracking-tight">
        Thông tin người dùng
      </h2>

      {/* Ảnh đại diện */}
      <div className="flex flex-col items-center mb-8 w-full">
        <img
          src={
            form.avatarUrl
              ? `http://localhost:8080/food/uploads/images/${encodeURIComponent(
                  form.avatarUrl
                )}?t=${Date.now()}`
              : "https://tse1.mm.bing.net/th/id/OIP.C6kSV1Gpk1wAWUnp-K_ePQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
          }
          alt="avatar"
          className="w-28 h-28 rounded-full object-cover border-4 border-[#cc3333] shadow mb-4"
        />

        <input
          type="file"
          className="mb-1 text-sm"
          accept="image/*"
          onChange={(e) => setAvatarFile(e.target.files[0])}
        />
        <div className="text-gray-400 text-xs mb-2">
          Chấp nhận GIF, JPEG, PNG, BMP tối đa 5MB
        </div>

        <button
          type="button"
          className="bg-[#cc3333] text-white px-3 py-1 rounded hover:bg-[#b82d2d] font-medium text-sm"
          disabled={loadingAvatar}
          onClick={async () => {
            if (!avatarFile) return;
            setLoadingAvatar(true);

            const formData = new FormData();
            formData.append("avatarUrl", avatarFile);

            try {
              const res = await changeAvatar(formData);
              if (res && res.result) {
                setForm((f) => ({
                  ...f,
                  avatarUrl: res.result,
                }));
              }
              navigate(0); // reload trang
            } catch (err) {
              console.error(err);
              alert("Cập nhật avatar thất bại!");
            }

            setLoadingAvatar(false);
          }}
        >
          {loadingAvatar ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </div>

      {/* Form thông tin */}
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {/* Tên đăng nhập */}
        <div className="flex items-center space-x-2 mb-4">
          <label className="block font-semibold w-28 text-gray-700">
            Tên đăng nhập
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            disabled
            className="flex-1 border rounded-lg p-2 bg-gray-100"
          />
        </div>

        {/* Họ tên */}
        <div className="flex items-center space-x-2 mb-4">
          <label className="block font-semibold w-28 text-gray-700">
            Họ tên
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="flex-1 border rounded-lg p-2"
          />
        </div>

        {/* Ngày sinh */}
        <div className="flex items-center space-x-2 mb-4">
          <label className="block font-semibold w-28 text-gray-700">
            Ngày sinh
          </label>
          <input
            type="date"
            name="dob"
            value={form.dob || ""}
            onChange={handleChange}
            className="flex-1 border rounded-lg p-2"
          />
        </div>

        {/* Email */}
        <div className="flex items-center space-x-2 mb-4">
          <label className="block font-semibold w-28 text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="flex-1 border rounded-lg p-2"
          />
        </div>

        {/* Số điện thoại */}
        <div className="flex items-center space-x-2 mb-4">
          <label className="block font-semibold w-28 text-gray-700">
            Số điện thoại
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="flex-1 border rounded-lg p-2"
          />
        </div>

        {/* Mật khẩu */}
        <div className="flex items-center space-x-2">
          <label className="block font-semibold w-28 text-gray-700">
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            disabled
            className="flex-1 border rounded-lg p-2 bg-gray-100"
          />
          <button
            type="button"
            className="text-[#cc3333] underline font-semibold"
            onClick={() => setShowChangePassword(!showChangePassword)}
          >
            Đổi mật khẩu
          </button>
        </div>

        {showChangePassword && (
          <div className="space-y-4 mt-2">
            <div className="flex items-center space-x-2">
              <label className="block font-semibold w-28 text-gray-700">
                Mật khẩu cũ
              </label>
              <input
                type="password"
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                className="flex-1 border rounded-lg p-2"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="block font-semibold w-28 text-gray-700">
                Mật khẩu mới
              </label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="flex-1 border rounded-lg p-2"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="block font-semibold w-28 text-gray-700">
                Nhập lại
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                value={form.confirmNewPassword}
                onChange={handleChange}
                className="flex-1 border rounded-lg p-2"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="bg-[#cc3333] text-white px-5 py-2 rounded-lg hover:bg-[#b82d2d] font-semibold w-full mt-4"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default UserInfo;
