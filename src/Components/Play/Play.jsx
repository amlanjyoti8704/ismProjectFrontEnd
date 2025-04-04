import React, { useState } from 'react';

function Play() {
  const [inputText, setInputText] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!inputText) return;
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/sentiment', { // Replace with your actual endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await res.json();
      setSentiment(data.sentiment); // e.g., "positive" or "negative"
    } catch (err) {
      console.error(err);
      setSentiment("Error analyzing sentiment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:min-h-[70vh] flex flex-col justify-center items-center bg-black px-4 py-10 md:mt-[30px] md:mb-[40px]">
      <h1 className="px-5 text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r from-pink-700 to-red-500 bg-clip-text text-transparent">
          Type your sentence to see the kind of vibe
        </span>
      </h1>

      <div className="w-[80vw] sm:w-[70vw] lg:w-full max-w-4xl flex flex-col md:flex-row gap-4 md:gap-6 items-center">
        <input
          type="text"
          placeholder="Enter your sentence..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full py-3 px-4 rounded-lg bg-gray-700 border border-gray-600 text-white font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full md:w-36 py-3 px-6 bg-orange-700 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
        >
          {loading ? 'Analyzing...' : 'Submit'}
        </button>
      </div>

      {sentiment && (
        <div className="mt-8 text-white text-xl">
          Sentiment:{" "}
          <span className={`font-bold ${sentiment === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
            {sentiment}
          </span>
        </div>
      )}
    </div>
  );
}

export default Play;