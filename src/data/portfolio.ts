/**
 * Portfolio Data for Tô Trọng Nhân
 * Strictly aligned with the layout, content structure, and editorial tone of voanhphi.vercel.app
 */

export interface StatItem {
  val: string;
  labelEn: string;
  labelVi: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  categoryEn: string;
  categoryVi: string;
  year: string;
  image: string;
  descriptionEn: string;
  descriptionVi: string;
  stats: StatItem[];
  stack: string[];
  liveUrl?: string;
  sourceUrl?: string;
  readMoreUrl?: string;
  highlightsEn?: string[];
  highlightsVi?: string[];
}

export interface ExperienceItem {
  id: string;
  periodEn: string;
  periodVi: string;
  badgeEn: string;
  badgeVi: string;
  roleEn: string;
  roleVi: string;
  company: string;
  locationEn: string;
  locationVi: string;
  descriptionEn: string;
  descriptionVi: string;
  stats?: StatItem[];
  achievementsEn: string[];
  achievementsVi: string[];
  stack: string[];
  link?: string;
}

export interface StackGroup {
  categoryEn: string;
  categoryVi: string;
  noteEn: string;
  noteVi: string;
  items: string[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Tô Trọng Nhân",
    nameEn: "To Trong Nhan",
    nickname: "Nhân",
    titleEn: "Software Engineer / Full-stack",
    titleVi: "Kỹ sư Phần mềm / Full-stack",
    locationEn: "Ho Chi Minh City, Vietnam",
    locationVi: "TP. Hồ Chí Minh, Việt Nam",
    phone: "0866 463 002",
    email: "totrongnhan1209@gmail.com",
    github: "https://github.com/ToTrongNhan1209",
    avatar: "/images/avatar-v2.png",
    statusEn: "Getting things ready · Available for hire",
    statusVi: "Sẵn sàng đón nhận cơ hội việc làm mới",
    greetingEn: "Hey, I'm Nhân. Writing software from Ho Chi Minh City, Vietnam — hope your day's treating you well.",
    greetingVi: "Xin chào, mình là Nhân. Lập trình phần mềm tại TP. Hồ Chí Minh — chúc bạn một ngày tốt lành.",
    bioEn: "I work on both frontend and backend, mostly with React, Next.js, React Native, NestJS and PostgreSQL. I've built features for fintech, real estate, healthcare and internal business tools, and I enjoy understanding how the whole feature works, not just my part of the code.",
    bioVi: "Mình làm việc trên cả frontend và backend, chủ yếu với React, Next.js, React Native, NestJS và PostgreSQL. Mình đã xây dựng các tính năng cho fintech, bất động sản, y tế và công cụ nội bộ, đồng thời luôn yêu thích việc thấu hiểu toàn bộ luồng hoạt động của tính năng thay vì chỉ phần code của riêng mình.",
    mottoEn: "I like owning the whole path: interface, API, database, and the awkward bugs between them.",
    mottoVi: "Tôi thích làm chủ toàn bộ hành trình: giao diện, API, cơ sở dữ liệu và xử lý dứt điểm các lỗi phát sinh ở giữa."
  },

  manifesto: {
    introEn: "I usually start by figuring out what the feature needs to do, who will use it, and how the data should move through the system. Then I work through the UI, API and details that make it usable. It's not always a straight line, but I like being involved from the first discussion to the final check.",
    introVi: "Mình thường bắt đầu bằng việc xác định tính năng cần làm gì, ai sẽ sử dụng và dữ liệu sẽ luân chuyển như thế nào trong hệ thống. Sau đó hoàn thiện UI, API và các chi tiết giúp tính năng hoạt động trơn tru. Quá trình đó không phải lúc nào cũng là đường thẳng, nhưng mình thích tham gia từ buổi thảo luận đầu tiên đến khâu kiểm thử cuối cùng.",
    steps: [
      { num: "01", titleEn: "Understand the request", titleVi: "Thấu hiểu yêu cầu", descEn: "Clarify user intent, system boundary, and technical edge constraints.", descVi: "Làm rõ mục tiêu người dùng, phạm vi hệ thống và ràng buộc kỹ thuật." },
      { num: "02", titleEn: "Sketch the user flow", titleVi: "Phác thảo luồng người dùng", descEn: "Map out screen states, loading transitions, and edge interactions.", descVi: "Xác định rõ trạng thái màn hình, chuyển tiếp loading và tương tác biên." },
      { num: "03", titleEn: "Plan the data", titleVi: "Mô hình hóa dữ liệu", descEn: "Design relational schemas, table foreign keys, and performant indexes.", descVi: "Thiết kế schema quan hệ, khóa ngoại và đánh index tối ưu." },
      { num: "04", titleEn: "Agree on the API and responsibilities", titleVi: "Thống nhất API & trách nhiệm", descEn: "Define REST contracts, DTO schemas, and role permissions.", descVi: "Thiết lập chuẩn REST contract, DTO validation và phân quyền người dùng." },
      { num: "05", titleEn: "Build and connect the pieces", titleVi: "Xây dựng và ghép nối", descEn: "Implement UI components, API services, and optimistic caching.", descVi: "Hiện thực component giao diện, API service và đồng bộ dữ liệu." },
      { num: "06", titleEn: "Test the complete flow", titleVi: "Kiểm thử toàn diện", descEn: "Verify latency, empty collections, error rollbacks, and UAT.", descVi: "Kiểm tra độ trễ mạng, dữ liệu rỗng, rollback lỗi và nghiệm thu UAT." }
    ],
    principles: [
      {
        titleEn: "Understand the user flow",
        titleVi: "Thấu hiểu luồng người dùng",
        descEn: "Before jumping into components or endpoints, I try to understand what users need to do and what should happen at each step. Clear flows make implementation easier.",
        descVi: "Trước khi bắt tay vào viết component hay endpoint, mình luôn cố gắng hiểu người dùng cần làm gì và điều gì sẽ diễn ra ở mỗi bước. Luồng đi rõ ràng giúp việc lập trình nhẹ nhàng hơn rất nhiều.",
        takeawayEn: "Clear flows make implementation easier.",
        takeawayVi: "Luồng đi rõ ràng giúp việc lập trình nhẹ nhàng hơn rất nhiều."
      },
      {
        titleEn: "Know how the pieces connect",
        titleVi: "Hiểu rõ cách các phần kết nối",
        descEn: "I enjoy working across the UI, API and database because it helps me see where a problem really comes from. I don't want to stop at making a screen look right. I like knowing what happens after the button click.",
        descVi: "Mình thích làm việc xuyên suốt giữa UI, API và database vì điều đó giúp mình nhìn thấy gốc rễ vấn đề thực sự đến từ đâu. Mình không muốn chỉ dừng lại ở giao diện đẹp mà muốn hiểu tường tận điều gì xảy ra sau mỗi lượt click.",
        takeawayEn: "I like knowing what happens after the button click.",
        takeawayVi: "Tôi muốn biết điều gì xảy ra sau mỗi lượt bấm nút."
      },
      {
        titleEn: "Check what happens outside the happy path",
        titleVi: "Kiểm tra những gì ngoài luồng thuận",
        descEn: "I test how a feature behaves with real inputs, loading states and errors. A screen can look finished while the full flow still needs work. Loading, empty and error states matter too.",
        descVi: "Mình luôn kiểm thử xem tính năng phản ứng ra sao với dữ liệu thực tế, trạng thái đang tải và các lỗi phát sinh. Một màn hình nhìn qua có vẻ đã xong nhưng cả luồng có thể vẫn cần hoàn thiện. Loading, empty và error states đều quan trọng như nhau.",
        takeawayEn: "Loading, empty and error states matter too.",
        takeawayVi: "Trạng thái tải, rỗng và lỗi đều quan trọng như nhau."
      }
    ]
  },

  experiences: [] as ExperienceItem[],

  stackGroups: [
    {
      categoryEn: "Languages",
      categoryVi: "Ngôn ngữ",
      noteEn: "I use TypeScript most often.",
      noteVi: "Mình sử dụng TypeScript thường xuyên nhất.",
      items: ["JavaScript (ES6+)", "TypeScript", "Python"]
    },
    {
      categoryEn: "Frontend",
      categoryVi: "Frontend",
      noteEn: "Most of my work started on the frontend.",
      noteVi: "Phần lớn công việc ban đầu của mình bắt đầu từ frontend.",
      items: ["React", "Next.js", "Component architecture", "Redux", "Context API", "Responsive development"]
    },
    {
      categoryEn: "Backend",
      categoryVi: "Backend",
      noteEn: "I enjoy working on the API and data flow behind a feature.",
      noteVi: "Mình rất thích tối ưu hóa API và luồng dữ liệu đằng sau mỗi tính năng.",
      items: ["NestJS", "Express", "REST API design", "Authentication", "Authorization", "RBAC"]
    },
    {
      categoryEn: "Data",
      categoryVi: "Cơ sở Dữ liệu",
      noteEn: "I work with schemas regularly and keep learning about query performance.",
      noteVi: "Mình thường xuyên thiết kế schema và không ngừng trau dồi tối ưu hiệu năng truy vấn.",
      items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Schema design"]
    },
    {
      categoryEn: "Mobile",
      categoryVi: "Di động",
      noteEn: "Built real app features with React Native and Expo.",
      noteVi: "Xây dựng các tính năng ứng dụng thực tế với React Native và Expo.",
      items: ["React Native", "Expo", "Navigation", "Async Storage", "Authentication flows"]
    },
    {
      categoryEn: "AI features",
      categoryVi: "Tính năng AI",
      noteEn: "Used in SonaSpace and TomatoHub.",
      noteVi: "Đã ứng dụng trong SonaSpace và TomatoHub.",
      items: ["LLM API integration", "Prompt design", "Structured responses"]
    },
    {
      categoryEn: "Tools & platforms",
      categoryVi: "Công cụ & Nền tảng",
      noteEn: "Daily workflow tools.",
      noteVi: "Công cụ làm việc thường ngày.",
      items: ["Git", "Docker", "Postman", "Swagger", "Supabase", "Vercel", "Render"]
    },
    {
      categoryEn: "Ways of working",
      categoryVi: "Phương pháp làm việc",
      noteEn: "Collaborative engineering standards.",
      noteVi: "Quy chuẩn làm việc nhóm chuyên nghiệp.",
      items: ["Code reviews", "Unit testing", "Agile / Scrum", "Working with users during UAT"]
    }
  ],

  projects: [
    {
      id: "sonaspace",
      title: "SonaSpace",
      categoryEn: "E-commerce",
      categoryVi: "Thương mại điện tử",
      year: "2025",
      image: "/images/sonaspace.jpg",
      descriptionEn: "An e-commerce website for furniture and home interiors. People can browse by room, add products to their cart, pay online and get help from an AI shopping assistant. There is also an admin area for managing products and orders.",
      descriptionVi: "Website thương mại điện tử nội thất và trang trí nhà cửa. Người dùng có thể duyệt sản phẩm theo từng phòng, thêm vào giỏ hàng, thanh toán trực tuyến và nhận tư vấn từ trợ lý ảo AI. Hệ thống đi kèm trang quản trị cho nhân viên quản lý sản phẩm và đơn hàng.",
      stats: [
        { val: "20+", labelEn: "backend endpoints", labelVi: "backend endpoints" },
        { val: "3", labelEn: "main user flows", labelVi: "luồng người dùng chính" },
        { val: "4", labelEn: "people on the team", labelVi: "thành viên trong nhóm" }
      ],
      stack: ["React 19", "TypeScript", "Vite 6", "Express", "MySQL", "JWT", "+4"],
      liveUrl: "https://sona-space.vercel.app/",
      highlightsEn: [
        "Architected 20+ secure REST endpoints handling order state transitions, inventory deduction, and cart persistence.",
        "Integrated LLM API with structured JSON responses for the AI shopping assistant.",
        "Implemented JWT authentication with role-based dashboard for catalog and fulfillment staff."
      ],
      highlightsVi: [
        "Thiết kế hơn 20 endpoint REST trên Express xử lý chuyển đổi trạng thái đơn hàng, trừ tồn kho và đồng bộ giỏ hàng.",
        "Tích hợp API LLM với đầu ra JSON có cấu trúc giúp trợ lý AI gợi ý đồ nội thất phù hợp.",
        "Triển khai xác thực JWT và phân quyền bảng quản trị cho nhân viên vận hành và kho bãi."
      ]
    },
    {
      id: "toti-social-network",
      title: "Toti--Social Network",
      categoryEn: "Social Media Platform",
      categoryVi: "Nền tảng Mạng Xã Hội",
      year: "2026",
      image: "/images/toti-social.png",
      descriptionEn: "A high-performance social growth platform for Facebook, TikTok, Instagram, and YouTube. Includes instant price calculators, multi-platform service catalogs, and 100% automated API fulfillment without requiring account passwords.",
      descriptionVi: "Nền tảng tăng trưởng dịch vụ mạng xã hội chuyên nghiệp cho Facebook, TikTok, Instagram và YouTube. Tích hợp công cụ tính giá tự động theo thời gian thực, bảng phân loại 6 nền tảng và xử lý đơn API siêu tốc 100% không cần mật khẩu.",
      stats: [
        { val: "6+", labelEn: "social platforms", labelVi: "nền tảng mạng xã hội" },
        { val: "100%", labelEn: "automated API", labelVi: "xử lý tự động" },
        { val: "24/7", labelEn: "live assistance", labelVi: "hỗ trợ trực tuyến" }
      ],
      stack: ["Next.js", "React 19", "Tailwind CSS", "Cloudflare", "TypeScript", "REST API"],
      liveUrl: "https://totrongnhan.totrongnhansocialmedia.workers.dev/",
      highlightsEn: [
        "Constructed intuitive pricing calculator with dynamic sliders and tier discounts.",
        "Built secure webhook pipelines processing orders directly via API in 15-60 minutes.",
        "Deployed edge-first infrastructure on Cloudflare OpenNext for global lightning-fast loading."
      ],
      highlightsVi: [
        "Xây dựng bộ tính giá trực tuyến thông minh với thanh kéo số lượng và chiết khấu tức thì.",
        "Thiết kế pipeline webhook xử lý đơn tự động qua API với thời gian kích hoạt chỉ từ 15-60 phút.",
        "Triển khai hạ tầng Cloudflare OpenNext tối ưu hóa tốc độ tải trang toàn cầu siêu tốc."
      ]
    }
  ]
};
