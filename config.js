// config.js - API Configuration
// Store your API keys here (use environment variables in production)

const CONFIG = {
    GEMINI_API_KEY: "AIzaSyDqNbKf_yMQ5PZdR5sqMlUgxtpnTLyDqW4",
    GEMINI_API_URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}