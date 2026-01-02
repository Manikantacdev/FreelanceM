import React, { useContext, useEffect, useState, useCallback } from 'react'
import {useParams} from 'react-router-dom';
import { api } from '../../config';
import '../../styles/freelancer/ProjectData.css'
import { GeneralContext } from '../../context/GeneralContext';
import FloatingChat from '../../components/FloatingChat';


const ProjectData = () => {

  const {socket} = useContext(GeneralContext);

  const params = useParams();

  const [project, setProject] = useState()

  const joinSocketRoom = useCallback(async() =>{
    
    await socket.emit("join-chat-room", {projectId: params['id'], freelancerId: localStorage.getItem("userId")});
  }, [socket, params]);

  useEffect(()=>{
    fetchProject(params['id']);

    joinSocketRoom();

  },[params, joinSocketRoom])


  // useEffect(()=>{
  //   socket.on("user-joined-room", ()=>{
  //   })
  // },[socket])


  const fetchProject = async(id) =>{
    await api.get(`/fetch-project/${id}`).then(
      (response)=>{
        setProject(response.data);
        setProjectId(response.data._id);
        setClientId(response.data.clientId);
      }
    ).catch((err)=>{
      console.log(err);
    })
  }



    const [clientId, setClientId] = useState('');
    const freelancerId = localStorage.getItem('userId');
    const [projectId, setProjectId] = useState(params['id']);
    const [proposal, setProposal] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');

    const handleBidding = async() =>{

      await api.post("/make-bid", {clientId, freelancerId, projectId, proposal, bidAmount: Number(bidAmount), estimatedTime: Number(estimatedTime)}).then(
        (response)=>{
            setProposal('');
            setBidAmount('');
            setEstimatedTime('');
            alert("Bidding successful!!");
        }
      ).catch((err)=>{
        alert("Bidding failed!! Try again!");
      })

    }


    const [projectLink, setProjectLink] = useState('');
    const [manualLink, setManualLink] = useState('');
    const [submissionDescription, setSubmissionDescription] = useState('');


    const handleProjectSubmission = async() =>{

      await api.post("/submit-project", {clientId, freelancerId, projectId, projectLink, manualLink, submissionDescription}).then(
        (response)=>{
            setProjectLink('');
            setManualLink('');
            setSubmissionDescription('');
            alert("submission successful!!");
        }
      ).catch((err)=>{
        alert("submission failed!! Try again!");
      })

    }



    const [message, setMessage] = useState('');

    const [chats, setChats] = useState();

    const currentUserId = localStorage.getItem('userId');
    const hasBid = project?.bids?.includes(currentUserId);
    const isAssignedToUser = project?.freelancerId === currentUserId;

    const formatTimestamp = (value) => {
      if(!value){
        return '';
      }
      const date = new Date(value);
      if(Number.isNaN(date.getTime())){
        return '';
      }
      return date.toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' });
    };

    const fetchChats = useCallback(async() =>{
      await api.get(`/fetch-chats/${params['id']}`).then(
        (response) =>{
          setChats(response.data);
        }
      )
    }, [params]);

    const handleMessageSend = async() =>{
      if(!message.trim()){
        return;
      }
      socket.emit("new-message", {projectId: params['id'], senderId: currentUserId, message: message.trim(), time: new Date()});
      fetchChats();
      setMessage("");
    }

    useEffect(()=>{
      fetchChats();
    },[fetchChats])

    useEffect(()=>{
      socket.on("message-from-user", ()=>{
        fetchChats();
      })
    },[socket, fetchChats])


  return (

    <>
      {project && (
        <div className="project-arena page-shell full-width">
          <header className="project-hero">
            <span className="eyebrow">Project room</span>
            <h1>{project.title}</h1>
            <p className="project-description">{project.description}</p>
          </header>

          <div className="project-content-grid">
            <section className="project-stats panel-surface">
              <h2 className="section-title">Project overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-label">Budget</span>
                  <span className="stat-value is-accent">₹{project.budget}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Status</span>
                  <span className="stat-value">{project.status}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Skills required</span>
                  <span className="stat-value">{project.skills.length}</span>
                </div>
              </div>
            </section>

            <section className="project-skills panel-surface">
              <h2 className="section-title">Brief essentials</h2>
              <div className="skills-grid">
                {project.skills.map((skill) => (
                  <span className="skill-tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {project.status === 'Available' && (
              <section className="project-proposal panel-surface">
                <h2 className="section-title">Submit your proposal</h2>
                <p className="section-subtitle">
                  Share a thoughtful plan, timeline, and budget to help the client understand how you will bring this
                  brief to life.
                </p>
                <div className="proposal-form">
                  <div className="proposal-row">
                    <div className="form-field">
                      <label htmlFor="bid-amount">Proposed budget</label>
                      <input
                        id="bid-amount"
                        type="number"
                        min="0"
                        value={bidAmount}
                        onChange={(event) => setBidAmount(event.target.value)}
                        placeholder="₹"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="est-time">Estimated duration (days)</label>
                      <input
                        id="est-time"
                        type="number"
                        min="0"
                        value={estimatedTime}
                        onChange={(event) => setEstimatedTime(event.target.value)}
                        placeholder="Timeline"
                      />
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="proposal-copy">Narrative</label>
                    <textarea
                      id="proposal-copy"
                      value={proposal}
                      onChange={(event) => setProposal(event.target.value)}
                      placeholder="Outline your approach, milestones, and why your craft is the perfect match."
                    />
                  </div>
                  <div className="form-actions">
                    {!hasBid ? (
                      <button type="button" onClick={handleBidding} disabled={!proposal || !bidAmount || !estimatedTime}>
                        Post proposal
                      </button>
                    ) : (
                      <button type="button" className="ghost-button" disabled>
                        Proposal submitted
                      </button>
                    )}
                  </div>
                </div>
              </section>
            )}

            {isAssignedToUser && (
              <section className="project-submission panel-surface">
                <h2 className="section-title">Deliver your work</h2>
                {project.submissionAccepted ? (
                  <div className="success-state">
                    <div className="success-icon">✓</div>
                    <p>The client marked this project complete. Beautifully done.</p>
                  </div>
                ) : (
                  <div className="submission-form">
                    <div className="submission-row">
                      <div className="form-field">
                        <label htmlFor="project-link">Project link</label>
                        <input
                          id="project-link"
                          type="url"
                          value={projectLink}
                          onChange={(event) => setProjectLink(event.target.value)}
                          placeholder="https://"
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="manual-link">Process / documentation</label>
                        <input
                          id="manual-link"
                          type="url"
                          value={manualLink}
                          onChange={(event) => setManualLink(event.target.value)}
                          placeholder="Share any walkthroughs or manuals"
                        />
                      </div>
                    </div>
                    <div className="form-field">
                      <label htmlFor="submission-notes">Notes for the client</label>
                      <textarea
                        id="submission-notes"
                        value={submissionDescription}
                        onChange={(event) => setSubmissionDescription(event.target.value)}
                        placeholder="Outline what you delivered, how to review, and any support details."
                      />
                    </div>
                    <div className="form-actions">
                      {project.submission ? (
                        <button type="button" className="ghost-button" disabled>
                          Submission under review
                        </button>
                      ) : (
                        <button type="button" onClick={handleProjectSubmission} disabled={!projectLink || !submissionDescription}>
                          Submit project
                        </button>
                      )}
                    </div>
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
            formatTime={formatTimestamp}
            disabled={!isAssignedToUser}
            disabledMessage="Chat unlocks once this project is assigned to you."
          />
        </div>
      )}
    </>
  );
}

export default ProjectData