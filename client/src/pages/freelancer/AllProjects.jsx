import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../../config';
import { useNavigate } from 'react-router-dom';
import '../../styles/freelancer/AllProjects.css';

const AllProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  const fetchProjects = useCallback(async () => {
    await api
      .get('/fetch-projects')
      .then((response) => {
        setProjects(response.data);
        setDisplayProjects([...response.data].reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const allSkills = useMemo(() => {
    const skillSet = new Set();
    projects.forEach((project) => {
      project.skills.forEach((skill) => {
        skillSet.add(skill);
      });
    });
    return Array.from(skillSet).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  useEffect(() => {
    if (categoryFilter.length > 0) {
      setDisplayProjects(
        projects
          .filter((project) => categoryFilter.every((skill) => project.skills.includes(skill)))
          .slice()
          .reverse()
      );
    } else {
      setDisplayProjects([...projects].reverse());
    }
  }, [categoryFilter, projects]);

  const handleSkillToggle = (skill) => {
    setCategoryFilter((previous) =>
      previous.includes(skill) ? previous.filter((item) => item !== skill) : [...previous, skill]
    );
  };

  return (
    <div className="freelancer-projects page-shell">
      <section className="projects-hero">
        <span className="eyebrow">Curated live briefs</span>
        <h1>Pick up the next project that speaks your design language.</h1>
        <p>
          We curate briefs that honour thoughtful process, realistic timelines, and fair compensation. Filter by
          discipline to surface the collaborations that feel tailor-made.
        </p>
      </section>

      <div className="projects-layout">
        <aside className="projects-filter panel-surface">
          <header>
            <h2>Filter by craft</h2>
            <p>Combine multiple skills to reveal briefs that match your entire toolkit.</p>
          </header>
          <div className="filter-tags">
            {allSkills.map((skill) => {
              const isActive = categoryFilter.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  className={isActive ? 'active' : ''}
                  onClick={() => handleSkillToggle(skill)}
                >
                  {skill}
                </button>
              );
            })}
            {allSkills.length === 0 && <p className="empty-state">Check back soon for fresh briefs.</p>}
          </div>
          {categoryFilter.length > 0 && (
            <div className="active-tags">
              <span className="eyebrow">Active filters</span>
              <div className="skills-cloud">
                {categoryFilter.map((skill) => (
                  <span className="tag-chip is-accent" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
              <button className="ghost-button" type="button" onClick={() => setCategoryFilter([])}>
                Clear filters
              </button>
            </div>
          )}
        </aside>

        <section className="projects-list panel-surface">
          <header>
            <h2>Open collaborations</h2>
            <p className="projects-count">{displayProjects.length} opportunities</p>
          </header>

          <div className="projects-scroll">
            {displayProjects.map((project) => {
              const averageBid =
                project.bidAmounts.length > 0
                  ? Math.round(
                      project.bidAmounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0) /
                        project.bidAmounts.length
                    )
                  : 0;

              return (
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
                    <span className="tag-chip is-accent">Budget ₹{project.budget}</span>
                  </div>

                  <p className="project-description">{project.description}</p>

                  <div className="project-skills skills-cloud">
                    {project.skills.map((skill) => (
                      <span className="tag-chip" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  <footer className="project-footer">
                    <span>{project.bids.length} bids in review</span>
                    <span>Avg bid ₹{averageBid}</span>
                  </footer>
                </article>
              );
            })}
            {displayProjects.length === 0 && (
              <div className="empty-state callout">
                No briefs match those skills yet. Try removing a filter to explore more opportunities.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AllProjects;