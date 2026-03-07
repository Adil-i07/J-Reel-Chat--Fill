// config-example.js

// Example configuration file for securely setting up an API key.

// To use the following configuration, create a .env file in the root of your project.
// Add your actual API key to that .env file as shown below:
// 
API_KEY=AIzaSyDqNbKf_yMQ5PZdR5sqMlUgxtpnTLyDqW4

// Import the dotenv package to read environment variables from .env file
require('dotenv').config();

// Set up the API key
const apiKey = process.env.API_KEY;

// Use the API key in your application
console.log(`Your API key is: ${apiKey}`); // Do not log the API key in production!

module.exports = { apiKey };
