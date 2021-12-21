import { LOAD_JOBS } from "./graphQL/request";
import React from "react";
import { JobList } from "./JobList";
import { useQuery } from "@apollo/client";

const JobBoard = () => {
  const { loading, error, data } = useQuery(LOAD_JOBS);

  if (loading) return <div>Loading...</div>;
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={data.jobs} />
    </div>
  );
};

export default JobBoard;
