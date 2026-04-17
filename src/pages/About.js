import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './About.css';

const About = () => {
  const { t, isAmharic } = useLanguage();
  const [counters, setCounters] = useState({
    customers: 0,
    products: 0,
    artisans: 0,
    years: 0
  });

  const statsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const targets = {
        customers: 5000,
        products: 200,
        artisans: 50,
        years: 10
      };

      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounters({
          customers: Math.min(Math.floor(targets.customers * progress), targets.customers),
          products: Math.min(Math.floor(targets.products * progress), targets.products),
          artisans: Math.min(Math.floor(targets.artisans * progress), targets.artisans),
          years: Math.min(Math.floor(targets.years * progress), targets.years)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepTime);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const teamMembers = [
    {
      id: 1,
      nameEn: "Betelhem Yirga",
      nameAm: "ቤተልሄም ይርጋ",
      roleEn: "Founder & Master Weaver",
      roleAm: "መስራች እና ዋና ሽማግሌ",
      image: "img/b.jpg",
      bioEn: "With 20+ years of experience in traditional weaving",
      bioAm: "ከ20+ ዓመታት በላይ ልምድ በባህላዊ ሽመና"
    },
    {
      id: 2,
      nameEn: "Kidist Yirga",
      nameAm: "ቅድስት ይርጋ",
      roleEn: "Creative Director",
      roleAm: "የፈጠራ ዳይሬክተር",
      image: "img/k.jpg",
      bioEn: "Blending tradition with modern design",
      bioAm: "ባህልን ከዘመናዊ ዲዛይን ጋር ማዋሃድ"
    },
    {
      id: 3,
      nameEn: "Yeabsera Yirga",
      nameAm: "የአብሰራ ይርጋ",
      roleEn: "Master Artisan",
      roleAm: "ዋና የእደ ጥበብ ባለሙያ",
      image: "img/y.jpg",
      bioEn: "Specialist in traditional embroidery",
      bioAm: "በባህላዊ ጥልፍ ስራ ላይ ስፔሻሊስት"
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="container">
          <div className="about-hero-content">
            <span className="hero-badge">✨ {t('ourStory') || 'Our Story'} ✨</span>
            <h1 className="hero-title">
              {isAmharic ? 'የኢትዮጵያ ቅርስ መጠበቅ' : 'Preserving Ethiopian Heritage'}
              <span>{isAmharic ? 'በእደ ጥበብ ስራ' : 'Through Artisanal Craftsmanship'}</span>
            </h1>
            <p className="hero-description">
              {isAmharic 
                ? 'ሐበሻ ስብስቦች ከልብስ ብራንድ በላይ ነው። እኛ የኢትዮጵያ ባህል ጠባቂዎች ነን፣ የባህል፣ የማንነት እና የኩራት ታሪኮችን በእያንዳንዱ ክር ውስጥ እንሰራለን።'
                : 'HABESHA Collections is more than just a clothing brand. We are guardians of Ethiopian tradition, weaving stories of culture, identity, and pride into every thread.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="journey-section">
        <div className="container">
          <div className="journey-content">
            <div className="journey-text fade-in-left">
              <span className="section-badge">{isAmharic ? 'ጉዟችን' : 'Our Journey'}</span>
              <h2 className="section-title">{isAmharic ? 'ከባህል ወደ ዘመናዊ ውበት' : 'From Tradition to Modern Elegance'}</h2>
              <p className="journey-description">
                {isAmharic 
                  ? 'ሐበሻ ስብስቦብ በ2014 ዓ.ም የተመሰረተው ቀላል ራዕይ ነበረው፥ የኢትዮጵያን ባህላዊ ልብስ ለማክበር እና ውበቱን ለዓለም ለማጋራት። በሶስት ዋና ሽማግሌዎች በትንሽ አውደ ጥናት የተጀመረው ከ50 በላይ የእደ ጥበብ ባለሙያዎችን ወደሚቀጥር የተወደደ ብራንድ አድጓል።'
                  : 'Founded in 2014, HABESHA Collections began with a simple vision: to celebrate Ethiopian traditional clothing and share its beauty with the world. What started as a small workshop with three master weavers has grown into a cherished brand that employs over 50 artisans.'
                }
              </p>
              <p className="journey-description">
                {isAmharic 
                  ? 'በስብስባችን ውስጥ ያለ እያንዳንዱ ክፍል ከትውልድ ወደ ትውልድ በሚተላለፉ ቴክኒኮች በእጅ የተሰራ ነው። ጥንታዊ የሽመና ዘዴዎችን ለመጠበቅ ከአካባቢው ማህበረሰቦች ጋር በቅርበት እንሰራለን፣ ከዘመናዊ ጣዕም ጋር የሚስማሙ ዘመናዊ ዲዛይኖችን እየፈጠርን።'
                  : 'Each piece in our collection is handcrafted using techniques passed down through generations. We work closely with local communities to preserve ancient weaving methods while creating contemporary designs that resonate with modern tastes.'
                }
              </p>
              <div className="journey-stats" ref={statsRef}>
                <div className="stat-item">
                  <div className="stat-number">{counters.customers}+</div>
                  <div className="stat-label">{t('happyCustomers') || 'Happy Customers'}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{counters.products}+</div>
                  <div className="stat-label">{t('uniqueDesigns') || 'Unique Designs'}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{counters.artisans}+</div>
                  <div className="stat-label">{t('skilledArtisans') || 'Skilled Artisans'}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{counters.years}+</div>
                  <div className="stat-label">{t('yearsExcellence') || 'Years of Excellence'}</div>
                </div>
              </div>
            </div>
            <div className="journey-image fade-in-right">
              <img 
                src="img/big.jpg" 
                alt={isAmharic ? 'ኢትዮጵያዊ ሽመና' : 'Ethiopian Weaving'}
              />
              <div className="image-caption">
                <span>🎨</span> {isAmharic ? 'ባህላዊ ሽመና ሂደት' : 'Traditional Weaving Process'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="mv-grid">
            <div className="mission-card">
              <div className="card-icon">🎯</div>
              <h3>{isAmharic ? 'ተልዕኮችን' : 'Our Mission'}</h3>
              <p>
                {isAmharic 
                  ? 'የኢትዮጵያን ባህላዊ ሽመና ቴክኒኮች በመጠበቅ የአካባቢውን የእደ ጥበብ ባለሙያዎች ማብቃት እና ዘላቂ ኑሮ መፍጠር። የኢትዮጵያን ባህላዊ ቅርስ በከፍተኛ ጥራት እና ትክክለኛ ምርቶች ለዓለም ተደራሽ ለማድረግ እንጥራለን።'
                  : 'To preserve Ethiopian traditional weaving techniques while empowering local artisans and creating sustainable livelihoods. We strive to make Ethiopian cultural heritage accessible to the world through high-quality, authentic products.'
                }
              </p>
            </div>
            <div className="vision-card">
              <div className="card-icon">👁️</div>
              <h3>{isAmharic ? 'ራዕያችን' : 'Our Vision'}</h3>
              <p>
                {isAmharic 
                  ? 'የኢትዮጵያ ባህላዊ ልብስ መሪ ዓለም አቀፍ አምባሳደር ለመሆን፣ በእደ ጥበብ ስራ ልህቀት፣ በባህላዊ ትክክለኛነት እና በዘላቂ ተግባራት እውቅና ለማግኘት።'
                  : 'To become the leading global ambassador of Ethiopian traditional clothing, recognized for excellence in craftsmanship, cultural authenticity, and sustainable practices.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <span className="section-badge center">{isAmharic ? 'መሰረታዊ እሴቶች' : 'Core Values'}</span>
          <h2 className="section-title center">{isAmharic ? 'ምን ይመራናል' : 'What Drives Us'}</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🔖</div>
              <h4>{isAmharic ? 'ትክክለኛነት' : 'Authenticity'}</h4>
              <p>{isAmharic ? 'እያንዳንዱ ክፍል ባህላዊ የኢትዮጵያ ቴክኒኮችን በመጠቀም 100% በእጅ የተሰራ ነው' : 'Every piece is 100% handcrafted using traditional Ethiopian techniques'}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h4>{isAmharic ? 'ዘላቂነት' : 'Sustainability'}</h4>
              <p>{isAmharic ? 'ኢኮ ተስማሚ ቁሳቁሶች እና ሥነ ምግባራዊ የምርት ልምምዶች' : 'Eco-friendly materials and ethical production practices'}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h4>{isAmharic ? 'ማህበረሰብ' : 'Community'}</h4>
              <p>{isAmharic ? 'የአካባቢውን የእደ ጥበብ ባለሙያዎች መደገፍ እና ባህላዊ ቅርስ መጠበቅ' : 'Supporting local artisans and preserving cultural heritage'}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h4>{isAmharic ? 'ጥራት' : 'Quality'}</h4>
              <p>{isAmharic ? 'የማይበገር ለዝርዝር ትኩረት እና የእደ ጥበብ ስራ' : 'Uncompromising attention to detail and craftsmanship'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Modern Redesign */}
      <section className="team-section">
        <div className="container">
          <div className="team-header">
            <span className="section-badge center">✨ {isAmharic ? 'የእደ ጥበብ ባለሙያዎቻችንን ይገናኙ' : 'Meet Our Artisans'} ✨</span>
            <h2 className="section-title center">{isAmharic ? 'ውበቱን የፈጠሩ እጆች' : 'The Hands Behind the Magic'}</h2>
            <p className="team-subtitle">
              {isAmharic 
                ? 'በልዩ የእደ ጥበብ ስራ የኢትዮጵያን ቅርስ የሚጠብቁ ፍቅረኛ ግለሰቦች'
                : 'Passionate individuals preserving Ethiopian heritage through exceptional craftsmanship'}
            </p>
          </div>
          
          <div className="team-grid-modern">
            {teamMembers.map((member, index) => (
              <div key={member.id} className="team-card-modern" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="card-inner">
                  <div className="card-front">
                    <div className="team-image-modern">
                      <img src={member.image} alt={isAmharic ? member.nameAm : member.nameEn} />
                      <div className="image-overlay"></div>
                    </div>
                    <div className="team-info-modern">
                      <h3 className="team-name">{isAmharic ? member.nameAm : member.nameEn}</h3>
                      <p className="team-role-modern">{isAmharic ? member.roleAm : member.roleEn}</p>
                      <div className="team-quote-icon">“</div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="back-content">
                      <h3>{isAmharic ? member.nameAm : member.nameEn}</h3>
                      <p className="back-role">{isAmharic ? member.roleAm : member.roleEn}</p>
                      <p className="back-bio">{isAmharic ? member.bioAm : member.bioEn}</p>
                      <div className="back-social">
                        <button className="back-social-icon" aria-label="Facebook">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                          </svg>
                        </button>
                        <button className="back-social-icon" aria-label="Instagram">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="2" width="20" height="20" rx="4" ry="4"/>
                            <circle cx="8.5" cy="8.5" r="2.5"/>
                            <path d="M21 15l-5-4-3 3-4-4-5 5"/>
                          </svg>
                        </button>
                        <button className="back-social-icon" aria-label="Twitter">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="about-testimonial">
        <div className="container">
          <div className="testimonial-card">
            <div className="testimonial-quote">"</div>
            <p className="testimonial-text">
              {isAmharic 
                ? 'ሐበሻ ስብስቦብ የኢትዮጵያን ባህላዊ ልብስ የማየት ቀንን ለውጦልኛል። ጥራቱ ልዩ ነው፣ እያንዳንዱ ክፍል የአካባቢውን የእደ ጥበብ ባለሙያዎች እንደሚደግፍ ማወቅ የበለጠ ልዩ ያደርገዋል።'
                : 'HABESHA Collections transformed how I view Ethiopian traditional clothing. The quality is exceptional, and knowing that each piece supports local artisans makes it even more special.'}
            </p>
            <div className="testimonial-author">
              <img src="https://randomuser.me/api/portraits/women/89.jpg" alt="Customer" />
              <div>
                <h4>{isAmharic ? 'ዶ/ር አስቴር በቀለ' : 'Dr. Aster Bekele'}</h4>
                <p>{isAmharic ? 'ከ2018 ጀምሮ ታማኝ ደንበኛ' : 'Loyal Customer since 2018'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>{isAmharic ? 'ጉዟችንን ይቀላቀሉ' : 'Join Our Journey'}</h2>
            <p>{isAmharic ? 'በፋሽን አማካኝነት የኢትዮጵያን ቅርስ በመጠበቅ ውስጥ ይሳተፉ' : 'Be part of preserving Ethiopian heritage through fashion'}</p>
            <div className="cta-buttons">
              <button className="btn-primary">{isAmharic ? 'ስብስብ ያስሱ' : 'Explore Collection'}</button>
              <button className="btn-secondary">{isAmharic ? 'አውደ ጥናታችንን ይጎብኙ' : 'Visit Our Workshop'}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;