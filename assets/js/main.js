/* ========== AUDIO PLAYER ========== */
const audioElement = document.getElementById('audioElement')
const audioPlayBtn = document.getElementById('audioPlayBtn')
const audioTime = document.getElementById('audioTime')
const audioProgressBar = document.getElementById('audioProgressBar')

if(audioElement && audioPlayBtn){
    // Tenta autoplay sem muted primeiro
    audioElement.muted = false
    const playPromise = audioElement.play()

    if(playPromise !== undefined){
        playPromise.then(() => {
            // Autoplay funcionou com som!
            audioPlayBtn.classList.add('playing')
        }).catch(() => {
            // Navegador bloqueou autoplay com som, tenta com muted
            audioElement.muted = true
            audioElement.play().then(() => {
                audioPlayBtn.classList.add('playing')
            }).catch(() => {
                // Navegador bloqueou completamente, usuário precisa clicar
            })
        })
    }

    audioPlayBtn.addEventListener('click', () => {
        if(audioElement.paused){
            // Se estava muted por causa do autoplay, remove o mute
            if(audioElement.muted){
                audioElement.muted = false
            }
            audioElement.play()
            audioPlayBtn.classList.add('playing')
        } else {
            audioElement.pause()
            audioPlayBtn.classList.remove('playing')
        }
    })

    audioElement.addEventListener('timeupdate', () => {
        const minutes = Math.floor(audioElement.currentTime / 60)
        const seconds = Math.floor(audioElement.currentTime % 60)
        audioTime.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds

        const progress = (audioElement.currentTime / audioElement.duration) * 100
        audioProgressBar.style.width = progress + '%'
    })

    audioElement.addEventListener('ended', () => {
        audioPlayBtn.classList.remove('playing')
        audioProgressBar.style.width = '0%'
        audioTime.textContent = '0:00'
    })
}

/* ========== DARK MODE TOGGLE ========== */
const themeToggle = document.getElementById('theme-toggle')
const darkMode = localStorage.getItem('dark-mode')

const enableDarkMode = () => {
    document.body.classList.add('dark-mode')
    localStorage.setItem('dark-mode', 'enabled')
}

const disableDarkMode = () => {
    document.body.classList.remove('dark-mode')
    localStorage.setItem('dark-mode', 'disabled')
}

if (darkMode === 'enabled') {
    enableDarkMode()
}

if(themeToggle){
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode')
        isDark ? disableDarkMode() : enableDarkMode()
    })
}

/* SHOW MENU */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* MOSTRAR MENU - MENU SHOW */
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* ESCONDE MENU */
if(navClose){
    navClose.addEventListener('click', () => {  
        navMenu.classList.remove('show-menu')
    })
}

/* esconder menu mobile */
const navLink = document.querySelectorAll('.nav__link')
const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* adiciona BLUR ao HEADER */
const blurHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('blur-header')
                      : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/* SHOW SCROLL UP */
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/* SCROLL SECTION ACTIVE LINK */
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            if(sectionsClass){
                sectionsClass.classList.add('active-link')
            }
        }else{
            if(sectionsClass){
                sectionsClass.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* SCROLL REVEAL ANIMATIONS */
const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 2500,
    delay: 400,
})

// Home
sr.reveal('.home__data, .home__social', {origin: 'top'})
sr.reveal('.home__image', {origin: 'bottom'})

// Dores
sr.reveal('.dores__data', {origin: 'left'})
sr.reveal('.dores__card', {interval: 150})

// Desejos
sr.reveal('.desejos__data', {origin: 'right'})
sr.reveal('.desejos__item', {interval: 100})

// Sobre
sr.reveal('.sobre__data', {origin: 'left'})
sr.reveal('.sobre__image', {origin: 'right'})

// Conteudo
sr.reveal('.conteudo__card', {interval: 120})
sr.reveal('.conteudo__exemplo-card', {interval: 150})

// Beneficios
sr.reveal('.beneficios__card', {interval: 100})

// Publico
sr.reveal('.publico__card', {interval: 120})

// Mentores
sr.reveal('.mentores__card', {interval: 150})

// Gamificação
sr.reveal('.gamificacao__step', {interval: 150})
sr.reveal('.gamificacao__placa', {interval: 100})

// Investimento
sr.reveal('.investimento__card', {origin: 'bottom'})

// Contato
sr.reveal('.contato__description', {origin: 'left'})
sr.reveal('.contato__buttons', {origin: 'right'})

// Footer
sr.reveal('.footer__container, .footer__social, .footer__copy', {interval: 100})