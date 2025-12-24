import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
      <div className="max-w-3xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">
          About Me
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Hi, my name is <span className="font-semibold">Neelesh</span>. I am a 
          <span className="font-semibold"> Full Stack Developer</span> and this Todo List project was created by me.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Project Features:</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Create Todos</li>
          <li>Update Todos</li>
          <li>Delete Todos</li>
          <li>Mark Todos as Done</li>
          <li>User Login & Signup functionality</li>
        </ul>

        <p className="text-gray-700 mt-6">
          This project demonstrates my skills in building full-stack web applications with React, Node.js, and Tailwind CSS. I focused on creating a clean UI, smooth user experience, and all essential CRUD operations for managing tasks efficiently.
        </p>

        <div className="mt-6 flex justify-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            Contact Me
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default AboutUs;
