import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';
import Login from './Login';
import Drinks from './Drinks';
import FoodsRecipes from './FoodsRecipes';
import DrinksRecipes from './DrinksRecipes';
import FoodsInProgress from './FoodsInProgress';
import DrinksInProgress from './DrinksInProgress';
import Explore from './Explore';
import ExploreFoods from './ExploreFoods';
import ExploreDrinks from './ExploreDrinks';
import FoodsIngredients from './FoodsIngredients';
import Foods from './Foods';
import DrinksIngredients from './DrinksIngredients';
import ExploreFoodArea from './ExploreFoodArea';
import Profile from './Profile';
import EndedRecipes from './EndedRecipes';
import FavoritesRecipes from './FavoritesRecipes';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/comidas/:id" component={ FoodsRecipes } />
      <Route exact path="/bebidas/:id" component={ DrinksRecipes } />
      <Route
        exact
        path="/comidas/:id/in-progress"
        component={ FoodsInProgress }
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        component={ DrinksInProgress }
      />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route exact path="/explorar/comidas/ingredientes" component={ FoodsIngredients } />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ DrinksIngredients }
      />
      <Route
        exact
        path="/explorar/comidas/area"
        c
        omponent={ ExploreFoodArea }
      />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ EndedRecipes } />
      <Route exact path="/receitas-favoritas" component={ FavoritesRecipes } />
    </Switch>
  );
}

export default Routes;
