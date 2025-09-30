import { useState } from "react";
import { Link, Users } from "lucide-react";
import Select from "react-select";
import { toast } from "sonner";
import { useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import useGetCompanyAddMemberTeams from "../../hooks/orgs/useGetCompanyAddMemberTeams";
import usePostInviteUserNameMembers from "../../hooks/orgs/usePostInviteUserNameMembers";
import EmailSelect from "./EmailSelect";
import usePostCreateInvitationLinks from "../../hooks/orgs/usePostCreateInvitationLinks";

export function AddMemberModal({ isOpen, onClose, selectedTeamId }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [activeTab, setActiveTab] = useState("members");
  const [inviteUrl, setInviteUrl] = useState(""); // نخزن الرابط هنا

  const { link } = useParams();
  const queryClient = useQueryClient();
  const { data: companyAddMemberData } = useGetCompanyAddMemberTeams(link);

  const { handleInviteUserNameMember } = usePostInviteUserNameMembers(onClose);
  const { handleCreateInvitationLinks, isPending } =
    usePostCreateInvitationLinks((res) => {
      console.log(res);

      if (res?.url) {
        setInviteUrl(res?.url); // خزّنه علشان نعرضه
      }
    });

  if (!isOpen) return null;

  const teamOptions = Array.isArray(companyAddMemberData)
    ? companyAddMemberData.map((team) => ({
        value: team.id,
        label: team.name,
      }))
    : [];

  const handleSave = () => {
    if (activeTab === "link") {
      if (selectedTeams.length === 0) {
        toast.error("يرجى اختيار فريق واحد على الأقل");
        return;
      }

      const payload = {
        user_name: link,
        team_ids: selectedTeams.map((t) => t.value),
      };

      handleCreateInvitationLinks(payload);
      return;
    }

    if (activeTab === "members") {
      if (selectedUsers.length === 0) {
        toast.error("يرجى اختيار مستخدم واحد على الأقل");
        return;
      }
      if (selectedTeams.length === 0) {
        toast.error("يرجى اختيار فريق واحد على الأقل");
        return;
      }

      const payload = {
        user_name: link,
        team_ids: [selectedTeamId],
        user_ids: selectedUsers.map((u) => u.value),
      };

      handleInviteUserNameMember(payload);
      queryClient.invalidateQueries(["companyTeam"]);
      console.log("payload:", payload);
    }
  };

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}

    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">أضف عضو</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <ul className="nav nav-tabs">
            <li className="nav-item w-50">
              <button
                className={`nav-link w-100 d-flex justify-content-center align-items-center gap-2 ${
                  activeTab === "link" ? "active" : ""
                }`}
                onClick={() => setActiveTab("link")}
              >
                <Link size={16} /> رابط للدعوة
              </button>
            </li>
            <li className="nav-item w-50">
              <button
                className={`nav-link w-100 d-flex justify-content-center align-items-center gap-2 ${
                  activeTab === "members" ? "active" : ""
                }`}
                onClick={() => setActiveTab("members")}
              >
                <Users size={16} /> أعضاء حاليين
              </button>
            </li>
          </ul>

          <div className="modal-body">
            {activeTab === "link" && (
              <div className="vstack gap-4">
                <p className="text-muted small">
                  لدعوة عضو جديد للانضمام إلى المؤسسة، اختر الفريق ثم أنشئ رابط
                  الدعوة.
                </p>

                <div>
                  <label className="form-label">
                    الفريق <span className="text-danger">*</span>
                  </label>
                  <Select
                    isMulti
                    options={teamOptions}
                    value={selectedTeams}
                    onChange={setSelectedTeams}
                    placeholder="اختر فريق..."
                  />
                </div>

                {inviteUrl && (
                  <div className="mt-3">
                    <label className="form-label">رابط الدعوة</label>
                    <input
                      type="text"
                      className="form-control"
                      // https://mostaql.com/orgs/helpers/invitations/eebf0096-dbda-4038-9408-7a566a5c5292
                      value={`https://ynjez.com/orgs/${link}/invitations/${inviteUrl}`}
                      readOnly
                      onClick={(e) => {
                        e.target.select();
                      }}
                    />
                    <small className="text-muted">
                      قم بمشاركة الرابط مع العضو الجديد
                    </small>
                  </div>
                )}

                <div className="d-flex justify-content-between pt-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={onClose}
                  >
                    تراجع
                  </button>
                  <button
                    type="button"
                    className="btn btn-success px-4"
                    onClick={handleSave}
                    disabled={isPending}
                  >
                    {isPending ? "جاري المعالجة..." : "إنشاء رابط"}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "members" && (
              <div className="vstack gap-4">
                <EmailSelect
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                />

                <div>
                  <label className="form-label">
                    الفريق <span className="text-danger">*</span>
                  </label>
                  <Select
                    isMulti
                    options={teamOptions}
                    value={selectedTeams}
                    onChange={setSelectedTeams}
                    placeholder="اختر فريق..."
                  />
                </div>

                <div className="d-flex justify-content-between pt-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={onClose}
                  >
                    تراجع
                  </button>
                  <button
                    type="button"
                    className="btn btn-success px-4"
                    onClick={handleSave}
                    disabled={isPending}
                  >
                    {isPending ? "جاري الإضافة..." : "أضف"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
