import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { JobList } from "./JobList";
import { LOAD_COMPANY } from "./graphQL/request";

const CompanyDetails = () => {
  const location = useLocation();
  const { companyId: id } = location.state;

  const { loading, error, data } = useQuery(LOAD_COMPANY, {
    variables: { id },
  });

  if (loading) return <div>Loading...</div>;
  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <h1 className="title">{data.company.name}</h1>
      <div className="box">{data.company.description}</div>
      <h5 className="title">Jobs at {data.company.name}</h5>
      <JobList jobs={data.company.jobs} />
    </div>
  );
};

export default CompanyDetails;
