import React from "react";
import CreateEnterpriseForm from "../../ui/enterprise/createEnterprise/CreateEnterpriseForm";
import { useParams } from "react-router";
import useGetCompanyDetailsSimple from "../../hooks/orgs/useGetCompanyDetailsSimple";

const EditEnterprise = () => {
  const { link } = useParams();
  const { data: companyDetailsSimpleData } = useGetCompanyDetailsSimple(link);
  return (
    <div className="edit-enterprise">
      <CreateEnterpriseForm
        type="edit"
        companyDetailsSimpleData={companyDetailsSimpleData}
      />
    </div>
  );
};

export default EditEnterprise;
