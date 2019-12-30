import React,{useEffect, useState}  from 'react'; 
import './App.css';
import Recipe from './Recipe';




const App = () => {

  const APP_ID = "5e566417";
  const APP_KEY = "95285408e2d5d8b0ccb9ebe2c6b09d49";
   
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')

  useEffect(  () => {
    getRecipes()
    
  },[query])

  const getRecipes = async () => {
    const res = await fetch (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await res.json();
    setRecipes(data.hits)
    console.log(data.hits)
  }

  const updateSearch = e => {
    setSearch(e.target.value)
    
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} 
        onChange={updateSearch} />
        <button className={"search-button" }type="submit"
        >Search</button>
      </form>
      <div className="recipes">
      {recipes.map(data => (
        <Recipe  
        key={data.recipe.label}
        title={data.recipe.label} 
        calories={data.recipe.calories}
        image={data.recipe.image}
        ingredients={data.recipe.ingredients}/>
      ))}
      </div>
    </div>
  )
}

export default App
