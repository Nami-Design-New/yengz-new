  import PageHeader from "../../ui/enterprise/createEnterprise/PageHeader";
import CreateEnterpriseForm from "../../ui/enterprise/createEnterprise/CreateEnterpriseForm";
import EnterpriseInfo from "../../ui/enterprise/createEnterprise/EnterpriseInfo";
import { useLocation } from "react-router";

const CreateEnterprise = () => {
  const location = useLocation();
  const type = location.pathname.split("/").pop();


  return (
    <section className="create-enterprise ">
      <div className="container">
        <PageHeader showHome={true} removeLast />
        <div className="row">
          <div className="col-12 col-lg-8 p-2">
            <CreateEnterpriseForm type={type} />
          </div>
          <div className="col-12 col-lg-4 p-2">
            <EnterpriseInfo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateEnterprise;
