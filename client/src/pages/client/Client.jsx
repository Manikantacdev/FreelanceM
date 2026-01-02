import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../../config';
import { useNavigate } from 'react-router-dom';
import '../../styles/client/client.css';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: '' },
  { label: 'Unassigned briefs', value: 'Available' },
  { label: 'In progress', value: 'Assigned' },
  { label: 'Completed', value: 'Completed' },
];

const STATUS_COPY = {
  Available: 'Open for collaborators',
  Assigned: 'In production',
  Completed: 'Signed off',
};

const formatDate = (value) => {
  if (!value) {
    return '—';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return String(value).slice(0, 21);
  }

  return parsed.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const Client = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchProjects = useCallback(async () => {
    try {
      const response = await api.get('/fetch-projects');
      const owned = response.data.filter((project) => project.clientId === localStorage.getItem('userId'));
      const sorted = [...owned].reverse();
      setProjects(sorted);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const displayProjects = useMemo(() => {
    if (!statusFilter) {
      return projects;
    }

    return projects.filter((project) => project.status === statusFilter);
  }, [projects, statusFilter]);

  return (
    <div className="client-suite page-shell">
      <header className="client-hero">
        <span className="eyebrow">Client &gt; Portfolio</span>
        <h1>Every initiative, beautifully curated.</h1>
        <p>
          Keep a narrative pulse on the projects you have launched, understand where each collaboration stands, and
          celebrate the briefs that have crossed the finish line.
        </p>
      </header>

      <div className="client-controls">
        <label htmlFor="client-status-filter" className="eyebrow">
          Filter by journey stage
        </label>
        <select
          id="client-status-filter"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="client-select"
        >
          {STATUS_OPTIONS.map((option) => (
            <option value={option.value} key={option.value || 'all'}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <section className="client-projects panel-surface">
        {displayProjects.length > 0 ? (
          <div className="client-project-grid">
            {displayProjects.map((project) => {
              const statusKey = project.status
                ? project.status.toLowerCase().replace(/\s+/g, '-')
                : 'pending';

              return (
                <article
                  className="client-project-card"
                  key={project._id}
                  onClick={() => navigate(`/client-project/${project._id}`)}
                >
                  <header className="client-project-head">
                    <div>
                      <h3>{project.title}</h3>
                      <span className="project-meta">Posted {formatDate(project.postedDate)}</span>
                    </div>
                    <span className={`status-marker status-${statusKey}`}>
                      {STATUS_COPY[project.status] || project.status || 'Pending'}
                    </span>
                  </header>

                  <p className="client-project-description">{project.description}</p>

                  {Array.isArray(project.skills) && project.skills.length > 0 && (
                    <div className="skills-cloud">
                      {project.skills.map((skill) => (
                        <span className="tag-chip" key={skill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <footer className="client-project-footer">
                    <span className="tag-chip is-accent">Budget ₹{project.budget}</span>
                    <span className="project-meta">
                      {project.bids?.length ? `${project.bids.length} application${project.bids.length > 1 ? 's' : ''}` : 'No applications yet'}
                    </span>
                  </footer>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="client-empty callout">
            No projects match this filter. Launch a new brief or widen your criteria.
          </div>
        )}
      </section>
    </div>
  );
};

export default Client;