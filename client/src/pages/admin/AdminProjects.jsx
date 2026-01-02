import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import '../../styles/admin/adminProjects.css';

const formatDate = (value) => {
  if (!value) return '—';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return String(value).slice(0, 21);
  return parsed.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-projects');
      setProjects([...response.data].reverse());
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const allSkills = useMemo(() => {
    const skills = new Set();
    projects.forEach((p) => p.skills?.forEach((s) => skills.add(s)));
    return Array.from(skills);
  }, [projects]);

  const displayProjects = useMemo(() => {
    if (categoryFilter.length === 0) return projects;
    return projects.filter((p) => categoryFilter.every((s) => p.skills?.includes(s)));
  }, [projects, categoryFilter]);

  const handleToggle = (skill) => {
    setCategoryFilter((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
  };

  return (
    <div className="admin-projects page-shell">
      <header className="admin-projects-hero">
        <span className="eyebrow">Admin &gt; Projects</span>
        <h1>All briefs across the platform.</h1>
        <p>Review and filter the complete project landscape to ensure healthy ecosystem activity.</p>
      </header>

      <aside className="admin-filters panel-surface">
        <h4>Skill filter</h4>
        <div className="filter-chips">
          {allSkills.map((skill) => {
            const active = categoryFilter.includes(skill);
            return (
              <button
                type="button"
                key={skill}
                className={`filter-chip${active ? ' active' : ''}`}
                onClick={() => handleToggle(skill)}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </aside>

      <section className="admin-project-list panel-surface">
        {displayProjects.length > 0 ? (
          <div className="admin-project-grid">
            {displayProjects.map((project) => {
              const statusKey = project.status ? project.status.toLowerCase().replace(/\s+/g, '-') : 'pending';
              const avgBid =
                project.bids?.length > 0
                  ? Math.round(project.bidAmounts.reduce((a, c) => a + c, 0) / project.bids.length)
                  : 0;

              return (
                <article className="admin-project-card" key={project._id}>
                  <header className="admin-project-head">
                    <div>
                      <h3>{project.title}</h3>
                      <span className="project-meta">Posted {formatDate(project.postedDate)}</span>
                    </div>
                    <span className={`status-marker status-${statusKey}`}>{project.status}</span>
                  </header>

                  <p className="admin-project-description">{project.description}</p>

                  <div className="admin-project-meta-row">
                    <span className="tag-chip is-accent">Budget ₹{project.budget}</span>
                    <span className="tag-chip">Bids {project.bids?.length || 0}</span>
                    {avgBid > 0 && <span className="tag-chip">Avg bid ₹{avgBid}</span>}
                  </div>

                  <div className="admin-project-info">
                    <p>
                      <strong>Client:</strong> {project.clientName} ({project.clientEmail})
                    </p>
                  </div>

                  <div className="skills-cloud">
                    {project.skills?.map((skill) => (
                      <span className="tag-chip" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="admin-empty callout">No projects match the selected filters.</div>
        )}
      </section>
    </div>
  );
};

export default AdminProjects;