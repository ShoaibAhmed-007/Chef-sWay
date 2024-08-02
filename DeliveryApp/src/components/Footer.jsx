import React from "react";

export default function Footer() {
  return (
    <footer className=" bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex gap-4 mb-4">
          <a
            href="https://www.linkedin.com/in/shoaib-ahmed-89079b311/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/ShoaibAhmed-007/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            GitHub
          </a>
        </div>
        <div className="text-center mb-4">
          <p>Chef'sWay - Your go-to place for delicious recipes</p>
          <p>
            &copy; {new Date().getFullYear()} Chef'sWay. All rights reserved.
          </p>
        </div>
        <div className="text-center">
          <p>Built with ❤️ by Shoaib Ahmed</p>
        </div>
      </div>
    </footer>
  );
}
