import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../../config';
import { useNavigate } from 'react-router-dom';
import '../../styles/freelancer/MyProjects.css';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: '' },
  { label: 'In progress', value: 'Assigned' },
  { label: 'Completed', value: 'Completed' },
];

const MyProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchProjects = useCallback(async () => {
    await api
      .get('/fetch-projects')
      .then((response) => {
        const filtered = response.data.filter((project) => project.freelancerId === localStorage.getItem('userId'));
        setProjects(filtered);
        setDisplayProjects([...filtered].reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    if (!statusFilter) {
      setDisplayProjects([...projects].reverse());
    } else {
      setDisplayProjects(
        projects.filter((project) => project.status === statusFilter).slice().reverse()
      );
    }
  }, [statusFilter, projects]);

  return (
    <div className="project-ledger page-shell">
      <header className="ledger-hero">
        <span className="eyebrow">Freelancer &gt; My practice</span>
        <h1>Your active collaborations.</h1>
        <p>
          Track each commission, revisit briefs, and stay close to the cadence of your current partnerships.
          Filter by milestone to focus on what needs momentum right now.
        </p>
      </header>

      <div className="ledger-controls">
        <label htmlFor="project-status" className="eyebrow">
          Filter by status
        </label>
        <select
          id="project-status"
          className="ledger-select"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          {STATUS_OPTIONS.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <section className="ledger-list panel-surface">
        <div className="projects-scroll">
          {displayProjects.map((project) => (
            <article
              className="project-card"
              key={project._id}
              onClick={() => navigate(`/project/${project._id}`)}
            >
              <div className="project-header">
                <div>
                  <h3>{project.title}</h3>
                  <span className="project-meta">Posted {String(project.postedDate).slice(0, 24)}</span>
                </div>
                <span className="tag-chip">Budget ₹{project.budget}</span>
              </div>
              <p className="project-description">{project.description}</p>
              <footer className="project-footer">
                <span>Status: {project.status}</span>
                {project.deadline && <span>Due {project.deadline}</span>}
              </footer>
            </article>
          ))}
          {displayProjects.length === 0 && (
            <div className="empty-state callout">
              No projects match this status yet. Explore briefs or adjust your filter.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyProjects;