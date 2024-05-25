//code defines a React functional component named ProductList using Next.js. 
//The ProductList component takes a products prop, which is an array of product objects, and renders a list of product items.

import Link from 'next/link';

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product">
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <Link href={`/product/${product.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
