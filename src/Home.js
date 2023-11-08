import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "./utils/api/index";
import CreateDeck from "./CreateDeck";


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
      <Link to="./CreateDeck">Create Deck</Link>

      <ul>
        {decks.map((deck) => (
          <li key={deck.id}>
            <p>{deck.name}</p>
            <p>{deck.cards.length} cards</p>
            <Link to={`/study/${deck.id}`}>Study</Link>
            <Link to={`/view/${deck.id}`}>View</Link>
            <button onClick={() => handleDelete(deck.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
