document.addEventListener('DOMContentLoaded', function() {

  // --- JavaScript機能 ---

  // 1. レスポンシブナビゲーション (ハンバーガーメニュー)
  const hamburger = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });


  // 2. FAQアコーディオン
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const currentlyActive = document.querySelector('.faq-item.active');
      if (currentlyActive && currentlyActive !== item) {
        currentlyActive.classList.remove('active');
        currentlyActive.querySelector('.faq-answer').style.maxHeight = 0;
      }

      item.classList.toggle('active');
      const answer = item.querySelector('.faq-answer');
      if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = 0;
      }
    });
  });


  // 3. セクション表示時のアニメーション（フェードイン ＋ カウントアップ）
  const animatedSections = document.querySelectorAll('.fade-in-section, .counter');
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 
  };

  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // フェードイン
        if (entry.target.classList.contains('fade-in-section')) {
            entry.target.classList.add('is-visible');
        }
        
        // カウントアップ
        if (entry.target.classList.contains('counter')) {
            const target = +entry.target.getAttribute('data-target');
            entry.target.innerText = '0';
            
            const updateCounter = () => {
                const c = +entry.target.innerText;
                const increment = target / 200; // アニメーション速度調整

                if (c < target) {
                    entry.target.innerText = `${Math.ceil(c + increment)}`;
                    requestAnimationFrame(updateCounter);
                } else {
                    entry.target.innerText = target.toLocaleString();
                }
            };
            updateCounter();
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, options);

  animatedSections.forEach(section => {
    observer.observe(section);
  });


  // 4. スクロール進行度インジケーター
  const scrollIndicator = document.querySelector('.scroll-indicator');
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    
    scrollIndicator.style.width = scrollProgress + '%';
  });
  
  
  // 5. お客様の声スライダーの初期化
  const swiper = new Swiper('.success-stories-slider', {
      loop: true,
      centeredSlides: true, 
      slidesPerView: 1.3, 
      spaceBetween: 15,
      
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      
      breakpoints: {
        768: {
          slidesPerView: 2.2,
          spaceBetween: 30
        }
      }
    });

});