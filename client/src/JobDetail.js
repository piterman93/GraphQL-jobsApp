import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { LOAD_JOB } from "./graphQL/request";

const JobDetail = () => {
  const location = useLocation();
  const history = useHistory();
  const { id } = location.state || history.location.state;

  const { loading, error, data } = useQuery(LOAD_JOB, {
    variables: { id },
  });

  if (loading) return <div>Loading...</div>;
  if (error) {
    return <div>Error...</div>;
  }

  const companyId = data.job.company.id;

  return (
    <div>
      <h1 className="title">{data.job.title}</h1>
      <h2 className="subtitle">
        <Link
          to={{
            pathname: `/companies/${data.job.company.id}`,
            state: { companyId },
          }}
        >
          {data.job.company.name}
        </Link>
      </h2>
      <div className="box">{data.job.description}</div>
    </div>
  );
};

export default JobDetail;
