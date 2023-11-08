import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateDeck from "../CreateDeck";
import EditCard from "../Cards/EditCard";
import EditDeck from "../EditDeck";
import Home from "../Home";
import Study from "../Study";
import Deck from "../Deck";
import Header from "./Header";
import NotFound from "./NotFound";
import AddCard from "../Cards/AddCard";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
