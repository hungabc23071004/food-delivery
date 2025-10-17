import { FaRegCommentDots } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  FaStore,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBoxOpen,
  FaShippingFast,
  FaTags,
  FaMoneyCheckAlt,
  FaReceipt,
  FaUser,
  FaPhoneAlt,
} from "react-icons/fa";
import { getDetailOrder } from "../api/Order";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function OrderDetailPage() {
  const { state } = useLocation();
  const params = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = state?.order?.id || params.id;
    if (!id) return;
    setLoading(true);
    getDetailOrder(id)
      .then((res) => setOrder(res.result))
      .finally(() => setLoading(false));
  }, [state, params]);

  if (loading)
    return (
      <div className="text-center py-10">Đang tải chi tiết đơn hàng...</div>
    );
  if (!order) return <div>Không tìm thấy đơn hàng.</div>;

  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-gray-50 py-10">
        <div className="max-w-2xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FaReceipt className="text-orange-500" />
            Chi tiết đơn hàng
          </h2>
          <div className="bg-white rounded-xl shadow border p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg text-orange-600 flex items-center gap-2">
                <FaStore className="text-orange-400" />
                {order.shopName}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500">
                {order.status}
              </span>
            </div>
            <div className="mb-2 text-gray-600 text-sm">
              <div className="flex items-center gap-2 mb-0.5">
                <FaMapMarkerAlt className="text-gray-400" />
                <span className="font-medium">Địa chỉ nhận hàng:</span>
                <span>
                  {order.shippingAddress?.fullAddress || order.address}
                </span>
              </div>
              {order.shippingAddress?.receiverName && (
                <div className="mb-0.5 flex items-center gap-2">
                  <FaUser className="text-gray-400" />
                  <span>Người nhận:</span>{" "}
                  <span className="font-semibold text-gray-800">
                    {order.shippingAddress.receiverName}
                  </span>
                </div>
              )}
              {order.shippingAddress?.phoneNumber && (
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-blue-400" />
                  <span>SĐT:</span>{" "}
                  <span className="font-semibold text-blue-700">
                    {order.shippingAddress.phoneNumber}
                  </span>
                </div>
              )}
            </div>
            <div className="mb-2 text-gray-600 text-sm flex items-center gap-2">
              <FaCalendarAlt className="text-gray-400" />
              <span className="font-medium">Ngày đặt:</span>{" "}
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString("vi-VN")
                : ""}
            </div>
            <div className="mb-4">
              <span className="font-medium text-gray-800 flex items-center gap-2">
                <FaBoxOpen className="text-orange-400" />
                Sản phẩm:
              </span>
              <ul className="ml-4 mt-2">
                {(order.orderItems || order.items || []).map((item, idx) => (
                  <li
                    key={item.id || idx}
                    className="flex gap-3 items-center mb-3"
                  >
                    <img
                      src={`http://localhost:8080/food/uploads/images/${item.imageUrl}`}
                      alt={item.foodName || item.name}
                      className="w-12 h-12 object-cover rounded border"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {item.foodName || item.name} x
                        {item.quantity || item.qty}
                      </div>
                      <div className="text-xs text-gray-500">
                        Giá: {item.price.toLocaleString()}đ
                        {item.options && item.options.length > 0 && (
                          <span>
                            | Tuỳ chọn:{" "}
                            {item.options
                              .map(
                                (opt) =>
                                  `${
                                    opt.optionName
                                  } (+${opt.extraPrice.toLocaleString()}đ)`
                              )
                              .join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-2 text-sm text-gray-700 flex items-center gap-2">
              <FaShippingFast className="text-blue-400" />
              <span className="font-medium">Phí vận chuyển:</span>{" "}
              {order.shippingFee?.toLocaleString()}đ
            </div>
            <div className="mb-2 text-sm text-gray-700 flex items-center gap-2">
              <FaTags className="text-green-500" />
              <span className="font-medium">Giảm giá:</span>{" "}
              {order.totalDiscount?.toLocaleString()}đ
            </div>
            <div className="mb-2 text-sm text-gray-700 flex items-center gap-2">
              <FaMoneyCheckAlt className="text-purple-500" />
              <span className="font-medium">Phương thức thanh toán:</span>{" "}
              {order.payment}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6 mb-2">
              <div className="flex items-center gap-2 text-lg font-bold text-orange-600">
                <FaReceipt className="text-orange-500" />
                Tổng tiền: {order.total?.toLocaleString()}đ
              </div>
              <div className="flex items-center gap-2">
                <FaRegCommentDots className="text-blue-500 text-xl" />
                <span className="font-medium text-gray-800 text-base">
                  Liên hệ:
                </span>
                <button
                  className="px-2.5 py-1.5 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition text-sm flex items-center gap-1"
                  style={{ minWidth: "70px" }}
                  onClick={() => {
                    // TODO: mở chat box với shop
                    window.alert("Mở chat với shop!");
                  }}
                >
                  <FaRegCommentDots className="text-white text-base" />
                  Nhắn tin
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
