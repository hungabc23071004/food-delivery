import React from "react";

const AdminVendorTable = ({ data }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between mb-4">
      <div>
        <label className="text-xs text-gray-500 mr-2">Showing</label>
        <select className="border rounded px-2 py-1 text-xs">
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="border rounded px-3 py-1 text-sm w-48"
      />
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="py-2 px-2 font-semibold text-left">Profile</th>
            <th className="py-2 px-2 font-semibold text-left">Name</th>
            <th className="py-2 px-2 font-semibold text-left">Email</th>
            <th className="py-2 px-2 font-semibold text-center">Products</th>
            <th className="py-2 px-2 font-semibold text-center">Total Sell</th>
            <th className="py-2 px-2 font-semibold text-center">Status</th>
            <th className="py-2 px-2 font-semibold text-center">Join On</th>
            <th className="py-2 px-2 font-semibold text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b hover:bg-orange-50 transition">
              <td className="py-2 px-2">
                <img
                  src={row.profile}
                  alt={row.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </td>
              <td className="py-2 px-2 font-medium">{row.name}</td>
              <td className="py-2 px-2">{row.email}</td>
              <td className="py-2 px-2 text-center">{row.products}</td>
              <td className="py-2 px-2 text-center">{row.totalSell}</td>
              <td className="py-2 px-2 text-center">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    row.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {row.status}
                </span>
              </td>
              <td className="py-2 px-2 text-center">{row.joinOn}</td>
              <td className="py-2 px-2 text-center flex gap-2 justify-center">
                <button
                  className="bg-green-100 text-green-600 rounded p-1 hover:bg-green-200 transition"
                  title="Edit"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232a3 3 0 1 1 4.243 4.243L7.5 21H3v-4.5L15.232 5.232Z"
                    />
                  </svg>
                </button>
                <button
                  className="bg-red-100 text-red-600 rounded p-1 hover:bg-red-200 transition"
                  title="Delete"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 7h12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12Z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminVendorTable;
