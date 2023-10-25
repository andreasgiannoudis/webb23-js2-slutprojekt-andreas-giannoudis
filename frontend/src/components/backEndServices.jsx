//fetching and returning all the products from backend
//json file is products.json
export async function getAllProducts(searchWord){
    const apiUrl = searchWord
    ? `http://localhost:3000/products?title=${searchWord}`
    : `http://localhost:3000/products`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    return data;
}

//connects with backend and does a PATCH request so the inventory
//will be updated in products.json file
export async function updateInventory(shoppingCartList){
    const apiUrl = `http://localhost:3000/products`;
    const purchase = {
        products: shoppingCartList
    }
    const res = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchase)
    });

    return await res.json();
}