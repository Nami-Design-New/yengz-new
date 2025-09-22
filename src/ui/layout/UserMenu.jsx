import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/auth/useAuth";
import useLogout from "../../hooks/auth/useLogout";
import DeleteAcountModal from "../modals/DeleteAcountModal";

export default function UserMenu({ user }) {
  const { t } = useTranslation();
  const { isAuthed } = useAuth();
  const { logout, isPending } = useLogout();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {isAuthed && (
        <>
          <li className="link hide-sm2">
            <Dropdown style={{ position: "relative" }}>
              <Dropdown.Toggle style={{ backgroundColor: "#f4f4f4" }}>
                <img
                  src={user?.image || "/icons/avatar.jpg"}
                  alt="user-avatar"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu className="profile-menu">
                <ul className="pt-3 pb-3">
                  <li>
                    <Link className="dropdown-item_Link" to="/profile">
                      <i className="fa-solid fa-user"></i>
                      {user?.name || "user name"}
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item_Link" to="/balance">
                      <i className="fa-sharp fa-solid fa-dollar-sign"></i>
                      {t("navbar.balance")}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item_Link" to="/orgs">
                      <i className="fa-sharp fa-solid fa-building"></i>
                      {t("navbar.orgs")}
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item_Link" to="/manage-accounts">
                      <i className="fa-sharp fa-regular fa-building-columns"></i>
                      {t("navbar.manageAccounts")}
                    </Link>
                  </li>
                  <hr />

                  <li>
                    <Link className="dropdown-item_Link" to="/edit-profile">
                      <i className="fa-sharp fa-solid fa-pen-to-square"></i>
                      {t("navbar.editProfile")}
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item_Link" to="/contact">
                      <i className="fa-solid fa-file"></i>
                      {t("navbar.support")}
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item_Link" to="/my-collections">
                      <i className="fa-solid fa-chart-tree-map"></i>
                      {t("navbar.myCollections")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item_Link"
                      to="/complaints-suggestions"
                    >
                      <i className="fa-solid fa-circle-info"></i>
                      {t("navbar.report")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item_Link"
                      to="/tickets"
                    >
                      <i className="fa-solid fa-ticket-simple"></i>
                      {t("navbar.ticket")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item_Link"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowModal(true);
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                      {t("navbar.deleteAccount")}
                    </Link>
                  </li>

                  <hr />
                  <li>
                    <button
                      className="dropdown-item_Link"
                      disabled={isPending}
                      onClick={() => logout()}
                    >
                      <i className="fa-solid fa-right-from-bracket"></i>
                      {t("navbar.logout")}
                    </button>
                  </li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </li>

          <DeleteAcountModal
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </>
      )}
    </>
  );
}
