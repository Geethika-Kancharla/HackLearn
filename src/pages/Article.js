import React, { useEffect, useState } from 'react'
import Recipe from '../components/Recipe';

const Article = () => {

  const APP_ID = "38eda028";
  const APP_KEY = "f0ce808ed79824c58d8977f482c9b51e";
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, [])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=banana&app_id=${APP_ID}&app_key=${APP_KEY}`)

    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  return (
    <div>
      {
        recipes.map(recipe => (
          <Recipe title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} />
        ))
      }
    </div>
  )
}

export default Article