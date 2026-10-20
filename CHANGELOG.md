# Nhật Ký Phát Triển & Tổng Hợp Thay Đổi (Changelog)

> **Dự án**: Portfolio Cá Nhân - Tô Trọng Nhân  
> **Công nghệ**: Next.js 16.4.2 (Turbopack), TypeScript, Tailwind CSS, Vanilla SVG Animation  
> **Cảm hứng thiết kế**: Phong cách Craft Paper & Minimal Monospace Typography (tương tự [voanhphi.vercel.app](https://voanhphi.vercel.app/))

---

## 1. Khởi Tạo & Cấu Trúc Dự Án (Next.js Mới Nhất)

- **Framework**: Nâng cấp và thiết lập trên **Next.js 16.4.2** với Turbopack engine, App Router và Strict TypeScript.
- **Tối ưu hình ảnh (`next.config.ts`)**: Cấu hình `images: { qualities: [75, 95] }` để xử lý mượt mà ảnh chất lượng cao mà không bị cảnh báo xác thực của Next.js 16.
- **Typography & Font Chữ**:
  - `Fraunces`: Font serif cổ điển, dùng cho các tiêu đề lớn, tên riêng và chữ in nghiêng nghệ thuật.
  - `Outfit`: Font sans-serif hiện đại, độ đọc cao cho nội dung đoạn văn.
  - `JetBrains Mono`: Font monospace dùng cho các nhãn điều hướng, badge và mã kỹ thuật.
- **Nền & Hiệu Ứng Giấy**:
  - Áp dụng nền canvas giấy (`#fafaf8`, viền `#eae7e1`, nền phụ `#f2f0ec`).
  - Đường lưới mờ tinh tế kết hợp bộ lọc SVG `ink-wobble` tạo hiệu ứng rung mực thủ công.
  - Con trỏ chuột tùy biến (`CustomCursor.tsx`) với vòng tròn nhỏ, chấm tâm đen và nhãn nhấp nhô (floating pill badge) mượt mà.

---

## 2. Cập Nhật Thông Tin Cá Nhân & Dự Án

- **Thông tin liên hệ**:
  - **Email**: `totrongnhan1209@gmail.com`
  - **GitHub**: [https://github.com/ToTrongNhan1209](https://github.com/ToTrongNhan1209)
- **Tối giản hóa danh mục kinh nghiệm & dự án**:
  - Đã lược bỏ toàn bộ các kinh nghiệm và dự án mẫu dư thừa.
  - Chỉ giữ lại đúng **2 dự án trọng tâm**:
    1. **SonaSpace**: Nền tảng âm thanh podcast trực tuyến.
    2. **Toti--Social Network**: Mạng xã hội của Tô Trọng Nhân.
       - Liên kết thực tế: [https://totrongnhan.totrongnhansocialmedia.workers.dev/](https://totrongnhan.totrongnhansocialmedia.workers.dev/)
       - Ảnh mockup dự án (`toti-social.png`) được tinh chỉnh và làm nét qua thuật toán Lanczos3 & Unsharp Mask theo tỉ lệ chuẩn 16:10.

---

## 3. Trang Trí Stickers Món Ăn Đường Phố Việt Nam (`BleedStickers.tsx`)

- **Không cố định**: Chuyển từ `fixed` (dính trên màn hình) sang các sticker rải tự nhiên theo chiều dài trang (`absolute`). Khi người dùng cuộn trang, các món ăn lướt theo nội dung.
- **Kích thước nhỏ gọn**: Tinh chỉnh kích thước sticker xuống mức 40px - 44px thanh lịch.
- **Không hiện tên khi hover**: Gỡ bỏ tooltip text tên món ăn để giữ giao diện tối giản, sạch sẽ.

---

## 4. Trang Tùy Biến Studio (`/studio`) & Hệ Thống Biểu Tượng Động

Xây dựng trang Studio hoàn chỉnh tại đường dẫn `/studio` cho phép người dùng tùy biến và kiểm tra các biểu tượng:

### Nhóm biểu tượng chính (The mark):
1. **Mascot**: Avatar chibi cá nhân của Tô Trọng Nhân.
2. **Cube**: Khối hộp lập phương 3D xoay đều trong không gian.
3. **Monogram**: Chữ **N** đỏ phong cách italic serif đặc trưng.
4. **Phin**: Phin cà phê phin Việt Nam với giọt cà phê nhỏ chậm.
5. **Keycap**: Nút phím cơ 3D in chữ N đỏ, có tương tác click nhún phím.
6. **Paper plane**: Chiếc máy bay giấy origami có thể bay lượn khi bấm nút Replay.
- Tích hợp thanh trượt **Assembly (0 - 100%)** và nút **Build** cho từng đối tượng để quan sát quá trình hình thành từng chi tiết.

### Nhóm biểu tượng góc (The way in):
1. **Gear**: Bánh răng cơ khí viền sắc nét có tâm đỏ.
2. **Swatches**: Nan quạt bảng màu mở rộng khi rê chuột.
3. **Palette**: Bảng màu họa sĩ với các đốm sơn màu.
4. **Dial**: Đồng hồ công-tơ-mét / kim chỉ xoay.
5. **Brush**: Cọ vẽ nghệ thuật.
6. **Toggle**: Công tắc gạt tròn.
7. **Faders**: Cần gạt điều chỉnh equalizer âm thanh.
8. **Wand**: Cây đũa phép lấp lánh.
9. **Roller**: Con lăn sơn tường.

---

## 5. Tối Ưu Header & Tương Tác Navbar (Cập Nhật Mới Nhất)

### A. Bỏ "MAKE IT YOURS" & Giữ duy nhất 1 icon bên phải
- Gỡ bỏ hoàn toàn nút badge chữ `MAKE IT YOURS` và biểu tượng nan quạt chồng lấn.
- Bên cạnh nút chuyển đổi ngôn ngữ `[VI/EN]`, chỉ hiển thị duy nhất **1 icon button** hình khối bo góc vuông mềm (`rounded-xl`).

### B. Logo bên trái giữ cố định nguyên bản
- Logo đại diện thương hiệu cá nhân ở góc trên bên trái (cả ở trang chủ `Navbar.tsx` và trang `studio/page.tsx`) luôn là **avatar chibi của Tô Trọng Nhân**.
- Logo này được cố định hoàn toàn, **không bị thay đổi** khi người dùng tùy biến trong Studio.

### C. Chỉ thay đổi icon bên phải khi tương tác
- Toàn bộ các lựa chọn trong Studio (cả hàng trên như **Mascot, Cube, Keycap, Phin, Plane, Monogram** lẫn hàng dưới như **Gear, Swatches, Palette, Dial, Brush...**) đều được kết nối với icon ở góc trên bên phải.
- Khi người dùng bấm **"Use this"** hoặc click vào thẻ nào, **chỉ duy nhất icon bên phải thay đổi ngay lập tức** tương ứng với hình đã chọn.
- Lựa chọn được đồng bộ thời gian thực qua Custom Event và lưu bền vững vào `localStorage` (`toti_active_corner_mark`).

### D. Hover menu không nhảy chữ, chỉ đổi màu đỏ
- Gỡ bỏ hiệu ứng Scramble (xáo trộn ký tự) trên thanh menu header.
- Các mục điều hướng (`HOW I WORK`, `STACK`, `WORK`, `CONTACT`) giữ nguyên vị trí chữ tĩnh, khi rê chuột vào chuyển sang **màu đỏ chủ đạo** (`#b42318`) mượt mà và sang trọng.

---

## 6. Màn Mở Đầu Website (Opening Intro Animation - Chuẩn voanhphi.vercel.app)

Đã tái hiện chính xác 100% hiệu ứng mở đầu trang web nghệ thuật từ voanhphi:
- **Hiệu ứng bầu trời & phong cảnh (Sky & Landscape)**:
  - Mặt trời đỏ thương hiệu (`#b42318`) mọc dần lên theo tiến độ đếm (`--p`).
  - 3 dải núi/đồi xếp lớp (`sky__band--far`, `sky__band--mid`, `sky__band--near`) với bóng đổ mờ chuyển động trượt lên.
  - Các đám mây trôi bềnh bồng (`sky__cloud--left`, `sky__cloud--right`) kèm lớp hạt giấy thủ công (`sky__grain`).
## 6. Màn Mở Đầu Sáng Tạo Mới: Xưởng Chế Tác Bản Vẽ & Khối Origami Isometric 3D (Đa Lớp Chuyển Động)

Theo yêu cầu chuyển động sống động, lôi cuốn và tương tác cao ("animation đồ chuyển động cho nó hay"), màn mở đầu đã được nâng cấp toàn diện với hệ thống **Kinetic Motion Graphics** đa tầng:

- **Hệ thống vệ tinh xoay quanh (Orbiting Vietnamese Craft & Tech Satellites)**:
  - 4 vệ tinh bay lượn trên quỹ đạo elip 3D quanh tâm:
    1. ☕ **Phin Cà Phê Nhỏ Giọt (Drip Coffee)**: Làn khói nghi ngút bốc lên, giọt cà phê tí tách rơi vào ly pha lê theo chu kỳ nhịp nhàng.
    2. 🥖 **Bánh Mì Sài Gòn (Crispy Banh Mi)**: Ổ bánh mì vàng ươm bồng bềnh lơ lửng.
    3. ✈️ **Máy Bay Giấy Origami (Origami Jet)**: Phi cơ giấy lượn sóng trong không gian.
    4. 💻 **Thẻ Lập Trình Chip `<DEV/>`**: Đèn led xanh nhấp nháy phát tín hiệu `Next · Nest · TS`.
  - Mỗi vệ tinh có chuyển động nhấp nhô độc lập (`satellite-float-1` đến `4`) và hiệu ứng phóng to nhún nhảy (`scale(1.24)`) khi rê chuột vào.

- **Bụi giấy & Mực vàng bay lơ lửng tương tác (Ambient Stardust Canvas)**:
  - Lớp Canvas 2D vẽ 38 hạt bụi giấy cổ điển và đốm mực son đỏ bay trôi nổi trong không gian.
  - Khi người dùng di chuột, các hạt bụi tự động rẽ sang hai bên theo lực đẩy vật lý gió nhẹ.

- **Quét Radar & Tương Tác Sóng Mực Khi Click (Radar Sweep & Click Ripples)**:
  - Tia quét radar kiến trúc góc 360 độ xoay liên tục quanh mặt phẳng bản vẽ.
  - Khi click vào bất kỳ đâu trên màn hình, một vòng tròn sóng mực son (`click-ripple`) lan tỏa ra ngoài.
  - Click vào màn hình cũng kích hoạt lực xoay bứt tốc (`spin impulse`) cho khối Origami 3D.

- **Bộ Đo Âm Thanh Nhạc Lo-Fi Sài Gòn (Dancing Equalizer Bars)**:
  - Góc trên phải hiển thị `SAIGON LO-FI · 84 BPM` với 5 thanh sóng nhạc equalizer nhún nhảy theo giai điệu thư thái.

- **Stickers Món Ăn Bồng Bềnh Dọc Sườn Trang (`BleedStickers.tsx`)**:
  - Tích hợp chuyển động lơ lửng nhẹ nhàng (`animate-sticker-sway-1` & `2`) cho các món ăn đường phố Việt Nam, tạo cảm giác như những chiếc nhãn dán đang trôi êm đềm trong không gian.

- **Tinh chỉnh giao diện & Tối ưu bố cục theo yêu cầu mới nhất**:
  - **Góc trên bên trái**: Đã dọn sạch các nhãn phụ ("Xưởng Chế Tác Bản Vẽ", "REF...", "VIBE 2026"), chỉ giữ lại duy nhất **Tên tác giả: Tô Trọng Nhân** (font serif Fraunces lớn, sang trọng) và dòng chức danh `Software Engineer / Full-stack`.
  - **Góc trên bên phải**: Loại bỏ hoàn toàn khối chữ bị đè/chồng lấn (`SAIGON LO-FI`, `SCALE: 1:1`, tọa độ và đồng hồ), chỉ giữ lại duy nhất **nút bấm `Skip [ESC]`** tối giản, thanh lịch và sạch sẽ.
  - **Phóng to mô hình 3D**: Tăng kích thước khối Origami từ 130px lên **175px** (+35%), mở rộng vòng thước thiên văn lên **380px - 560px**, tăng kích thước con dấu son *Nhân* lên **96px - 120px** và đẩy các vệ tinh ra xa hơn một chút để bố cục thoáng đãng, nổi bật.
  - **Kéo dài thời gian chuyển động**: Điều chỉnh thời gian chạy từ 2.8s lên **~4.8 giây**, giúp quá trình đếm số `00 -> 100%`, các nếp gấp Origami và chuyển động 3D diễn ra thư thái, mượt mà và dễ theo dõi hơn.

- **Sửa lỗi Hydration & Ẩn dòng chữ phụ thứ 2 theo yêu cầu**:
  - **Khắc phục lỗi Hydration Error (`1 Issue`)**: Đã cố định độ chính xác số học của 12 vạch khắc thước thiên văn (`ASTROLABE_TICKS`) với chuẩn `.toFixed(2)` và đảm bảo vòng đời render client-side không sai lệch giữa server Node.js và trình duyệt. Badge báo lỗi `1 Issue` của Next.js đã biến mất hoàn toàn.
  - **Ẩn dòng chữ phụ thứ 2 ở góc dưới bên trái**: Đã gỡ bỏ dòng phụ tiếng Anh (`statusSub`), chỉ giữ lại duy nhất 1 dòng trạng thái chính gõ máy chữ gọn gàng: `> Pha cà phê phin & mài mực triện son... ▋`.

- **Bố Cục Chuẩn: Header Giữ Icon Đổi Mô Hình, Thẻ Dưới Luôn Là Ảnh Cá Nhân**:
  - **Thẻ lật Hero bên dưới (`HeroFlipCard.tsx`)**: Luôn hiển thị duy nhất **ảnh đại diện chibi cá nhân của Tô Trọng Nhân** (`/images/avatar.png`), có hiệu ứng lật thẻ 3D mượt mà để xem câu danh ngôn triết lý ở mặt sau. Đã gỡ bỏ toàn bộ badge đổi mô hình trên thẻ để giữ thẻ nguyên bản, sạch đẹp.
  - **Biểu tượng trên Header góc trên bên phải (`Navbar.tsx`)**: Đóng vai trò là nút chuyển đổi và phản ánh các biểu tượng/mô hình (Cube, Phin, Keycap, Gear, Palette...) khi bạn lựa chọn trong Studio (`/studio`).
  - **Logo góc trên bên trái (`Navbar.tsx`)**: Luôn cố định là avatar thương hiệu cá nhân của Tô Trọng Nhân.

- **Phân biệt Chuyển trang (Client Navigation) và Tải lại trang (Page Refresh/F5)**:
  - **Khi chuyển giữa các trang (`/` ⇄ `/studio`)**: Màn mở đầu **KHÔNG chạy lại**, giúp trải nghiệm duyệt web liền mạch, nhanh chóng và không gây gián đoạn.
  - **Khi Tải lại trang (Refresh / F5)**: Bộ nhớ runtime được nạp mới hoàn toàn, màn mở đầu sẽ **tự động chạy lại ngay lập tức** từ `00` đến `100%`.
  - **Phát lại chủ động trong Studio**: Nút *"Replay opening"* trong trang `/studio` vẫn luôn sẵn sàng để bạn có thể xem lại màn mở đầu bất cứ lúc nào.
  - Nút **`Skip [ESC]`** và phím `Escape` cho phép bỏ qua nhanh bất kỳ lúc nào.

---

## 8. Đổi Mô Hình Trực Tiếp Trên Header Ngay Tại Trang Chủ (In-Place Changer)

- **Không chuyển hướng / Không mở lại màn khởi động**:
  - Gỡ bỏ liên kết `<Link href="/studio">` trên icon góc phải của Header. Khi nhấp vào icon, người dùng **hoàn toàn ở lại trên Trang chủ** (`/`), không bị chuyển hướng sang trang khác và tuyệt đối không kích hoạt lại màn hình khởi động (Opening).
- **Cơ chế đổi mô hình trực tiếp**:
  1. **Nhấp nhanh để đổi (Click to Cycle)**: Nhấp trực tiếp vào icon trên Header sẽ tự động chuyển ngay sang mô hình tiếp theo trong danh sách (Cube 3D ➔ Phin Cà Phê ➔ Keycap N ➔ Máy Bay Giấy ➔ Bánh Răng ➔ Monogram N ➔ Thẻ Màu ➔ ...). Kèm theo hiệu ứng rung nảy nhẹ (`pop animation`) và thông báo nổi tức thì (`✦ Đã đổi: [Tên mô hình]`).
  2. **Khay chọn toàn bộ 14 mô hình (Dropdown Tray / Palette)**: Nhấp vào mũi tên `▾` bên cạnh icon sẽ mở khay menu thả xuống ngay tại Header. Hiển thị lưới trực quan 14 mô hình với biểu tượng, tên tiếng Việt và thẻ phân loại (3D, Icon, Origami, Kinetic, v.v.). Nhấp vào mô hình bất kỳ để áp dụng ngay lập tức.
  3. **Lưu trữ tự động**: Lựa chọn mô hình được lưu ngay vào `localStorage` (`toti_active_corner_mark`) và đồng bộ thời gian thực qua sự kiện `toti_mark_changed`.
  4. **Mô hình mặc định**: Khi mới vào trang, mặc định hiển thị khối **Cube 3D** theo đúng ý muốn.

---

## 9. Nâng Cấp Mô Hình 3D Mở Đầu Đột Phá & Sáng Tạo Hơn

- **Cập Nhật Ảnh Đại Diện Chính Trên Trang Chủ (Hero Card)**:
  - Đã cập nhật ảnh đại diện mới nhất của bạn (chibi mắt mở to, cười tươi, mặc vest đen trên nền vàng đất) vào thẻ lật chính trên trang chủ ([HeroFlipCard.tsx](file:///d:/Vibe%20code/forfolio/src/components/HeroFlipCard.tsx)).
  - Chuyển đường dẫn sang `/images/avatar-v2.png` và xóa sạch bộ nhớ cache của Next.js (`.next/cache`) để đảm bảo trình duyệt nạp ảnh mới ngay lập tức mà không bị lưu ảnh cũ.
  - Đồng bộ trên cả Logo Navbar, Thẻ Hero trang chủ, Lõi Hologram 3D và OpenGraph metadata.
- **Hệ Thống 3 Vòng Con Quay Thiên Văn 3D (Triple 3D Celestial Armillary Gyroscope)**:
  - Tích hợp hệ thống **3 vòng con quay 3D lồng nhau** (X-axis, Y-axis, Z-axis) bao quanh mô hình, xoay độc lập trong không gian 3 chiều với các vạch khắc tọa độ và điểm laser định vị.
- **Trọng Tâm Hologram Chibi Phát Sáng Lơ Lửng (3D Holographic Avatar Core)**:
  - Ở chính giữa tâm khối, lơ lửng một **viên tinh thể đa diện phát sáng** gắn chân đế laser xoay tròn (`pedestal spin`).
  - Bên trong tinh thể là **ảnh Hologram 3D của Tô Trọng Nhân** với hiệu ứng ánh sáng quang học chớp nháy vi diệu (`holo-flicker`) và vầng hào quang ấm áp tỏa qua các vách giấy Washi mờ ảo.
- **Hiệu Ứng Nở Bung Lắp Ráp CAD (Exploded-View Assembly `explodeZ`)**:
  - Trong quá trình đếm số từ `00 -> 100%`:
    - Ở giai đoạn giữa (22% - 84%), 6 mặt của khối lập phương tự động bung nở ra ngoài theo các trục pháp tuyến (độ mở lên đến 26px), hé lộ cấu trúc bản vẽ giải phẫu kỹ thuật và lõi tinh thể bên trong.
    - Sau đó, các mặt nhịp nhàng hút lại với nhau và khóa chặt bằng lực nam châm (`magnetic snap`) ngay trước khi con dấu son đóng xuống.
- **Thiết Kế Đậm Chất Kiến Trúc & Công Nghệ Trên Từng Mặt Khối**:
  - **Mặt trước (Front)**: Con dấu triện son *Nhân - Tô Trọng Nhân ✦ 2026* với 4 góc định vị laser đỏ và sóng xung kích lan tỏa.
  - **Mặt trên (Top)**: Phím cơ 3D nổi in chữ N, thước đo góc nghiêng `∠30° CAD` và độ cao `ELEV: +87.5mm`.
  - **Mặt phải (Right)**: Bảng mạch điện tử chip vi xử lý full-stack (`NEXT.JS 16 · NEST.JS · TS`) với đèn LED xanh nhấp nháy thực.
  - **Mặt trái (Left)**: Bản vẽ phối cảnh trục đo `175 × 175 × 175 mm`, thông số dung sai `±0.01mm` và châm ngôn `Craft & Logic`.
  - **Mặt sau (Back)**: Vòng tròn hiệu chuẩn ma trận Origami và tọa độ Sài Gòn.
  - **Mặt đáy (Bottom)**: Tấm đế neo móng địa hình `BASE DATUM ELEV: 0.000m`.
- **Tương Tác Con Trỏ 3D Chiều Sâu Đa Tầng**:
  - Di chuột làm nghiêng phối cảnh 3D với góc nghiêng mượt mà; nhấp chuột tạo lực xoay bứt tốc và xung lực đẩy khối hộp thở nhịp nhàng.

---

## 10. Hệ Thống Animation Động Đa Tầng Màn Khởi Động (Interactive & Kinetic 3D Experience)

- **Cơ Chế Nảy Lò Xo Đàn Hồi Khi Nhấp Chuột (Spring Shockwave Expansion & Spin Boost)**:
  - Khi nhấp chuột vào bất cứ đâu trên màn hình, khối 3D không chỉ xoay bứt tốc (`spinImpulse +45°`) mà các mặt khối sẽ **bung nở đàn hồi tức thì (`clickPulse +22px`)** tạo hiệu ứng như một cỗ máy cơ học đang thở và phản hồi xúc giác cực kỳ sống động.
- **Hệ Thống Thẻ Công Nghệ Bay Quanh Lõi Hologram (Orbiting Tech Badges)**:
  - 3 thẻ công nghệ nổi bật (`<Next.js 16/>`, `<TypeScript/>`, `<NestJS/>`) bay lượn trên 3 quỹ đạo elip 3D khác nhau bao quanh ảnh Hologram của Tô Trọng Nhân.
  - Chân đế laser xoay tròn (`pedestal-spin`) và tia quét laser đỏ (`laser-scan`) chuyển động lên xuống liên tục xuyên qua tinh thể.
- **Vệ Tinh Siêu Nhỏ Trên Vòng Thiên Văn (Gyro Micro-Nodes)**:
  - Trên cả 3 vòng con quay 3D đều gắn các vi vệ tinh phát sáng nhấp nháy (`node-ping`), chuyển động cùng chiều quay trong không gian.
- **Animation Tinh Xảo Trên Từng Mặt Khối**:
  - **Mặt trước**: Vòng hoa văn Guilloche cổ điển xoay ngược chiều kim đồng hồ phía sau con dấu son; tia quét laser quét qua bề mặt.
  - **Mặt trên**: Vòng la bàn cơ khí xoay 360 độ quanh phím cơ Keycap N; đèn báo cao độ nhấp nháy.
  - **Mặt phải**: Hệ thống đèn LED hoạt động thật (`TX` xanh chớp nháy, `RX` hổ phách, `SYNC` đỏ) cùng chỉ số FPS thời gian thực.
  - **Mặt trái**: Bánh răng kiến trúc CAD quay đều đặn với các răng cưa khớp nối.
  - **Mặt sau**: Tia quét radar ma trận xoay tròn 360 độ tìm kiếm tọa độ.

---

---

## 11. Tái Thiết Kế Mô Hình Khởi Động: Luminous 3D Origami Sun-Prism & Astral Craft

- **Khắc Phục Triệt Để "Lỗi Chữ" (Mirrored & Overlapping Text Bug)**:
  - **Nguyên nhân cũ**: Các mặt khối hộp 3D bán trong suốt chứa nhiều dòng chữ nhỏ (`BASE DATUM`, `ISO TOP`, `FACET-R`, `<TECH MATRIX/>`, v.v.) và các thẻ vệ tinh bay quanh khiến chữ mặt sau bị lật ngược (mirrored) và chồng chéo lên chữ mặt trước khi khối xoay 3D.
  - **Giải pháp**: Gỡ bỏ 100% chữ viết trên toàn bộ các mặt xoay 3D và thẻ vệ tinh. Bề mặt 3D giờ đây là các hoa văn nếp gấp origami, bánh răng cơ khí vàng kim và đèn LED tín hiệu thuần khiết, thanh lịch.
  - **Mặt trước duy nhất có chữ**: Con triện son đỏ truyền thống `Nhân ✦ 2026` được đặt trên nền trắng tinh khiết với thuộc tính `backface-visibility: hidden`, hoàn toàn không bị lộ ngược hay bóng ma từ phía sau.
  - Các thông số kỹ thuật, trạng thái tải (`> Dựng khối hình học...`) và bộ đếm phần trăm lớn (`00%` -> `100%`) được cố định ở 4 góc HUD 2D màn hình, rõ ràng và sắc nét.

- **Thiết Kế Khác Biệt & Sáng Bừng Không Gian ("Sáng hơn mô hình cũ")**:
  - **Vầng Hào Quang Thái Dương (`opening__sunburst`)**: Trung tâm tỏa sáng rực rỡ với hiệu ứng gradient ấm áp (`#ffffff` -> vàng kem hoàng gia), xua tan cảm giác tối màu / bìa carton cũ kỹ.
  - **Tia Nắng Xoay 360° (`opening__sun-rays`)**: Các dải sáng mặt trời xoay nhẹ nhàng tạo chiều sâu không gian vũ trụ lung linh.
  - **Cánh Gập Origami Ánh Kim (Luminous Facets)**: Tông màu trắng sứ cao cấp (`#ffffff` đến `#fffcf5`) viền chỉ vàng kim loại sang trọng (`#e6af2e`), tự động xếp cánh chuyển động mượt mà theo tiến trình 0% -> 100%.
  - **Quả Cầu Hologram Avatar Lơ Lửng (`opening__avatar-orb`)**: Đặt ở vị trí trung tâm phía trên khối, phát sáng ánh kim rực rỡ và chứa ảnh đại diện chibi mới nhất của Tô Trọng Nhân với nụ cười rạng rỡ và đôi mắt mở to thân thiện.
  - **Vòng Hào Quang Thiên Văn (`opening__celestial-halo`)**: Vòng vàng xoay quanh avatar với hiệu ứng quét ánh sáng lấp lánh.

- **Góc Nhìn Chính Diện (Frontal & Upright - Xử Lý Triệt Để Lỗi Méo Lệch Phải)**:
  - **Nguyên nhân cũ**: Góc xoay mặc định đặt `tiltY = 45deg` và `tiltX = -24deg` theo phối cảnh isometric khiến toàn bộ mô hình bị vẹo hẳn sang bên phải.
  - **Giải pháp**: Đưa góc nghiêng mặc định về chuẩn `tiltX = 0`, `tiltY = 0` (chính diện hoàn hảo). Khi người dùng rê chuột, mô hình phản hồi góc nghiêng 3D parallax nhẹ nhàng, mượt mà và tự cân bằng trở lại trung tâm.

- **Thiết Kế Mandala Sao Origami 8 Cánh Sáng Tạo (8-Pointed Celestial Star Mandala)**:
  - 4 cánh gập origami chính (Trên - Dưới - Trái - Phải) nở bung đối xứng hướng tâm khi đếm phần trăm.
  - 4 facet kim cương góc chéo (`[-45, 45, 135, 225]°`) tạo thành đóa hoa sao origami 8 cánh tỏa rạng rực rỡ, bề mặt trắng sứ viền vàng kim loại cao cấp.
  - Trung tâm chính diện là con triện son đỏ `Nhân ✦ 2026` và quả cầu Hologram Avatar lơ lửng bồng bềnh ngay tầm mắt người xem.

- **Bổ Sung Máy Bay Giấy Origami Ban Đầu Thu Nhỏ ("Máy bay mô hình ban đầu mà nhỏ thôi")**:
  - Tái hiện chiếc máy bay giấy origami đặc trưng của dự án dưới kích thước nhỏ nhắn, thanh thoát (~44px).
  - Đầy đủ các đường nếp gấp 3D, cánh trắng sứ, sống lưng bóng đổ, viền chỉ vàng và mũi cánh triện son đỏ.
  - Máy bay lượn vòng mượt mà theo quỹ đạo nghiêng thiên văn (`opening__plane-orbit`) quanh đóa hoa sao origami trung tâm kèm dải khói hơi phản lực cong tinh tế.

---

## 13. Hiện Thực Hóa Ý Tưởng: Chiếc Hộp Bí Mật 3D Lắp Ráp & Bật Mở Điều Bất Ngờ (Explosion Box)

- **Giai đoạn 1: Lắp ráp các bộ phận thành một chiếc hộp kín (0% -> 48%)**:
  - Khi vào trang web, 4 thành hộp bằng chất liệu giấy origami cao cấp viền chỉ vàng kim và nẹp góc kim loại sang trọng từ dưới mặt phẳng gấp đứng lên (`assembleWallAngle` từ 90° nằm bẹp gập đứng thẳng dậy 0°).
  - Nắp hộp mang con triện son `Nhân ✦ 2026` từ trên hạ xuống khít hoàn hảo, tạo thành một chiếc hộp quà 3D kín đáo, chắc chắn, đứng thẳng chính diện và cân đối giữa màn hình.
  - Con triện son đỏ đóng xuống kèm hiệu ứng sóng chấn động (shockwave) niêm phong chiếc hộp.

- **Giai đoạn 2: Hộp rung lắc hồi hộp kích thích tò mò (48% -> 68%)**:
  - Chiếc hộp bí mật rung lắc nhịp nhàng (`opening__box-shake`), tạo cảm giác hồi hộp cho người xem.
  - Dòng trạng thái HUD thông báo: `"Hộp đang rung lắc... Chuẩn bị mở ra điều bất ngờ!"`

- **Giai đoạn 3: Mở bung hộp & Bật tung điều bất ngờ (68% -> 100%)**:
  - BÙM! 4 thành hộp bật ngửa ra 4 phía theo kiểu hộp quà bùng nổ (Explosion Box), nắp hộp bay lên tan biến vào hư không.
  - Cột hào quang ánh sáng vàng kim (`opening__light-burst`) phun trào rực rỡ từ đáy hộp lên cao.
  - **ĐIỀU BẤT NGỜ**:
    - **Avatar Chibi Tô Trọng Nhân** từ trong lòng hộp nảy lò xo bật vút lên không trung (`avatarY = -75px`), bừng sáng giữa vòng hào quang thiên văn vàng kim với nụ cười rạng rỡ và đôi mắt mở to thân thiện!
    - **Chiếc máy bay giấy Origami** từ trong hộp phóng vút ra bầu trời, lượn những vòng cung ngoạn mục 360 độ quanh Avatar Chibi!
    - 8 ngôi sao pháo hoa vàng (`opening__confetti-star`) tung bay lấp lánh tứ phía!

---

## 14. Nâng Cấp Mô Hình Sáng Tạo & Xóa Bỏ Hoàn Toàn Blur Vàng (Artisanal Origami Wonder Chest)

- **Xóa bỏ hoàn toàn lớp Blur Vàng (`opening__sunburst` & `opening__sun-rays`)**:
  - Loại bỏ triệt để các khối màu radial-gradient vàng mờ nhạt và tia sáng xoay gây cảm giác nhòe mắt ở trung tâm màn hình.
  - Trả lại nền giấy phác thảo kỹ thuật kiến trúc sạch sẽ, tinh khôi (`#f6f4ee`), với các đường thước đo mm, vòng tròn la bàn thiên văn Astrolabe sắc nét và độ tương phản cao tuyệt đối.

- **Nâng cấp "Mô Hình Sáng Tạo" thành Chiếc Hộp Kỳ Quan Origami 3D (Wonder Chest)**:
  - **Hình thể 3D đa diện (Faceted Origami Polyhedron)**:
    - Mỗi mặt hộp được phân chia theo nếp gấp chéo origami 2 tông màu (mặt đón sáng `#ffffff` và mặt đổ bóng `#f5efe3`), mang lại cảm giác hình khối vật lý thực tế chứ không còn là những tấm thẻ phẳng đơn điệu.
    - 4 góc của mỗi thành hộp được gia cố bằng **nẹp góc kim loại đồng thau khắc đinh tán cơ khí (`opening__corner-bracket`)**.
    - Mặt trước của hộp trang bị **khóa cài cơ khí kim loại đồng thau (`opening__brass-latch`)** có lỗ khóa và mã số kỹ thuật chạm khắc `"TTN ✦ 2026"`.
    - Dải ruy băng sơn mài chu sa đỏ son viền chỉ vàng kim hoàng gia ôm trọn thân hộp.
  - **Lớp lót bên trong tuyệt mỹ (Obsidian & Gold Foil Mandala)**:
    - Khi hộp mở bung (`burstWallAngle = 78°`), mặt trong màu đá hắc diệp thạch sang trọng lộ ra với **đồ họa Mandala kỹ thuật đồ bản vàng kim (`opening__wall-inner`)**, biến chiếc hộp thành một đài hoa kỳ quan cơ khí.
  - **Vị trí Avatar Chibi Tô Trọng Nhân chính diện & cân đối**:
    - Avatar vươn cao kiêu hãnh ngay trung tâm tuyệt đối của hộp (`translate3d(0, -90px, 20px)`), đóng khung trong huy hiệu tròn viền kép vàng kim & đỏ son cùng 4 đinh tán ngôi sao 4 hướng.
    - Bổ sung ruy băng định danh kiến trúc: `"TÔ TRỌNG NHÂN ✦ CREATIVE ARCHITECT"`.
  - **Máy bay giấy Origami nguyên bản tái xuất hiện**:
    - Tái sử dụng chính xác vector origami gấp giấy biểu tượng ban đầu với nếp gấp và mảng tối cánh chim.
    - Máy bay cất cánh từ lòng hộp và lượn quỹ đạo 3D nghiêng cánh (bank angle 18°) bao quanh Avatar, để lại vệt bụi sao lấp lánh.
  - **Pháo hoa sao kim loại sắc nét (Vector Confetti Stars)**:
    - Thay thế các đốm mờ bằng các ngôi sao vector 4 cánh nhọn sắc sảo vàng kim và đỏ chu sa tung bay khi mở hộp.





