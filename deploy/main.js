const body = document.querySelector('body')

// VH Fix Hack
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

// Header (Old)
// function toggleMenu(openingSide) {
//     const buttons = document.querySelectorAll('.header__menu__button');
//     const menu = document.querySelector('.header__menu');
//     const social = document.querySelectorAll('.header__menu__social a');
//     const newsletter = document.querySelector('.header__newsletter');

//     const menuState = menu.getAttribute('data-state');
//     const currentSide = menu.getAttribute('data-side');

//     if (menuState === 'closed') {
//         // menu.classList.add('open');
//         const colors = ["blue", "dark-blue", "dark-green", "purple", "orange"];
//         const randomColor = colors[Math.floor(Math.random() * colors.length)];
//         menu.classList.remove('blue', 'dark-blue', 'dark-green', 'purple', 'orange');
//         menu.classList.add(randomColor);

//         const randomChipColors = ["blue", "dark-blue", "dark-green", "purple", "orange"];
//         const randomColorIndex = randomChipColors.indexOf(randomColor);
//         randomChipColors.splice(randomColorIndex, 1);
//         const randomChipColor = randomChipColors[Math.floor(Math.random() * randomChipColors.length)];
//         social.forEach(link => link.classList.remove('blue', 'dark-blue', 'dark-green', 'purple', 'orange'));
//         social.forEach(link => link.classList.add(randomChipColor));
//         newsletter.classList.remove('blue', 'dark-blue', 'dark-green', 'purple', 'orange');
//         newsletter.classList.add(randomChipColor);

//         buttons.forEach(button => button.classList.add('open'));
//         menu.setAttribute('data-state', 'open');

//         // Animate Menu with GSAP
//         gsap.fromTo('.header__menu', {
//             left: openingSide === 'left' ? '-100%' : 'unset',
//             right: openingSide === 'right' ? '-100%' : 'unset',
//         }, {
//             left: openingSide === 'left' ? '0' : 'unset',
//             right: openingSide === 'right' ? '0' : 'unset',
//             duration: 0.8
//         });

//         // Animate Menu with GSAP
//         gsap.fromTo('.header__menu__close', {
//             left: openingSide === 'left' ? '-100%' : 'unset',
//             right: openingSide === 'right' ? '-100%' : 'unset',
//         }, {
//             left: openingSide === 'left' ? '50%' : 'unset',
//             right: openingSide === 'right' ? '50%' : 'unset',
//             duration: 0.4
//         });

//         document.querySelector('.header__menu__close').classList.add('active');

//         menu.setAttribute('data-side', openingSide);
//         menu.classList.remove('left', 'right');
//         menu.classList.add(openingSide)
//     } else {
//         // menu.classList.remove('open');
//         buttons.forEach(button => button.classList.remove('open'));
//         menu.setAttribute('data-state', 'closed');

//         // Animate Menu with GSAP
//         gsap.fromTo('.header__menu', {
//             left: currentSide === 'left' ? '0' : 'unset',
//             right: currentSide === 'right' ? '0' : 'unset',
//         }, {
//             left: currentSide === 'left' ? window.innerWidth < 768 ? '-100%' : '-50%' : 'unset',
//             right: currentSide === 'right' ? window.innerWidth < 768 ? '-100%' : '-50%' : 'unset',
//             duration: 0.6
//         });

//         document.querySelector('.header__menu__close').classList.remove('active');
//     }
// }

// Toggle Header Nav Just Mobile (New)
function toggleHeaderNav() {
    const header = document.querySelector('.header');
    const headerState = header.getAttribute('data-state');

    if (headerState == "closed") {
        console.log("open")
        header.classList.add('open');
        header.setAttribute('data-state', 'open');
    } else {
        header.classList.remove('open');
        header.setAttribute('data-state', 'closed');
    }
}

// Set Header Color 
let currentTitle = "";
window.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        setHeaderColor();
    }, 500);
});
window.addEventListener("scroll", function() {
    setHeaderColor();
    setActiveSection();
})


function setHeaderColor() {
    const header = document.querySelector(".header");
    const headerDesignation = document.querySelector(".header__designation");
    const headerCookie = document.querySelector(".header__cookie");
    const setColorElements = document.querySelectorAll(".set-header-color");
    
    
    setColorElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const color = element.getAttribute("data-header-color");
        const bgColor = element.getAttribute("data-header-bg-color");
        if (rect.top <= header.offsetHeight -24 && rect.bottom >= header.offsetHeight -24) {
            headerDesignation.classList.remove("gray", "dark-blue");
            headerDesignation.classList.add(color);
            if (bgColor) {
                // header.classList.remove("bg-gray", "bg-dark-blue", "bg-purple", "bg-dark-green", "bg-blue", "bg-transparent");
                // header.classList.add(bgColor);
            }
        }

        if (rect.top <= window.innerHeight) {
            headerCookie.classList.remove("gray", "dark-blue");
            headerCookie.classList.add(color);
            if (bgColor) {
                headerCookie.classList.remove("bg-gray", "bg-dark-blue", "bg-purple", "bg-dark-green", "bg-blue");
                headerCookie.classList.add(bgColor);
            }
        }
    });

    const setTitleElements = document.querySelectorAll(".set-header-title");
    setTitleElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const title = element.getAttribute("data-header-title");

        

        if (rect.top <= header.offsetHeight -24 && rect.bottom >= header.offsetHeight -24) {
            if (currentTitle != title) {
                currentTitle = title;
                const tl = gsap.timeline();
                tl.to(".header__designation__title h2", {
                    y: "25%",
                    opacity: 0,
                    duration: 0.4,
                    ease: Expo.easeOut,
                    onComplete: function () {
                        headerDesignation.querySelector(".header__designation__title h2").innerHTML = title;
                    }
                });

                tl.to(".header__designation__title h2", {
                    y: "-25%",
                    duration: 0,
                });

                tl.to(".header__designation__title h2", {
                    y: "0%",
                    opacity: 1,
                    ease: Expo.easeOut,
                    duration: 0.4,
                });
                // headerDesignation.querySelector(".header__designation__title h2").innerHTML = title;
            }
        }
    });
}

// Set Active Section in Sub-menu
function setActiveSection() {
    const subPages = document.querySelectorAll(".header__nav__pages__subpages a");
    const header = document.querySelector(".header");

    if (subPages.length > 0) {
        subPages.forEach(page => {
            const section = document.querySelector("section" + page.getAttribute("href"));
            const rect = section.getBoundingClientRect();
            if (rect.top <= header.offsetHeight && rect.bottom >= header.offsetHeight) {
                page.classList.add("active");
            } else {
                page.classList.remove("active");
            }
        });
    }
}


// ExpandImage
function expandImage(event) {
    document.querySelector("body").classList.toggle("no-scroll");
    const image = event.srcElement;
    image.classList.toggle("expanded");
}


// Dragging Effect Gallery
let isDragging = false;
let startX;
let scrollLeft;

// const container = document.querySelector('.dragging-container');
window.addEventListener("DOMContentLoaded", () => {
    setDraggingEvents();
})

function setDraggingEvents() {
    const content = document.querySelectorAll('.dragging-content');

    content.forEach(element => {
        element.addEventListener('mousedown', (e) => {
            if (e.target.nodeName != "INPUT") {
                startX = e.pageX - element.offsetLeft;
                scrollLeft = element.scrollLeft;
                isDragging = false;

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            }
        });

        function onMouseMove(e) {
            if (!isDragging) {
                element.classList.add('grabbing');
                isDragging = true;
            }
    
            const x = e.pageX - element.offsetLeft;
            const walk = (x - startX) * 1; // Adjust the scroll speed here (0.5 is just an example)
            element.scrollLeft = scrollLeft - walk;
        }
    
        function onMouseUp() {
            element.classList.remove('grabbing');
            isDragging = false
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    });
}

// Artists
function openText(id, event) {
    const artistButtons = document.querySelectorAll('.artist-text-button');
    artistButtons.forEach(button => {
        button.classList.remove('active');
    });
    event.srcElement.classList.add('active');

    const artistTexts = document.querySelectorAll('.artist-text');
    artistTexts.forEach(text => {
        text.classList.remove('active');
    });

    const text = document.querySelector(`#${id}`);
    text.classList.toggle('active');
}

function scrollToVideo() {
    const video = document.querySelector('.video-player');
    video.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
    });
}


const animText = gsap.utils.toArray(".anim-text");
animText.forEach(text => {
    let SplitClient = new SplitText(text, { type: "words,chars" });
    let chars = SplitClient.chars;

    let animDelay = Number(text.getAttribute("data-anim-delay"));
    let animStagger = Number(text.getAttribute("data-anim-stagger"));
    let animDuration = Number(text.getAttribute("data-anim-duration"));

    gsap.from(chars, {
        duration: animDuration ? animDuration : 0.3,
        delay: animDelay ? animDelay : 0.2,
        opacity: 0,
        y: "-30%",
        stagger: animStagger ? animStagger : 0.04,
    });
});

// Open Contactos 
function toggleContacts() {
    const contacts = document.querySelector('.footer__contacts');
    contacts.classList.toggle('active');
}

let residenciesMenuOpen = false;
function openResidenciesTable(event, contentClass) {
    console.log(event.srcElement.getAttribute("data-state"))
    const residenciesButtons = document.querySelectorAll(".residencies__terms__table__mobile__button")
    if (event.srcElement.getAttribute("data-state") == "active") {
        if (!residenciesMenuOpen) {
            residenciesButtons.forEach(button => {
                button.classList.add("active");
            })
            residenciesMenuOpen = true;
        } else {
            residenciesButtons.forEach(button => {
                button.classList.remove("active");
            })
            event.srcElement.classList.add("active");
            residenciesMenuOpen = false;
        }
    } else {
        residenciesButtons.forEach(button => {
            button.classList.remove("active");
        })

        event.srcElement.classList.add("active");
        event.srcElement.setAttribute("data-state", "active");

        // Toggle Content
        document.querySelectorAll(".residencies__terms__table__row__content").forEach(content => { 
            content.classList.remove("active");
        });

        document.querySelectorAll("." + contentClass).forEach(row => {
            row.classList.add("active");
        }) 

        residenciesMenuOpen = false;
    }

    console.log("residenciesMenuOpen: ", residenciesMenuOpen)
}

function toggleArtistVideo() {
    const video = document.querySelector('.artist__video');
    video.querySelector('video').pause();
    video.classList.toggle('active');
}