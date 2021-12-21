import React, { useState } from "react";
import { CREATE_JOB } from "./graphQL/request";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { getAccessToken, isLoggedIn } from "./auth";

const JobForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const history = useHistory();

  //user has to be logged in and we need to pass headers with token
  const isUserLogged = isLoggedIn();
  const token = getAccessToken();

  const headers = {
    authorization: isUserLogged ? `Bearer ${token}` : "",
  };

  const [createJob, { loading, error, data }] = useMutation(CREATE_JOB, {
    context: {
      headers,
    },
  });

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    const input = { title, description };
    createJob({ variables: { input } }).then((data) => {
      const { id } = data.data.job;
      history.push({
        pathname: `/jobs/:${id}`,
        state: { id },
      });
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="input"
                style={{ height: "10em" }}
                name="description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleClick}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
