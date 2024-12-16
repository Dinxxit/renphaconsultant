const loaderContainer = document.getElementById('loaderContainer');

        function showLoader() {
            loaderContainer.style.opacity = '1';
            loaderContainer.style.pointerEvents = 'auto';
        }

        function hideLoader() {
            loaderContainer.style.opacity = '0';
            loaderContainer.style.pointerEvents = 'none';
        }

        function simulateLoading() {
            showLoader();
            
            // Random duration between 2 and 3 seconds
            const duration = Math.random() * 900 + 2000;
            
            setTimeout(hideLoader, duration);
        }

        // Show loader on page load
        window.addEventListener('load', simulateLoading);

        // Show loader before unload (page navigation)
        window.addEventListener('beforeunload', showLoader);

        // Simulate page navigation
        function simulatePageNavigation(event) {
            event.preventDefault();
            simulateLoading();
            setTimeout(() => {
                alert("Page navigation simulated!");
            }, 4000);
        }







    document.addEventListener('DOMContentLoaded', () => {
            const navbar = document.querySelector('.navbar');
            const hero = document.querySelector('.hero');

            // Navbar color change on scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > hero.offsetHeight - navbar.offsetHeight) {
                    navbar.style.backgroundColor = '#003366';
                } else {
                    navbar.style.backgroundColor = 'transparent';
                }
            });

            // Scroll animation
            const fadeElements = document.querySelectorAll('.fade-in');

            const fadeIn = (element) => {
                const distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
                const elementHeight = element.offsetHeight;
                const scrollTop = document.documentElement.scrollTop;

                const threshold = scrollTop + window.innerHeight - elementHeight / 2;

                if (distanceToTop <= threshold) {
                    element.classList.add('visible');
                } else {
                    element.classList.remove('visible');
                }
            };

            const handleScroll = () => {
                fadeElements.forEach((element) => {
                    fadeIn(element);
                });
            };

            // Run on initial load
            handleScroll();

            // Run on scroll
            window.addEventListener('scroll', handleScroll);
        });
    document.addEventListener('DOMContentLoaded', function() {
           

            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const pageId = this.getAttribute('data-page');
                    showPage(pageId);
                });
            });

            // Initial animation for home page
            setTimeout(() => {
                const homeSlideIns = document.querySelectorAll('#home .slide-in');
                homeSlideIns.forEach(el => el.classList.add('active'));
            }, 100);
        });


    document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const toggle = question.querySelector('.faq-toggle');
                
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    toggle.textContent = '+';
                } else {
                    answer.style.display = 'block';
                    toggle.textContent = '-';
                }
            });
        });



        const animateValue = (obj, start, end, duration) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString() + '+';
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endValue = parseInt(target.getAttribute('data-target'));
                    animateValue(target, 0, endValue, 2000);
                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.number').forEach(number => observer.observe(number));
        

        