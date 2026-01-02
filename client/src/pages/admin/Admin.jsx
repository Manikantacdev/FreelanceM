import React, { useEffect, useState } from 'react';
import { api } from '../../config';
import { useNavigate } from 'react-router-dom';
import '../../styles/admin/admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [projectsCount, setProjectsCount] = useState(0);
  const [completedProsCount, setCompletedProsCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, appsRes, usersRes] = await Promise.all([
          api.get('/fetch-projects'),
          api.get('/fetch-applications'),
          api.get('/fetch-users'),
        ]);

        setProjectsCount(projectsRes.data.length);
        setCompletedProsCount(projectsRes.data.filter((p) => p.status === 'Completed').length);
        setApplicationsCount(appsRes.data.length);
        setUsersCount(usersRes.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const metrics = [
    { label: 'All projects', value: projectsCount, action: () => navigate('/admin-projects') },
    { label: 'Completed projects', value: completedProsCount, action: () => navigate('/admin-projects') },
    { label: 'Applications', value: applicationsCount, action: () => navigate('/admin-applications') },
    { label: 'Users', value: usersCount, action: () => navigate('/all-users') },
  ];

  return (
    <div className="admin-suite page-shell">
      <header className="admin-hero">
        <span className="eyebrow">Admin &gt; Overview</span>
        <h1>Central command for platform governance.</h1>
        <p>
          Monitor activity, review applications, and keep the ecosystem balanced for clients and freelancers alike.
        </p>
      </header>

      <section className="admin-metrics surface-grid columns-4">
        {metrics.map((m) => (
          <article className="metric-card" key={m.label}>
            <h4>{m.label}</h4>
            <strong>{m.value}</strong>
            <button type="button" onClick={m.action}>
              View
            </button>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Admin;