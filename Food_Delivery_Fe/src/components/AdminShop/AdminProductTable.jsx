import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const mockProducts = [
  {
    id: 1,
    name: "Pizza Margherita",
    price: 120000,
    category: "Pizza",
    image:
      "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&w=80",
  },
  {
    id: 2,
    name: "Bánh mì thịt",
    price: 25000,
    category: "Bánh mì",
    image:
      "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=80",
  },
  {
    id: 3,
    name: "Trà sữa trân châu",
    price: 35000,
    category: "Đồ uống",
    image:
      "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=80",
  },
];

const AdminProductTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  };
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-start mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="border rounded px-3 py-1 text-sm w-48"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>
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
            {paginated.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-orange-50 transition"
              >
                <td className="py-2 px-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                </td>
                <td className="py-2 px-2 font-medium">{product.name}</td>
                <td className="py-2 px-2">{product.category}</td>
                <td className="py-2 px-2 text-center">
                  {product.price.toLocaleString()}₫
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
      {/* Pagination controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-gray-500">
          Hiển thị {paginated.length} / {total} sản phẩm
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={handlePrev}
            disabled={page === 1}
          >
            Trước
          </button>
          <span className="text-xs">
            Trang {page} / {totalPages}
          </span>
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductTable;
