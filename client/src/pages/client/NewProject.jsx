import React, { useState } from 'react';
import { api } from '../../config';
import { useNavigate } from 'react-router-dom';
import '../../styles/client/newProject.css';

const NewProject = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [skills, setSkills] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !description.trim() || !budget || !skills.trim()) {
      alert('Please complete all fields before publishing your brief.');
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post('/new-project', {
        title: title.trim(),
        description: description.trim(),
        budget: Number(budget),
        skills,
        clientId: localStorage.getItem('userId'),
        clientName: localStorage.getItem('username'),
        clientEmail: localStorage.getItem('email'),
      });

      alert('New project published.');
      setTitle('');
      setDescription('');
      setBudget('');
      setSkills('');
      navigate('/client');
    } catch (error) {
      alert('We could not save your brief. Please try again.');
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-project-shell page-shell">
      <header className="new-project-hero">
        <span className="eyebrow">Client &gt; New brief</span>
        <h1>Describe the collaboration you are dreaming up.</h1>
        <p>
          Share the context, the craft, and the skills you need. The more vivid the brief, the better we can match you
          with independent talent excited to bring it to life.
        </p>
      </header>

      <form className="new-project-form panel-surface" onSubmit={handleSubmit}>
        <label htmlFor="project-title" className="input-label">
          Project title
        </label>
        <input
          id="project-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Give your brief a name that sparks curiosity"
        />

        <label htmlFor="project-description" className="input-label">
          Description
        </label>
        <textarea
          id="project-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="What is the story, the deliverables, and the impact you expect?"
          rows={6}
        />

        <div className="new-project-split">
          <div>
            <label htmlFor="project-budget" className="input-label">
              Budget (₹)
            </label>
            <input
              id="project-budget"
              type="number"
              min="0"
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
              placeholder="82000"
            />
          </div>

          <div>
            <label htmlFor="project-skills" className="input-label">
              Required skills
            </label>
            <input
              id="project-skills"
              type="text"
              value={skills}
              onChange={(event) => setSkills(event.target.value)}
              placeholder="React, Node.js, Illustrations"
            />
            <span className="field-hint">Separate each skill with a comma.</span>
          </div>
        </div>

        <div className="new-project-actions">
          <button type="button" className="ghost-button" onClick={() => navigate('/client')} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Publishing…' : 'Publish brief'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProject;