import React, { useState } from "react";
import "./SearchCity.css";
import { FaSearch } from "react-icons/fa";

// This Component for search input and city suggestions
const SearchNSugg = ({  suggestionCity, searchDataFromApi }) => {

   // State to store the input value of the search bar
    const [inputValue, setInputValue ] = useState('')

  // Event handler for handling Enter key press in the search input 
  // & Search entered city data
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchDataFromApi(event.target.value)
        }
      };

   // Event handler for handling search suggestion button click
  // & Search suggest city data

    const  searchSuggestionHandler = (city) => {
        searchDataFromApi(city)
    }

    // Event handler for handling search button click
    function searchBarHandler(){
        // Trigger search when the search icon is clicked,
        // only if the input value is not empty
        if(inputValue){
            searchDataFromApi(inputValue)
        }
       
    }

  return (
    <div>
      {/* Display city name suggestions as buttons */}
      <div className="city-name-div">
        {suggestionCity.map((data) => (
          <button className="city-sugg-name" onClick={()=>searchSuggestionHandler(data.city)}  key={data.id} name={data.city} > {data.city} </button>
        ))}
      </div>
      {/* Display search input and search icon */}
      <div className="search-div">
        <div>
            
          <input required
           onKeyDown={handleKeyPress}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter City Name"
          />
          <button onClick={searchBarHandler} className="search-icon">
          <FaSearch  />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchNSugg;
