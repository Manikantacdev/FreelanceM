import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { api } from '../../config';
import { useParams } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContext';
import '../../styles/client/ProjectWorking.css';
import FloatingChat from '../../components/FloatingChat';

const formatTime = (isoString) => {
  if (!isoString || isoString.length < 16) {
    return isoString || '';
  }
  const date = isoString.slice(5, 10);
  const time = isoString.slice(11, 16);
  return `${date} • ${time}`;
};

const ProjectWorking = () => {
  const { socket } = useContext(GeneralContext);
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [chats, setChats] = useState(null);
  const [message, setMessage] = useState('');

  const fetchProject = useCallback(async () => {
    try {
      const response = await api.get(`/fetch-project/${id}`);
      setProject(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const fetchChats = useCallback(async () => {
    try {
      const response = await api.get(`/fetch-chats/${id}`);
      setChats(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
    fetchChats();
    socket.emit('join-chat-room', { projectId: id, freelancerId: '' });
  }, [fetchProject, fetchChats, socket, id]);

  useEffect(() => {
    socket.on('message-from-user', () => fetchChats());
    return () => socket.off('message-from-user');
  }, [socket, fetchChats]);

  const handleMessageSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    socket.emit('new-message', { projectId: id, senderId: localStorage.getItem('userId'), message: trimmed, time: new Date().toISOString() });
    setMessage('');
    setTimeout(fetchChats, 120);
  };

  const handleApproveSubmission = async () => {
    try {
      await api.get(`/approve-submission/${id}`);
      fetchProject();
      alert('Submission approved.');
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectSubmission = async () => {
    try {
      await api.get(`/reject-submission/${id}`);
      fetchProject();
      alert('Submission rejected.');
    } catch (error) {
      console.log(error);
    }
  };

  if (!project) {
    return null;
  }

  const statusKey = project.status ? project.status.toLowerCase().replace(/\s+/g, '-') : 'pending';
  const currentUserId = localStorage.getItem('userId');
  const hasFreelancer = !!project.freelancerId;

  return (
    <div className="project-workspace page-shell full-width">
      <header className="workspace-hero">
        <span className="eyebrow">Project workspace</span>
        <h1>{project.title}</h1>
        <p className="workspace-description">{project.description}</p>
      </header>

      <div className="workspace-content-grid">
        <section className="workspace-overview panel-surface">
          <h2 className="section-title">Project overview</h2>
          <div className="overview-stats">
            <div className="stat-item">
              <span className="stat-label">Budget</span>
              <span className="stat-value is-accent">₹{project.budget}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Status</span>
              <span className={`status-badge status-${statusKey}`}>{project.status}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Skills</span>
              <span className="stat-value">{project.skills?.length}</span>
            </div>
          </div>
        </section>

        <section className="workspace-skills panel-surface">
          <h2 className="section-title">Required skills</h2>
          <div className="skills-list">
            {project.skills?.map((skill) => (
              <span className="skill-tag" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        {hasFreelancer && (
          <section className="workspace-submission panel-surface">
            <h2 className="section-title">Project submission</h2>
            {project.submission ? (
              <div className="submission-content">
                <div className="submission-links">
                  <div className="link-item">
                    <span className="link-label">Project link</span>
                    <a href={project.projectLink} target="_blank" rel="noreferrer">{project.projectLink}</a>
                  </div>
                  <div className="link-item">
                    <span className="link-label">Documentation</span>
                    <a href={project.manulaLink} target="_blank" rel="noreferrer">{project.manulaLink}</a>
                  </div>
                </div>
                <div className="submission-notes">
                  <span className="notes-label">Freelancer notes</span>
                  <p>{project.submissionDescription}</p>
                </div>

                {project.submissionAccepted ? (
                  <div className="success-state">
                    <div className="success-icon">✓</div>
                    <p>Project marked complete</p>
                  </div>
                ) : (
                  <div className="submission-actions">
                    <button type="button" className="ghost-button" onClick={handleRejectSubmission}>
                      Reject
                    </button>
                    <button type="button" onClick={handleApproveSubmission}>
                      Approve &amp; release payment
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-submission">
                <div className="no-submission-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <p>Waiting for freelancer submission</p>
                <span>The assigned freelancer is working on this project</span>
              </div>
            )}
          </section>
        )}
      </div>

      <FloatingChat
        chats={chats}
        message={message}
        setMessage={setMessage}
        onSend={handleMessageSend}
        currentUserId={currentUserId}
        formatTime={formatTime}
        disabled={!hasFreelancer}
        disabledMessage="Chat will be enabled once a freelancer is assigned."
      />
    </div>
  );
};

export default ProjectWorking;