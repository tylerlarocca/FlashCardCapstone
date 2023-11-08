import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createDeck } from './utils/api/index'; // Import the API function to create a deck

function CreateDeck() {
  const history = useHistory();
  const [deckData, setDeckData] = useState({ name: '', description: '' });

  const handleInputChange = (e) => {
    setDeckData({
      ...deckData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the API function to create a new deck
    const newDeck = await createDeck(deckData);

    // Redirect to the newly created deck's page
    history.push(`/decks/${newDeck.id}`);
  };

  const handleCancel = () => {
    // Redirect to the Home screen
    history.push('/');
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={deckData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={deckData.description}
            onChange={handleInputChange}
            rows="4"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mr-2">Submit</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateDeck;
