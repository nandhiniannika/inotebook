import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

// Custom render function
function customRender(component, container) {
  // Create a root element if it doesn't exist
  if (!container) return;
  
  // Render the component
  container.innerHTML = ''; // Clear the container
  const element = React.createElement(component);
  React.Children.forEach(element.props.children, child => {
    const childElement = document.createElement('div');
    childElement.innerHTML = child;
    container.appendChild(childElement);
  });
}

// Get the root element
const rootElement = document.getElementById('root');

// Use the custom render function
customRender(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

