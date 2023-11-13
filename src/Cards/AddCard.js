import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";
import CardForm from './CardForm';

function AddCard() {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState({ front: '', back: '' });

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        async function fetchData() {
            try {
                const response = await readDeck(deckId, signal);
                setDeck(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();

        return () => {
            abortController.abort();
        };

    }, [deckId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCard({ ...card, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (card.front.length === 0) {
            alert('Front of the card is required');
            return; // Won't proceed if front of card is missing
        }
        try {
            await createCard(deckId, card);
            alert('New card added');
            setCard({ front: '', back: '' }); // Clear form for new card entry
        } catch (error) {
            console.error('Error creating card', error);
        }
    };

    const handleDone = () => {
        history.push(`/decks/${deckId}`); // Redirect to the Deck screen
    };

    return (
        <div>
            {/* ... existing breadcrumb and heading */}
            <CardForm
                card={card}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleDone={handleDone} // Add handleDone prop
                buttonGrayText="Done"
                buttonBlueText="Save"
            />
        </div>
    );
}

export default AddCard;
