import React, { useState } from "react";
import useGetCompanyTeamNotes from "../hooks/orgs/useGetCompanyTeamNotes";
import usePostCreateNotes from "../hooks/orgs/usePostCreateNotes";
import useGetNotes from "../hooks/orgs/useGetNotes";
import { handleTime } from "../utils/handleTime";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
const NotesPage = ({ userId }) => {
  const [noteCategory, setNoteCategory] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [errorNotes, setErrorNotes] = useState("");
  const [errorNoteCategory, setErrorNoteCategory] = useState("");
  const { data: companyTeamNotesData } = useGetCompanyTeamNotes();
  const { data: notesData = [] } = useGetNotes(userId);
  const { handleCreateNotes } = usePostCreateNotes();
  const user = useSelector((state) => state.authedUser.user);
  const queryClient = useQueryClient();

  const handleSaveNote = () => {
    if (!noteContent.trim()) {
      setErrorNotes("من فضلك أدخل محتوى الملاحظة");
      return;
    }

    handleCreateNotes({
      user_id: user?.id,
      text: noteContent,
      ...(noteCategory !== "personal" && { company_team_id: noteCategory }),
    });
    queryClient.invalidateQueries(["getNotes"]);
    setNoteContent("");
    setNoteCategory("");
  };
  console.log("companyTeamNotesData", companyTeamNotesData, notesData, user);

  return (
    <div className="container my-5" dir="rtl">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">ملاحظات</h2>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {/* Existing Notes */}
          {Array.isArray(notesData) &&
            notesData?.map((note) => (
              <div key={note?.id} className="card mb-3 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center flex-grow-1 ">
                    <img
                      src={user?.image}
                      alt={user?.name}
                      className="rounded-circle me-3"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <h6 className="m-2 text-primary">{user?.name}</h6>
                  </div>

                  <div className="d-flex justify-content-between align-items-center me-5">
                    <div className="d-flex align-items-center mb-2">
                      <span className="badge bg-secondary me-2">
                        <i className="fas fa-building mx-2"></i>
                        {note?.company?.name || "لم يحدد اسم الشركه"}
                      </span>{" "}
                      <span className="badge bg-light text-dark me-2">
                        <i className="fas fa-sticky-note mx-2"></i>
                        {note?.team?.name || "لم يحدد اسم التيم"}
                      </span>
                      <span className="text-muted ms-2 small">
                        <i className="far fa-clock mx-2"></i>
                        {handleTime(note?.updated_at)}
                      </span>
                    </div>
                    {/* drop down menu  */}
                    {/* <div className="dropdown">
                    <button
                      className="btn btn-outline-secondary btn-sm dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      خيارات
                      <i className="fas fa-minus ms-1"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          تعديل
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          حذف
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          مشاركة
                        </a>
                      </li>
                    </ul>
                  </div> */}
                  </div>
                  <p className="py-3 mt-2 text-dark">
                    {note?.text || "لا يوجد ملاحظات"}
                  </p>
                </div>
              </div>
            ))}

          {/* New Note Form */}
          <div className="card border-0 shadow-sm mt-4">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <textarea
                    className="form-control mb-3"
                    rows={8}
                    placeholder="اكتب ملاحظتك هنا..."
                    value={noteContent}
                    onChange={(e) => {
                      setNoteContent(e.target.value);
                      setErrorNotes("");
                    }}
                    style={{ resize: "none", border: "1px solid #dee2e6" }}
                  ></textarea>

                  {errorNotes ? (
                    <p className="text-danger mb-4 ">{errorNotes}</p>
                  ) : null}
                </div>
              </div>

              <div className="row">
                <div className="d-flex justify-content-start">
                  {/* <button className="btn btn-outline-secondary">
                    <i className="fas fa-paperclip me-2"></i>
                    أرفق ملفات
                  </button> */}

                  <div className="dropdown">
                    <select
                      className={`w-full rounded-3 border focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errorNoteCategory ? "border-red" : ""
                      }`}
                      onChange={(e) => {
                        setNoteCategory(e.target.value);
                        setErrorNoteCategory("");
                      }}
                    >
                      <option value="" disabled>
                        -- اختر نوع الملاحظة --
                      </option>
                      <option value="personal">ملاحظة شخصية</option>

                      {companyTeamNotesData?.map((el) => (
                        <optgroup
                          className="text-secondary fw-semibold"
                          key={el.id}
                          label={el.name}
                        >
                          {el.teams.map((team) => (
                            <option key={team.id} value={team.id}>
                              {team.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    {errorNoteCategory && (
                      <div className="invalid-feedback">
                        {errorNoteCategory}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end p-2 my-4">
                <button
                  className="btn btn-primary px-4  "
                  onClick={handleSaveNote}
                >
                  حفظ الملاحظة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
