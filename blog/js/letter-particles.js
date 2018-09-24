class LetterParticlesGenerator {
  constructor(targetID, numParticles = 80) {
    this.numParticles = numParticles;
    this.targetID = targetID;
    this.particles = [];
    this.currentX = 0;
    this.currentY = 0;
    this.particleCounter = 0;
    this.counter = 0;
    this.init();
  }

  init() {
    this.setupEvent();
    this.createParticles();
  }

  setupEvent() {
    window.addEventListener('load', this.onPageLoad.bind(this), false);
  }

  createParticles() {
    for (var i = 0; i < this.numParticles; i++) {
      var particleDiv = document.createElement('div');
      particleDiv.classList.add('letter-particle');
      this.particles.push({isActive: false, element: particleDiv});
      document.getElementById(this.targetID).appendChild(particleDiv);
    }
  }

  onPageLoad(e) {
    requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    if (this.counter == this.numParticles*5) {
      this.counter = 0;
    }
    if (this.particleCounter == this.numParticles) {
      this.particleCounter = 0;
    }

    if (this.counter % 3 == 0 && !this.particles[this.particleCounter].isActive) {
      this.animateParticle(this.particles[this.particleCounter]);
      this.particleCounter++;
    }

    this.counter++;
    requestAnimationFrame(this.loop.bind(this));
  }

  animateParticle(particle) {
    particle.isActive = true;
    var angle =  Math.random() * Math.PI/2;
    var length = Math.random() * (180 - 100) + 250;
    var xpos = (Math.cos(angle) * length) + this.currentX;
    var ypos = (Math.sin(angle) * length) + this.currentY;
    var duration = Math.random() * (2.5 - 1.0) + 4;

    var letter = this.getRandomLetter();
    var fontSize = Math.floor(Math.random() * (40 - 10) + 10);
    var rotation = Math.floor(Math.random() * (1440 - 360) + 360);
    particle.element.innerHTML = letter;

    TweenMax.set(particle.element, {
      x: this.currentX,
      y: this.currentY,
      fontSize: `${fontSize}px`,
      opacity: 1
    });

    TweenMax.to(particle.element, duration, {
      x: xpos,
      y: ypos,
      opacity: 0,
      rotation: rotation,
      onCompleteParams: [particle],
      onComplete: function(p) {
        p.isActive = false;
      },
    });

  }

  getRandomLetter() {
    var letters = "REVOLUCION";
    var letter = letters.charAt(this.particleCounter % letters.length);
    return letter;
  }
}

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (isChrome) {
  CSSPlugin.defaultForce3D = false;
}

var particlesGenerator1 = new LetterParticlesGenerator('particle-generator-1');
var particlesGenerator2 = new LetterParticlesGenerator('particle-generator-2');

