// app/javascript/controllers/landing_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.initNavbar()
    this.initScrollReveal()
    this.initSmoothScroll()
    this.initStatsAnimation()
    console.log('connected')
  }

  initNavbar() {
    const navbar = document.querySelector('.navbar-modern')
    if (!navbar) return

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled')
      } else {
        navbar.classList.remove('scrolled')
      }
    })
  }

  initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal')
    
    // Add hidden class to all elements on page load
    revealElements.forEach(element => {
      element.classList.add('hidden')
    })
    
    const revealOnScroll = () => {
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.remove('hidden')
          element.classList.add('revealed')
        }
      })
    }

    if (revealElements.length > 0) {
      window.addEventListener('scroll', revealOnScroll)
      revealOnScroll() // Check on load
    }
  }

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href')
        if (href !== '#' && href !== '') {
          e.preventDefault()
          const target = document.querySelector(href)
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }
        }
      })
    })
  }

  initStatsAnimation() {
    let statsAnimated = false
    const statsSection = document.querySelector('.stats')
    if (!statsSection) return
    
    const animateStats = () => {
      if (statsAnimated) return
      
      const statNumbers = document.querySelectorAll('.stat-number')
      const statsSectionTop = statsSection.getBoundingClientRect().top
      
      if (statsSectionTop < window.innerHeight - 200) {
        statsAnimated = true
        statNumbers.forEach(stat => {
          const text = stat.textContent
          const hasPlus = text.includes('+')
          const hasPercent = text.includes('%')
          const number = parseInt(text.replace(/[^0-9]/g, ''))
          
          let current = 0
          const increment = number / 50
          const timer = setInterval(() => {
            current += increment
            if (current >= number) {
              current = number
              clearInterval(timer)
            }
            
            let displayText = Math.floor(current).toLocaleString()
            if (hasPlus) displayText += '+'
            if (hasPercent) displayText += '%'
            if (text.includes('K')) displayText = Math.floor(current) + 'K+'
            if (text.includes('M')) displayText = Math.floor(current) + 'M+'
            
            stat.textContent = displayText
          }, 30)
        })
      }
    }

    window.addEventListener('scroll', animateStats)
    animateStats()
  }
}