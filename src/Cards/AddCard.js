import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { readDeck, createCard } from "../utils/api/index";
import CardForm from './CardForm';

function Addcard() {
    const { deckId }  = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState({
        front: '',
        back: '',
    });

useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchData() {
        try {
         const response = await readDeck(deckId, signal);
         setDeck(response);   
        } catch(error){
            console.log(error);
        }
    }
    fetchData();

    return () =>  {
        abortController.abort();

    };

}, [deckId]);

const handleChange  = (event) => {
    const { name, value } = event.target;
    setCard({...card, [name]: value });
} ;

const handleSubmit = async (event) => {
    event.preventDefault();

    if (card.front.length === 0){
        alert('Front card is required');
        return;//Wont' proceed if back of card is missing
    }
    try {
        await createCard(deckId, card);
       window.alert('New card added');
       setCard({
        front: ',',
        back: '',
       });

        history.push(`/decks/${deckId}`);
    } catch (error){
        console.error('Error creating card', error);
    }

    };
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home mx-1"></span>
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h3>{deck.name}: Add Card</h3>
            <div className="card-info">
            <CardForm
  card={card}
  handleChange={handleChange}
  handleSubmit={handleSubmit} // Use handleSubmit here, not handleChange
  buttonGrayText={'Done'}
  buttonBlueText={'Save'}
/>
            </div>
        </div>
    );

    }
    export default Addcard;
