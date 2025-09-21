import { useState } from "react";
import { Link, Users } from "lucide-react";
import useGetCompanyAddMemberTeams from "../../hooks/orgs/useGetCompanyAddMemberTeams";
import useGetUserUserNameEmail from "../../hooks/orgs/useGetUserUserNameEmail";
import { useParams } from "react-router";
import Select from "react-select";
import usePostInviteUserNameMembers from "../../hooks/orgs/usePostInviteUserNameMembers";
import { toast } from "sonner";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

export function AddMemberModal({ isOpen, onClose, selectedTeamId }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [activeTab, setActiveTab] = useState("members");
  const [email, setEmail] = useState("");
  const { link } = useParams();
  const queryClient = useQueryClient()
  const { data: companyAddMemberData } = useGetCompanyAddMemberTeams(link);
  const { data: userUserNameEmailData } = useGetUserUserNameEmail(email);

  const { handleInviteUserNameMember, isPending } =
    usePostInviteUserNameMembers(onClose);

  if (!isOpen) return null;

  // خيارات الفرق
  const teamOptions = Array.isArray(companyAddMemberData)
    ? companyAddMemberData.map((team) => ({
        value: team.id,
        label: team.name,
      }))
    : [];

  // خيارات المستخدمين
  const userOptions = Array.isArray(userUserNameEmailData)
    ? userUserNameEmailData.map((user) => ({
        value: user.id,
        label: user.email,
      }))
    : userUserNameEmailData
    ? [
        {
          value: userUserNameEmailData.id,
          label: userUserNameEmailData.email,
        },
      ]
    : [];

  // عند الحفظ
  const handleSave = () => {
    if (activeTab === "link") {
      if (selectedTeams.length === 0) {
        toast.error("يرجى اختيار فريق واحد على الأقل");
        return;
      }
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
    }

    const payload = {
      user_name: link,
      team_ids: [selectedTeamId],
      user_ids: selectedUsers.map((u) => u.value),
    };
    handleInviteUserNameMember(payload);
    queryClient.invalidateQueries(["companyTeam"]);
    console.log(payload);
  };

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      dir="rtl"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">أضف عضو</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          {/* Tabs */}
          <ul className="nav nav-tabs">
            <li className="nav-item w-50">
              <button
                className={`nav-link w-100 d-flex justify-content-center align-items-center gap-2 ${
                  activeTab === "link" ? "active" : ""
                }`}
                onClick={() => setActiveTab("link")}
              >
                <Link size={16} />
                رابط للدعوة
              </button>
            </li>
            <li className="nav-item w-50">
              <button
                className={`nav-link w-100 d-flex justify-content-center align-items-center gap-2 ${
                  activeTab === "members" ? "active" : ""
                }`}
                onClick={() => setActiveTab("members")}
              >
                <Users size={16} />
                أعضاء حاليين
              </button>
            </li>
          </ul>

          {/* Content */}
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
                {/* إدخال البريد */}
                <div>
                  <label className="form-label">ابحث بالبريد الإلكتروني</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="أدخل البريد..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="form-label">البريد الإلكتروني</label>
                  <Select
                    isMulti
                    options={userOptions}
                    value={selectedUsers}
                    onChange={setSelectedUsers}
                    placeholder="اختر البريد..."
                  />
                </div>

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
