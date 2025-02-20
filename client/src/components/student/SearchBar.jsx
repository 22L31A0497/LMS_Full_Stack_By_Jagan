import React, { useState } from 'react'; // Import React and hooks first
import { useNavigate } from 'react-router-dom'; // Next, import hooks from libraries
import { assets } from '../../assets/assets'; // Finally, import assets and local files

const SearchBar = ({ data }) => {
  const navigate = useNavigate(); // Ensure correct path
  const [input, setInput] = useState(data ? data : ''); // Ensure `useState` is imported
  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate('/course-list/' + input);
  };

  return (
    <form onSubmit={onSearchHandler} className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded">
      <img 
        src={assets.search_icon} 
        alt="search_icon" 
        className="md:w-auto w-10 px-3"
      />
      <input 
        onChange={(e) => setInput(e.target.value)} 
        value={input}
        type="text" 
        placeholder="Search for courses" 
        className="w-full h-10 outline-none text-gray-500/80 px-2" 
      />
      <button type="submit" className="bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
