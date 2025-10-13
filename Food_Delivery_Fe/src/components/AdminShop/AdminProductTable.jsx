import React, { useState, useEffect } from "react";
import { getFoodByShopId } from "../../api/Food";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminProductTable = ({ shopId }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(2); // ✅ số lượng sản phẩm mỗi trang
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ Reset về trang đầu khi đổi shop
  useEffect(() => {
    setPage(1);
  }, [shopId]);

  // ✅ Gọi API khi shopId hoặc page thay đổi
  useEffect(() => {
    if (!shopId || page < 1) return; // tránh lỗi page=-1

    setLoading(true);
    getFoodByShopId(shopId, page, pageSize)
      .then((res) => {
        const content = Array.isArray(res?.result?.content)
          ? res.result.content
          : Array.isArray(res?.result)
          ? res.result
          : [];
        setProducts(content);
        setTotal(res?.result?.totalElements ?? content.length);
        setTotalPages(res?.result?.totalPages ?? 1);
        setError("");
      })
      .catch(() => {
        setProducts([]);
        setTotal(0);
        setTotalPages(1);
        setError("Không thể tải sản phẩm.");
      })
      .finally(() => setLoading(false));
  }, [shopId, page, pageSize]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  if (loading)
    return <div className="p-6 text-gray-400">Đang tải sản phẩm...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="border rounded px-3 py-1 text-sm w-48"
            readOnly
          />
          <button className="ml-2 px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition text-sm font-medium">
            Thêm sản phẩm
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-2 font-semibold text-left">Image</th>
              <th className="py-2 px-2 font-semibold text-left">Name</th>
              <th className="py-2 px-2 font-semibold text-left">Category</th>
              <th className="py-2 px-2 font-semibold text-center">Price</th>
              <th className="py-2 px-2 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-orange-50 transition"
              >
                <td className="py-2 px-2">
                  <img
                    src={
                      product.images && product.images.length > 0
                        ? `http://localhost:8080/food/uploads/images/${encodeURIComponent(
                            product.images[0]
                          )}`
                        : "https://via.placeholder.com/40x40?text=No+Image"
                    }
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                </td>
                <td className="py-2 px-2 font-medium">{product.name}</td>
                <td className="py-2 px-2">{product.category || ""}</td>
                <td className="py-2 px-2 text-center">
                  {product.price?.toLocaleString()}₫
                </td>
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

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-gray-500">
          Hiển thị {products.length} / {total} sản phẩm
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={handlePrev}
            disabled={page <= 1}
          >
            Trước
          </button>
          <span className="text-xs">
            Trang {page} / {totalPages}
          </span>
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={handleNext}
            disabled={page >= totalPages}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductTable;
