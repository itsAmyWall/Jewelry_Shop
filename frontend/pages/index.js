import { getProducts } from '../services/api';
import ProductList from '../components/ProductList';

const HomePage = ({ products }) => {
  return (
    <div>
      <h1>Jewelry Store</h1>
      <ProductList products={products} />
    </div>
  );
};

export async function getServerSideProps() {
  const products = await getProducts();
  return { props: { products } };
}

export default HomePage;
