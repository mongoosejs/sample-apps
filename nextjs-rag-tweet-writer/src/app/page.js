'use client'
import { useState, useEffect } from 'react';



export default function Home() {
  const [selectedItem, setSelectedItem] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [dropdownItems, setDropdownItems] = useState([]);

  useEffect(() => {
    // Fetch dropdown items from the backend
    fetchDropdownItems();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const fetchDropdownItems = async () => {
    try {
      // Make a backend request to fetch dropdown items
      const response = await fetch('http://localhost:3001/get-tweeters');
      if (response.ok) {
        const data = await response.json();
        console.log('what is data', data);
        setDropdownItems(data.dropdownItems); // Update state with fetched dropdown items
      } else {
        throw new Error('Failed to fetch dropdown items');
      }
    } catch (error) {
      console.error('Error fetching dropdown items:', error);
    }
  };

  const handleSelectChange = async (event) => {
    setSelectedItem(event.target.value);
  };

  const handleInputChange = async (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/write-tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: selectedItem,
          content: inputValue,
        }),
      });
      if (response.ok) {
        console.log('Form submitted successfully');
        // Optionally, you can reset the form fields after submission
        setSelectedItem('');
        setInputValue('');
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dropdown and Input Example</h1>
      <div className="flex space-x-4">
        <div>
          <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700">
            Select an item:
          </label>
          <select
            id="dropdown"
            name="dropdown"
            value={selectedItem}
            onChange={handleSelectChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select...</option>
            {dropdownItems.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {selectedItem && (
          <div>
            <label htmlFor="inputField" className="block text-sm font-medium text-gray-700">
              Input field:
            </label>
            <input
              type="text"
              id="inputField"
              name="inputField"
              value={inputValue}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
            Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}