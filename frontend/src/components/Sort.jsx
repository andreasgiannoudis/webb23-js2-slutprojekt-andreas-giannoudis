import _ from "underscore";
import '../style/sort.css'
export default function SortProductsByPrice({
  tempSort,
  products,
  setProducts,
}) {
  //handling the sort
  //checking the value of the dropdown selection menu and sorting accondingly
  //sorting based on price (asc, desc) and title
  function handleSortChange(e) {
    tempSort = e.target.value;
    let sortedProcucts = [];
    if (tempSort==='stigande'){
      sortedProcucts = _.sortBy(products, "price");
    }else if (tempSort === 'fallande') {
        sortedProcucts = _.sortBy(products, "price").reverse();
      } else if (tempSort === 'title') {
        sortedProcucts = _.sortBy(products, "title");
      } else {
        sortedProcucts = [...products];
      }
    setProducts(sortedProcucts); //set the products in sorted order
  }

  return (
    <div className="sort-container">
      <span>Sortera efter: </span>
      <select className="sort-select" onChange={handleSortChange}>
        <option value="">Select</option>
        <option value="fallande">Fallande pris</option>
        <option value="stigande">Stigande pris</option>
        <option value="title">Titel</option>
      </select>
    </div>
  );
}
