import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, deleteDeck, deleteCard } from './utils/api/index'; // Import the API functions

function Deck() {
  const { cardId } = useParams();
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);

  // Load the deck using the readDeck function from the API
  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      await deleteDeck(deckId);
      history.push('/');
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        // Assuming you have a way to cancel the request if needed, e.g., AbortController
        const signal = new AbortController().signal; 
        await deleteCard(cardId, signal);
        const updatedDeck = await readDeck(deckId); // Re-fetch the deck
        setDeck(updatedDeck);
      } catch (error) {
        console.error("Error deleting card", error);
      }
    }
  };

  if (!deck) {
    return <p>Loading...</p>; // You can display a loading message while the deck data is being loaded
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
        </ol>
      </nav>
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>

      <div className="btn-group">
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">Edit</Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary">Study</Link>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>

      <h3>Cards</h3>
      <ul className="list-group">
        {deck.cards.map((card) => (
          <li key={card.id} className="list-group-item">
            <div className="card-text">
              <p><strong>Question:</strong> {card.front}</p>
              <p><strong>Answer:</strong> {card.back}</p>
            </div>
            <div className="btn-group">
              <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary">Edit</Link>
              <button className="btn btn-danger" onClick={() => handleDeleteCard(card.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Deck;
