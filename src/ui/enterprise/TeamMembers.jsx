import { MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import useGetTeamMembers from "../../hooks/orgs/useGetTeamMembers";
import { useParams } from "react-router";
import useDeleteMember from "../../hooks/orgs/useDeleteMember";
import { toast } from "sonner";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const TeamMembers = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { link, id } = useParams();

  const { data: TeamMembersData } = useGetTeamMembers(link, id);
  const { handleDeleteMember } = useDeleteMember();

  function onSubmitDeleteMember(userName, teamId, memberId) {
    handleDeleteMember(
      { user_name: userName, team_id: teamId, member_id: memberId },
      {
        onSuccess: () => {
          toast.success(t("communities.commentAddedSuccessfully"));
          queryClient.invalidateQueries(["teamMembers"]);
        },
        onError: (error) => {
          toast.error(error);
        },
      }
    );
  }

  return (
    <div>
      {TeamMembersData?.map((member) => (
        <div key={member.id} className="card shadow-sm border mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="d-flex align-items-center gap-3">
                <div className="position-relative">
                  {member.user.image ? (
                    <img
                      src={member.user.image}
                      alt={member.user.name}
                      className="rounded-circle border"
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      className="rounded-circle border bg-light d-flex align-items-center justify-content-center fw-medium text-secondary"
                      style={{ width: "48px", height: "48px" }}
                    >
                      {member.user.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h6 className="fw-semibold mb-0">{member.user.name}</h6>
                  {member.user.role ? (
                    <small className="text-muted">{member.user.role}</small>
                  ) : (
                    <small className="text-muted">لم يكتب نبذة شخصية</small>
                  )}
                </div>
              </div>

              {/* Dropdown */}
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-light"
                  type="button"
                  onClick={() =>
                    setIsDropdownOpen(
                      isDropdownOpen === member.id ? null : member.id
                    )
                  }
                >
                  <MoreVertical size={16} />
                </button>
                {isDropdownOpen === member.id && (
                  <ul className="dropdown-menu show dropdown-menu-end mt-1">
                    <li>
                      <button
                        className="dropdown-item text-danger d-flex justify-content-between align-items-center"
                        onClick={() =>
                          onSubmitDeleteMember(link, id, member.id)
                        }
                      >
                        إزالة من الفريق
                        <Trash2 size={16} />
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* معلومات إضافية */}
            <div className="d-flex flex-wrap gap-2 text-muted small mb-4">
              {member.jobTitle ? (
                <>
                  <span>•</span>
                  <span>{member.jobTitle}</span>
                </>
              ) : (
                "لم يكتب عنوان وظيفي"
              )}
              <span>{member.user.projects_count} مشاريع مفتوحة</span>
              <span>•</span>
              <span>{member.user.last_login}</span>
            </div>

            {/* التاجات */}
            <div className="d-flex flex-wrap gap-2 mt-6">
              {member.user.teams.map((tag, index) => (
                <span key={index} className="badge bg-primary">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamMembers;
