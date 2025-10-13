import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MdStore, MdLocationOn } from "react-icons/md";
import { getShopById } from "../api/Shop";
import { createOrder } from "../api/Order";
import { createShippingFee } from "../api/ShippingFee";
import { getUserAddress } from "../api/User_Address";
import { toast } from "react-toastify"; // thêm nếu bạn dùng react-toastify

const CheckoutModal = ({ cart, onClose, onOrder, fees = {} }) => {
  const location = useLocation();

  // === STATE ===
  const [shopName, setShopName] = useState("Cửa hàng");
  const [address, setAddress] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [showAddressList, setShowAddressList] = useState(false);
  const [payment, setPayment] = useState("COD");
  const [loading, setLoading] = useState(false);

  const [receiverName, setReceiverName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [shippingFee, setShippingFee] = useState(16000);
  const [distanceKm, setDistanceKm] = useState(0);
  const [shippingDiscount, setShippingDiscount] = useState(0);
  const [finalFee, setFinalFee] = useState(16000);
  const serviceFee = 6000;

  // === LẤY SHOP ID VÀ ĐỊA CHỈ ===
  useEffect(() => {
    const match = location.pathname.match(/\/shop\/([\w-]+)/);
    const shopId = match ? match[1] : null;

    if (shopId) fetchShop(shopId);
    fetchAddress();
  }, [location.pathname]);

  // Gọi API tính phí ship khi có shopId và userAddressId
  useEffect(() => {
    const fetchShippingFee = async () => {
      const match = location.pathname.match(/\/shop\/([\w-]+)/);
      const shopId = match ? match[1] : null;
      const userAddressObj = addressList.find(
        (addr) => addr.fullAddress === address
      );
      const userAddressId = userAddressObj?.id;
      if (shopId && userAddressId) {
        try {
          const res = await createShippingFee({ shopId, userAddressId });
          const fee = res.result || res;
          setShippingFee(fee.baseFee || 0);
          setDistanceKm(fee.distanceKm || 0);
          setShippingDiscount(fee.discount || 0);
          setFinalFee(fee.finalFee || 0);
        } catch {
          setShippingFee(16000);
          setDistanceKm(0);
          setShippingDiscount(0);
          setFinalFee(16000);
        }
      }
    };
    fetchShippingFee();
  }, [address, addressList, location.pathname]);

  // === FETCH SHOP ===
  const fetchShop = async (shopId) => {
    try {
      const shop = await getShopById(shopId);
      setShopName(shop.result?.name || shop.name || "Cửa hàng");
    } catch {
      setShopName("Cửa hàng");
    }
  };

  // === FETCH ADDRESS ===
  const fetchAddress = async () => {
    try {
      const res = await getUserAddress();
      const addresses = res.data?.result || [];
      const defaultAddress =
        addresses.find((addr) => addr.isDefault) || addresses[0];
      setAddress(
        defaultAddress ? defaultAddress.fullAddress : "Chưa có địa chỉ"
      );
      setReceiverName(defaultAddress ? defaultAddress.receiverName : "");
      setPhoneNumber(defaultAddress ? defaultAddress.phoneNumber : "");
      setAddressList(addresses);
    } catch {
      setAddress("Chưa có địa chỉ");
      setReceiverName("");
      setPhoneNumber("");
    }
  };

  // === XỬ LÝ ĐẶT HÀNG ===
  const handleOrder = async () => {
    setLoading(true);
    try {
      // Lấy userAddressId từ addressList
      const userAddressObj = addressList.find(
        (addr) => addr.fullAddress === address
      );
      const userAddressId = userAddressObj?.id;
      // Lấy cartId từ cart
      const cartId = cart?.id;
      // Gọi API tạo đơn hàng
      await createOrder({
        userAddressId,
        cartId,
        payment,
        shippingFee: finalFee,
        discount: shippingDiscount,
      });
      toast.success("Đặt hàng thành công!");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      toast.error("Đặt đơn thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  if (!cart) return null;

  const total =
    (cart.totalPrice || 0) + finalFee + serviceFee - shippingDiscount;

  // === RENDER ===
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-0 relative overflow-y-auto max-h-[90vh]">
        {/* Nút đóng */}
        <button
          className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-2 border-b">
          <h2 className="text-xl font-bold mb-4 text-orange-500 text-center">
            Xác nhận đơn hàng
          </h2>

          {/* Địa chỉ */}
          <div className="mb-3 flex items-center gap-2 text-orange-500 text-base">
            <MdLocationOn className="text-lg" />
            <span className="font-semibold truncate">{address}</span>
          </div>

          {showAddressList && (
            <div className="mb-3 bg-white border rounded shadow max-h-60 overflow-y-auto px-4 py-2">
              <div className="font-semibold text-gray-700 mb-2 text-sm">
                Chọn địa chỉ giao hàng
              </div>
              {addressList.length === 0 && (
                <div className="text-gray-400 text-xs">
                  Không có địa chỉ nào
                </div>
              )}
              {addressList.map((addr) => (
                <div
                  key={addr.id}
                  className={`py-2 px-2 rounded cursor-pointer text-sm transition ${
                    address === addr.fullAddress
                      ? "bg-orange-100 text-orange-600 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setAddress(addr.fullAddress);
                    setReceiverName(addr.receiverName);
                    setPhoneNumber(addr.phoneNumber);
                    setShowAddressList(false);
                  }}
                >
                  {addr.fullAddress}
                  {addr.isDefault && (
                    <span className="ml-2 text-xs text-blue-500">
                      (Mặc định)
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Thông tin người nhận */}
          <div className="flex items-center justify-between text-sm text-gray-700 mb-3 px-2 py-1 bg-gray-50 rounded">
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-semibold text-gray-900 truncate max-w-[160px]">
                {receiverName}
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-700 tracking-wide max-w-[80px] truncate text-right">
                {phoneNumber}
              </span>
            </div>
            <button
              className="text-blue-500 text-xs font-medium underline hover:text-blue-700 transition"
              onClick={() => setShowAddressList((v) => !v)}
            >
              Chỉnh sửa
            </button>
          </div>
        </div>

        {/* Danh sách món */}
        <div className="px-6 py-3 border-b">
          {cart.cartItems?.length > 0 ? (
            <>
              <div className="font-bold mb-2 text-orange-500 flex items-center gap-1">
                <MdStore className="text-lg" />
                <span className="truncate">{shopName}</span>
              </div>
              <ul className="mb-2">
                {cart.cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center py-2 text-sm gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={
                          item.imageUrl
                            ? `http://localhost:8080/food/uploads/images/${item.imageUrl}`
                            : "/default-food.png"
                        }
                        alt={item.foodName}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span className="truncate">
                        {item.quantity || 1} x {item.foodName}
                      </span>
                    </div>
                    <span className="font-semibold text-right min-w-[70px]">
                      {item.price.toLocaleString()}đ
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="text-center text-gray-400 text-sm py-4">
              Giỏ hàng trống
            </div>
          )}
        </div>

        {/* Chi tiết thanh toán */}
        <div className="px-6 py-2 border-b">
          <div className="font-semibold mb-1.5 text-gray-700 text-[15px]">
            Chi tiết thanh toán
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Tổng giá món ({cart.cartItems.length} món)</span>
            <span className="font-semibold">
              {(cart.totalPrice || 0).toLocaleString()}đ
            </span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Phí giao hàng ({Number(distanceKm).toFixed(1)} km)</span>
            <span className="font-semibold">
              {shippingFee.toLocaleString()}đ
            </span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Phí dịch vụ</span>
            <span className="font-semibold">
              {serviceFee.toLocaleString()}đ
            </span>
          </div>
          <div className="flex justify-between text-sm mb-1 text-green-600">
            <span>Giảm giá phí ship</span>
            <span>-{shippingDiscount.toLocaleString()}đ</span>
          </div>
          <div className="border-t mt-2 pt-2 flex justify-between font-semibold text-gray-900">
            <span>Tổng cộng</span>
            <span>{total.toLocaleString()}đ</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">Đã bao gồm thuế</div>
        </div>

        {/* Phương thức thanh toán */}
        <div className="px-6 py-2 border-b">
          <div className="flex gap-2 mb-1.5">
            <button
              className={`flex-1 py-2 rounded border font-semibold text-sm transition-all duration-150 ${
                payment === "COD"
                  ? "bg-orange-500 text-white border-orange-500 shadow"
                  : "bg-white text-orange-500 border-orange-200"
              }`}
              onClick={() => setPayment("COD")}
            >
              Tiền mặt
            </button>
            <button
              className={`flex-1 py-2 rounded border font-semibold text-sm transition-all duration-150 ${
                payment === "BANKING"
                  ? "bg-orange-500 text-white border-orange-500 shadow"
                  : "bg-white text-orange-500 border-orange-200"
              }`}
              onClick={() => setPayment("BANKING")}
            >
              Chuyển khoản
            </button>
          </div>
        </div>

        {/* Nút đặt đơn */}
        <div className="px-6 py-2">
          <button
            className="w-full bg-orange-500 text-white py-2 rounded font-semibold text-sm shadow hover:bg-orange-600 transition flex items-center justify-center gap-2"
            onClick={handleOrder}
            disabled={loading}
          >
            {loading
              ? "Đang đặt đơn..."
              : `Đặt đơn - ${total.toLocaleString()}đ`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
