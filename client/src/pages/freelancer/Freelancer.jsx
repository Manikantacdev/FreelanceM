import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/freelancer/freelancer.css';

const Freelancer = () => {
  const [isDataUpdateOpen, setIsDataUpdateOpen] = useState(false);
  const [freelancerData, setFreelancerData] = useState();
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState('');
  const [freelancerId, setFreelancerId] = useState('');
  const [updateSkills, setUpdateSkills] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [applicationsCount, setApplicationsCount] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    axios.get(`http://localhost:6001/fetch-freelancer/${userId}`).then((response) => {
      setFreelancerData(response.data);
      if (response.data) {
        setFreelancerId(response.data._id);
        setSkills(response.data.skills ?? []);
        setDescription(response.data.description ?? '');
        setUpdateSkills(
          Array.isArray(response.data.skills)
            ? response.data.skills.join(', ')
            : response.data.skills ?? ''
        );
        setUpdateDescription(response.data.description ?? '');
      }
    });
  }, []);

  const updateUserData = async () => {
    await axios
      .post(`http://localhost:6001/update-freelancer`, {
        freelancerId,
        updateSkills,
        description: updateDescription,
      })
      .then(() => {
        setIsDataUpdateOpen(false);
        const parsedSkills = updateSkills
          ? updateSkills.split(',').map((skill) => skill.trim()).filter(Boolean)
          : [];
        setSkills(parsedSkills);
        setDescription(updateDescription);
        setFreelancerData((previous) =>
          previous
            ? {
                ...previous,
                skills: parsedSkills,
                description: updateDescription,
              }
            : previous
        );
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:6001/fetch-applications')
      .then((response) => {
        setApplicationsCount(
          response.data.filter((application) => application.freelancerId === localStorage.getItem('userId'))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const metrics = useMemo(
    () => [
      {
        label: 'Current briefs',
        value: freelancerData ? freelancerData.currentProjects.length : 0,
        actionLabel: 'View projects',
        actionPath: '/my-projects',
      },
      {
        label: 'Completed journeys',
        value: freelancerData ? freelancerData.completedProjects.length : 0,
        actionLabel: 'Project archive',
        actionPath: '/my-projects',
      },
      {
        label: 'Live applications',
        value: applicationsCount.length,
        actionLabel: 'Review bids',
        actionPath: '/myApplications',
      },
      {
        label: 'Available funds',
        value: freelancerData ? `₹${freelancerData.funds}` : '₹0',
        actionLabel: 'Payout settings',
        actionPath: '/my-projects',
        isGhost: true,
      },
    ],
    [freelancerData, applicationsCount]
  );

  if (!freelancerData) {
    return null;
  }

  const parsedSkills = skills.filter(Boolean);

  return (
    <div className="freelancer-dashboard page-shell">
      <section className="surface-grid columns-4 metrics-wrap">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <h4>{metric.label}</h4>
            <strong>{metric.value}</strong>
            <button
              className={metric.isGhost ? 'ghost-button' : ''}
              type="button"
              onClick={() => navigate(metric.actionPath)}
            >
              {metric.actionLabel}
            </button>
          </article>
        ))}
      </section>

      <section className="panel-surface profile-panel">
        {!isDataUpdateOpen ? (
          <div className="profile-view">
            <header>
              <span className="eyebrow">Freelancer profile</span>
              <h2 className="panel-heading">Your practice, in focus.</h2>
              <p>
                Keep your skills and statement current so we can surface the briefs that share your design DNA.
              </p>
            </header>

            <div className="profile-grid">
              <div>
                <h3>Signature skills</h3>
                <div className="skills-cloud">
                  {parsedSkills.length > 0 ? (
                    parsedSkills.map((skill) => (
                      <span className="tag-chip" key={skill}>
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="empty-state">Share the disciplines you lead with.</p>
                  )}
                </div>
              </div>

              <div>
                <h3>Artist statement</h3>
                {description ? <p className="profile-description">{description}</p> : <p className="empty-state">Tell clients how you shape ideas into outcomes.</p>}
              </div>
            </div>

            <button className="ghost-button" type="button" onClick={() => setIsDataUpdateOpen(true)}>
              Update profile
            </button>
          </div>
        ) : (
          <div className="profile-edit">
            <header>
              <span className="eyebrow">Refresh your story</span>
              <h2 className="panel-heading">Tune the signals clients see first.</h2>
            </header>
            <div className="form-field">
              <label htmlFor="freelancer-skills">Signature skills</label>
              <input
                id="freelancer-skills"
                type="text"
                value={updateSkills}
                placeholder="Design strategy, Motion systems, Narrative prototyping"
                onChange={(event) => setUpdateSkills(event.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="freelancer-description">Artist statement</label>
              <textarea
                id="freelancer-description"
                value={updateDescription}
                placeholder="Describe how you approach new collaborations, your process, and the outcomes you champion."
                onChange={(event) => setUpdateDescription(event.target.value)}
              />
            </div>
            <div className="edit-actions">
              <button className="ghost-button" type="button" onClick={() => setIsDataUpdateOpen(false)}>
                Cancel
              </button>
              <button type="button" onClick={updateUserData}>
                Save updates
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Freelancer;