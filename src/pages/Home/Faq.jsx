import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="mx-4 my-8 lg:mx-32 lg:my-16">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-teal-600">Frequently Asked Questions (FAQ)</h1>
                <p className="mt-4 text-lg text-gray-600">Find answers to some of the most common questions about React.js</p>
            </div>

            {/* Accordion Section */}
            <section className="faq">
                {faqData.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 mb-4">
                        <div
                            onClick={() => handleToggle(index)}
                            className="cursor-pointer py-4 px-6 bg-gray-100 rounded-lg flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-700">{faq.question}</h2>
                            <span className="text-xl">{activeIndex === index ? '-' : '+'}</span>
                        </div>
                        {activeIndex === index && (
                            <div className="px-6 py-4 bg-white">
                                <p className="text-gray-600">{faq.answer}</p>
                                {faq.code && (
                                    <pre className="bg-gray-100 p-4 rounded mt-2">
                                        <code>{faq.code}</code>
                                    </pre>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </section>
        </div>
    );
};

// FAQ Data
const faqData = [
    {
        question: "1 What is React.js and Explain the concept of 'components' in React?",
        answer: "React.js is a popular JavaScript library for building user interfaces, particularly for single-page applications. In React, components are independent, reusable pieces of UI that can have their own state and logic. Components can be thought of as JavaScript functions that return a part of the user interface.",
    },
    {
        question: "2 What is JSX in React, and how does it work?",
        answer: "JSX stands for JavaScript XML. It is a syntax extension for JavaScript that allows you to write HTML-like code directly in JavaScript. JSX is transpiled into regular JavaScript by tools like Babel. Under the hood, JSX is transformed into `React.createElement()` calls.",
    },
    {
        question: "3 What is the Virtual DOM, and how does React use it to optimize performance?",
        answer: "The Virtual DOM is a lightweight copy of the actual DOM. React uses it to optimize performance by updating the virtual representation first, then comparing it with the real DOM and only applying changes to the parts of the real DOM that need to be updated.",
    },
    {
        question: "4 Explain the concept of 'props' in React and how they are used.",
        answer: "Props are short for 'properties' and are used to pass data from a parent component to a child component in React. They are read-only and cannot be modified by the receiving component. Props allow components to be dynamic and reusable.",
    },
    {
        question: "5 What is 'state' in React, and how does it differ from props?",
        answer: "State is a built-in object in React that allows components to manage data that can change over time. Unlike props, which are passed from parent to child, state is local to a component and can be modified by the component itself using `setState` or hooks like `useState`.",
    },
    {
        question: "6 Explain the useState hook and provide an example of how it is used.",
        answer: "The `useState` hook allows you to add state to functional components. It returns an array with two elements: the current state value and a function to update that state. Here is an example:",
        code: `const [count, setCount] = useState(0);\n\n<button onClick={() => setCount(count + 1)}>Increment</button>\n<p>Count: {count}</p>`,
    },
    {
        question: "7 What is the purpose of the useEffect hook in React, and when would you use it?",
        answer: "The `useEffect` hook allows you to perform side effects in functional components, such as fetching data, manipulating the DOM, or setting up subscriptions. It runs after every render, but can be configured to run only when certain state or props change, or when the component mounts/unmounts.",
        code: `useEffect(() => {\n fetch('https://api.example.com/data')\n .then(response => response.json())\n .then(data => setData(data));\n}, []);`,
    },
];

export default FAQ;
