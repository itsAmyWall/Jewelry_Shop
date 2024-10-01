import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';

const TAX_RATE = 0.0725; // 7.25% tax rate for California

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        setError('Error fetching products');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on the search query
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  const handleSearchClick = () => {
    setIsSearchVisible(prev => !prev);
  };

  const handleAddToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const handleCartClick = () => {
    setIsCartVisible(prev => !prev);
  };

  const handleRemoveFromCart = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    // Implement checkout functionality here
    alert('Checkout not implemented yet');
  };

  const cartItemCount = cart.length;

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * TAX_RATE;
  };

  const calculateTotal = (subtotal, tax) => {
    return subtotal + tax;
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, tax);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <Head>
        <title>Maurer Jewelry</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Gloock:wght@700&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            body {
              font-family: 'Playfair Display', serif;
              background-color: #f5f5f5; /* Light cream background color */
            }
            .contact-header {
              font-family: 'Gloock', serif;
              text-transform: uppercase;
            }
          `}
        </style>
      </Head>

      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8"> {/* Increased margin-bottom */}
            <button 
              className="bg-white text-black border border-black py-1.5 px-3 rounded-lg flex items-center shadow-sm hover:bg-gray-100 transition duration-300 text-sm"
              onClick={() => document.getElementById('contact-info').scrollIntoView({ behavior: 'smooth' })}
            >
              <BiMailSend className="mr-1 text-base" /> Contact Us
            </button>
            <h1 className="text-3xl font-medium text-center flex-1">Maurer Jewelry</h1>
            <div className="flex space-x-3 items-center">
              {isSearchVisible && (
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 py-1 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
                />
              )}
              <button 
                className="p-1 hover:text-gray-600 transition duration-300"
                onClick={handleSearchClick}
              >
                <FaSearch className="text-lg" />
              </button>
              <button 
                className="relative p-1 hover:text-gray-600 transition duration-300"
                onClick={handleCartClick}
              >
                <FaShoppingCart className="text-lg" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 transform translate-x-1/2 -translate-y-1/2">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16"> {/* Added margin-bottom */}
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="relative border border-gray-200 p-4 rounded-lg shadow-sm flex flex-col items-center bg-white transition-transform transform hover:scale-105 duration-300 group"
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
              >
                <img
                  src={product.imageUrl || '/path/to/default-image.jpg'}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-3 rounded-lg"
                />
                <h2 className="text-lg font-medium mb-2 text-center text-gray-800">{product.name}</h2>
                <p className="text-md font-normal text-center text-gray-600">${product.price.toFixed(2)}</p>
                {hoveredProductId === product.id && (
                  <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="bg-black text-white py-2 px-4 rounded-lg shadow-sm hover:bg-gray-800 transition duration-300"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Cart Modal */}
          {isCartVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 lg:w-1/3 relative">
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500">Your cart is empty</p>
                ) : (
                  <ul>
                    {cart.map((item, index) => (
                      <li key={index} className="border-b py-2 flex justify-between items-center">
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                        <button
                          className="text-gray-500 hover:text-gray-700 transition duration-300 text-lg"
                          onClick={() => handleRemoveFromCart(index)}
                        >
                          &#10005; {/* Grey "X" */}
                        </button>
                      </li>
                    ))}
                    <li className="border-t pt-2 flex justify-between items-center font-bold">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between items-center font-bold">
                      <span>Tax (7.25%):</span>
                      <span>${tax.toFixed(2)}</span>
                    </li>
                    <li className="border-t pt-2 flex justify-between items-center font-bold text-xl">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </li>
                  </ul>
                )}
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition duration-300 text-xl"
                  onClick={() => setIsCartVisible(false)}
                >
                  &#10005; {/* Grey "X" */}
                </button>
                {cart.length > 0 && (
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-black text-white py-2 px-4 rounded-lg shadow-sm hover:bg-gray-800 transition duration-300"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact Section */}
          <section id="contact-info" className="mt-16 bg-black text-white py-8 px-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 contact-header text-center">Contact Us</h2>
            <p className="text-center mb-4">Feel free to reach out if you have any questions or feedback!</p>
            <div className="flex justify-center space-x-4">
              <a href="mailto:info@maurerjewelry.com" className="flex items-center hover:text-gray-400 transition duration-300">
                <BiMailSend className="mr-2 text-lg" />
                info@maurerjewelry.com
              </a>
              <a href="mailto:info@maurerjewelry.com" className="flex items-center hover:text-gray-400 transition duration-300">
                <BiMailSend className="mr-2 text-lg" />
                info@maurerjewelry.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;
