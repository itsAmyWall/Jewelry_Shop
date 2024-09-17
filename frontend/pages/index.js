import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        setError('Error fetching products');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Head>
        <title>Maurer Jewelry</title>
      </Head>
      
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded flex items-center">
            <BiMailSend className="mr-2 text-xl" /> Contact Us
          </button>
          <h1 className="text-3xl font-bold text-center flex-1">Maurer Jewelry</h1>
          <div className="flex space-x-4 items-center">
            <button className="p-2">
              <FaSearch className="text-xl" />
            </button>
            <button className="p-2">
              <FaShoppingCart className="text-xl" />
            </button>
            <button className="p-2">
              <FaUser className="text-xl" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-lg flex flex-col items-center">
              <img
                src={product.imageUrl || '/path/to/default-image.jpg'}
                alt={product.name}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h2 className="text-xl font-semibold mb-2 text-center">{product.name}</h2>
              <p className="text-lg font-medium text-center">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
