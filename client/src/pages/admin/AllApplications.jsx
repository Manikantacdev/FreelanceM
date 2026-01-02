import React, { useEffect, useState } from 'react';
import { api } from '../../config';
import '../../styles/admin/allApplications.css';

const AllApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get('/fetch-applications');
        setApplications([...response.data].reverse());
      } catch (error) {
        console.log(error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="admin-applications page-shell">
      <header className="admin-applications-hero">
        <span className="eyebrow">Admin &gt; Applications</span>
        <h1>Platform-wide proposal ledger.</h1>
        <p>Track every pitch from freelancers to clients and review decision status across the ecosystem.</p>
      </header>

      <section className="admin-applications-list panel-surface">
        {applications.length > 0 ? (
          <div className="admin-applications-grid">
            {applications.map((application) => {
              const statusKey = application.status
                ? application.status.toLowerCase().replace(/\s+/g, '-')
                : 'pending';

              return (
                <article className="admin-application-card" key={application._id}>
                  <header className="admin-application-head">
                    <div>
                      <h3>{application.title}</h3>
                      <span className="project-meta">Budget ₹{application.budget}</span>
                    </div>
                    <span className={`status-pill status-${statusKey}`}>{application.status}</span>
                  </header>

                  <div className="admin-application-columns">
                    <div>
                      <h4>Client brief</h4>
                      <p>{application.description}</p>
                      <div className="skills-cloud">
                        {application.requiredSkills.map((skill) => (
                          <span className="tag-chip" key={skill}>
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="application-detail">
                        <strong>Client:</strong> {application.clientName} ({application.clientEmail})
                      </p>
                    </div>

                    <div>
                      <h4>Freelancer angle</h4>
                      <p>{application.proposal}</p>
                      <div className="skills-cloud">
                        {application.freelancerSkills.map((skill) => (
                          <span className="tag-chip is-accent" key={skill}>
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="application-detail">
                        <strong>Freelancer:</strong> {application.freelancerName} ({application.freelancerEmail})
                      </p>
                    </div>
                  </div>

                  <footer className="admin-application-footer">
                    <span className="tag-chip is-accent">Bid ₹{application.bidAmount}</span>
                    <span className="project-meta">{application.estimatedTime} days timeline</span>
                  </footer>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="admin-empty callout">No applications recorded yet.</div>
        )}
      </section>
    </div>
  );
};

export default AllApplications;