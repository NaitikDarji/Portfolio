// ============ CURSOR ============
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function(e){
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // cursorOutline.style.left = `${posX}px`;
  // cursorOutline.style.top = `${posY}px`;

  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  },{duration: 500, fill: "forwards"});
})

/*=============== SHOW SIDEBAR ===============*/
const navMenu = document.getElementById("sidebar"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close"),
  navLinks = document.querySelectorAll(".nav__link");

/*===== SIDEBAR SHOW =====*/
/* Validate If Constant Exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-sidebar");
  });
}

/*===== SIDEBAR HIDDEN =====*/
/* Validate If Constant Exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-sidebar");
  });
}


/*===== CLOSE SIDEBAR WHEN CLICKING A LINK =====*/
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-sidebar");
  });
});

// ============ SHARE WEB ============
const shareBtn = document.querySelector(".btn__share");

shareBtn.addEventListener("click", () => {
  shareLink();
});

function shareLink() {
  const shareUrl = window.location.href; // Get the current page URL
  if (navigator.share) {
    // If the browser supports the Web Share API
    navigator
      .share({
        title: "Check out this website",
        url: shareUrl,
      })
      .then(() => {
        console.log("Thanks for sharing!");
      })
      .catch((error) => {
        console.error("Error sharing:", error);
      });
  } else {
    // Fallback for browsers that don't support Web Share API
    alert(
      "Your browser does not support sharing functionality. Please copy the link manually."
    );
  }
}

// ========== DOWNLOAD RESUME =================
let resume = document.getElementById('resume');
resume.addEventListener('click',()=>{handleDownload()});

const handleDownload = () => {
  window.location.href = "";
};


/*=============== SKILLS TABS ===============*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContent = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContent.forEach((tabContents) => {
      tabContents.classList.remove("skills__active");
    });

    target.classList.add("skills__active");

    tabs.forEach((tab) => {
      tab.classList.remove("skills__active");
    });

    tab.classList.add("skills__active");
  });
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup(".work__container", {
  selectors: {
    target: ".work__card",
  },
  animation: {
    duration: 300,
  },
});

/*===== Link Active Work =====*/
const linkWork = document.querySelectorAll(".work__item");

function activeWork() {
  linkWork.forEach((l) => l.classList.remove("active-work"));
  this.classList.add("active-work");
}

linkWork.forEach((l) => l.addEventListener("click", activeWork));

/*===== Work Popup =====*/
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("work__button")) {
    togglePortfolioPopup();
    portfolioItemDetails(e.target.parentElement);
  }
});

function togglePortfolioPopup() {
  document.querySelector(".portfolio__popup").classList.toggle("open");
}

document
  .querySelector(".portfolio__popup-close")
  .addEventListener("click", togglePortfolioPopup);

function portfolioItemDetails(portfolioItem) {
  document.querySelector(".pp__thumbnail img").src =
    portfolioItem.querySelector(".work__img").src;
  document.querySelector(".portfolio__popup-subtitle span").innerHTML =
    portfolioItem.querySelector(".work__title").innerHTML;
  document.querySelector(".portfolio__popup-body").innerHTML =
    portfolioItem.querySelector(".portfolio__item-details").innerHTML;
}

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*=============== SWIPER TESTIMONIAL ===============*/
let swiper = new Swiper(".testimonials__container", {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 48,
    },
  },
});

/*=============== INPUT ANIMATION ===============*/
const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
// get all sections that an id defined
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  let scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}

/*=============== SHOW SCROLL UP ===============*/

// ======== CONTACT FORM =========
// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("sendMessageBtn").addEventListener("click", function () {
//       let name = document.getElementById("name").value.trim();
//       let email = document.getElementById("email").value.trim();
//       let phone = document.getElementById("phone").value.trim();
//       let message = document.getElementById("message").value.trim();

//       // Validate inputs
//       if (!name || !email || !phone || !message) {
//         alert("Please fill in all fields before sending.");
//         return;
//       }

//       // // Replace with your WhatsApp number (include country code, no `+`)
//       // let whatsappNumber = "9157945792";

//       // // Encode user inputs to prevent errors
//       // let whatsappURL = `https://wa.me/${whatsappNumber}?text=
//       //   Name: ${encodeURIComponent(name)}%0A
//       //   Email: ${encodeURIComponent(email)}%0A
//       //   Phone: ${encodeURIComponent(phone)}%0A
//       //   Message: ${encodeURIComponent(message)}`;

//       // // Open WhatsApp chat in a new tab
//       // window.open(whatsappURL, "_blank");


//     });
//   })

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("sendMessageBtn").addEventListener("click", function () {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let message = document.getElementById("message").value.trim();

    // Validate inputs
    if (!name || !email || !phone || !message) {
      alert("Please fill in all fields before sending.");
      return;
    }

    // Construct data object
    const data = {
      username: name,
      email: email,
      phone: phone,
      message: message
    };

    // Make POST request
    fetch("https://to-do-list-repository-1.onrender.com/contact_info/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // or response.text() if server doesn’t return JSON
      })
      .then(result => {
        alert(result.message || "Message sent successfully!");
        // Optionally reset the form
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("message").value = "";
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
        alert("There was an error sending your message. Please try again later.");
      });
  });
});

