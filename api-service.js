// api-service.js - Gemini API Service
// Handles all API communication with Gemini

class GeminiAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
    }

    /**
     * Send message to Gemini and get response
     * @param {Array} contents - Message contents in Gemini format
     * @returns {Promise<string>} - The response text from Gemini
     */
    async sendMessage(contents) {
        try {
            const url = `${this.baseUrl}?key=${this.apiKey}`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: contents })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
                throw new Error('Invalid response format from API');
            }

            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Gemini API Error:', error);
            throw error;
        }
    }

    /**
     * Create a context message for the API
     * @param {Array<string>} infoLines - User info lines
     * @returns {Array<Object>} - Context messages in Gemini format
     */
    createContextMessages(infoLines) {
        const contextPromptText = infoLines.length > 0 
            ? `นี่คือข้อมูลเกี่ยวกับฉัน/ความต้องการของฉันที่คุณต้องจำไว้เสมอในการตอบคำถาม:\n${infoLines.join('\n')}\n\nตอบคำถามด้วยน้ำเสียงที่เป็นมิตรแบบเพื่อน`
            : "ตอบคำถามด้วยน้ำเสียงที่เป็นมิตรแบบเพื่อน"; 

        return [
            { role: 'user', text: contextPromptText },
            { role: 'model', text: "รับทราบเพื่อน! พร้อมลุย!" }
        ];
    }

    /**
     * Format chat history for API request
     * @param {Array} contextMessages - Context messages
     * @param {Array} chatHistory - Chat history
     * @returns {Array} - Formatted contents for API
     */
    formatContents(contextMessages, chatHistory) {
        return contextMessages.concat(chatHistory).map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }));
    }
}

// Export for use in HTML
const geminiAPI = new GeminiAPI(CONFIG.GEMINI_API_KEY);