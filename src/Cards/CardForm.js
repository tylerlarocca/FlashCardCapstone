import React from 'react';
import { Link, useParams } from 'react-router-dom';

function CardForm({
    card,
    handleChange,
    handleSubmit,
    buttonGrayText,
    buttonBlueText,
    showCharacterCount = false,

})  {
    const { deckId } = useParams();

    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <div className="form-group">
                        <label htmlFor="font">Front</label>
                                <textarea
                                className="form-control"
                                id="front"
                                type="text"
                                name="front"
                                placeholder="Front side of Card"
                                value={card.front}
                                onChange={handleChange}
                                />
                    </div>
              <div className="form-group">
                        <label htmlFor="back">Back</label>
                            <textarea
                            className="form-control"
                            id="back"
                            name="back"
                            placeholder="Back side of Card"
                            value={card.back}
                            onChange={handleChange}
                            />
                    </div>
                <div className = 'form-group'>
                    {buttonGrayText && (
                        <Link to = {`/decks/${deckId}`} className = 'btn btn-secondary'>
                            {buttonGrayText}
                        </Link>
                    )}
                    <button type = 'submit' className = 'btn btn-primary ml-2'>
                        {buttonBlueText}
                    </button>
                </div>
            </form>
        </div>
    );
}
export default CardForm;