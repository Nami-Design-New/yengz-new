import { Link } from "react-router";

function PortfolioCard({ setRow, setIsModalOpen, portfolio }) {
  return (
    <div
      className="portfolio-card"
      onClick={() => {
        setIsModalOpen(true);
        setRow(portfolio);
      }}
    >
      <div className="img">
        <img
          src={portfolio?.images[0]?.image || "/images/Artboard.png"}
          alt="portfolio"
        />
        <Link to={`/profile/${portfolio?.user?.id}`} className="user">
          <img
            src={portfolio?.user?.image || "/icons/avatar.jpg"}
            alt="avatar"
          />
        </Link>
      </div>
      <div className="info">
        <h6>{portfolio?.title}</h6>
        <ul>
          <li>
            <i className="fa-sharp fa-regular fa-eye"></i>{" "}
            {portfolio?.view_count || 0}
          </li>
          <li>
            <i className="fa-sharp fa-solid fa-heart"></i>{" "}
            {portfolio?.likes_count || 0}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PortfolioCard;
