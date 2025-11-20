// ===== ЯДЕРНЫЕ ВЗРЫВЫ И КОСМИЧЕСКОЕ БЕЗУМИЕ =====

class CrazyExplosions {
    constructor() {
        this.isActive = false;
        this.intervals = [];
        this.elements = [];
        this.init();
    }

    init() {
        console.log('💥 Система взрывов загружена!');
    }

    enable() {
        if (this.isActive) return;
        this.isActive = true;
        
        console.log('🚀💥 ВКЛЮЧАЕМ РЕЖИМ ЯДЕРНОГО БЕЗУМИЯ!');
        
        // Запускаем все эффекты взрывов
        this.startNuclearFlashes();
        this.startColorExplosions();
        this.startScreenShake();
        this.startElementRotation();
        this.startParticleExplosions();
        this.startBackgroundVortex();
        this.startTextExplosions();
        this.startSoundBombardment();
        
        // Мега-эффекты
        this.startEarthquake();
        this.startBlackHoles();
    }

    disable() {
        if (!this.isActive) return;
        this.isActive = false;
        
        console.log('🛑 Выключаем ядерное безумие');
        
        // Останавливаем все
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
        
        // Удаляем элементы
        this.elements.forEach(element => {
            if (element.parentNode) element.parentNode.removeChild(element);
        });
        this.elements = [];
        
        this.restoreSanity();
    }

    // ЯДЕРНЫЕ ВСПЫШКИ
    startNuclearFlashes() {
        const flashInterval = setInterval(() => {
            if (!this.isActive) return;
            
            // 80% шанс на вспышку
            if (Math.random() > 0.2) {
                this.createNuclearFlash();
            }
        }, 100); // ОЧЕНЬ ЧАСТО!
        
        this.intervals.push(flashInterval);
    }

    createNuclearFlash() {
        const flash = document.createElement('div');
        
        const colors = [
            'radial-gradient(circle, #ff0000 0%, #ff6b00 20%, #ffd000 40%, transparent 60%)',
            'radial-gradient(circle, #00ff00 0%, #00ff88 20%, #00ffee 40%, transparent 60%)',
            'radial-gradient(circle, #0000ff 0%, #8800ff 20%, #ff00ff 40%, transparent 60%)',
            'radial-gradient(circle, #ffff00 0%, #ff8800 20%, #ff0000 40%, transparent 60%)',
            'radial-gradient(circle, #ff00ff 0%, #ff0088 20%, #ff0000 40%, transparent 60%)',
            'radial-gradient(circle, #00ffff 0%, #0088ff 20%, #0000ff 40%, transparent 60%)'
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const size = 30 + Math.random() * 70;
        
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${randomColor};
            background-position: ${randomX}% ${randomY}%;
            background-size: ${size}% ${size}%;
            pointer-events: none;
            z-index: 9995;
            opacity: 0;
            mix-blend-mode: screen;
            filter: brightness(2) contrast(2);
        `;
        
        document.body.appendChild(flash);
        this.elements.push(flash);
        
        this.animateNuclearFlash(flash);
    }

    animateNuclearFlash(flash) {
        let opacity = 0;
        const duration = 100 + Math.random() * 200; // Очень быстро!
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                // Мгновенная вспышка!
                if (progress < 0.1) {
                    opacity = progress / 0.1;
                } else if (progress < 0.3) {
                    opacity = 1;
                } else {
                    opacity = 1 - ((progress - 0.3) / 0.7);
                }
                
                flash.style.opacity = opacity * 0.8; // ОЧЕНЬ ЯРКО!
                requestAnimationFrame(animate);
            } else {
                if (flash.parentNode) flash.parentNode.removeChild(flash);
                this.elements = this.elements.filter(el => el !== flash);
            }
        };
        
        animate();
    }

    // ВЗРЫВЫ ЦВЕТОВ
    startColorExplosions() {
        const explosionInterval = setInterval(() => {
            if (!this.isActive) return;
            if (Math.random() > 0.5) return;
            
            this.createColorExplosion();
        }, 200);
        
        this.intervals.push(explosionInterval);
    }

    createColorExplosion() {
        const explosion = document.createElement('div');
        
        const hue1 = Math.random() * 360;
        const hue2 = (hue1 + 120) % 360;
        const hue3 = (hue1 + 240) % 360;
        
        explosion.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                    hsl(${hue1}, 100%, 50%) 0%,
                    hsl(${hue2}, 100%, 50%) 30%,
                    hsl(${hue3}, 100%, 50%) 60%,
                    transparent 80%
                ),
                radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                    hsl(${hue2}, 100%, 50%) 0%,
                    hsl(${hue3}, 100%, 50%) 30%,
                    hsl(${hue1}, 100%, 50%) 60%,
                    transparent 80%
                );
            pointer-events: none;
            z-index: 9994;
            opacity: 0;
            mix-blend-mode: difference;
            filter: brightness(3);
        `;
        
        document.body.appendChild(explosion);
        this.elements.push(explosion);
        
        this.animateColorExplosion(explosion);
    }

    animateColorExplosion(explosion) {
        let opacity = 0;
        const duration = 300;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                opacity = Math.sin(progress * Math.PI); // Плавное появление и исчезновение
                explosion.style.opacity = opacity * 0.6;
                explosion.style.transform = `scale(${1 + progress * 0.5})`;
                requestAnimationFrame(animate);
            } else {
                if (explosion.parentNode) explosion.parentNode.removeChild(explosion);
                this.elements = this.elements.filter(el => el !== explosion);
            }
        };
        
        animate();
    }

    // ТРЯСКА ЭКРАНА
    startScreenShake() {
        let shakeIntensity = 0;
        
        const shakeInterval = setInterval(() => {
            if (!this.isActive) return;
            
            // Случайная интенсивность тряски
            shakeIntensity = 5 + Math.random() * 15;
            
            const shakeX = (Math.random() - 0.5) * shakeIntensity;
            const shakeY = (Math.random() - 0.5) * shakeIntensity;
            const rotate = (Math.random() - 0.5) * shakeIntensity * 0.5;
            
            document.body.style.transform = `
                translate(${shakeX}px, ${shakeY}px)
                rotate(${rotate}deg)
            `;
            
        }, 50); // ОЧЕНЬ ЧАСТАЯ ТРЯСКА!
        
        this.intervals.push(shakeInterval);
    }

    // ВРАЩЕНИЕ ВСЕХ ЭЛЕМЕНТОВ
    startElementRotation() {
        const rotationInterval = setInterval(() => {
            if (!this.isActive) return;
            
            const elements = document.querySelectorAll('*'); // ВСЕ элементы!
            
            elements.forEach(element => {
                if (Math.random() > 0.95) { // 5% шанс
                    const rotation = (Math.random() - 0.5) * 360;
                    const scale = 0.5 + Math.random() * 1.5;
                    
                    element.style.transform = `
                        rotate(${rotation}deg)
                        scale(${scale})
                    `;
                    element.style.transition = 'transform 0.1s';
                    
                    // Возвращаем обратно
                    setTimeout(() => {
                        if (this.isActive) {
                            element.style.transform = '';
                        }
                    }, 100);
                }
            });
        }, 100);
        
        this.intervals.push(rotationInterval);
    }

    // ВЗРЫВЫ ЧАСТИЦ
    startParticleExplosions() {
        const particleInterval = setInterval(() => {
            if (!this.isActive) return;
            if (Math.random() > 0.3) return;
            
            this.createParticleExplosion();
        }, 150);
        
        this.intervals.push(particleInterval);
    }

    createParticleExplosion() {
        const particleCount = 20 + Math.floor(Math.random() * 30);
        const centerX = Math.random() * window.innerWidth;
        const centerY = Math.random() * window.innerHeight;
        
        for (let i = 0; i < particleCount; i++) {
            this.createParticle(centerX, centerY);
        }
    }

    createParticle(centerX, centerY) {
        const particle = document.createElement('div');
        
        const symbols = ['💥', '⭐', '✨', '🔴', '🟢', '🔵', '🟡', '🟣', '⚡', '🎆', '🌠', '💫'];
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 300;
        const size = 1 + Math.random() * 3;
        
        particle.textContent = randomSymbol;
        particle.style.cssText = `
            position: fixed;
            font-size: ${size}rem;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 9996;
            opacity: 1;
            transform: translate(-50%, -50%);
            animation: particleBoom 1s ease-out forwards;
            filter: brightness(2) hue-rotate(${Math.random() * 360}deg);
        `;
        
        // Динамическое создание анимации
        const animationName = `particleBoom_${Date.now()}_${Math.random()}`;
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ${animationName} {
                0% {
                    transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: 
                        translate(
                            ${centerX + Math.cos(angle) * distance}px, 
                            ${centerY + Math.sin(angle) * distance}px
                        ) 
                        scale(0) 
                        rotate(${360 + Math.random() * 360}deg);
                    opacity: 0;
                }
            }
        `;
        
        document.head.appendChild(style);
        particle.style.animationName = animationName;
        
        document.body.appendChild(particle);
        this.elements.push(particle);
        this.elements.push(style);
        
        setTimeout(() => {
            if (particle.parentNode) particle.parentNode.removeChild(particle);
            if (style.parentNode) style.parentNode.removeChild(style);
            this.elements = this.elements.filter(el => el !== particle && el !== style);
        }, 1000);
    }

    // ВОРОНКА НА ФОНЕ
    startBackgroundVortex() {
        const vortex = document.createElement('div');
        vortex.className = 'crazy-vortex';
        
        vortex.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 200vmax;
            height: 200vmax;
            background: conic-gradient(
                from 0deg,
                #ff0000, #ff6b00, #ffd000, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000
            );
            pointer-events: none;
            z-index: -4;
            opacity: 0.3;
            mix-blend-mode: overlay;
            transform: translate(-50%, -50%);
            animation: vortexSpin 2s linear infinite;
        `;
        
        document.body.appendChild(vortex);
        this.elements.push(vortex);
    }

    // ВЗРЫВЫ ТЕКСТА
    startTextExplosions() {
        const textInterval = setInterval(() => {
            if (!this.isActive) return;
            
            const texts = document.querySelectorAll('h1, h2, h3, p, span, div');
            
            texts.forEach(text => {
                if (Math.random() > 0.1) { // 2% шанс
                    // Взрыв текста!
                    text.style.transform = `
                        scale(${1 + Math.random()})
                        rotate(${(Math.random() - 0.5) * 180}deg)
                        skew(${(Math.random() - 0.5) * 30}deg, ${(Math.random() - 0.5) * 30}deg)
                    `;
                    text.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
                    text.style.textShadow = `
                        0 0 20px currentColor,
                        0 0 40px currentColor,
                        0 0 60px currentColor
                    `;
                    text.style.transition = 'all 0.1s';
                    
                    setTimeout(() => {
                        if (this.isActive) {
                            text.style.transform = '';
                            text.style.color = '';
                            text.style.textShadow = '';
                        }
                    }, 200);
                }
            });
        }, 50);
        
        this.intervals.push(textInterval);
    }

    // ЗВУКОВАЯ БОМБАРДИРОВКА
    startSoundBombardment() {
        if (!window.soundManager) return;
        
        const soundInterval = setInterval(() => {
            if (!this.isActive) return;
            
            // 50% шанс на звук
            if (Math.random() > 0.5) {
                const sounds = ['explosion', 'flash', 'magic', 'sparkle', 'boom'];
                const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
                
                window.soundManager.play(randomSound, {
                    volume: 0.2 + Math.random() * 0.3,
                    rate: 0.5 + Math.random() * 1.5
                });
            }
        }, 200);
        
        this.intervals.push(soundInterval);
    }

    // МЕГА-ТРЯСКА (ЗЕМЛЕТРЯСЕНИЕ)
    startEarthquake() {
        const earthquakeInterval = setInterval(() => {
            if (!this.isActive) return;
            
            // Сильная тряска для всего body
            const shakeX = (Math.random() - 0.5) * 30;
            const shakeY = (Math.random() - 0.5) * 30;
            const rotate = (Math.random() - 0.5) * 10;
            
            document.body.style.transform = `
                translate(${shakeX}px, ${shakeY}px)
                rotate(${rotate}deg)
                scale(${0.9 + Math.random() * 0.2})
            `;
            
        }, 80);
        
        this.intervals.push(earthquakeInterval);
    }

    // ЧЁРНЫЕ ДЫРЫ
    startBlackHoles() {
        const blackHoleInterval = setInterval(() => {
            if (!this.isActive) return;
            if (Math.random() > 0.8) return;
            
            this.createBlackHole();
        }, 1000);
        
        this.intervals.push(blackHoleInterval);
    }

    createBlackHole() {
        const blackHole = document.createElement('div');
        
        blackHole.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, #000000 0%, #330066 30%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            opacity: 0;
            animation: blackHoleSuck 3s ease-in forwards;
            mix-blend-mode: multiply;
        `;
        
        document.body.appendChild(blackHole);
        this.elements.push(blackHole);
        
        setTimeout(() => {
            if (blackHole.parentNode) blackHole.parentNode.removeChild(blackHole);
            this.elements = this.elements.filter(el => el !== blackHole);
        }, 3000);
    }

    restoreSanity() {
        // Возвращаем всё на место
        document.body.style.transform = '';
        
        // Возвращаем все элементы
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            element.style.transform = '';
            element.style.color = '';
            element.style.textShadow = '';
            element.style.transition = '';
        });
    }
}

// Глобальный экземпляр
window.crazyExplosions = new CrazyExplosions();