import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  const sentence = "Organize your tasks effortlessly - Add, edit, and track your goals with ease.";
  const words = sentence.split(" ");
  const [currentText, setCurrentText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (wordIndex < words.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => `${prev} ${words[wordIndex]}`);
        setWordIndex(wordIndex + 1);
        
      }, 200); 
      return () => clearTimeout(timeout);
    } 
  }, [wordIndex, words]);

  return (
    <div className=''>
      <div className="flex h-[86vh] flex-col items-center justify-center p-4 space-y-6 mb-4 ">
        <div className="text-center mb-5">
          <h1 className="text-[70px] font-bold text-gray-700">Todo Master</h1>
          <p className="text-gray-500 text-xl mt-2 text-start">
            {currentText}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          <div className="bg-white shadow-md hover:shadow-pink-600 rounded-lg p-4 flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-200 rounded-full flex justify-center items-center">
              <span className="text-blue-500">✔</span>
            </div>
            <p className="text-gray-800 text-sm">Buy groceries</p>
          </div>

          <div className="bg-white shadow-md hover:shadow-pink-600 rounded-lg p-4 flex items-center space-x-2">
            <div className="w-6 h-6 bg-pink-200 rounded-full flex justify-center items-center">
              <span className="text-pink-500">✔</span>
            </div>
            <p className="text-gray-800 text-sm">Complete project report</p>
          </div>
          <div className="bg-white  shadow-md hover:shadow-pink-600 rounded-lg p-4 flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-200 rounded-full flex justify-center items-center">
              <span className="text-blue-500">✔</span>
            </div>
            <p className="text-gray-800 text-sm">Plan weekend trip</p>
          </div>
        </div>

        {/* button for adding the task */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-sm transition">
          <Link to={"/home/addtodos"}>Add Task</Link>
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
