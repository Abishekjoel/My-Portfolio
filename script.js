document.addEventListener("DOMContentLoaded", function () {
  // === Theme Persistence ===
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  }

  // === Smooth Scroll for Nav Links ===
  const navLinks = document.querySelectorAll("nav ul li a");
  const headerOffset = 80;

  navLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    });
  });

  // === Typed Text Animation ===
  var typed = new Typed(".auto-text", {
    strings: ["FullStack Dev", "Designer"],
    typeSpeed: 150,
    backSpeed: 150,
    loop: true
  });

  // === Carousel Slide Controls ===
  document.querySelectorAll('.project-card').forEach(card => {
    const inner = card.querySelector('.carousel-inner');
    const slides = inner.querySelectorAll('img');
    const prev = card.querySelector('.prev');
    const next = card.querySelector('.next');
    let index = 0;

    function showSlide(i) {
      index = (i + slides.length) % slides.length;
      inner.style.transform = `translateX(-${index * 100}%)`;
    }

    prev.addEventListener('click', () => showSlide(index - 1));
    next.addEventListener('click', () => showSlide(index + 1));
  });

  // === Sidebar Visibility Based on Width ===
  const sidebar = document.getElementById('sidebarMenu');
  if (window.innerWidth >= 769 && sidebar) {
    sidebar.classList.remove('active');
  }
});

// === Theme Toggle Function with Persistence ===
function toggleTheme() {
  document.body.classList.toggle("light-mode");

  const icon = document.querySelector('.theme-toggle i');
  const isLight = document.body.classList.contains("light-mode");

  if (icon) {
    icon.classList.toggle('fa-moon', !isLight);
    icon.classList.toggle('fa-sun', isLight);
  }

  // Save theme preference
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

// === Sidebar Toggle ===
function toggleMenu() {
  document.getElementById("sidebarMenu").classList.toggle("active");
}

// === Scroll to Chat Section ===
function scrollToChat() {
  document.querySelector(".chatss").scrollIntoView({ behavior: 'smooth' });
}



document.getElementById("chat-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const form = this;

    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Message sent successfully!");
            form.reset(); // 🔄 Clears all fields
        } else {
            alert("Error sending message: " + data.message);
        }
    })
    .catch(error => {
        alert("Something went wrong!");
        console.error(error);
    });
});

