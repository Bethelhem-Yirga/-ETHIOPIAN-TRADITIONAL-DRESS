// components/Chatbot.js - Enhanced with FAQ & Real-time Support
import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Welcome to KUTA Collections! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      type: "welcome"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [isHumanSupport, setIsHumanSupport] = useState(false);
  const [supportRequested, setSupportRequested] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // FAQ Categories
  const faqCategories = {
    products: {
      title: "📦 Products",
      icon: "👕",
      questions: [
        { q: "What is Habesha Kemis?", a: "Habesha Kemis is a traditional Ethiopian dress, handwoven from cotton with intricate embroidery patterns. It's worn for special occasions like weddings, holidays, and cultural events." },
        { q: "Are your products authentic?", a: "Yes! All our products are 100% authentic, handcrafted by Ethiopian artisans using traditional weaving techniques passed down through generations." },
        { q: "Do you offer custom tailoring?", a: "Yes! We offer custom tailoring services. Please visit our showroom for measurements or contact us to schedule a consultation." }
      ]
    },
    orders: {
      title: "🚚 Orders & Shipping",
      icon: "📦",
      questions: [
        { q: "How long does delivery take?", a: "Delivery within Addis Ababa takes 1-2 business days. Nationwide delivery takes 3-5 business days. International shipping takes 7-14 business days." },
        { q: "What is the shipping cost?", a: "Free shipping within Addis Ababa for orders over 2,000 ETB. Standard shipping fee is 150 ETB within Addis, 300 ETB for nationwide delivery." },
        { q: "How can I track my order?", a: "You'll receive a tracking number via SMS/Email once your order ships. You can also track your order in your account dashboard." },
        { q: "What is your return policy?", a: "We offer a 7-day return policy for unworn items with original tags. Exchanges are free within Addis Ababa." }
      ]
    },
    payments: {
      title: "💰 Payments",
      icon: "💳",
      questions: [
        { q: "What payment methods do you accept?", a: "We accept Telebirr, Chapa, CBE Birr, Credit/Debit cards, and Cash on Delivery (within Addis Ababa)." },
        { q: "Is my payment secure?", a: "Yes! All payments are processed through secure, encrypted gateways. We never store your payment information." },
        { q: "Do you offer installment payments?", a: "Yes, we offer installment payments through Chapa and select banks. Contact us for more details." }
      ]
    },
    support: {
      title: "🎧 Customer Support",
      icon: "💬",
      questions: [
        { q: "How can I contact customer support?", a: "You can reach us at +2519xxxxxxxx, email info@kutacollections.com, or use our live chat. We're available Monday-Saturday, 9 AM - 6 PM." },
        { q: "Where is your showroom located?", a: "We're located on the 5th Floor of Jan Meda Dashin Bank Building, Addis Ababa. Open Monday-Saturday, 9 AM - 6 PM." },
        { q: "Do you have a warranty?", a: "Yes, all products come with a 30-day quality guarantee. If you find any defects, we'll replace or repair the item free of charge." }
      ]
    }
  };

  // AI Response Generator (Enhanced)
  const generateAIResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    // Check for human support request
    if (msg.includes("human") || msg.includes("agent") || msg.includes("speak to someone") || msg.includes("talk to person")) {
      setSupportRequested(true);
      return "👨‍💼 I'll connect you with a customer support agent. Please wait a moment...\n\nIn the meantime, could you please share your name and order number (if applicable) so we can assist you better?";
    }
    
    if (msg.includes("faq") || msg.includes("frequently asked") || msg.includes("common questions")) {
      setShowFAQ(true);
      return "📚 I've opened our FAQ section for you! You'll find answers to common questions about products, orders, payments, and support. Is there anything specific you'd like to know?";
    }
    
    // Product related responses
    if (msg.includes("habesha") || msg.includes("kemis") || msg.includes("dress")) {
      return "✨ Our Habesha Kemis collection features beautiful handwoven traditional dresses. Prices range from 2,500 ETB to 8,500 ETB. Would you like to see our best-selling styles? 📸";
    }
    
    if (msg.includes("men") || msg.includes("suit") || msg.includes("male")) {
      return "👔 Our men's ceremonial collection celebrates Ethiopian heritage:\n\nTraditional Habesha Shirt - Handwoven with intricate embroidery, perfect for weddings and holidays . Prices start from 1,800 ETB. We have sizes S-XXL available. Which style interests you?";
    }
    
    if (msg.includes("size") || msg.includes("fit") || msg.includes("measurement")) {
      return "📏 We offer sizes from S to XXL. Here's our size guide:\n\n• S: 32-34\" chest\n• M: 36-38\" chest  \n• L: 40-42\" chest\n• XL: 44-46\" chest\n• XXL: 48-50\" chest\n\nNeed custom sizing? Just ask!";
    }
    
    if (msg.includes("delivery") || msg.includes("shipping") || msg.includes("ship")) {
      return "🚚 We offer free delivery within Addis Ababa for orders over 2,000 ETB. Nationwide delivery takes 3-5 business days. Would you like a shipping quote for your location?";
    }
    
    if (msg.includes("return") || msg.includes("exchange")) {
      return "🔄 We have a 7-day return policy for unworn items with original tags. Exchanges are free within Addis Ababa. Would you like to initiate a return?";
    }
    
    if (msg.includes("payment") || msg.includes("pay")) {
      return "💳 We accept Telebirr, Chapa, CBE Birr, Credit/Debit cards, and Cash on Delivery. All payments are secure and encrypted. Which payment method works best for you?";
    }
    
    if (msg.includes("price") || msg.includes("cost")) {
      return "💰 Our products range from 500 ETB for accessories to 8,500 ETB for premium wedding dresses. What specific item are you interested in? I can give you exact pricing!";
    }
    
    if (msg.includes("location") || msg.includes("showroom") || msg.includes("store")) {
      return "📍 Our showroom is located on the 5th Floor of Jan Meda Dashin Bank Building, Addis Ababa. We're open Monday-Saturday, 9 AM - 6 PM. Would you like directions?";
    }
    
    if (msg.includes("contact") || msg.includes("phone") || msg.includes("email")) {
      return "📞 You can reach us at +2519xxxxxxxx or email info@kutacollections.com. Our support team is available Monday-Saturday, 9 AM - 6 PM. How can we help you today?";
    }
    
    if (msg.includes("order") || msg.includes("track")) {
      return "📦 To track your order, please provide your order number. You can also check your order status in your account dashboard. Need help finding your order number?";
    }
    
    if (msg.includes("custom") || msg.includes("tailor")) {
      return "✂️ Yes! We offer custom tailoring services. Please visit our showroom for measurements or schedule a virtual consultation. Prices vary based on design complexity.";
    }
    
    if (msg.includes("material") || msg.includes("fabric")) {
      return "🧵 Our garments are made from premium handwoven Ethiopian cotton, known for its breathability and durability. Some pieces feature silk thread embroidery. Would you like more details?";
    }
    
    if (msg.includes("care") || msg.includes("wash")) {
      return "🧼 We recommend dry cleaning for embroidered pieces. Regular cotton items can be hand-washed cold. Would you like detailed care instructions for a specific item?";
    }
    
    if (msg.includes("wedding") || msg.includes("special occasion")) {
      return "💍 Congratulations! Our wedding collection features exquisite traditional dresses starting from 5,500 ETB. Would you like to schedule a fitting or see our bridal collection?";
    }
    
    if (msg.includes("discount") || msg.includes("sale") || msg.includes("promotion")) {
      return "🎉 Yes! We have seasonal promotions and first-time buyer discounts. Sign up for our newsletter to get 10% off your first purchase! Would you like the discount code?";
    }
    
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      return "👋 Hello! Welcome to KUTA Collections. I'm here to help with products, orders, sizing, or anything else! What can I assist you with today?";
    }
    
    if (msg.includes("thanks") || msg.includes("thank")) {
      return "🙏 You're very welcome! Is there anything else I can help you with? I'm here 24/7 for your questions!";
    }
    
    if (msg.includes("bye") || msg.includes("goodbye")) {
      return "👋 Thank you for visiting KUTA Collections! Have a wonderful day. Come back anytime, and don't forget to check our new arrivals! ✨";
    }
    
    // Default response with FAQ suggestion
    return "💡 I'm here to help! You can ask me about:\n\n📦 Products & Sizes\n🚚 Delivery & Returns\n💰 Payments & Pricing\n📍 Showroom Location\n\nOr type 'FAQ' to see common questions. How can I assist you today?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
      type: "user"
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    setShowFAQ(false);

    // Simulate AI thinking
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateAIResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
        type: "response"
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleFAQClick = (question, answer) => {
    // Add user question
    const userMessage = {
      id: messages.length + 1,
      text: question,
      sender: "user",
      timestamp: new Date(),
      type: "user"
    };
    
    // Add bot answer
    const botMessage = {
      id: messages.length + 2,
      text: answer,
      sender: "bot",
      timestamp: new Date(),
      type: "faq"
    };
    
    setMessages(prev => [...prev, userMessage, botMessage]);
    setShowFAQ(false);
  };

  const requestHumanSupport = () => {
    setIsHumanSupport(true);
    const supportMessage = {
      id: messages.length + 1,
      text: "👨‍💼 **Customer Support Agent Connected**\n\nHello! Thank you for contacting KUTA Collections support. A real agent will be with you shortly.\n\n**Estimated wait time:** 1-2 minutes\n\nPlease share your name and order number (if applicable) so we can assist you better.\n\n*You can also call us at +2519xxxxxxxx for immediate assistance.*",
      sender: "bot",
      timestamp: new Date(),
      type: "support"
    };
    setMessages(prev => [...prev, supportMessage]);
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

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
        <div className="chat-badge">
          <span className="badge-online"></span>
        </div>
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
              <p className="online-status">
                <span className="status-dot"></span>
                Online • 24/7 Support
              </p>
            </div>
          </div>
          <div className="chat-actions">
            <button className="faq-btn" onClick={() => setShowFAQ(!showFAQ)} title="FAQ">
              📚
            </button>
            <button className="close-chat" onClick={() => setIsOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* FAQ Panel */}
        {showFAQ && (
          <div className="faq-panel">
            <div className="faq-header">
              <h4>📚 Frequently Asked Questions</h4>
              <button onClick={() => setShowFAQ(false)}>✕</button>
            </div>
            <div className="faq-categories">
              {Object.entries(faqCategories).map(([key, category]) => (
                <div key={key} className="faq-category">
                  <div className="faq-category-title">
                    <span>{category.icon}</span>
                    <h5>{category.title}</h5>
                  </div>
                  <div className="faq-questions">
                    {category.questions.map((item, idx) => (
                      <button
                        key={idx}
                        className="faq-question"
                        onClick={() => handleFAQClick(item.q, item.a)}
                      >
                        {item.q}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender} ${message.type}`}>
              <div className="message-bubble">
                <p className="message-text">{message.text}</p>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message bot typing">
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
            <button onClick={() => setInputMessage("👔 Men's Collection")}>👔 Men's Collection</button>
            <button onClick={() => setInputMessage("Delivery info")}>🚚 Delivery</button>
            <button onClick={() => setInputMessage("Payment methods")}>💳 Payments</button>
            <button onClick={() => setInputMessage("Return policy")}>🔄 Returns</button>
            <button onClick={() => setInputMessage("Talk to human")}>👨‍💼 Human Support</button>
          </div>
          <div className="chat-input-wrapper">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... (Ask me about products, orders, sizing, or type 'FAQ')"
              rows="1"
            />
            <button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>
          {supportRequested && !isHumanSupport && (
            <div className="support-request">
              <button className="connect-support-btn" onClick={requestHumanSupport}>
                👨‍💼 Connect to Human Support
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chatbot;