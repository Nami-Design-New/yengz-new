import React from "react";
import PageHeader from "../../ui/enterprise/createEnterprise/PageHeader";
import CreateEnterpriseForm from "../../ui/enterprise/createEnterprise/CreateEnterpriseForm";
import EnterpriseInfo from "../../ui/enterprise/createEnterprise/EnterpriseInfo";

const CreateEnterprise = () => {
  return (
    <section className="create-enterprise p-90">
      <div className="container">
        <PageHeader showHome={true} removeLast />
        <div className="row">
          <div className="col-12 col-lg-8 p-2">
            <CreateEnterpriseForm />
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
