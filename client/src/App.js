import React, { useState, useEffect } from 'react';

function App() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      console.log('Fetching from:', process.env.REACT_APP_API_URL);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/links`);
      
      if (!response.ok) {
        const text = await response.text();
        console.error('Response not OK:', {
          status: response.status,
          statusText: response.statusText,
          body: text
        });
        throw new Error(`Failed to fetch links: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Fetched data:', data);
      setLinks(data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-xl text-white animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-xl text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 antialiased">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=RohitJoshi"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto border-4 border-purple-500 shadow-xl hover:border-purple-400 transition-all duration-300"
            />
            <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Rohit Joshi</h1>
          <a 
            href="https://twitter.com/Rohit_V_Joshi" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 text-lg mb-1 hover:text-purple-400 transition-colors duration-300"
          >
            @Rohit_V_Joshi
          </a>
          <p className="text-gray-500">Software Engineer @ Circle</p>
        </header>

        <div className="space-y-4 w-full max-w-lg mx-auto px-4">
          {links.map((link) => (
            <a
              key={link._id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white bg-opacity-10 backdrop-blur-sm px-6 py-4 rounded-xl 
                       border border-gray-700 hover:border-purple-500
                       shadow-lg hover:shadow-xl
                       transform hover:-translate-y-1
                       transition-all duration-300
                       text-center text-white font-medium
                       hover:bg-opacity-20"
            >
              {link.title}
            </a>
          ))}
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Rohit Joshi. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
