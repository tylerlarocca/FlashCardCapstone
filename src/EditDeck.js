import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "./utils/api/index";

function EditDeck() {
  // Use useState to manage the deck's state
  const [deck, setDeck] = useState({ name: "", description: "" });

  // Get the deckId from the route parameters
  const { deckId } = useParams();
  
  // Use useHistory to navigate
  const history = useHistory();

  // Fetch the deck data using useEffect
  useEffect(() => {
    async function loadDeck() {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);
      } catch (error) {
        console.error("Error loading deck data", error);
      }
    }
    loadDeck();
  }, [deckId]);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDeck({ ...deck, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Update the deck with the new information
    const updatedDeck = { ...deck };
    updateDeck(updatedDeck)
      .then(() => {
        history.push(`/decks/${deckId}`);
      })
      .catch((error) => {
        console.error("Error updating deck", error);
      });
  };

  return (
    <div>
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>

      {/* Edit Deck Form */}
      <h2>Edit Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={deck.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={deck.description}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary">
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default EditDeck;
