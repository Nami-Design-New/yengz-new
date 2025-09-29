import { useParams, Link } from "react-router";
import useGetCategoryDetails from "../../hooks/help/useGetCategoryDetails";
import DataLoader from "../../ui/DataLoader";
import ErrorPage from "../ErrorPage";

export default function HelpCategoryDetails() {
  const { slug } = useParams();
  const { data: category, isLoading, isError } = useGetCategoryDetails(slug);

  if (isLoading) return <DataLoader />;
  if (isError || !category) return <ErrorPage />;

  console.log(slug , category );
  
  return (
    <>
      <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/help-center" className="breadcrumb-link">
            قاعدة المعرفة
          </Link>
        </li>
        <li className="breadcrumb-separator">/</li>
        <li className="breadcrumb-current">{category.name}</li>
      </ul>

      <div className="category-details-page">
        <h2>{category.name}</h2>

        {category.help?.length ? (
          <div className="help-list">
            {category.help.map((item) => (
              <div key={item.id} className="help-item">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>لا توجد مقالات فرعية لهذا التصنيف</p>
        )}
      </div>
    </>
  );
}
