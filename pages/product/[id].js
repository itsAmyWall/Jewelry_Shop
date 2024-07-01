import { getProductById } from '../../services/api';
import ProductDetail from '../../components/ProductDetail';

const ProductPage = ({ product }) => {
  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const product = await getProductById(params.id);
  return { props: { product } };
}

export default ProductPage;
