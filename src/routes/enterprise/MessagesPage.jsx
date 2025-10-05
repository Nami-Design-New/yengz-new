import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useGetCompanyChats from "../../hooks/orgs/useGetCompanyChats";
import { useParams } from "react-router";
import useGetCompanyTeam from "../../hooks/orgs/useGetCompanyTeam";
import { useTranslation } from "react-i18next";

const MessagesPage = () => {
  const { t } = useTranslation();
  const [sort, setSort] = useState("الأحدث");
  const [search, setSearch] = useState("");
  const [freelancer, setFreelancer] = useState("");
  const [member, setMember] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);

  const { link } = useParams();
  const { data: companyChatsData } = useGetCompanyChats({
    user_name: link,
    search,
    freelance_name: freelancer,
    member_name: member,
    company_team_ids: selectedTeams,
  });
  const { data: companyTeamData } = useGetCompanyTeam(link);

  const toggleTeam = (teamId) => {
    setSelectedTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
  };

  const filteredChats = useMemo(() => {
    let chats = [...(companyChatsData || [])];

    if (search.trim()) {
      chats = chats.filter((msg) =>
        msg?.project?.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (freelancer.trim()) {
      chats = chats.filter((msg) =>
        msg?.apply?.name?.toLowerCase().includes(freelancer.toLowerCase())
      );
    }

    if (member.trim()) {
      chats = chats.filter((msg) =>
        msg?.project?.user_id?.toString().includes(member)
      );
    }

    if (selectedTeams.length > 0) {
      chats = chats.filter((msg) =>
        selectedTeams.includes(msg?.project?.company_team_id)
      );
    }

    chats.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sort === "الأحدث" ? dateB - dateA : dateA - dateB;
    });

    return chats;
  }, [companyChatsData, search, freelancer, member, selectedTeams, sort]);
  console.log("company chat data ++++= ", companyChatsData);

  return (
    <div className="container-fluid bg-color-f0f0f0 min-vh-100 mb-5">
      <div className="row max-width-5xl mx-auto">
        {/* ====== الهيدر ====== */}
        <div className="d-flex justify-content-between align-items-center p-5">
          <h4>
            {t("messagesPage.title")} {link}
          </h4>
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center gap-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sort}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSort(t("messagesPage.sortNewest"))}
                >
                  {t("messagesPage.sortNewest")}{" "}
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSort(t("messagesPage.sortOldest"))}
                >
                  {t("messagesPage.sortOldest")}{" "}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* ====== البحث والفلاتر ====== */}
        <div className="col-md-3">
          <div className="p-3">
            <label>{t("messagesPage.search")}</label>
            <input
              type="text"
              className="form-control my-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <label>{t("messagesPage.freelancerName")}</label>
            <input
              type="text"
              className="form-control my-2"
              value={freelancer}
              onChange={(e) => setFreelancer(e.target.value)}
            />

            <label>{t("messagesPage.memberName")}</label>
            <input
              type="text"
              className="form-control my-2"
              value={member}
              onChange={(e) => setMember(e.target.value)}
            />

            <h6 className="my-4">{t("messagesPage.team")}</h6>
            {companyTeamData?.map((team) => (
              <div className="my-2" key={team.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`team-${team.id}`}
                  checked={selectedTeams.includes(team.id)}
                  onChange={() => toggleTeam(team.id)}
                />
                <label
                  className="form-check-label mx-2"
                  htmlFor={`team-${team.id}`}
                >
                  {team.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* ====== الرسائل ====== */}
        <div className="col-md-9 bg-white py-4">
          {filteredChats.length > 0 ? (
            filteredChats.map((message) => (
              <div key={message.id} className="p-3">
                <div className="d-flex gap-4 mb-4">
                  <div className="flex-shrink-0">
                    {message?.apply?.image ? (
                      <img
                        src={message.apply.image}
                        alt={message.apply.name}
                        className="rounded-circle"
                        style={{
                          width: "48px",
                          height: "48px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                        style={{ width: "48px", height: "48px" }}
                      >
                        👤
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 fw-bold text-primary">
                      {message?.project?.title}
                    </div>
                    <div className="d-flex gap-2 text-secondary small mb-2">
                      <span>
                        {t("messagesPage.freelancerLabel")}{" "}
                        {message?.apply?.name}
                      </span>
                      <span>
                        📅 {new Date(message?.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-muted small">
                      {t("messagesPage.projectId")} {message?.project?.id}
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <p className="text-muted h-50 d-flex align-items-center justify-content-center">
              {t("messagesPage.noMessages")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
