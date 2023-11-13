import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import CardForm from "./CardForm";

function EditCard() {
  // Use useState to manage the card's state
  const [card, setCard] = useState({ front: "", back: "" });

  // Get the deckId and cardId from the route parameters
  const { deckId, cardId } = useParams();

  // Use useHistory to navigate
  const history = useHistory();

  // Fetch the deck data and card data using useEffect
  useEffect(() => {
    async function loadCard() {
      try {
        const deckData = await readDeck(deckId);
        const cardData = await readCard(cardId);
        // Set the deck title in the breadcrumb
        document.title = `Edit Card ${cardId}: ${deckData.name}`;
        // Set the card data in the state
        setCard(cardData);
      } catch (error) {
        console.error("Error loading card data", error);
      }
    }
    loadCard();
  }, [deckId, cardId]);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCard({ ...card, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Update the existing card with the edited content
    updateCard({ ...card, id: cardId })
      .then(() => {
        // Redirect to the Deck screen
        history.push(`/decks/${deckId}`);
      })
      .catch((error) => {
        console.error("Error updating card", error);
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
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>Deck Name</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>

      <h2>Edit Card {cardId}</h2>

      {/* Using CardForm component */}
      <CardForm
        card={card}
        handleChange={handleInputChange}
        handleSubmit={handleSubmit}
        buttonGrayText="Cancel"
        buttonBlueText="Save"
      />
    </div>
  );
}

export default EditCard;