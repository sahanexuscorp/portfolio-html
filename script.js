// =========================================================
// HARITHA BOBBURI — PORTFOLIO
// INTERACTIVE BEHAVIORS
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // REDUCED MOTION
    // =========================================================

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    // =========================================================
    // SMOOTH SCROLLING — LENIS
    // =========================================================

    let lenis = null;

    if (
        !prefersReducedMotion &&
        typeof Lenis !== "undefined"
    ) {

        lenis = new Lenis({
            duration: 1.15,

            easing: (t) =>
                1 - Math.pow(1 - t, 4),

            smoothWheel: true,
            smoothTouch: false,

            wheelMultiplier: 1,
            touchMultiplier: 1
        });


        function raf(time) {

            lenis.raf(time);

            requestAnimationFrame(raf);
        }


        requestAnimationFrame(raf);
    }


    // =========================================================
    // CUSTOM CURSOR
    // =========================================================

    const cursor =
        document.querySelector(".cursor");


    if (
        cursor &&
        !prefersReducedMotion &&
        window.matchMedia("(hover: hover)").matches
    ) {

        let mouseX =
            window.innerWidth / 2;

        let mouseY =
            window.innerHeight / 2;

        let cursorX = mouseX;
        let cursorY = mouseY;


        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX = event.clientX;
                mouseY = event.clientY;

            }
        );


        function animateCursor() {

            cursorX +=
                (mouseX - cursorX) * 0.14;

            cursorY +=
                (mouseY - cursorY) * 0.14;


            cursor.style.left =
                `${cursorX}px`;

            cursor.style.top =
                `${cursorY}px`;


            requestAnimationFrame(
                animateCursor
            );
        }


        animateCursor();


        const cursorTargets =
            document.querySelectorAll(
                "a, button"
            );


        cursorTargets.forEach(
            (element) => {

                element.addEventListener(
                    "mouseenter",
                    () => {
                        cursor.classList.add(
                            "active"
                        );
                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {
                        cursor.classList.remove(
                            "active"
                        );
                    }
                );

            }
        );

    }


    // =========================================================
    // HERO — MOUSE PARALLAX
    // =========================================================

    /*
       IMPORTANT:
       HTML uses .hero-title-word
       so JavaScript must use the same class.
    */

    const hero =
        document.querySelector(".hero");


    const heroWords =
        document.querySelectorAll(
            ".hero-title-word"
        );


    if (
        hero &&
        heroWords.length &&
        !prefersReducedMotion &&
        window.matchMedia("(hover: hover)").matches
    ) {

        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;


        hero.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();


                targetX =
                    (
                        (event.clientX - rect.left)
                        / rect.width
                    ) - 0.5;


                targetY =
                    (
                        (event.clientY - rect.top)
                        / rect.height
                    ) - 0.5;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                targetX = 0;
                targetY = 0;

            }
        );


        function animateHeroWords() {

            currentX +=
                (targetX - currentX) * 0.055;

            currentY +=
                (targetY - currentY) * 0.055;


            heroWords.forEach(
                (word) => {

                    const speed =
                        parseFloat(
                            word.dataset.speed
                        ) || 1;


                    const moveX =
                        currentX * 12 * speed;


                    const moveY =
                        currentY * 7 * speed;


                    word.style.transform =
                        `translate3d(
                            ${moveX}px,
                            ${moveY}px,
                            0
                        )`;

                }
            );


            requestAnimationFrame(
                animateHeroWords
            );

        }


        animateHeroWords();

    }


    // =========================================================
    // FOUR-THEME SYSTEM
    // =========================================================

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );


    const themeIcon =
        document.querySelector(
            ".theme-icon"
        );


    const body =
        document.body;


    /*
       Theme order:

       1. Light
       2. Dark
       3. HB Light
       4. HB Dark
    */

    const themes = [
        "theme-light",
        "theme-dark",
        "theme-hb-light",
        "theme-hb-dark"
    ];


    /*
       Icons corresponding to each theme.
    */

    const themeIcons = {
        "theme-light": "☀",
        "theme-dark": "◐",
        "theme-hb-light": "✦",
        "theme-hb-dark": "☾"
    };


    /*
       Accessible labels.
    */

    const themeLabels = {
        "theme-light":
            "Light theme",

        "theme-dark":
            "Dark theme",

        "theme-hb-light":
            "HB Light theme",

        "theme-hb-dark":
            "HB Dark theme"
    };


    /*
       Remove every theme class.
    */

    function clearThemes() {

        themes.forEach(
            (theme) => {

                body.classList.remove(
                    theme
                );

            }
        );

        /*
           Remove old class from previous version.
        */

        body.classList.remove("dark");
    }


    /*
       Apply a theme.
    */

    function applyTheme(theme) {

        if (!themes.includes(theme)) {

            theme = "theme-light";

        }


        clearThemes();


        body.classList.add(theme);


        /*
           Update button icon.
        */

        if (themeIcon) {

            themeIcon.textContent =
                themeIcons[theme];

        }


        /*
           Update accessibility.
        */

        if (themeToggle) {

            themeToggle.setAttribute(
                "aria-label",
                `Change theme. Current: ${themeLabels[theme]}`
            );

            themeToggle.setAttribute(
                "title",
                themeLabels[theme]
            );

        }


        /*
           Save preference.
        */

        localStorage.setItem(
            "portfolio-theme",
            theme
        );

    }


    /*
       Load saved theme.
    */

    if (themeToggle) {

        const savedTheme =
            localStorage.getItem(
                "portfolio-theme"
            );


        if (
            savedTheme &&
            themes.includes(savedTheme)
        ) {

            applyTheme(savedTheme);

        } else {

            applyTheme("theme-light");

        }


        /*
           Cycle through the four themes.
        */

        themeToggle.addEventListener(
            "click",
            () => {

                const currentTheme =
                    themes.find(
                        (theme) =>
                            body.classList.contains(
                                theme
                            )
                    ) || "theme-light";


                const currentIndex =
                    themes.indexOf(
                        currentTheme
                    );


                const nextIndex =
                    (
                        currentIndex + 1
                    ) % themes.length;


                const nextTheme =
                    themes[nextIndex];


                applyTheme(nextTheme);

            }
        );

    }


    // =========================================================
    // HERO ENTRANCE ANIMATION
    // =========================================================

    if (
        !prefersReducedMotion &&
        typeof anime !== "undefined"
    ) {

        const heroTimeline =
            anime.timeline({
                easing: "easeOutExpo"
            });


        heroTimeline

            .add({
                targets: ".eyebrow",

                opacity: [0, 1],

                translateY: [15, 0],

                duration: 700
            })


            .add({
                targets: ".hero-status",

                opacity: [0, 1],

                translateY: [15, 0],

                duration: 700
            }, "-=550")


            .add({
                targets: ".hero-title-word",

                opacity: [0, 1],

                translateY: [110, 0],

                duration: 1100,

                delay:
                    anime.stagger(160)
            }, "-=400")


            .add({
                targets:
                    ".hero-description p",

                opacity: [0, 1],

                translateY: [25, 0],

                duration: 700,

                delay:
                    anime.stagger(100)
            }, "-=650")


            .add({
                targets: ".hero-location",

                opacity: [0, 1],

                translateY: [15, 0],

                duration: 600
            }, "-=400")


            .add({
                targets: ".hero-scroll",

                opacity: [0, 1],

                translateY: [15, 0],

                duration: 600
            }, "-=450");

    }


    // =========================================================
    // SCROLL REVEALS
    // =========================================================

    if (!prefersReducedMotion) {

        const revealElements =
            document.querySelectorAll(
                ".section, " +
                ".project-card, " +
                ".capability, " +
                ".tech-category, " +
                ".intro-heading, " +
                ".about-heading, " +
                ".contact-heading, " +
                ".tech-stack-heading"
            );


        const revealObserver =
            new IntersectionObserver(
                (
                    entries,
                    observer
                ) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.1,

                    rootMargin:
                        "0px 0px -5% 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "fade-in"
                );

                revealObserver.observe(
                    element
                );

            }
        );

    }


    // =========================================================
    // ANCHOR SCROLLING
    // =========================================================

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            (anchor) => {

                anchor.addEventListener(
                    "click",
                    (event) => {

                        const targetId =
                            anchor.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        if (
                            lenis &&
                            !prefersReducedMotion
                        ) {

                            lenis.scrollTo(
                                target,
                                {
                                    offset: 0
                                }
                            );

                        } else {

                            target.scrollIntoView({
                                behavior:
                                    prefersReducedMotion
                                        ? "auto"
                                        : "smooth"
                            });

                        }

                    }
                );

            }
        );


    // =========================================================
    // PROJECT CARD INTERACTION
    // =========================================================

    const projectCards =
        document.querySelectorAll(
            ".project-card:not(.project-card-no-link)"
        );


    projectCards.forEach(
        (card) => {

            const visual =
                card.querySelector(
                    ".project-visual"
                );


            if (!visual) {
                return;
            }


            card.addEventListener(
                "mousemove",
                (event) => {

                    if (
                        prefersReducedMotion
                    ) {
                        return;
                    }


                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        (
                            (event.clientX - rect.left)
                            / rect.width
                        ) - 0.5;


                    const y =
                        (
                            (event.clientY - rect.top)
                            / rect.height
                        ) - 0.5;


                    visual.style.setProperty(
                        "--mouse-x",
                        `${x * 12}px`
                    );


                    visual.style.setProperty(
                        "--mouse-y",
                        `${y * 12}px`
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    visual.style.setProperty(
                        "--mouse-x",
                        "0px"
                    );

                    visual.style.setProperty(
                        "--mouse-y",
                        "0px"
                    );

                }
            );

        }
    );


    // =========================================================
    // CAPABILITY HOVER
    // =========================================================

    const capabilities =
        document.querySelectorAll(
            ".capability"
        );


    capabilities.forEach(
        (capability) => {

            capability.addEventListener(
                "mouseenter",
                () => {

                    if (
                        prefersReducedMotion ||
                        typeof anime === "undefined"
                    ) {
                        return;
                    }


                    anime({
                        targets: capability,

                        paddingLeft: "20px",

                        duration: 350,

                        easing:
                            "easeOutCubic"
                    });

                }
            );


            capability.addEventListener(
                "mouseleave",
                () => {

                    if (
                        prefersReducedMotion ||
                        typeof anime === "undefined"
                    ) {
                        return;
                    }


                    anime({
                        targets: capability,

                        paddingLeft: "0px",

                        duration: 350,

                        easing:
                            "easeOutCubic"
                    });

                }
            );

        }
    );


    // =========================================================
    // MAGNETIC LINKS
    // =========================================================

    const magneticLinks =
        document.querySelectorAll(
            ".contact-link, .hero-scroll"
        );


    magneticLinks.forEach(
        (link) => {

            link.addEventListener(
                "mousemove",
                (event) => {

                    if (
                        prefersReducedMotion
                    ) {
                        return;
                    }


                    const rect =
                        link.getBoundingClientRect();


                    const x =
                        event.clientX
                        - rect.left
                        - rect.width / 2;


                    const y =
                        event.clientY
                        - rect.top
                        - rect.height / 2;


                    link.style.transform =
                        `translate3d(
                            ${x * 0.12}px,
                            ${y * 0.12}px,
                            0
                        )`;

                }
            );


            link.addEventListener(
                "mouseleave",
                () => {

                    link.style.transform =
                        "translate3d(0, 0, 0)";

                }
            );

        }
    );
  // =========================================================
// PROJECT CAROUSELS
// =========================================================

const projectCarousels =
    document.querySelectorAll(".projects");


projectCarousels.forEach(
    (carousel) => {

        const controls =
            carousel.nextElementSibling;


        /*
           Make sure this .projects element
           has carousel controls.
        */

        if (
            !controls ||
            !controls.classList.contains(
                "carousel-controls"
            )
        ) {
            return;
        }


        const previousButton =
            controls.querySelector(
                ".carousel-prev"
            );


        const nextButton =
            controls.querySelector(
                ".carousel-next"
            );


        const dotsContainer =
            controls.querySelector(
                ".carousel-dots"
            );


        const cards =
            Array.from(
                carousel.querySelectorAll(
                    ".project-card"
                )
            );


        if (
            !cards.length ||
            !previousButton ||
            !nextButton ||
            !dotsContainer
        ) {
            return;
        }


        // =================================================
        // CAROUSEL STATE
        // =================================================

        let currentIndex = 0;


        // =================================================
        // CREATE DOTS
        // =================================================

        cards.forEach(
            (card, index) => {

                const dot =
                    document.createElement(
                        "button"
                    );


                dot.type = "button";

                dot.className =
                    "carousel-dot";


                dot.setAttribute(
                    "aria-label",
                    `Go to project ${index + 1}`
                );


                dot.addEventListener(
                    "click",
                    () => {

                        currentIndex = index;

                        updateCarousel();

                    }
                );


                dotsContainer.appendChild(
                    dot
                );

            }
        );


        const dots =
            Array.from(
                dotsContainer.querySelectorAll(
                    ".carousel-dot"
                )
            );


        // =================================================
        // UPDATE CAROUSEL
        // =================================================

        function updateCarousel() {

            cards.forEach(
                (card, index) => {

                    const offset =
                        index - currentIndex;


                    /*
                       Normalize circular position.
                    */

                    let position =
                        offset;


                    if (
                        position >
                        cards.length / 2
                    ) {

                        position -=
                            cards.length;

                    }


                    if (
                        position <
                        -cards.length / 2
                    ) {

                        position +=
                            cards.length;

                    }


                    /*
                       Remove previous states.
                    */

                    card.classList.remove(
                        "carousel-active",
                        "carousel-prev-card",
                        "carousel-next-card",
                        "carousel-hidden"
                    );


                    /*
                       Center card.
                    */

                    if (position === 0) {

                        card.classList.add(
                            "carousel-active"
                        );

                    }


                    /*
                       Card immediately to the left.
                    */

                    else if (position === -1) {

                        card.classList.add(
                            "carousel-prev-card"
                        );

                    }


                    /*
                       Card immediately to the right.
                    */

                    else if (position === 1) {

                        card.classList.add(
                            "carousel-next-card"
                        );

                    }


                    /*
                       Everything else stays
                       outside the visible stage.
                    */

                    else {

                        card.classList.add(
                            "carousel-hidden"
                        );

                    }

                }
            );


            // =================================================
            // DOT STATE
            // =================================================

            dots.forEach(
                (dot, index) => {

                    dot.classList.toggle(
                        "active",
                        index === currentIndex
                    );

                }
            );


            // =================================================
            // ARROW STATE
            // =================================================

            previousButton.disabled =
                currentIndex === 0;


            nextButton.disabled =
                currentIndex ===
                cards.length - 1;

        }


        // =================================================
        // PREVIOUS
        // =================================================

        previousButton.addEventListener(
            "click",
            () => {

                if (
                    currentIndex <= 0
                ) {
                    return;
                }


                currentIndex--;

                updateCarousel();

            }
        );


        // =================================================
        // NEXT
        // =================================================

        nextButton.addEventListener(
            "click",
            () => {

                if (
                    currentIndex >=
                    cards.length - 1
                ) {
                    return;
                }


                currentIndex++;

                updateCarousel();

            }
        );


        // =================================================
        // SINGLE PROJECT
        // =================================================

        if (cards.length <= 1) {

            previousButton.style.display =
                "none";

            nextButton.style.display =
                "none";

        }


        // =================================================
        // INITIAL STATE
        // =================================================

        updateCarousel();

    }
);
});