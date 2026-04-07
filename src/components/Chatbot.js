// components/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Welcome to KUTA Collections! How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // AI Response Generator
  const generateAIResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    // Product related responses
    if (msg.includes("habesha") || msg.includes("kemis") || msg.includes("dress")) {
      return "✨ Our Habesha Kemis collection features beautiful handwoven traditional dresses. Prices range from 2,500 ETB to 8,500 ETB. Would you like to see our best-selling styles?";
    }
    
    if (msg.includes("men") || msg.includes("suit") || msg.includes("male")) {
      return "👔 Our men's collection includes traditional suits, jackets, and vests. Prices start from 1,800 ETB. Which style interests you?";
    }
    
    if (msg.includes("scarf") || msg.includes("netela") || msg.includes("shawl")) {
      return "🧣 Our Netela scarves and shawls are handcrafted with traditional patterns. Prices range from 500 ETB to 1,500 ETB. Would you like to see our latest designs?";
    }
    
    if (msg.includes("price") || msg.includes("cost") || msg.includes("how much")) {
      return "💰 Our products range from 500 ETB for accessories to 8,500 ETB for premium wedding dresses. What specific item are you interested in?";
    }
    
    if (msg.includes("size") || msg.includes("fit") || msg.includes("measurement")) {
      return "📏 We offer sizes from S to XXL. For custom measurements, please visit our showroom or contact us directly. Would you like size guide details?";
    }
    
    if (msg.includes("delivery") || msg.includes("shipping") || msg.includes("ship")) {
      return "🚚 We offer free delivery within Addis Ababa for orders over 2,000 ETB. Nationwide delivery takes 3-5 business days. Would you like a shipping quote?";
    }
    
    if (msg.includes("return") || msg.includes("exchange")) {
      return "🔄 We have a 7-day return policy for unworn items with original tags. Exchanges are free within Addis Ababa. Need help with a return?";
    }
    
    if (msg.includes("location") || msg.includes("showroom") || msg.includes("store")) {
      return "📍 Our showroom is located on the 5th Floor of Jan Meda Dashin Bank Building, Addis Ababa. We're open Monday-Saturday, 9 AM - 6 PM. Would you like directions?";
    }
    
    if (msg.includes("contact") || msg.includes("phone") || msg.includes("email")) {
      return "📞 You can reach us at +2519xxxxxxxx or email info@kutacollections.com. Our team responds within 24 hours. How can we assist you?";
    }
    
    if (msg.includes("order") || msg.includes("track")) {
      return "📦 To track your order or check status, please provide your order number. You can also email us with your order details for assistance.";
    }
    
    if (msg.includes("custom") || msg.includes("tailor") || msg.includes("made")) {
      return "✂️ Yes! We offer custom tailoring services. Please visit our showroom for measurements or contact us to schedule a consultation.";
    }
    
    if (msg.includes("material") || msg.includes("fabric") || msg.includes("cotton")) {
      return "🧵 Our garments are made from premium handwoven Ethiopian cotton, known for its breathability and durability. Some pieces feature silk thread embroidery.";
    }
    
    if (msg.includes("care") || msg.includes("wash") || msg.includes("clean")) {
      return "🧼 We recommend dry cleaning for embroidered pieces. Regular cotton items can be hand-washed cold. Would you like detailed care instructions?";
    }
    
    if (msg.includes("wedding") || msg.includes("special occasion")) {
      return "💍 Congratulations! Our wedding collection features exquisite traditional dresses. Prices start from 5,500 ETB. Would you like to schedule a fitting?";
    }
    
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      return "👋 Hello! Welcome to KUTA Collections. How can I help you explore our Ethiopian traditional clothing today?";
    }
    
    if (msg.includes("thanks") || msg.includes("thank")) {
      return "🙏 You're welcome! Is there anything else I can help you with?";
    }
    
    if (msg.includes("bye") || msg.includes("goodbye")) {
      return "👋 Thank you for visiting KUTA Collections! Have a wonderful day. Come back anytime!";
    }
    
    // Default response
    return "💬 Thank you for your message! Our team will get back to you shortly. In the meantime, you can browse our collection or visit our showroom. How else can I assist you?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateAIResponse(inputMessage),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      <div className={`chat-button ${isOpen ? 'hidden' : ''}`} onClick={() => setIsOpen(true)}>
        <div className="chat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <div className="chat-pulse"></div>
        <div className="chat-badge">✨</div>
      </div>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="bot-avatar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10z"/>
                <path d="M8 12h8M12 8v8"/>
              </svg>
            </div>
            <div>
              <h3>KUTA Assistant</h3>
              <p>Online • Usually replies instantly</p>
            </div>
          </div>
          <button className="close-chat" onClick={() => setIsOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-bubble">
                <p>{message.text}</p>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message bot">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <div className="quick-replies">
            <button onClick={() => setInputMessage("Show me Habesha Kemis")}>👗 Habesha Kemis</button>
            <button onClick={() => setInputMessage("Men's collection")}>👔 Men's Collection</button>
            <button onClick={() => setInputMessage("Delivery info")}>🚚 Delivery</button>
            <button onClick={() => setInputMessage("Location")}>📍 Location</button>
          </div>
          <div className="chat-input-wrapper">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows="1"
            />
            <button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;