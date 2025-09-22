import { Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";
import useGetSolution from "../hooks/business/useGetSolution";
import VideoPopup from "../ui/VideoPopup";

export default function BusinessSolutions() {
  const { data } = useGetSolution();
  const lang = useSelector((state) => state.language.lang);
  console.log("business solution data", data);

  return (
    <>
      {data?.solutions?.map((sol) => (
        <section className="business_solutions" key={sol?.id}>
          <div className="container">
            <div className="row">
              <div
                className={
                  sol?.shape === "simple" && sol.image
                    ? "col-md-6 p-2 d-flex flex-column justify-content-center"
                    : "col-md-12 text-center p-2"
                }
              >
                <h2>{sol?.name}</h2>
                <p>{sol?.sub_title}</p>
                {sol?.shape === "simple" ? <VideoPopup sol={sol} /> : null}
                {sol.shape === "simple" ? null : (
                  <div className="row g-4">
                    {sol.features.map((feat, index) => (
                      <div key={index} className="col-md-3 col-6 ">
                        <a href={feat.url} className="text-decoration-none">
                          <div className="position-relative rounded overflow-hidden">
                            <img
                              src={feat.image}
                              className="img-fluid w-100"
                              alt={feat.name}
                              style={{ height: "250px", objectFit: "cover" }}
                            />
                          </div>
                          <h5 className="text-black-hover-blue mt-4 text-center">
                            {feat?.name}
                          </h5>
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {sol?.image && (
                <div className="col-md-6 p-2">
                  <img src={sol?.image} alt={sol?.name} className="img-fluid" />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      <section className="business_solutions bg-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <h2>الأسئلة الشائعة حول التحول الرقمي</h2>
            </div>

            <div className="col-9 p-2">
              <Accordion defaultActiveKey="0" alwaysOpen>
                {data?.faq?.map((item) => (
                  <Accordion.Item eventKey={item.id.toString()} key={item.id}>
                    <Accordion.Header className={lang === "en" ? "en" : ""}>
                      {item?.question}
                    </Accordion.Header>
                    <Accordion.Body>{item?.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <section className="business_solutions bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2>خدمات ذات صلة بالتحول الرقمي</h2>
            </div>

            <div className="col-12 p-2">
              <ul className="subCategories">
                {data?.solution_category_sub_categories?.map((sol) => (
                  <li key={sol?.id}>
                    {sol?.name} ({sol?.count})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
