/**
 *	ZYAN - Personal Portfolio Templete (HTML)
 *	Author: codeefly
 *	Author URL: http://themeforest.net/user/codeefly
 *	Copyright © ZYAN by codeefly. All Rights Reserved.
 **/

(function ($) {
  "use strict";
  console.clear();

  let device_width = window.innerWidth;
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  var isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
      navigator.userAgent
    )
      ? true
      : false;

  var zyan = {
    /* ZYAN init */
    init() {
      zyan.imgToSvg(),
        zyan.mobileMenu(),
        zyan.counter(),
        zyan.slickSlider(),
        zyan.marquee(),
        zyan.stickySideBar(),
        zyan.textAnimation(),
        zyan.headingAnimation(),
        zyan.progressbar(),
        zyan.parallaxie(),
        zyan.animation(),
        zyan.customMouse(),
        zyan.magnificPopup(),
        zyan.serviceHover(),
        zyan.stickySideBar();
    },
    /* Svg to image */
    imgToSvg() {
      document.querySelectorAll("img.svg").forEach((el) => {
        const imgID = el.getAttribute("id");
        const imgClass = el.getAttribute("class");
        const imgURL = el.getAttribute("src");
        fetch(imgURL)
          .then((data) => data.text())
          .then((response) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response, "text/html");
            let svg = xmlDoc.querySelector("svg");
            if (typeof imgID !== "undefined") {
              svg.setAttribute("id", imgID);
            }

            if (typeof imgClass !== "undefined") {
              svg.setAttribute("class", imgClass + " replaced-svg");
            }

            svg.removeAttribute("xmlns:a");
            if (el.parentNode) {
              el.parentNode.replaceChild(svg, el);
            }
          });
      });
    },
    /** Mobile Menu */
    mobileMenu() {
      if ($(".main_menu").offset() != undefined) {
        var navoff = $(".main_menu").offset().top;
        $(window).scroll(function () {
          var scrolling = $(this).scrollTop();

          if (scrolling > navoff) {
            $(".main_menu").addClass("menu_fix");
          } else {
            $(".main_menu").removeClass("menu_fix");
          }
        });
      }
      /** Mobile Menu Button */
      $(".menu_2_icon").on("click", function () {
        $(".menu_2_icon").toggleClass("show_icon");
      });
      $(".menu_2_icon").on("click", function () {
        $(".main_menu_2").toggleClass("show_menu");
      });
      $(".navbar-toggler").on("click", function () {
        $(".navbar-toggler").toggleClass("show");
      });
    },
    /** counter */
    counter() {
      $(".counter").countUp();
    },
    /** Slick Slider */
    slickSlider() {
      $(".testi_slider").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        arrows: false,

        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    },
    /** marquee */
    marquee() {
      $(".marquee_animi").marquee({
        speed: 100,
        gap: 0,
        delayBeforeStart: 0,
        direction: "left",
        duplicated: true,
        pauseOnHover: true,
        startVisible: true,
      });
    },
    /** Sticky sidebar */
    stickySideBar() {
      $("#sticky_sidebar").stickit({
        top: 100,
      });
    },
    /** Animation */
    animation() {
      /** Fade Left */
      let fade_left = gsap.utils.toArray(".fade_left");
      gsap.set(fade_left, {
        opacity: 0,
        x: -30,
      });

      if (fade_left) {
        if (device_width < 1023) {
          fade_left.forEach((item, i) => {
            gsap.to(item, {
              scrollTrigger: {
                trigger: item,
                start: "top center+=150",
                markers: false,
              },
              opacity: 1,
              x: 0,
              ease: "power2.out",
              duration: 2,
              stagger: {
                each: 0.4,
              },
            });
          });
        } else {
          fade_left.forEach((item, i) => {
            const containerID = `#${item.getAttribute("data-trigerId")}`;
            gsap.to(
              `${containerID !== "#null" ? containerID : ""} .fade_left`,
              {
                scrollTrigger: {
                  trigger: containerID !== "#null" ? containerID : ".fade_left",
                  start: "top center+=150",
                  markers: false,
                },
                opacity: 1,
                x: 0,
                ease: "power2.out",
                duration: 2,
                stagger: {
                  each: 0.4,
                },
              }
            );
          });
        }
      }

      /** Fade Right */
      let fade_right = gsap.utils.toArray(".fade_right");
      gsap.set(fade_right, {
        opacity: 0,
        x: +30,
      });

      if (fade_right) {
        if (device_width < 1023) {
          fade_right.forEach((item, i) => {
            gsap.to(item, {
              scrollTrigger: {
                trigger: item,
                start: "top center+=150",
                markers: false,
              },
              opacity: 1,
              x: 0,
              ease: "power2.out",
              duration: 2,
              stagger: {
                each: 0.4,
              },
            });
          });
        } else {
          fade_right.forEach((item, i) => {
            const containerID = `#${item.getAttribute("data-trigerId")}`;
            const stagger = item.getAttribute("data-stagger");
            gsap.to(`${containerID} .fade_right`, {
              scrollTrigger: {
                trigger: containerID,
                start: "top center+=150",
                markers: false,
              },
              opacity: 1,
              x: 0,
              ease: "power2.out",
              duration: 2,
              stagger: {
                each: stagger ? stagger : 0.4,
              },
            });
          });
        }
      }

      /** Fade Bottom */
      let fade_bottom = gsap.utils.toArray(".fade_bottom");
      if (device_width < 1023) {
        fade_bottom.forEach((item, i) => {
          gsap.set(item, { opacity: 0, y: 60 });
          let featured2Timeline = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top center+=200",
            },
          });
          featured2Timeline.to(item, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power4.out",
          });
        });
      } else {
        fade_bottom.forEach((item, i) => {
          const containerID = `#${item.getAttribute("data-trigerId")}`;
          const stagger = item.getAttribute("data-stagger");
          const duration = item.getAttribute("data-duration");
          const defaultValue = item.getAttribute("data-default-value");
          console.log(defaultValue);
          gsap.set(
            `${containerID !== "#null" ? containerID : ""} .fade_bottom`,
            {
              opacity: 0,
              y: defaultValue ? defaultValue : 30,
            }
          );
          gsap.to(
            `${containerID !== "#null" ? containerID : ""} .fade_bottom`,
            {
              scrollTrigger: {
                trigger: containerID !== "#null" ? containerID : ".fade_bottom",
                start: "top center+=200",
              },
              opacity: 1,
              y: 0,
              duration: duration ? duration : 2,
              ease: "power4.out",
              stagger: stagger ? stagger : 0.3,
            }
          );
        });
      }
    },
    /** Text animation */
    textAnimation() {
      if (device_width > 767) {
        var hasAnim = $(".text_hover_animaiton");
        if (hasAnim.length !== 0) {
          hasAnim.each(function () {
            var $this = $(this);
            var splitType = "words,chars";
            new SplitText($this, {
              type: splitType,
              wordsClass: "menu-text",
            });
          });
        }
      }
    },
    headingAnimation() {
      var hasAnim = $(".has-animation");
      if (device_width > 767) {
        hasAnim.each(function () {
          var $this = $(this);
          var splitType = "lines, chars";
          var splitto = new SplitText($this, {
            type: splitType,
            linesClass: "anim_line",
            charsClass: "anim_char",
            wordsClass: "anim_word",
          });
          var lines = $this.find(".anim_line"),
            words = $this.find(".anim_word"),
            chars = $this.find(".anim_char");
          gsap.fromTo(
            chars,
            { y: "100%" },
            {
              y: "0%",
              duration: 0.8,
              stagger: 0.01,
              ease: "power2.out",
              scrollTrigger: {
                trigger: $(this).parent("div"),
                start: "top center+=300",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    },
    progressbar() {
      var progressbar = $(".tf__team_skills_bar_single .fill");
      progressbar.each(function () {
        const percentage = progressbar.attr("data-percentage");
        gsap.fromTo(
          progressbar,
          { css: { width: 0 } },
          {
            scrollTrigger: {
              trigger: $(this).parent("div"),
              start: "top center+=300",
              toggleActions: "play none none none",
            },
            css: { width: `${percentage}%` },
            duration: 0.8,
            stagger: 0.01,
            ease: "power2.out",
          }
        );
      });
    },
    /** parallaxie */
    parallaxie() {
      $(".tf__subscribe").parallaxie({
        speed: 0.8,
        size: "cover",
      });
    },
    /** Preloader */
    preloader() {
      const svg = document.getElementById("svg");
      const tl = gsap.timeline();
      const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
      const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

      tl.to(".preloader-text", {
        delay: 0.5,
        y: -100,
        opacity: 0,
      });
      tl.to(svg, {
        duration: 0.1,
        // attr: { d: curve },
        ease: "power2.easeIn",
      }).to(svg, {
        duration: 0.5,
        attr: { d: flat },
        ease: "power2.easeOut",
      });
      tl.to(".preloader", {
        y: -1500,
      });
      tl.to(".preloader", {
        zIndex: -1,
        display: "none",
      });
    },
    /** Mouse */
    customMouse() {
      var mouse = { x: 0, y: 0 }; // Cursor position
      var pos = { x: 0, y: 0 }; // Cursor position
      var ratio = 0.15; // delay follow cursor
      var active = false;
      var ball = $("#ball");

      /** default */
      const defaultValue = {
        duration: 0.3,
        opacity: 0.5,
        width: "30px",
        height: "30px",
        backgroundColor: "transparent",
        border: "2px solid #fff",
      };
      const hoverBall = {
        duration: 0.3,
        css: {
          borderWidth: 0,
          opacity: "1!important",
          width: "95px!important",
          height: "95px!important",
          backgroundColor: "#fff",
        },
      };
      gsap.set(ball, {
        // scale from middle and style ball
        xPercent: -50,
        yPercent: -50,
      });
      document.addEventListener("mousemove", mouseMove);
      function mouseMove(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
      gsap.ticker.add(updatePosition);
      function updatePosition() {
        if (!active) {
          pos.x += (mouse.x - pos.x) * ratio;
          pos.y += (mouse.y - pos.y) * ratio;

          gsap.set(ball, { x: pos.x, y: pos.y });
        }
      }
      // link
      $("a,.c-pointer,button,.progress")
        .not(".project_slider a") // omit from selection.
        .on("mouseenter", function () {
          gsap.to(ball, {
            duration: 0.3,
            borderWidth: 0,
            opacity: 0.5,
            backgroundColor: "#CCC",
            width: "80px",
            height: "80px",
          });
        })
        .on("mouseleave", function () {
          gsap.to(ball, defaultValue);
        });
      // Data cursor
      if ($("[data-cursor]")) {
        $("[data-cursor]").each(function () {
          $(this)
            .on("mouseenter", function () {
              ball.append('<div class="ball-view"></div>');
              $(".ball-view").append($(this).attr("data-cursor"));
              gsap.to(ball, hoverBall);
            })
            .on("mouseleave", function () {
              ball.find(".ball-view").remove();
              gsap.to(ball, defaultValue);
            });
        });
      }
      // Slider
      if ($(".slick-list")) {
        $(".slick-list").each(function () {
          $(this)
            .on("mouseenter", function () {
              ball.append(
                '<div class="ball-drag"><i class="far fa-angle-left"></i><i class="far fa-angle-right"></i></div>'
              );
              // $(".ball-drag").append("read more");
              gsap.to(ball, hoverBall);
            })
            .on("mouseleave", function () {
              ball.find(".ball-drag").remove();
              gsap.to(ball, defaultValue);
            });
        });
      }
      // Gallery
      if ($(".gallery")) {
        $(".gallery").each(function () {
          $(this)
            .on("mouseenter", function () {
              ball.append(
                '<div class="ball-gallery"><i class="fa-sharp fa-solid fa-eye"></i></div>'
              );
              // $(".ball-drag").append("read more");
              gsap.to(ball, hoverBall);
            })
            .on("mouseleave", function () {
              ball.find(".ball-gallery").remove();
              gsap.to(ball, defaultValue);
            });
        });
      }
    },
    magnificPopup() {
      $(".play_btn").each(function () {
        $(this).magnificPopup({
          type: "iframe",
          mainClass: "mfp-fade",
          preloader: false,
          fixedContentPos: true,
        });
      });
      $(".image_popup,.gallery_popup a").magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
        },
        mainClass: "mfp-fade",
      });
      $(".details").magnificPopup({
        type: "inline",
        overflowY: "auto",
        closeBtnInside: true,
        mainClass: "mfp-fade zyan-popup",
      });
    },
    serviceHover() {
      const services = document.querySelectorAll(".tf__single_service_2");
      services.forEach((service) => {
        service.addEventListener("mouseenter", () => {
          document
            .querySelector(".tf__single_service_2.active")
            .classList.remove("active");
          service.classList.add("active");
        });
      });
    },
  };
  $(document).ready(function () {
    zyan.init();
    zyan.preloader();
  });
})(jQuery);
