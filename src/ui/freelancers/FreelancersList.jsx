import React from "react";
import { useTranslation } from "react-i18next";
import DataLoader from "../DataLoader";
import EmptyData from "../EmptyData";
import FreelancerCard from "../cards/FreelancerCard";
import CustomPagination from "../CustomPagination";

/**
 * FreelancersList component - responsible for rendering the list of freelancers
 *
 * @param {Object} props - Component props
 * @param {Object} props.freelancers - Freelancers data object
 * @param {boolean} props.isLoading - Loading state
 * @returns {JSX.Element} - Rendered component
 */
const FreelancersList = ({ freelancers, isLoading }) => {
  const { t } = useTranslation();

  // Utility function for truncating text
  const truncate = (inputString) => {
    if (!inputString) return "";
    return inputString.length > 280
      ? inputString.substring(0, 280) + "..."
      : inputString;
  };

  if (isLoading) {
    return <DataLoader />;
  }

  if (!freelancers?.data?.length) {
    return <EmptyData>{t("search.noFreelancers")}</EmptyData>;
  }

  return (
    <>
      {freelancers.data.map((freelancer) => (
        <div className="col-12 p-2" key={freelancer?.id}>
          <FreelancerCard freelancer={freelancer} truncate={truncate} />
        </div>
      ))}
      {freelancers && freelancers.total > 10 && (
        <CustomPagination count={freelancers.total} pageSize={10} />
      )}
    </>
  );
};

export default FreelancersList;
