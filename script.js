// Tunggu hingga DOM sepenuhnya dimuat
document.addEventListener("DOMContentLoaded", () => {
  // Fungsi untuk menu toggle pada tampilan mobile
  const menuToggle = document.querySelector(".menu-toggle")
  const headerRight = document.querySelector(".header-right")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      headerRight.classList.toggle("active")

      // Ubah teks tombol berdasarkan status menu
      if (headerRight.classList.contains("active")) {
        menuToggle.textContent = "Tutup"
      } else {
        menuToggle.textContent = "Menu"
      }
    })
  }

  // Animasi scroll halus untuk navigasi
  const navLinks = document.querySelectorAll("nav a")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      // Hanya proses link yang mengarah ke ID di halaman yang sama
      const targetId = this.getAttribute("href")

      if (targetId.startsWith("#") && targetId.length > 1) {
        event.preventDefault()

        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          // Scroll halus ke elemen target
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Offset untuk header
            behavior: "smooth",
          })

          // Tutup menu mobile jika terbuka
          if (headerRight.classList.contains("active")) {
            menuToggle.click()
          }
        }
      }
    })
  })

  // Filter galeri
  const filterButtons = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Hapus kelas active dari semua tombol
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Tambahkan kelas active ke tombol yang diklik
      button.classList.add("active")

      // Dapatkan nilai filter
      const filterValue = button.getAttribute("data-filter")

      // Filter item galeri
      galleryItems.forEach((item) => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // Validasi form kontak
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault()

      const nameInput = document.getElementById("name")
      const emailInput = document.getElementById("email")
      const messageInput = document.getElementById("message")

      const nameValue = nameInput.value.trim()
      const emailValue = emailInput.value.trim()
      const messageValue = messageInput.value.trim()

      // Validasi sederhana
      if (nameValue === "") {
        alert("Silakan masukkan nama Anda.")
        nameInput.focus()
        return
      }

      if (!isValidEmail(emailValue)) {
        alert("Silakan masukkan alamat email yang valid.")
        emailInput.focus()
        return
      }

      if (messageValue === "") {
        alert("Silakan masukkan pesan Anda.")
        messageInput.focus()
        return
      }

      // Simulasi pengiriman form
      alert("Terima kasih! Pesan Anda telah dikirim.")
      contactForm.reset()
    })
  }

  // Validasi form newsletter
  const newsletterForm = document.getElementById("newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault()

      const emailInput = document.getElementById("newsletter-email")
      const emailValue = emailInput.value.trim()

      // Validasi email sederhana
      if (!isValidEmail(emailValue)) {
        alert("Silakan masukkan alamat email yang valid.")
        emailInput.focus()
        return
      }

      // Simulasi pengiriman form
      alert("Terima kasih telah berlangganan newsletter kami!")
      newsletterForm.reset()
    })
  }

  // Fungsi untuk validasi email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Efek parallax sederhana untuk elemen geometris
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY
    const geometricElements = document.querySelectorAll(".geometric-elements > div")

    geometricElements.forEach((element) => {
      const speed = 0.05
      const yPos = -(scrollPosition * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  })

  // Animasi fade-in saat scroll
  const fadeElements = document.querySelectorAll(".feature-card, .gallery-item, .value-content, .cta-text")

  function checkFade() {
    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("fade-in")
      }
    })
  }

  // Tambahkan kelas CSS untuk animasi
  const style = document.createElement("style")
  style.innerHTML = `
    .fade-in {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  `
  document.head.appendChild(style)

  // Jalankan fungsi saat halaman dimuat dan saat scroll
  window.addEventListener("scroll", checkFade)
  window.addEventListener("load", checkFade)
})
