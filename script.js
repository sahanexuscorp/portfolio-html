
// =========================================================
// HARITHA BOBBURI — PORTFOLIO
// INTERACTIVE BEHAVIORS
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    // =========================================================
    // SMOOTH SCROLLING — LENIS
    // =========================================================

    let lenis = null;

    if (!prefersReducedMotion && typeof Lenis !== "undefined") {

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

    const cursor = document.querySelector(".cursor");

    if (
        cursor &&
        !prefersReducedMotion &&
        window.matchMedia("(hover: hover)").matches
    ) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let cursorX = mouseX;
        let cursorY = mouseY;


        document.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        });


        function animateCursor() {

            cursorX +=
                (mouseX - cursorX) * 0.14;

            cursorY +=
                (mouseY - cursorY) * 0.14;


            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;


            requestAnimationFrame(animateCursor);
        }


        animateCursor();


        const cursorTargets =
            document.querySelectorAll(
                "a, button"
            );


        cursorTargets.forEach((element) => {

            element.addEventListener(
                "mouseenter",
                () => {
                    cursor.classList.add("active");
                }
            );


            element.addEventListener(
                "mouseleave",
                () => {
                    cursor.classList.remove("active");
                }
            );

        });

    }


    // =========================================================
    // HERO — MOUSE PARALLAX
    // =========================================================

    const hero =
        document.querySelector(".hero");

    const heroWords =
        document.querySelectorAll(
            ".hero-name-word"
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
                        - 0.5
                    );


                targetY =
                    (
                        (event.clientY - rect.top)
                        / rect.height
                        - 0.5
                    );

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


            heroWords.forEach((word) => {

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

            });


            requestAnimationFrame(
                animateHeroWords
            );

        }


        animateHeroWords();

    }


// =========================================================
// THEME TOGGLE
// =========================================================

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

if (themeToggle) {

    // Check saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        body.classList.add("dark");

        themeToggle.setAttribute(
            "aria-pressed",
            "true"
        );

    }


    // Toggle theme
    themeToggle.addEventListener("click", () => {

        const isDark =
            body.classList.toggle("dark");


        themeToggle.setAttribute(
            "aria-pressed",
            String(isDark)
        );


        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

    });

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
                targets: ".hero-name-word",
                opacity: [0, 1],
                translateY: [110, 0],
                duration: 1100,
                delay: anime.stagger(160)
            }, "-=400")
            .add({
                targets: ".hero-description p",
                opacity: [0, 1],
                translateY: [25, 0],
                duration: 700,
                delay: anime.stagger(100)
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
                ".section, .project-card, .capability, " +
                ".intro-heading, .about-heading, .contact-heading"
            );


        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.1,
                    rootMargin: "0px 0px -5% 0px"
                }
            );


        revealElements.forEach((element) => {

            element.classList.add("fade-in");

            revealObserver.observe(element);

        });

    }


    // =========================================================
    // ANCHOR SCROLLING
    // =========================================================

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((anchor) => {

            anchor.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        anchor.getAttribute("href");


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


                    if (lenis && !prefersReducedMotion) {

                        lenis.scrollTo(target, {
                            offset: 0
                        });

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

        });


    // =========================================================
    // PROJECT CARD INTERACTION
    // =========================================================

    const projectCards =
        document.querySelectorAll(
            ".project-card:not(.project-card-no-link)"
        );


    projectCards.forEach((card) => {

        const visual =
            card.querySelector(".project-visual");


        if (!visual) {
            return;
        }


        card.addEventListener(
            "mousemove",
            (event) => {

                if (prefersReducedMotion) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    (event.clientX - rect.left)
                    / rect.width
                    - 0.5;


                const y =
                    (event.clientY - rect.top)
                    / rect.height
                    - 0.5;


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

    });


    // =========================================================
    // CAPABILITY HOVER
    // =========================================================

    const capabilities =
        document.querySelectorAll(
            ".capability"
        );


    capabilities.forEach((capability) => {

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
                    easing: "easeOutCubic"
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
                    easing: "easeOutCubic"
                });

            }
        );

    });


    // =========================================================
    // MAGNETIC LINKS
    // =========================================================

    const magneticLinks =
        document.querySelectorAll(
            ".contact-link, .hero-scroll"
        );


    magneticLinks.forEach((link) => {

        link.addEventListener(
            "mousemove",
            (event) => {

                if (prefersReducedMotion) {
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

    });


});

