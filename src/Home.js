import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "./utils/api/index";
import CreateDeck from "./CreateDeck";
import "./Home.css"


function Home() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listDecks();
        setDecks(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (deckId) => {
    const confirmed = window.confirm("Are you sure you want to delete this deck?");
    if (confirmed) {
      deleteDeck(deckId)
        .then(() => setDecks(decks.filter((deck) => deck.id !== deckId)))
        .catch((error) => {
          console.error("Error deleting deck:", error);
        });
    }
  };

  return (
    <div>
      <h2>Decks</h2>
      <Link to="/decks/new" className="Create btn btn-secondary">Create Deck</Link>
      
      <ul id="DeckBox">
        {decks.map((deck) => (
          <li key={deck.id} class="List">
            <p id="CardNum">{deck.cards.length} cards</p>
            <p id="DeckName">{deck.name}</p>
            <p>{deck.description}</p>
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary">View</Link>
            <Link to={`/decks/${deck.id}/study`} className="Study btn btn-primary">Study</Link>
            <button onClick={() => handleDelete(deck.id)} className="Delete btn btn-danger">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
