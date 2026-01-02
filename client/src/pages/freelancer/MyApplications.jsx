import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../../config';
import '../../styles/freelancer/MyApplications.css';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api
      .get('/fetch-applications')
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const myApplications = useMemo(
    () =>
      applications
        .filter((application) => application.freelancerId === localStorage.getItem('userId'))
        .reverse(),
    [applications]
  );

  return (
    <div className="applications-hub page-shell">
      <header className="applications-hero">
        <span className="eyebrow">Freelancer &gt; Applications</span>
        <h1>Every proposal, beautifully tracked.</h1>
        <p>
          Review the stories you pitched, monitor budgets, and stay ahead of status changes as clients review your
          work.
        </p>
      </header>

      <section className="applications-grid panel-surface">
        {myApplications.map((application) => {
          const statusKey = application.status
            ? application.status.toLowerCase().replace(/\s+/g, '-')
            : 'pending';

          return (
            <article className="application-card" key={application._id}>
              <div className="application-header">
                <div>
                  <h3>{application.title}</h3>
                  <span className="project-meta">Budget ₹{application.budget}</span>
                </div>
                <span className={`status-pill status-${statusKey}`}>
                  {application.status}
                </span>
              </div>

              <p className="application-description">{application.description}</p>

              <div className="application-columns">
                <div>
                  <h4>Client brief</h4>
                  <div className="skills-cloud">
                    {application.requiredSkills.map((skill) => (
                      <span className="tag-chip" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4>Your angle</h4>
                  <p className="application-proposal">{application.proposal}</p>
                  <div className="skills-cloud">
                    {application.freelancerSkills.map((skill) => (
                      <span className="tag-chip is-accent" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <footer className="application-footer">
                <span>Bid amount ₹{application.bidAmount}</span>
                <span>Estimated {application.estimatedTime} days</span>
              </footer>
            </article>
          );
        })}

        {myApplications.length === 0 && (
          <div className="empty-state callout">
            You have not submitted any proposals yet. Explore curated briefs and pitch the ones that resonate.
          </div>
        )}
      </section>
    </div>
  );
};

export default MyApplications;