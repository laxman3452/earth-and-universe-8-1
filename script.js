document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Navigation
    const navMenu = document.getElementById('nav-menu');
    const slides = document.querySelectorAll('.slide');
    const slideTitles = {
        'slide1': 'Intro',
        'slide2': 'Origin Theories',
        'slide3': 'Eons of Life',
        'slide4': 'Eras of Life',
        'slide5': 'Minerals'
    };

    slides.forEach(slide => {
        const id = slide.id;
        const title = slideTitles[id] || slide.querySelector('.slide-title').textContent.split(' ')[0];
        
        // Create Nav Link
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = title;
        navMenu.appendChild(link);
    });

    // 2. Slide Visibility (Basic Scroll-Based Interaction)
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5 // Trigger when 50% of the slide is visible
    };

    const slideObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const slideId = entry.target.id;
            const navLink = navMenu.querySelector(`a[href="#${slideId}"]`);
            
            if (entry.isIntersecting) {
                // Add 'active' class to make the slide appear with transition
                entry.target.classList.add('active');
                
                // Highlight the corresponding nav link
                navMenu.querySelectorAll('a').forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            } else {
                // Optional: remove 'active' class when leaving the slide completely
                // entry.target.classList.remove('active'); 
            }
        });
    }, observerOptions);

    slides.forEach(slide => {
        slideObserver.observe(slide);
    });
});

// 3. Mineral Tab Interaction (Global Function)
function openMineralTab(evt, tabName) {
    // Declare all variables
    let i, tabcontent, tablinks;

    // Get all elements with class="tab-content" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove('active');
    }

    // Get all elements with class="tab-btn" and remove the "active" class
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove('active');
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// 4. Era Exploration Button (Conceptual)
function showEra(era) {
    alert(`Exploring the ${era} Eon! Scroll down to the next slide for details on the Paleozoic, Mesozoic, and Cenozoic Eras.`);
    // In a full application, this function would scroll the user to slide 4.
    document.getElementById('slide4').scrollIntoView();
}
