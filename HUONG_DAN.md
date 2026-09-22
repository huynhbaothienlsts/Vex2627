# Hướng dẫn website chấm tuyển VEX Override

Website có thể chạy trên GitHub Pages và đồng bộ dữ liệu giữa hai phòng bằng Google Apps Script cùng Google Sheets.

## Phần 1 Tạo Google Sheet và Apps Script

1. Tạo một Google Sheet mới, ví dụ `VEX Override 2026-2027 Data`.
2. Trong Google Sheet, chọn **Extensions > Apps Script**.
3. Xóa nội dung mặc định của `Code.gs`.
4. Sao chép toàn bộ nội dung từ `google-apps-script/Code.gs` vào `Code.gs`.
5. Nếu muốn dùng manifest đi kèm, bật hiển thị `appsscript.json` trong Project Settings rồi thay nội dung bằng tệp tương ứng.
6. Lưu dự án.
7. Chọn hàm `setupVexApi` và bấm **Run**.
8. Chấp nhận quyền truy cập Google Sheet khi Google yêu cầu.
9. Mở **Executions**, chọn lần chạy vừa hoàn tất và sao chép giá trị `API_TOKEN` trong log. Không đưa token này lên GitHub.

Hàm thiết lập sẽ tạo sheet `VEX_DATA`, dòng tiêu đề và hai Script Properties là `SPREADSHEET_ID` cùng `API_TOKEN`.

## Phần 2 Triển khai Apps Script thành Web App

1. Trong Apps Script, chọn **Deploy > New deployment**.
2. Chọn loại **Web app**.
3. Description: `VEX Override scoring API`.
4. Execute as: **Me**.
5. Who has access: chọn phạm vi cho phép các thiết bị giám khảo truy cập. Khi website đặt trên GitHub Pages, lựa chọn thường dùng là **Anyone**; API token trong ứng dụng sẽ kiểm soát thao tác đọc/ghi.
6. Bấm **Deploy** và sao chép URL kết thúc bằng `/exec`.

Không dùng URL thử nghiệm kết thúc bằng `/dev`, vì URL đó chỉ dành cho người có quyền sửa Apps Script.

## Phần 3 Kết nối website

1. Mở website đã triển khai trên GitHub Pages.
2. Bấm trạng thái kết nối ở góc trên bên phải.
3. Dán URL Web App kết thúc bằng `/exec`.
4. Dán `API_TOKEN` lấy từ bước thiết lập.
5. Nhập tên thiết bị hoặc ban giám khảo, ví dụ `Phòng 228` hoặc `Phòng 207`.
6. Website tải dữ liệu hiện có từ Google Sheets. Sau đó mỗi thay đổi sẽ tự đồng bộ.

URL và token chỉ được lưu trong localStorage của trình duyệt đang sử dụng. Chúng không nằm trong mã nguồn GitHub.

## Quy trình thử nghiệm

1. Trang **Tổng quan**: nhập điểm Engineering Notebook trên thang 64.
2. Trang **Phỏng vấn và Robot**: chọn đội, nhập tên ban giám khảo, chấm đủ 6 tiêu chí phỏng vấn và 5 tiêu chí thiết kế robot, sau đó hoàn tất phiếu.
3. Trang **Robot Skills**: nhập tối đa 3 lượt Autonomous và 3 lượt Driver. Hệ thống lấy điểm cao nhất của mỗi loại.
4. Trở lại **Tổng quan** để xem điểm quy đổi và thứ hạng. Có thể xuất CSV hoặc sao lưu JSON.

## Công thức

- Engineering Notebook: `điểm / 64 × 20`.
- Phỏng vấn kỹ thuật: `điểm / 12 × 20`.
- Thiết kế robot: tổng trực tiếp 5 tiêu chí, tối đa 20.
- Autonomous Skills: `điểm tốt nhất / điểm Autonomous cao nhất trong 8 đội × 20`.
- Driver Skills: `điểm tốt nhất / điểm Driver cao nhất trong 8 đội × 20`.
- Tổng tối đa: 100 điểm.

Thứ tự xử lý đồng hạng: tổng điểm, Autonomous quy đổi, Driver quy đổi, Phỏng vấn quy đổi, tên đội.

## Cơ chế chống ghi đè

- Mỗi đội có một dòng trong sheet `VEX_DATA`.
- Notebook, phỏng vấn/thiết kế và Skills được lưu theo ba phạm vi riêng.
- Apps Script dùng `LockService` khi ghi để tránh hai yêu cầu thay đổi Sheet cùng lúc.
- Cột `updatedBy` và `updatedAt` ghi lại thiết bị/người cập nhật gần nhất.
- Nếu mất mạng, điểm vẫn còn trong trình duyệt. Bấm **Đồng bộ ngay** sau khi mạng hoạt động lại.

## Lưu ý bảo mật

- Không ghi API token vào `app.js`, tài liệu công khai hoặc GitHub Issues.
- Chỉ nhập token trên thiết bị giám khảo.
- Sau sự kiện, có thể chạy lại `setupVexApi` sau khi xóa Script Property `API_TOKEN` để tạo token mới.
- Giải pháp token dùng chung phù hợp cho sự kiện nội bộ, nhưng không thay thế hệ thống tài khoản cá nhân nếu website được mở cho công chúng không tin cậy.
- Robot Inspection vẫn là điều kiện PASS hoặc PARTIAL riêng, chưa tính vào 20 điểm thiết kế.

## Cập nhật Apps Script sau này

Sau khi sửa `Code.gs`, vào **Deploy > Manage deployments**, chọn biểu tượng chỉnh sửa, tạo version mới và cập nhật deployment hiện tại. Giữ nguyên deployment giúp URL `/exec` không đổi.
