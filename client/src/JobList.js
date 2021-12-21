import React, { Component } from "react";
import { Link } from "react-router-dom";

export class JobList extends Component {
  render() {
    const { jobs } = this.props;
    return <ul className="box">{jobs.map(this.renderJob.bind(this))}</ul>;
  }

  renderJob(job) {
    const title = job.company
      ? `${job.title} at ${job.company.name}`
      : job.title;

    const { id } = job;

    return (
      <li className="media" key={job.id}>
        <div className="media-content">
          <Link
            to={{
              pathname: `/jobs/${job.id}`,
              state: { id },
            }}
          >
            {title}
          </Link>
        </div>
      </li>
    );
  }
}
