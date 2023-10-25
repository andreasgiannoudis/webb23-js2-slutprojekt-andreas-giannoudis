import "../style/search.css";

export default function Search({ setSearchWord }) {
  const searchIcon = new URL("../img/search-icon.png", import.meta.url);
  let tempWord = "";
  function handleChange(e) {
    tempWord = e.target.value;
  }
  function handleSubmitSearch(e) {
    e.preventDefault();
    e.target.reset();
    setSearchWord(tempWord);
  }
  return (
    <form onSubmit={handleSubmitSearch} className="search-form">
      <div className="search-container">
        <input
          type="text"
          placeholder="Sök en produkt..."
          onChange={handleChange}
          className="search-input"
        />
        <img src={searchIcon} alt="Search" className="search-icon" />
      </div>
    </form>
  );
}
