import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useGetCompanyChats from "../../hooks/orgs/useGetCompanyChats";
import { useParams } from "react-router";
import useGetCompanyTeam from "../../hooks/orgs/useGetCompanyTeam";
import useCategoriesList from "../../hooks/categories/useCategoriesList";

const MessagesPage = () => {
  const [sort, setSort] = useState("الأحدث");
  const messages = [
    {
      id: 1,
      title:
        "استفسار حول تطوير تطبيقات iOS و Android باستخدام Flutter مع لوحة تحكم ويب",
      content:
        "السلام عليكم ورحمة الله وبركاته صباح الخير ممكن التواصل عبر الواتس 009665320233992",
      author: "أ محمد",
      time: "منذ 27 يوما",
      hours: "18 ساعة",
      avatar: "👤",
    },
    {
      id: 2,
      title:
        "استفسار حول تطبيق خدمات متنوعة احترافي Android و iOS وموقع تحكم وتحكم اصطناعي",
      content:
        "واتساب الهاتف 009665677738787 عثمان الدين حفت ✶ منذ 1 شهر و 9 أيام",
      author: "أ عثمان",
      time: "منذ 1 شهر",
      hours: "9 أيام",
      avatar: "👤",
    },
    {
      id: 3,
      title: "استفسار حول تصميم لايجرام لتطبيق غسيل سيارات",
      content:
        "ChatGPT said: You said حضرتك البرنامج كمكن أعمل شكل النتيجة يكون أقل وي ممكن تعديل ChatGPT said: نعم، يمكنك بالطبع تعديل تصميم...",
      author: "Hamad Elzuber",
      time: "منذ 5 شهور",
      hours: "8 أيام",
      avatar: "🖨️",
    },
  ];
  const { link } = useParams();
  const { data: companyChatsData } = useGetCompanyChats(link);
  const { data: companyTeamData } = useGetCompanyTeam(link);
  const { data: categoriesListData } = useCategoriesList();


  console.log("companyChatsData=======", companyChatsData, companyTeamData ,'00000000' ,categoriesListData);

  return (
    <div className="container-fluid bg-color-f0f0f0 min-vh-100 mb-5" dir="rtl">
      <div className="row max-width-5xl mx-auto">
        <div className="d-flex justify-content-between align-items-center p-5">
          <h4>رسائل helpers</h4>
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sort}
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSort("الأحدث")}
                >
                  الأحدث
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSort("الأقدم")}
                >
                  الأقدم
                </button>
              </li>
            </ul>
          </div>
          {/*           
          <div className="px-4">
            <div className="flex justify-between items-center">
              <select
                value={""}
                // onChange={(e) => setSortOrder(e.target.value)}
                className="bg-white "
              >
                <option value="الأحدث"> الأحدث</option>
                <option value="الأقدم">الأقدم</option>
              </select>
            </div>
          </div> */}
        </div>

        {/* ====== البحث ====== */}
        <div className="col-md-3">
          <div className=" p-3">
            <label htmlFor="search">بحث</label>
            <input type="text" className="form-control my-2" />
            <label htmlFor="search">اسم المستقل</label>
            <input type="text" className="form-control my-2" />
            <label htmlFor="search">اسم العضو</label>
            <input type="text" className="form-control my-2" />
            <h6 className="my-4">الفريق</h6>
            {companyTeamData?.map((team) => (
              <div className="my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="admins"
                />
                <label className="form-check-label mx-2" htmlFor="admins">
                  {team.name}
                </label>
              </div>
            ))}

          </div>
        </div>

        {/* ====== الرسائل ====== */}
        <div className="col-md-9 bg-white py-4">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id} className="p-3">
                <div className="d-flex gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div
                      className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                      style={{ width: "48px", height: "48px" }}
                    >
                      {message.avatar}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 fw-bold text-primary">
                      {message.title}
                    </div>
                    <div2 className="d-flex gap-2 text-secondary small mb-4">
                      <span>▲ {message.author}</span>
                      <span>⭕ {message.time}</span>
                      <span>{message.hours}</span>
                    </div2>
                    <div className="text-muted small">{message.content}</div>
                  </div>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <div className="text-center py-5 text-muted">لا توجد رسائل</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
