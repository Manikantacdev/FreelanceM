import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../../config';
import '../../styles/client/ClientApplications.css';

const ProjectApplications = () => {
  const [applications, setApplications] = useState([]);
  const [projectFilter, setProjectFilter] = useState('');

  const fetchApplications = async () => {
    try {
      const response = await api.get('/fetch-applications');
      const mine = response.data.filter((application) => application.clientId === localStorage.getItem('userId'));
      setApplications([...mine].reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const projectTitles = useMemo(() => {
    const titles = new Set();
    applications.forEach((application) => {
      if (application.title) {
        titles.add(application.title);
      }
    });
    return Array.from(titles);
  }, [applications]);

  const filteredApplications = useMemo(() => {
    if (!projectFilter) {
      return applications;
    }

    return applications.filter((application) => application.title === projectFilter);
  }, [applications, projectFilter]);

  const handleApprove = async (id) => {
    try {
      await api.get(`/approve-application/${id}`);
      alert('Application approved.');
      fetchApplications();
    } catch (error) {
      alert('Operation failed. Please try again.');
    }
  };

  const handleReject = async (id) => {
    try {
      await api.get(`/reject-application/${id}`);
      alert('Application rejected.');
      fetchApplications();
    } catch (error) {
      alert('Operation failed. Please try again.');
    }
  };

  return (
    <div className="client-applications page-shell">
      <header className="client-applications-hero">
        <span className="eyebrow">Client &gt; Applications</span>
        <h1>Review proposals and unlock your next collaboration.</h1>
        <p>
          Compare approaches, evaluate chemistry, and give the green light to the pitch that feels right for your
          project&rsquo;s ambition.
        </p>
      </header>

      {projectTitles.length > 0 && (
        <div className="client-applications-controls">
          <label htmlFor="client-project-filter" className="eyebrow">
            Filter by project
          </label>
          <select
            id="client-project-filter"
            value={projectFilter}
            onChange={(event) => setProjectFilter(event.target.value)}
          >
            <option value="">All projects</option>
            {projectTitles.map((title) => (
              <option value={title} key={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
      )}

      <section className="client-applications-list panel-surface">
        {filteredApplications.length > 0 ? (
          <div className="client-applications-grid">
            {filteredApplications.map((application) => {
              const statusKey = application.status
                ? application.status.toLowerCase().replace(/\s+/g, '-')
                : 'pending';

              return (
                <article className="client-application-card" key={application._id}>
                  <header className="client-application-head">
                    <div>
                      <h3>{application.title}</h3>
                      <span className="project-meta">Budget ₹{application.budget}</span>
                    </div>
                    <span className={`status-pill status-${statusKey}`}>{application.status}</span>
                  </header>

                  <div className="client-application-columns">
                    <div>
                      <h4>Brief snapshot</h4>
                      <p>{application.description}</p>
                      <div className="skills-cloud">
                        {application.requiredSkills.map((skill) => (
                          <span className="tag-chip" key={skill}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4>Freelancer angle</h4>
                      <p className="client-application-proposal">{application.proposal}</p>
                      <div className="skills-cloud">
                        {application.freelancerSkills.map((skill) => (
                          <span className="tag-chip is-accent" key={skill}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <footer className="client-application-footer">
                    <div>
                      <span className="project-meta">Bid amount ₹{application.bidAmount}</span>
                      <span className="project-meta">Timeline {application.estimatedTime} days</span>
                    </div>
                    {application.status === 'Pending' ? (
                      <div className="client-application-actions">
                        <button type="button" className="ghost-button" onClick={() => handleReject(application._id)}>
                          Decline
                        </button>
                        <button type="button" onClick={() => handleApprove(application._id)}>
                          Approve &amp; notify
                        </button>
                      </div>
                    ) : (
                      <span className="status-note">Decision recorded</span>
                    )}
                  </footer>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="client-empty callout">
            No applications to review right now. Once freelancers pitch, their proposals will appear here.
          </div>
        )}
      </section>
    </div>
  );
};

export default ProjectApplications;