import React from "react";
import CouponCard from "./CouponCard";

const coupons = [
  {
    id: 1,
    image:
      "https://down-zl-vn.img.susercontent.com/vn-11134512-7r98o-lwe7bxqb7w7v3b.jpg",
    title: "Ăn Tối No Nê, Giảm Tới 45K",
    locations: 200,
  },
  {
    id: 2,
    image:
      "https://vnn-imgs-f.vgcloud.vn/2021/09/10/17/shopeefood-uu-dai-dac-biet-khach-hang-moi-mien-phi-di-cho-dat-do-an-2.jpg",
    title: "Quán Quen Gần Nhà, Freeship 60K",
    locations: 200,
  },
  {
    id: 3,
    image:
      "https://giadinh.mediacdn.vn/296230595582509056/2021/12/1/anh-bia-02-1638354800293665678427.png",
    title: "Quán Ngon Truyền Kỳ",
    locations: 200,
  },
  {
    id: 4,
    image:
      "https://cdn.tuoitrethudo.vn/stores/news_dataimages/2022/072022/05/16/1161fe2766d3897ce2ac059b5a25305e.jpg",
    title: "Vạn Món Giá Hời, Mời Bạn Ưu Đãi",
    locations: 200,
  },
  {
    id: 5,
    image:
      "https://down-zl-vn.img.susercontent.com/vn-11134512-7ras8-manz2km88m18c4.jpg",
    title: "Siêu Tiệc Giảm 99.000Đ",
    locations: 200,
  },
  {
    id: 6,
    image:
      "https://down-zl-vn.img.susercontent.com/vn-11134512-7ra0g-m6fbfoy7kiw102.jpg",
    title: "Mùa Tựu Trường Giảm Đến 20%",
    locations: 200,
  },
  {
    id: 7,
    image:
      "https://down-zl-vn.img.susercontent.com/vn-11134512-7ras8-md5qrid70km4ae.jpg",
    title: "Ưu Đãi Đặc Biệt Cho Thành Viên Mới",
    locations: 200,
  },
  {
    id: 8,
    image:
      "https://down-zl-vn.img.susercontent.com/vn-11134512-7ras8-m3n0pv34k74x1a.jpg",
    title: "Combo Ăn Uống 69K",
    locations: 200,
  },
  {
    id: 9,
    image:
      "https://down-zl-vn.img.susercontent.com/vn-11134512-7ras8-mcztwt5af1i4c0.jpg",
    title: "Đặt Ngay Giảm 50% Món Ngon",
    locations: 200,
  },
  {
    id: 10,
    image:
      "https://down-zl-vn.img.susercontent.com/vn-11134512-7ras8-mdjqhc56z5f3ce@resize_ss320x320!@crop_w320_h320_cT",
    title: "Freeship 30K Cho Đơn Đầu Tiên",
    locations: 200,
  },
  {
    id: 11,
    image:
      "https://down-zl-vn.img.susercontent.com/vn-11134512-7ras8-m3n0jg9c9t4881@resize_ss320x320!@crop_w320_h320_cT",
    title: "Mua 1 Tặng 1 – Chỉ Hôm Nay",
    locations: 200,
  },
  {
    id: 12,
    image:
      "https://down-zl-vn.img.susercontent.com/vn-11134512-7ras8-m3n1z3169cxo88@resize_ss320x320!@crop_w320_h320_cT",
    title: "Đặt Món 0Đ – Cho Thành Viên Mới",
    locations: 200,
  },
];

const CouponList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-orange-600">
          Bộ sưu tập ưu đãi
        </h2>
        <a
          href="#"
          className="text-sm text-blue-500 hover:underline font-medium"
        >
          Xem tất cả
        </a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {coupons.map((coupon) => (
          <CouponCard
            key={coupon.id}
            image={coupon.image}
            title={coupon.title}
            locations={coupon.locations}
          />
        ))}
      </div>
    </div>
  );
};

export default CouponList;
