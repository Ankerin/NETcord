export default function animateCanvas() {
    const canvas = document.getElementById("animated-grid");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    let particles = [];
    const particleCount = 300;
    const maxLineDistance = 100;
  
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 2;
        this.dx = (Math.random() - 0.5) * 1;
        this.dy = (Math.random() - 0.5) * 1;
      }
  
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fill();
      }
  
      update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x > canvas.width || this.x < 0) this.dx *= -1;
        if (this.y > canvas.height || this.y < 0) this.dy *= -1;
        this.draw();
      }
    }
  
    function init() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
  
    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxLineDistance) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxLineDistance})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => particle.update());
      connectParticles();
      requestAnimationFrame(animate);
    }
  
    init();
    animate();
}  