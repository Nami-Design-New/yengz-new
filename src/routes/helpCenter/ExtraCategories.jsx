// src/routes/help/ExtraCategories.jsx
import { Link } from "react-router-dom";
import useGetExtraCategories from "../../hooks/help/useGetExtraCategories";
import DataLoader from "../../ui/DataLoader";
import ErrorPage from "../ErrorPage";

export default function ExtraCategories() {
  const { data, isLoading, isError } = useGetExtraCategories();

  if (isLoading) return <DataLoader />;
  if (isError) return <ErrorPage />;

  return (
    <div className="categories-list">
      {data.map((cat) => (
        <div key={cat.id} className="category-item">
          <Link to={`/help-center/sellers/${cat.slug}`}>{cat.name}

          </Link>
        </div>
      ))}
    </div>
  );
}
