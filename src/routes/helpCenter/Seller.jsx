// src/routes/help/Seller.jsx
import { useParams } from "react-router-dom";
import useGetSellerDetails from "../../hooks/help/useGetSellerDetails";
import DataLoader from "../../ui/DataLoader";
import ErrorPage from "../ErrorPage";

export default function Seller() {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetSellerDetails(slug);

  if (isLoading) return <DataLoader />;
  if (isError || !data) return <ErrorPage />;

  return (
    <div className="seller-details">
      <h1>{data.name}</h1>

      {data.extra?.length ? (
        <div className="extra-list">
          {data.extra.map((item) => (
            <div key={item.id} className="extra-item">
              <h3>{item.name}</h3>
              <p>{item.description}</p>

              {item.help && (
                <div className="help-details">
                  <h4>{item.help.name}</h4>
                  <p>{item.help.description}</p>
                  <div dangerouslySetInnerHTML={{ __html: item.help.html }} />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>لا توجد بيانات إضافية</p>
      )}
    </div>
  );
}
