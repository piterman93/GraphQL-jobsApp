import { gql } from "@apollo/client";

export const LOAD_JOBS = gql`
  query JobsQuery {
    jobs {
      id
      title
      description
      company {
        id
        name
        description
      }
    }
  }
`;

export const LOAD_JOB = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      id
      title
      description
      company {
        id
        name
      }
    }
  }
`;

export const LOAD_COMPANY = gql`
  query CompanyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }
`;

export const CREATE_JOB = gql`
  mutation CreateJob($input: CreateJobInput!) {
    job: createJob(input: $input) {
      id
      title
      description
      company {
        id
        name
      }
    }
  }
`;
