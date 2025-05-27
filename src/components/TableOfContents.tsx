"use client";

import React, { useState, useEffect } from "react";

// Heading型を追加
type Heading = {
  id: string;
  text: string;
  level: string;
};

export const TableOfContents = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [headings, setHeadings] = useState<Heading[]>([]); // 型を明示

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3")).map(
      (elem) => ({
        id: elem.id,
        text: (elem as HTMLElement).innerText,
        level: elem.tagName,
      })
    );
    setHeadings(elements);
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="fixed top-4 right-4 lg:hidden text-sm font-bold bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition duration-300"
        onClick={toggleModal}
      >
        目次
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-40 flex justify-center items-start z-50 mt-4" onClick={toggleModal}>
          <div className="bg-white my-12 p-6 rounded border border-gray-300 max-w-xs w-full max-h-[92vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="text-lg font-semibold mb-4 text-gray-800">目次</div>
            <ul className="list-none space-y-2">
              {headings.map((heading) => (
                <li key={heading.id} className={`${heading.level === "H3" ? "ml-4 text-sm" : "text-base font-medium"} text-gray-700`}>
                  <a href={`#${heading.id}`} className="hover:text-blue-500 hover:underline" onClick={toggleModal}>
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <nav className="hidden lg:block lg:sticky lg:top-8 bg-white p-6 rounded border border-gray-300 max-h-[92vh] overflow-y-auto">
        <div className="text-lg font-semibold mb-4 text-gray-800">目次</div>
        <ul className="list-none space-y-2">
          {headings.map((heading) => (
            <li key={heading.id} className={`${heading.level === "H3" ? "ml-4 text-sm" : "text-base font-medium"} text-gray-700`}>
              <a href={`#${heading.id}`} className="hover:text-blue-500 hover:underline">
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
