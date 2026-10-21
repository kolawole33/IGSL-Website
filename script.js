/* =========================================================
   IGSL — INSPIRED GLOBAL SYSTEMS LIMITED
   Global JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const siteHeader = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    const dropdown = document.querySelector(".nav-dropdown");
    const dropdownToggle = document.querySelector(".dropdown-trigger");
    const dropdownArrow = dropdownToggle
        ? dropdownToggle.querySelector("span")
        : null;


    /* =====================================================
       HEADER SCROLL EFFECT
    ====================================================== */

    const handleHeaderScroll = () => {
        if (!siteHeader) return;

        if (window.scrollY > 40) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }
    };

    handleHeaderScroll();

    window.addEventListener("scroll", handleHeaderScroll, {
        passive: true
    });


    /* =====================================================
       RESET DROPDOWN
    ====================================================== */

    const resetDropdown = () => {
        if (!dropdown) return;

        dropdown.classList.remove("active");

        if (dropdownToggle) {
            dropdownToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

        if (dropdownArrow) {
            dropdownArrow.textContent = "+";
        }
    };


    /* =====================================================
       CLOSE MOBILE MENU
    ====================================================== */

    const closeMobileMenu = () => {

        if (mainNav) {
            mainNav.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

        document.body.classList.remove("menu-open");

        resetDropdown();
    };


    /* =====================================================
       OPEN MOBILE MENU
    ====================================================== */

    const openMobileMenu = () => {

        if (!mainNav || !menuToggle) return;

        mainNav.classList.add("active");

        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        document.body.classList.add("menu-open");

        /*
           Always start the Solutions dropdown closed
           when the mobile navigation is opened.
        */
        resetDropdown();
    };


    /* =====================================================
       MOBILE MENU TOGGLE
    ====================================================== */

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", (event) => {

            event.stopPropagation();

            const isOpen =
                mainNav.classList.contains("active");

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });


        /* Close menu after selecting a normal navigation link */

        const normalNavLinks =
            mainNav.querySelectorAll(
                ":scope > a:not(.dropdown-trigger), .dropdown-menu a"
            );

        normalNavLinks.forEach((link) => {

            link.addEventListener("click", () => {
                closeMobileMenu();
            });

        });
    }


    /* =====================================================
       SOLUTIONS & PLATFORMS DROPDOWN
    ====================================================== */

    if (dropdown && dropdownToggle && dropdownArrow) {

        dropdownArrow.addEventListener("click", (event) => {

            if (window.innerWidth > 900) return;

            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                dropdown.classList.toggle("active");

            dropdownToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            dropdownArrow.textContent =
                isOpen ? "−" : "+";
        });
    }


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ====================================================== */

    document.addEventListener("click", (event) => {

        if (!mainNav || !menuToggle) return;

        if (!mainNav.classList.contains("active")) return;

        const clickedInsideNavigation =
            mainNav.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (
            !clickedInsideNavigation &&
            !clickedMenuButton
        ) {
            closeMobileMenu();
        }
    });


    /* =====================================================
       DROPDOWN LINKS
    ====================================================== */

    if (dropdown) {

        const dropdownLinks =
            dropdown.querySelectorAll(
                ".dropdown-menu a"
            );

        dropdownLinks.forEach((link) => {

            link.addEventListener("click", () => {
                closeMobileMenu();
            });

        });
    }


    /* =====================================================
       WINDOW RESIZE
    ====================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {
            closeMobileMenu();
        }
    });


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") return;

        closeMobileMenu();
    });

});