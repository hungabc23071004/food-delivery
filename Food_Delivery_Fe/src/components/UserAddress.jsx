import React from "react";
import {
  FaUserAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaStar,
} from "react-icons/fa";

const mockAddresses = [
  {
    name: "nhà 8b",
    address: "63 Đường 18M, Khu đô thị Mỗ Lao, Hà Đông, Hà Nội, Việt Nam",
    phone: "0399897208",
    isDefault: true,
  },
  {
    name: "số 4",
    address: "46/12 Phố Văn Hội, Đức Thắng, Bắc Từ Liêm, Hà Nội, Việt Nam",
    phone: "0399897208",
    isDefault: false,
  },
  {
    name: "",
    address:
      "64 Ng. 105 P. Doãn Kế Thiện, Mai Dịch, Cầu Giấy, Hà Nội, Việt Nam",
    phone: "0399897208",
    isDefault: false,
  },
];

const UserAddress = ({
  addresses = mockAddresses,
  onEdit,
  onDelete,
  onAdd,
}) => (
  <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
    <h3 className="font-bold text-2xl mb-6 flex items-center gap-2">
      <FaMapMarkerAlt className="text-[#cc3333]" />
      Cập nhật địa chỉ
    </h3>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-2">
        <colgroup>
          <col style={{ width: "18%" }} />
          <col style={{ width: "52%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "12%" }} />
        </colgroup>
        <thead>
          <tr className="bg-gray-100 rounded-lg">
            <th className="py-2 px-3 font-semibold text-sm text-left">
              <span className="flex items-center gap-1">
                <FaUserAlt className="text-gray-500" />
                Người nhận
              </span>
            </th>
            <th className="py-2 px-3 font-semibold text-sm text-left">
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-gray-500" /> Địa chỉ
              </span>
            </th>
            <th className="py-2 px-3 font-semibold text-sm text-left">
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
              <td className="py-2 px-3 align-top text-sm">{item.name}</td>
              <td className="py-2 px-3 align-top text-sm whitespace-pre-line">
                <span className="flex flex-col">
                  <span>{item.address}</span>
                  {item.isDefault && (
                    <span className="flex items-center gap-1 text-yellow-500 font-semibold text-sm mt-1">
                      <FaStar className="inline-block text-yellow-500 text-sm" />{" "}
                      Mặc định
                    </span>
                  )}
                </span>
              </td>
              <td className="py-2 px-3 align-top text-sm">{item.phone}</td>
              <td className="py-2 px-3 align-top">
                <div className="flex gap-3">
                  <button
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                    onClick={() => onEdit && onEdit(idx)}
                  >
                    <FaEdit /> Sửa
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                    onClick={() => onDelete && onDelete(idx)}
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
    <div className="flex justify-end mt-6">
      <button
        className="bg-[#cc3333] hover:bg-[#b82d2d] text-white px-7 py-2 rounded-lg font-semibold flex items-center gap-2 shadow text-base"
        onClick={onAdd}
      >
        <FaPlus /> THÊM
      </button>
    </div>
  </div>
);

export default UserAddress;
