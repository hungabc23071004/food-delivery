import React from "react";

const FeaturesSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 bg-white rounded-xl shadow-lg text-gray-800 leading-relaxed">
      {/* Tiêu đề chính */}
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        FoodGo - Ứng dụng đặt đồ ăn online vô vàn deal giảm giá
      </h2>
      <p className="mb-8 text-base">
        Trải nghiệm ẩm thực với đa dạng các món ăn đặc trưng miền đầy sáng tạo
        luôn là trải nghiệm thú vị với tất cả thực khách ở các thành phố lớn.
        Tuy nhiên, vì nhịp sống bận rộn, nhiều người đã lựa chọn các app đặt đồ
        ăn online để giúp cho việc tận hưởng bữa ăn ngon thêm dễ dàng hơn rất
        nhiều. Đi kèm với các ưu đãi như miễn phí ship, khuyến mãi cho người
        dùng mới... FoodGo với nhiều lựa chọn cửa hàng ở 16 tỉnh thành đang trở
        thành ứng dụng tiện ích giao đồ ăn nhanh chóng.
      </p>

      {/* Đa dạng gợi ý */}
      <h3 className="text-lg font-semibold mb-2 text-gray-900">
        Đa dạng gợi ý tìm kiếm theo sở thích
      </h3>
      <p className="mb-4 text-base">
        Người dùng muốn ship đồ ăn nhanh thông qua FoodGo dễ dàng tìm kiếm các
        gợi ý hàng quán theo sở thích. Các keyword được nhiều người tìm kiếm
        được trình bày rõ ràng như:{" "}
        <a href="#" className="text-blue-600 hover:underline">
          đồ ăn
        </a>
        ,{" "}
        <a href="#" className="text-blue-600 hover:underline">
          đồ uống
        </a>
        ,{" "}
        <a href="#" className="text-blue-600 hover:underline">
          đồ chay
        </a>
        ... đến các loại{" "}
        <a href="#" className="text-blue-600 hover:underline">
          bánh kem
        </a>
        ,{" "}
        <a href="#" className="text-blue-600 hover:underline">
          tráng miệng
        </a>
        ,{" "}
        <a href="#" className="text-blue-600 hover:underline">
          homemade
        </a>
        ,{" "}
        <a href="#" className="text-blue-600 hover:underline">
          vỉa hè
        </a>
        ...
      </p>
      <p className="mb-8 text-base">
        Ở ứng dụng FoodGo, từ các cửa hàng bán đồ ăn vặt như:{" "}
        <a href="#" className="text-blue-600 hover:underline">
          bánh tráng trộn chú Viên
        </a>
        ,{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Phá Lấu Bò Marie Curie
        </a>
        ,{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Bánh Mì Bò Nướng Bơ Cambodia
        </a>
        ... tới các chuỗi nhà hàng thức ăn nhanh:{" "}
        <a href="#" className="text-blue-600 hover:underline">
          BurgerKing
        </a>
        ,{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Gà rán Popeyes
        </a>
        ,{" "}
        <a href="#" className="text-blue-600 hover:underline">
          The Pizza Company
        </a>
        ... hay ẩm thực Á Âu đa dạng{" "}
        <a href="#" className="text-blue-600 hover:underline">
          La Smoke House
        </a>
        ,{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Sushi Tei
        </a>
        ,{" "}
        <a href="#" className="text-blue-600 hover:underline">
          San Fu Lou
        </a>
        .
      </p>

      {/* Khuyến mãi */}
      <h3 className="text-lg font-semibold mb-2 text-gray-900">
        Dễ dàng tìm kiếm khuyến mãi phù hợp
      </h3>
      <p className="mb-8 text-base">
        Ngoài hỗ trợ các khuyến mãi hằng ngày như miễn phí ship trong phạm vi
        bán kính 3km, cho người dùng mới... ứng dụng đặt đồ ăn FoodGo còn tổng
        hợp các khuyến mãi có sẵn phù hợp với địa chỉ bạn đã thiết lập. Cũng
        như, các khuyến mãi này còn được tập hợp thành các bộ sưu tập đang diễn
        trong tháng với các chương trình khác nhau, ví dụ:{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Hôm nay ăn gì
        </a>
        ,{" "}
        <a href="#" className="text-blue-600 hover:underline">
          FreeshipXtra
        </a>
        ...
      </p>

      {/* Bộ lọc */}
      <h3 className="text-lg font-semibold mb-2 text-gray-900">
        Bộ lọc đa dạng và tiện dụng:
      </h3>
      <ul className="list-disc list-inside space-y-2 mb-6 text-base">
        <li>
          <strong>Gần tôi:</strong> chỉ cần thao tác nhập địa chỉ, app FoodGo sẽ
          mang đến các cửa hàng gần nhất.
        </li>
        <li>
          <strong>Bán chạy:</strong> những hàng quán có lượng đơn nổi bật, được
          nhiều người dùng lựa chọn mỗi ngày.
        </li>
        <li>
          <strong>Đánh giá:</strong> thông qua đánh giá của khách trên nền tảng,
          giúp bạn chọn quán uy tín.
        </li>
      </ul>
    </section>
  );
};

export default FeaturesSection;
