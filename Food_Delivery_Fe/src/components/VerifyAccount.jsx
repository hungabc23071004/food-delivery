import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { activeUser } from "../api/User";

const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("Đang xác minh tài khoản...");

  const token = searchParams.get("token");
  const username = searchParams.get("username");

  useEffect(() => {
    if (!token || !username) {
      setStatus("error");
      setMessage("Thiếu thông tin xác minh.");
      return;
    }

    const verify = async () => {
      try {
        await activeUser(username, token);
        setStatus("success");
        setMessage("Xác minh tài khoản thành công! Bạn có thể đăng nhập.");
      } catch (err) {
        setStatus("error");
        setMessage("Xác minh thất bại hoặc token đã hết hạn.");
      }
    };

    verify();
  }, [token, username]);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url(/realistic-polygonal-background_23-2148921891.avif)",
      }}
    >
      <div className="absolute inset-0 bg-black/30 z-0" />
      <div className="relative z-10 w-full flex items-center justify-center">
        <div className="bg-white max-w-md w-full mx-auto p-8 rounded-2xl shadow-lg border border-[#cc3333]/10 mt-12 animate-fade-in backdrop-blur-sm bg-opacity-90 text-center">
          {status === "pending" && (
            <div className="animate-spin h-8 w-8 mx-auto mb-4 border-4 border-[#cc3333] border-t-transparent rounded-full"></div>
          )}
          <h2 className="text-2xl font-bold mb-2 text-[#cc3333]">
            Xác minh tài khoản
          </h2>
          <p className="mb-4 text-gray-700">{message}</p>
          {status === "success" && (
            <button
              className="w-full text-white bg-[#cc3333] hover:bg-[#b82d2d] font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={() => navigate("/login")}
            >
              Đăng nhập ngay
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
