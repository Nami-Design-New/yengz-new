import useGetHelps from "../../hooks/help/useGetHelps";
import useGetHelpCategories from "../../hooks/help/useGetHelpCategories";
import DataLoader from "../../ui/DataLoader";
import ErrorPage from "../ErrorPage";
import { Link } from "react-router";

export default function KnowledgeBase() {
  const {
    data: helps,
    isLoading: helpsLoading,
    error: helpsError,
  } = useGetHelps();

  const {
    data: categories,
    isLoading: catsLoading,
    error: catsError,
  } = useGetHelpCategories();


  if (helpsLoading || catsLoading) return <DataLoader />;
  if (helpsError || catsError || !helps || !categories) return <ErrorPage />;

  return (
    <div className="knowledge-page">
      <h1>مقالات شائعة</h1>

      <div className="helps-list">
        {helps.map((help, index) => (
          <Link
            to={`/help-center/faqs/${help.slug}`}
            className="help-link"
            key={help.id}
          >
            <h2>
              {index + 1}- {help.name}
            </h2>
          </Link>
        ))}
      </div>

      <div className="categories-list">
        {categories.map((cat) => (
          <Link
            to={`/help-center/${cat.slug}`}
            key={cat.id}
            className="category-card-link"
          >
            <div className="category-card">
              <div className="category-header">
                <div className="category-title">
                  <h3 className="category-name">{cat.name}</h3>
                  <span className="count">{cat.help_count} مقال</span>
                </div>
              </div>

              <div className="category-details">
                <hr />
                {cat.help?.map((h) => (
                  <div key={h.id} className="help-item">
                    {h.name}
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
