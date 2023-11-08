import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "./utils/api/index";

function Study() {
  const { deckId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  const totalCards = deck ? deck.cards.length : 0;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (cardIndex + 1 < totalCards) {
      setCardIndex(cardIndex + 1);
      setIsFlipped(false);
    } else {
      const restart = window.confirm("Restart the deck?");
      if (restart) {
        setCardIndex(0);
        setIsFlipped(false);
      } else {
        history.push("/");
      }
    }
  };

  const renderContent = () => {
    if (totalCards < 3) {
      return (
        <div>
          <h4>Not enough cards in this deck to study.</h4>
          <Link to={`/decks/${deckId}/cards/new`}>Add cards</Link>
        </div>
      );
    }

    if (cardIndex < totalCards) {
      const card = deck.cards[cardIndex];
      return (
        <div>
          <h4>
            Card {cardIndex + 1} of {totalCards}
          </h4>
          <p>{isFlipped ? card.back : card.front}</p>
          <button onClick={handleFlip}>Flip</button>
          {isFlipped && <button onClick={handleNext}>Next</button>}
        </div>
      );
    }
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">{deck.name}</li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>Study: {deck.name}</h2>
      {renderContent()}
    </div>
  );
}

export default Study;
