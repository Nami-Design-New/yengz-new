import React from "react";
import PageHeader from "../createEnterprise/PageHeader";

const CreateEnterpriseProject = () => {
  return (
    <section className="enterprise-layout p-90">
      <div className="container ">
        <PageHeader />
        <button className="info--button">
          <i className="fa-solid fa-circle-info"></i>
          <span></span>
        </button>
      </div>
    </section>
  );
};

export default CreateEnterpriseProject;
