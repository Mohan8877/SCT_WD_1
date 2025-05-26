const navbar = document.getElementById('navbar');
    const links = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const scrollBtn = document.getElementById('scrollTopBtn');
    const toggleDark = document.getElementById('toggleDark');

    // Navbar scroll effect + link highlight
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);

      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 60;
        if (pageYOffset >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });

      scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';

      revealSections();
    });

    // Scroll to top
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Reveal sections
    function revealSections() {
      const revealPoint = 150;
      sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - revealPoint) {
          sec.classList.add('visible');
        }
      });
    }

    window.addEventListener('load', revealSections);

    // Dark Mode Toggle
    toggleDark.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });

    // Voice Navigation

    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.lang = 'en-US';
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        if (transcript.includes('home')) location.href = '#home';
        else if (transcript.includes('about')) location.href = '#about';
        else if (transcript.includes('services')) location.href = '#services';
        else if (transcript.includes('contact')) location.href = '#contact';
        else if (transcript.includes('top')) window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    }
