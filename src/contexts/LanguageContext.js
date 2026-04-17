// contexts/LanguageContext.js - Fixed (no duplicate keys)
import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Navigation
    home: "Home",
    products: "Products",
    about: "About Us",  // Only ONE 'about' key
    contact: "Contact",
    shop: "Shop",

    // Hero Section - Slide Text
    slide1Title: "Elegant",
    slide1Subtitle: "traditional",
    slide1Highlight: "Habesha Kemis",
    
    slide2Title: "Luxurious",
    slide2Subtitle: "royal",
    slide2Highlight: "collection",
    
    slide3Title: "Ethiopian",
    slide3Subtitle: "heritage",
    slide3Highlight: "pride",
    
    shopNow: "Shop Now",
    
    // Products Section
    new: "NEW",
    arrival: "ARRIVAL",
    quickView: "Quick View",
    newArrival: "NEW",
    birr: "birr",
    browseMore: "Browse More",
    readMore: "Read More",
    
    // Features
    fastDelivery: "Fast Delivery",
    freeDelivery: "Free delivery on all orders",
    securePayment: "Secure Payment",
    securePaymentDesc: "100% secure transactions",
    qualityGuarantee: "Quality Guarantee",
    qualityGuaranteeDesc: "Authentic handwoven products",
    easyReturns: "Easy Returns",
    easyReturnsDesc: "7-day return policy",
    
    allRightsReserved: "All Rights Reserved",

    // Products Page
    OurCollections: "Our Collections",
    all: "All",
    habeshaKemis: "Habesha Kemis",
    habeshaManCloth: "Habesha Man Traditional Cloth",
    netelaScarf: "Netela Scarf",
    tilfi: "Tilfi",
    weddingDress: "Wedding Dress",

    ourStory: "Our Story",
    preservingHeritage: "Preserving Ethiopian Heritage",
    throughCraftsmanship: "Through Artisanal Craftsmanship",
    ourJourney: "Our Journey",
    fromTradition: "From Tradition to Modern Elegance",
    ourMission: "Our Mission",
    ourVision: "Our Vision",
    coreValues: "Core Values",
    whatDrivesUs: "What Drives Us",
    authenticity: "Authenticity",
    sustainability: "Sustainability",
    community: "Community",
    quality: "Quality",
    meetOurArtisans: "Meet Our Artisans",
    theHandsBehind: "The Hands Behind the Magic",
    happyCustomers: "Happy Customers",
    uniqueDesigns: "Unique Designs",
    skilledArtisans: "Skilled Artisans",
    yearsExcellence: "Years of Excellence",

    name: "Name",
    email: "Email",
    message: "Message",
    sendMessage: "Send Message",

    quickLinks: "Quick Links",

    faq: "FAQ",
    frequentlyAskedQuestions: "Frequently Asked Questions",
    orders: "Orders",
    payments: "Payments",
    customerSupport: "Customer Support",
    humanSupport: "Human Support",
    connectToHumanSupport: "Connect to Human Support",
    estimatedWaitTime: "Estimated wait time: 1-2 minutes",

  },
  
  am: {
    // Navigation
    home: "ዋና ገጽ",
    products: "ምርቶች",
    about: "ስለ እኛ",  // Only ONE 'about' key
    contact: "አግኙን",
    shop: "ግዛ",
    
    // Hero Section - Slide Text
    slide1Title: "ውብ",
    slide1Subtitle: "ባህላዊ",
    slide1Highlight: "ሐበሻ ቀሚስ",
    
    slide2Title: "የተራቀቀ",
    slide2Subtitle: "ንጉሳዊ",
    slide2Highlight: "ስብስብ",
    
    slide3Title: "ኢትዮጵያዊ",
    slide3Subtitle: "ቅርስ",
    slide3Highlight: "ኩራት",

    shopNow: "ግዛ አሁን",
    
    // Products Section
    new: "አዲስ",
    arrival: "ደርሷል",
    quickView: "በፍጥነት ይመልከቱ",
    newArrival: "አዲስ",
    birr: "ብር",
    browseMore: "ተጨማሪ ይመልከቱ",
    readMore: "ተጨማሪ ያንብቡ",
    
    // Features
    fastDelivery: "ፈጣን አቅርቦት",
    freeDelivery: "በሁሉም ትዕዛዞች ላይ ነጻ መላኪያ",
    securePayment: "ደህንነቱ የተጠበቀ ክፍያ",
    securePaymentDesc: "100% ደህንነቱ የተጠበቀ ግብይት",
    qualityGuarantee: "የጥራት ዋስትና",
    qualityGuaranteeDesc: "ትክክለኛ በእጅ የተሰሩ ምርቶች",
    easyReturns: "ቀላል መመለሻ",
    easyReturnsDesc: "የ7 ቀን የመመለሻ ፖሊሲ",
    
    allRightsReserved: "መብቱ በህግ የተጠበቀ ነው",
    
    // Products Page
    OurCollections: "የእኛ ምርቶች",
    all: "ሁሉም",
    habeshaKemis: "ሐበሻ ቀሚስ",
    habeshaManCloth: "የወንዶች ባህላዊ ልብስ",
    netelaScarf: "ነጠላ",
    tilfi: "ጥልፍ",
    weddingDress: "የሰርግ ቀሚስ",

    ourStory: "ታሪካችን",
    preservingHeritage: "የኢትዮጵያ ቅርስ መጠበቅ",
    throughCraftsmanship: "በእደ ጥበብ ስራ",
    ourJourney: "ጉዟችን",
    fromTradition: "ከባህል ወደ ዘመናዊ ውበት",
    ourMission: "ተልዕኮችን",
    ourVision: "ራዕያችን",
    coreValues: "መሰረታዊ እሴቶች",
    whatDrivesUs: "ምን ይመራናል",
    authenticity: "ትክክለኛነት",
    sustainability: "ዘላቂነት",
    community: "ማህበረሰብ",
    quality: "ጥራት",
    meetOurArtisans: "የእደ ጥበብ ባለሙያዎቻችንን ይገናኙ",
    theHandsBehind: "ውበቱን የፈጠሩ እጆች",
    happyCustomers: "ደንበኞች",
    uniqueDesigns: "የተለየ ንድፍ",
    skilledArtisans: "የእደ ጥበብ ባለሙያዎች",
    yearsExcellence: "ዓመታት",
    name: "ስም",
    email: "ኢሜል",
    message: "መልእክት",
    sendMessage: "መልዕክት ይላኩ",
    quickLinks: "ፈጣን ሊንኮች",

    faq: "ተደጋግሞ የሚጠየቁ ጥያቄዎች",
    frequentlyAskedQuestions: "ተደጋግሞ የሚጠየቁ ጥያቄዎች",
    orders: "ትዕዛዞች",
    payments: "ክፍያዎች",
    customerSupport: "የደንበኛ ድጋፍ",
    humanSupport: "የሰው ድጋፍ",
    connectToHumanSupport: "ከሰው ድጋፍ ጋር ይገናኙ",
    estimatedWaitTime: "የሚጠበቅ ጊዜ፡ 1-2 ደቂቃዎች",
  }
};

// Slide images data
export const slides = [
  {
    id: 1,
    image: "img/slide1.jpg",
    bgColor: "#f5e6d3"
  },
  {
    id: 2,
    image: "img/w1.jpg",
    bgColor: "#e8d5c4"
  },
  {
    id: 3,
    image: "img/slide3.jpg",
    bgColor: "#f0e0d0"
  }
];

// New Arrivals Products Data
export const newArrivals = [
  {
    id: 1,
    nameEn: "Habesha Kemis",
    nameAm: "ሐበሻ ቀሚስ",
    price: "3500",
    image: "img/s1.jpg",
    isNew: true
  },
  {
    id: 2,
    nameEn: "Habesha Man Traditional Cloth",
    nameAm: "የወንዶች ባህላዊ ልብስ",
    price: "3000",
    image: "img/m1.jpg",
    isNew: true
  },
  {
    id: 3,
    nameEn: "Netela Scarf",
    nameAm: "ነጠላ",
    price: "500",
    image: "img/n1.jpg",
    isNew: true
  },
  {
    id: 4,
    nameEn: "Habesha Man Traditional Cloth",
    nameAm: "የወንዶች ባህላዊ ልብስ",
    price: "3000",
    image: "img/m2.jpg",
    isNew: false
  },
  {
    id: 5,
    nameEn: "Tilfi",
    nameAm: "ጥልፍ",
    price: "1800",
    image: "img/t1.jpg",
    isNew: false
  },
  {
    id: 6,
    nameEn: "Wedding Dress",
    nameAm: "የሰርግ ቀሚስ",
    price: "5000",
    image: "img/w1.jpg",
    isNew: false
  },
  {
    id: 7,
    nameEn: "Habesha Man Traditional Cloth",
    nameAm: "የወንዶች ባህላዊ ልብስ",
    price: "3000",
    image: "img/m2.jpg",
    isNew: false
  },
  {
    id: 8,
    nameEn: "Embroidered Scarf",
    nameAm: "ጥልፍ ሻርፕ",
    price: "500",
    image: "img/t2.jpg",
    isNew: false
  }
];

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved && (saved === 'en' || saved === 'am') ? saved : 'en';
  });

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'am' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key) => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      toggleLanguage, 
      t,
      isAmharic: language === 'am'
    }}>
      {children}
    </LanguageContext.Provider>
  );
};