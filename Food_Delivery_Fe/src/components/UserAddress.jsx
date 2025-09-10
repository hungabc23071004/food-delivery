import React, { useState, useEffect } from "react";
import {
  FaUserAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaStar,
} from "react-icons/fa";
import {
  getUserAddress,
  createUserAddress,
  getUserAddressDetail,
  deleteUserAddress,
  updateUserAddress,
} from "../api/User_Address";

const UserAddress = ({ onEdit, onDelete, onAdd, active }) => {
  console.log("UserAddress active:", active);
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    district: "",
    ward: "",
    street: "",
    note: "",
    addressType: "Văn Phòng",
    isDefault: false,
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // ✅ Lấy danh sách Tỉnh/TP
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => res.json())
      .then((data) => {
        console.log("Provinces fetched:", data);
        setProvinces(data);
      })
      .catch((err) => console.error("Lỗi fetch provinces:", err));
  }, []);

  // ✅ Lấy địa chỉ người dùng
  const reloadAddresses = () => {
    getUserAddress()
      .then((res) => {
        const mapped = res.data.result.map((item) => ({
          id: item.id,
          name: item.receiverName,
          address: item.fullAddress,
          phone: item.phoneNumber,
          note: item.note,
          isDefault: item.defaultAddress,
          // ...các trường khác
        }));
        setAddresses(mapped);
      })
      .catch((err) => console.error("Lỗi lấy địa chỉ:", err));
  };

  useEffect(() => {
    reloadAddresses();
  }, [active]);

  // ✅ Chọn Tỉnh/TP
  const handleCityChange = (e) => {
    const [code, name] = e.target.value.split("|");
    setForm((prev) => ({
      ...prev,
      city: name,
      cityCode: code,
      district: "",
      ward: "",
    }));

    const province = provinces.find((p) => p.code.toString() === code);
    setDistricts(province ? province.districts : []);
    setWards([]);
  };

  // ✅ Chọn Quận/Huyện
  const handleDistrictChange = (e) => {
    const [code, name] = e.target.value.split("|");
    setForm((prev) => ({
      ...prev,
      district: name,
      districtCode: code,
      ward: "",
    }));

    const district = districts.find((d) => d.code.toString() === code);
    setWards(district ? district.wards : []);
  };

  // ✅ Chọn Phường/Xã
  const handleWardChange = (e) => {
    const [code, name] = e.target.value.split("|");
    setForm((prev) => ({ ...prev, ward: name, wardCode: code }));
  };

  // ✅ Input khác
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      street, // detailAddress
      ward,
      wardCode,
      district,
      districtCode, // districtId
      city, // province
      cityCode, // provinceId
      fullName, // receiverName
      phone, // phoneNumber
      note,
      isDefault, // defaultAddress
      addressType,
      latitude,
      longitude,
    } = form;
    const fullAddress = `${street}, ${ward}, ${district}, ${city}`;
    const data = {
      fullAddress,
      detailAddress: street,
      receiverName: fullName,
      phoneNumber: phone,
      note,
      defaultAddress: isDefault,
      latitude: latitude || 0,
      longitude: longitude || 0,
      ward,
      wardCode,
      district,
      districtId: districtCode,
      province: city,
      provinceId: cityCode,
      addressType,
    };
    try {
      if (editId) {
        await updateUserAddress(editId, data);
      } else {
        await createUserAddress(data);
        if (onAdd) onAdd(data);
      }
      setShowModal(false);
      reloadAddresses();
    } catch (err) {
      alert(editId ? "Lỗi khi cập nhật địa chỉ!" : "Lỗi khi thêm địa chỉ!");
      console.error(err);
    }
  };

  const handleEdit = async (idx) => {
    const address = addresses[idx];
    setEditId(address.id);
    try {
      const res = await getUserAddressDetail(address.id);
      const detail = res.data.result;
      setForm({
        fullName: detail.receiverName || "",
        phone: detail.phoneNumber || "",
        city: detail.province || "",
        cityCode: detail.provinceId || "",
        district: detail.district || "",
        districtCode: detail.districtId || "",
        ward: detail.ward || "",
        wardCode: detail.wardCode || "",
        street: detail.detailAddress || "",
        note: detail.note || "",
        addressType: detail.addressType || "Văn Phòng",
        isDefault: detail.defaultAddress || false,
        latitude: detail.latitude || 0,
        longitude: detail.longitude || 0,
      });
      // Map lại districts và wards
      const province = provinces.find(
        (p) =>
          p.name === detail.province ||
          p.code.toString() === detail.provinceId?.toString()
      );
      setDistricts(province ? province.districts : []);
      const district =
        province && province.districts
          ? province.districts.find(
              (d) =>
                d.name === detail.district ||
                d.code.toString() === detail.districtId?.toString()
            )
          : null;
      setWards(district ? district.wards : []);
      setShowModal(true);
    } catch (err) {
      alert("Không lấy được thông tin địa chỉ!");
      console.error(err);
    }
  };

  const handleDelete = async (idx) => {
    const address = addresses[idx];
    if (!window.confirm("Bạn có chắc muốn xóa địa chỉ này?")) return;
    try {
      await deleteUserAddress(address.id);
      reloadAddresses(); // Reload lại danh sách sau khi xóa
    } catch (err) {
      alert("Xóa địa chỉ thất bại!");
      console.error(err);
    }
  };

  const isEditMode = editId !== null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
      <h3 className="font-bold text-2xl mb-6 flex items-center gap-2">
        <FaMapMarkerAlt className="text-[#cc3333]" /> Cập nhật địa chỉ
      </h3>

      {/* Bảng danh sách địa chỉ */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gray-100 rounded-lg">
              <th className="py-2 px-3 font-semibold text-sm text-left w-32">
                <span className="flex items-center gap-1">
                  <FaUserAlt className="text-gray-500" /> Người nhận
                </span>
              </th>
              <th className="py-2 px-3 font-semibold text-sm text-left w-80">
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-gray-500" /> Địa chỉ
                </span>
              </th>
              <th className="py-2 px-3 font-semibold text-sm text-left w-32">
                <span className="flex items-center gap-1">
                  <FaPhoneAlt className="text-gray-500" /> SDT
                </span>
              </th>
              <th className="py-2 px-3"></th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((item, idx) => (
              <tr key={idx} className="bg-white rounded-lg shadow-sm">
                <td className="py-2 px-3 align-top text-sm w-40">
                  {item.name || "Người nhận"}
                </td>
                <td className="py-2 px-3 align-top text-sm whitespace-pre-line w-64">
                  <span className="flex flex-col">
                    <span>{item.address}</span>
                    {item.note && (
                      <span className="text-gray-500 text-xs mt-1">
                        Ghi chú: {item.note}
                      </span>
                    )}
                    {item.isDefault && (
                      <span className="flex items-center gap-1 text-yellow-500 font-semibold text-sm mt-1">
                        <FaStar className="inline-block text-yellow-500 text-sm" />{" "}
                        Mặc định
                      </span>
                    )}
                  </span>
                </td>
                <td className="py-2 px-3 align-top text-sm w-32">
                  {item.phone}
                </td>
                <td className="py-2 px-3 align-top">
                  <div className="flex gap-3">
                    <button
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                      onClick={() => handleEdit(idx)}
                    >
                      <FaEdit /> Sửa
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                      onClick={() => handleDelete(idx)}
                    >
                      <FaTrashAlt /> Xoá
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Nút thêm địa chỉ */}
      <div className="flex justify-end mt-6">
        <button
          className="bg-[#cc3333] hover:bg-[#b82d2d] text-white px-7 py-2 rounded-lg font-semibold flex items-center gap-2 shadow text-base"
          onClick={() => {
            setEditId(null);
            setForm({
              fullName: "",
              phone: "",
              city: "",
              cityCode: "",
              district: "",
              districtCode: "",
              ward: "",
              wardCode: "",
              street: "",
              note: "",
              addressType: "Văn Phòng",
              isDefault: false,
              latitude: 0,
              longitude: 0,
            });
            setDistricts([]);
            setWards([]);
            setShowModal(true);
          }}
        >
          <FaPlus /> THÊM
        </button>
      </div>

      {/* Modal thêm địa chỉ */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg border-2 border-[#d32f2f] p-8 w-[800px] max-w-full relative">
            <button
              className="absolute top-4 right-4 text-2xl text-[#d32f2f] hover:text-red-700"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-x-8 gap-y-4"
            >
              {/* Họ tên */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Họ và tên</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Nhập họ tên"
                  className="border border-[#d32f2f] rounded p-2 focus:ring-2 focus:ring-[#d32f2f]"
                  required
                />
              </div>

              {/* SĐT */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Số điện thoại</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                  className="border border-[#d32f2f] rounded p-2 focus:ring-2 focus:ring-[#d32f2f]"
                  required
                />
              </div>

              {/* Tỉnh/Thành phố */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Tỉnh/Thành phố</label>
                <select
                  value={form.cityCode ? `${form.cityCode}|${form.city}` : ""}
                  onChange={handleCityChange}
                  className="border border-[#d32f2f] rounded p-2 focus:ring-2 focus:ring-[#d32f2f]"
                  required
                >
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  {provinces.map((p) => (
                    <option key={p.code} value={`${p.code}|${p.name}`}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quận/Huyện */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Quận/Huyện</label>
                <select
                  value={
                    form.districtCode
                      ? `${form.districtCode}|${form.district}`
                      : ""
                  }
                  onChange={handleDistrictChange}
                  className="border border-[#d32f2f] rounded p-2 focus:ring-2 focus:ring-[#d32f2f]"
                  required
                  disabled={!districts.length}
                >
                  <option value="">Chọn Quận/Huyện</option>
                  {districts.map((d) => (
                    <option key={d.code} value={`${d.code}|${d.name}`}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phường/Xã */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Phường/Xã</label>
                <select
                  value={form.wardCode ? `${form.wardCode}|${form.ward}` : ""}
                  onChange={handleWardChange}
                  className="border border-[#d32f2f] rounded p-2 focus:ring-2 focus:ring-[#d32f2f]"
                  required
                  disabled={!wards.length}
                >
                  <option value="">Chọn Phường/Xã</option>
                  {wards.map((w) => (
                    <option key={w.code} value={`${w.code}|${w.name}`}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tên đường */}
              <div className="col-span-2 flex flex-col">
                <label className="font-semibold mb-1">
                  Tên đường, Tòa nhà, Số nhà
                </label>
                <input
                  name="street"
                  value={form.street}
                  onChange={handleChange}
                  placeholder="Ví dụ: Ngõ 10, số 15B, chung cư ABC"
                  className="border border-[#d32f2f] rounded p-2 focus:ring-2 focus:ring-[#d32f2f]"
                  required
                />
              </div>

              {/* Ghi chú */}
              <div className="col-span-2 flex flex-col">
                <label className="font-semibold mb-1">Ghi chú</label>
                <textarea
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  placeholder="VD: Giao sau 17h, gọi trước khi đến..."
                  className="border border-[#d32f2f] rounded p-2 focus:ring-2 focus:ring-[#d32f2f]"
                  rows={3}
                />
              </div>

              {/* Đặt làm địa chỉ mặc định */}
              <div className="col-span-2 flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="accent-[#d32f2f]"
                  name="isDefault"
                  checked={form.isDefault}
                  onChange={handleChange}
                />
                <span className="text-sm">Đặt làm địa chỉ mặc định</span>
              </div>

              {/* Loại địa chỉ */}
              <div className="col-span-2 flex gap-4">
                {["HOME", "WORK", "OTHER"].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      className="accent-[#d32f2f]"
                      name="addressType"
                      value={type}
                      checked={form.addressType === type}
                      onChange={handleChange}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>

              {/* Nút */}
              <div className="col-span-2 flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-[#d32f2f] text-[#d32f2f] bg-white rounded-lg hover:bg-[#ffeaea]"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#d32f2f] text-white rounded-lg hover:bg-red-700 shadow"
                >
                  {editId ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAddress;
