import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { getCategoryOfShopByShopId } from "../../api/CategoryOfShop";

const AdminCategoryTable = ({ shopId }) => {
  console.log("[AdminCategoryTable] shopId nhận được:", shopId);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Tự động gọi API khi shopId thay đổi
  useEffect(() => {
    const fetchCategories = async () => {
      if (!shopId) return;
      setLoading(true);
      try {
        console.log(
          "[AdminCategoryTable] Gọi getCategoryOfShopByShopId với shopId:",
          shopId
        );
        const res = await getCategoryOfShopByShopId(shopId);
        console.log("[AdminCategoryTable] Kết quả trả về:", res);
        setCategories(res?.result || []);
        setError("");
      } catch (err) {
        console.error(
          "[AdminCategoryTable] Lỗi khi gọi getCategoryOfShopByShopId:",
          err
        );
        setError("Không thể tải danh mục. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [shopId]);

  // 🔍 Lọc danh mục theo ô tìm kiếm
  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🌀 Hiển thị loading
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        Đang tải danh mục...
      </div>
    );
  }

  // ❌ Hiển thị lỗi
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-red-500 font-medium">
        {error}
      </div>
    );
  }

  // ✅ Hiển thị bảng danh mục
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tìm kiếm danh mục..."
            className="border rounded px-3 py-1 text-sm w-48"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="ml-2 px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition text-sm font-medium flex items-center gap-1">
            <FaPlus /> Thêm danh mục
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-400 py-6">
          Không có danh mục nào được tìm thấy.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-2 font-semibold text-left">
                  Tên danh mục
                </th>
                <th className="py-2 px-2 font-semibold text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cat) => (
                <tr
                  key={cat.id}
                  className="border-b hover:bg-orange-50 transition"
                >
                  <td className="py-2 px-2 font-medium">{cat.name}</td>
                  <td className="py-2 px-2 text-center flex gap-2 justify-center">
                    <button
                      className="bg-green-100 text-green-600 rounded p-1 hover:bg-green-200 transition"
                      title="Sửa"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-red-100 text-red-600 rounded p-1 hover:bg-red-200 transition"
                      title="Xóa"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminCategoryTable;
