const canvas = document.getElementById('canvas1')
// const ctx = canvas.getContext('2d')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let particlesArray = []
const numberOfParticles = 300
let hue = 0

// measure title element
let titleElement = document.getElementById('title1')
let titleMeasurement = titleElement.getBoundingClientRect()
let title = {
  x: titleMeasurement.left, 
  y: titleMeasurement.top, 
  width: titleMeasurement.width, 
  height: 10
}

class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.size = Math.random() * 15 + 1
    this.weight = Math.random() * 1 + 1
    this.directionX = -2
    // this.color = 'hsl(' + hue + ', 100%, 50%)'
    // this.speedX = Math.random() * 3 - 1.5
    // this.speedY = Math.random() * 3 - 1.5
  }
  update() {
    if(this.y > canvas.height) {
      this.y = 0 - this.size
      this.weight = Math.random() * 1 + 1
      this.x = Math.random() * canvas.width * 1.3
    }
    this.weight += 0.05
    this.y += this.weight
    this.x += this.directionX

    // check for collision between each particle and title element
    if(
      this.x < title.x + title.width &&
      this.x + this.size > title.x &&
      this.y < title.y + title.height &&
      this.y + this.size > title.y
    ) {
      this.y -= 3
      // this.y += Math.random() * 2 + 1
      this.weight *= -0.5
    }
  }

  draw() {
    ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)'
    // ctx.strokeStyle = 'red'
    // ctx.lineWidth = 10
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
    // ctx.stroke()
  }
}

function init() {
  particlesArray = []
  for(let i = 0; i< numberOfParticles; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    particlesArray.push(new Particle(x, y))
  }
}
init()

// function handleParticles() {
//   for(let i = 0; i < particlesArray.length; i++) {
//     particlesArray[i].update()
//     particlesArray[i].draw()
    
//     for(let j = i; j < particlesArray.length; j++) {
//       const dx = particlesArray[i].x - particlesArray[j].x
//       const dy = particlesArray[i].y - particlesArray[j].y
//       const distance = Math.sqrt(dx * dx + dy * dy)
//       if(distance < 100) {
//         ctx.beginPath()
//         ctx.strokeStyle = particlesArray[i].color
//         ctx.lineWidth = 0.2
//         ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
//         ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
//         ctx.stroke()
//       }
//     }

//     if(particlesArray[i].size <= 0.3) {
//       particlesArray.splice(i, 1)
//       i--
//     }
//   }
// }

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  for(let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update()
    particlesArray[i].draw()
  }
  hue++
  requestAnimationFrame(animate)
}
animate()

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  titleMeasurement = titleElement.getBoundingClientRect()
  title = {
    x: titleMeasurement.left, 
    y: titleMeasurement.top, 
    width: titleMeasurement.width, 
    height: 10
  }
  init()
})





