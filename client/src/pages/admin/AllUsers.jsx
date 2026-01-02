import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/admin/allUsers.css';

const ROLE_LABELS = {
  admin: 'Admin',
  client: 'Client',
  freelancer: 'Freelancer',
};

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:6001/fetch-users');
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin-users page-shell">
      <header className="admin-users-hero">
        <span className="eyebrow">Admin &gt; Users</span>
        <h1>Platform membership at a glance.</h1>
        <p>Audit every registered identity across clients, freelancers, and admins.</p>
      </header>

      <section className="admin-users-list panel-surface">
        {users.length > 0 ? (
          <div className="admin-users-grid">
            {users.map((user) => {
              const roleKey = user.usertype?.toLowerCase() || 'unknown';
              return (
                <article className="admin-user-card" key={user._id}>
                  <div className="admin-user-avatar">{user.username?.charAt(0).toUpperCase() || '?'}</div>
                  <div className="admin-user-info">
                    <h3>{user.username}</h3>
                    <p>{user.email}</p>
                    <span className={`role-badge role-${roleKey}`}>{ROLE_LABELS[roleKey] || user.usertype}</span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="admin-empty callout">No users registered yet.</div>
        )}
      </section>
    </div>
  );
};

export default AllUsers;