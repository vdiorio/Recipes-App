import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function FoodsRecipes() {
  return (
    <div>
      <img src={} alt={} width="360" height="200" data-testid="recipe-photo"/>
      <h1 data-testid="recipe-title">test</h1>      
      <button type="button" onClick={} data-testid="share-btn">test</button>
      <button type="button" onClick={} data-testid="favorite-btn">test</button>
      <p data-testid="recipe-category">test</p>
      <pre data-testid="${index}-ingredient-name-and-measure">test</pre>
      <pre data-testid="instructions">test</pre>
      <video width="320" height="240" controls data-testid="video">
        <source src="movie.mp4" type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
      <div data-testid="${index}-recomendation-card"></div>
      <button type="button" onClick={} data-testid="start-recipe-btn">test</button>
    </div>
  );
}
