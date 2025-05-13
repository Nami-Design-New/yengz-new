import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import SelectField from "../forms/SelectField";

function SortFilterBox({ type }) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortValue, setSortValue] = useState(
    searchParams.get("sort") ? searchParams.get("sort") : "all"
  );

  const FILTER_SORT = [
    {
      name: `${t("filter.noSort")}`,
      value: "all",
    },
    {
      name: `${t("filter.newest")}`,
      value: "newest",
    },
    {
      name: `${t("filter.oldest")}`,
      value: "oldest",
    },
    {
      name: `${t("filter.most_offer")}`,
      value: `${!type ? "most_offer" : ""}${
        type === "projects" ? "most_offer" : ""
      }${type === "bids" ? "most_offer" : ""}${
        type === "services" ? "most_ordered" : ""
      }`,
    },
    {
      name: `${t("filter.less_offer")}`,
      value: `${!type ? "less_offers" : ""}${
        type === "projects" ? "less_offers" : ""
      }${type === "bids" ? "less_offers" : ""}${
        type === "services" ? "less_ordered" : ""
      }`,
    },
  ];

  const handleSortChange = (e) => {
    const newValue = e.target.value;
    setSortValue(newValue);
    if (newValue === "all") {
      searchParams.delete("sort");
      setSearchParams();
    } else {
      setSearchParams({ ...searchParams, sort: newValue });
    }
  };

  return (
    <form
      className="col-12 p-2 pt-0 d-flex justify-content-end"
      onSubmit={(e) => e.preventDefault()}
    >
      <SelectField
        id="sort"
        name="sort"
        value={sortValue}
        required={true}
        onChange={handleSortChange}
        options={FILTER_SORT}
      />
    </form>
  );
}

export default SortFilterBox;
