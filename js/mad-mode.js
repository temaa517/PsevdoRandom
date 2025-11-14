// ===== БЕЗУМНЫЙ РЕЖИМ - ОСНОВНАЯ ЛОГИКА =====

class MadMode {
    constructor() {
        this.isActive = false;
        this.madButton = document.getElementById('mad-mode');
        this.crazyObjects = [];
        this.init();
    }

    init() {
        this.madButton.addEventListener('click', () => this.toggle());
        console.log('🎩 Безумный режим загружен и готов к упоротости!');
    }

    toggle() {
        if (!this.isActive) {
            this.enable();
        } else {
            this.disable();
        }
    }

    enable() {
        this.isActive = true;
        document.body.classList.add('ultra-mad');
        this.madButton.textContent = 'СПАСИТЕ! ВЫКЛЮЧИТЕ!';
        
        // Включаем все безумные функции
        this.accelerateFloatingObjects();
        this.addCrazyObjects();
        this.transformText();
        this.startCursorTrails();
        this.playMadSounds();
        
        // Предупреждение о безумии
        setTimeout(() => {
            this.showMadAlert();
        }, 500);
    }

    disable() {
        this.isActive = false;
        document.body.classList.remove('ultra-mad');
        this.madButton.textContent = 'БЕЗУМНЫЙ РЕЖИМ';
        
        // Выключаем все безумные функции
        this.removeCrazyObjects();
        this.normalizeFloatingObjects();
        this.restoreText();
        this.stopCursorTrails();
        
        // Сообщение о возврате к нормальности
        this.showNormalAlert();
    }
    
    disableBeautifulCursor() {
        // Временно скрываем красивый курсор
        if (window.cursorEffects) {
            window.cursorEffects.hide();
        }
    }

    enableBeautifulCursor() {
        // Показываем красивый курсор обратно
        if (window.cursorEffects) {
            window.cursorEffects.show();
        }
    }

    enableMadCursor() {
        // Включаем безумный курсор (дрожание и т.д.)
        document.body.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><text x="8" y="24" font-size="20">🪄</text></svg>'), auto`;
    }

    disableMadCursor() {
        // Возвращаем кастомный курсор
        document.body.style.cursor = 'none';
    }

    accelerateFloatingObjects() {
        document.querySelectorAll('.floating-object').forEach(obj => {
            obj.style.animationDuration = '2s';
        });
    }

    normalizeFloatingObjects() {
        document.querySelectorAll('.floating-object').forEach(obj => {
            obj.style.animationDuration = '20s';
            obj.style.opacity = '0.1';
        });
    }

    addCrazyObjects() {
        const crazyEmojis = ['🚽', '🧻', '🍌', '🪣', '🔥', '💥', '🤪', '👻', '💩', '🎪'];
        
        crazyEmojis.forEach((emoji, index) => {
            const obj = document.createElement('div');
            obj.className = 'floating-object crazy';
            obj.textContent = emoji;
            obj.style.left = Math.random() * 100 + '%';
            obj.style.top = Math.random() * 100 + '%';
            obj.style.animation = `crazyFloat ${1 + Math.random() * 3}s infinite linear`;
            obj.style.fontSize = (2 + Math.random() * 2) + 'rem';
            obj.style.zIndex = '1000';
            
            document.querySelector('.mad-background').appendChild(obj);
            this.crazyObjects.push(obj);
        });
    }

    removeCrazyObjects() {
        this.crazyObjects.forEach(obj => {
            if (obj && obj.parentNode) {
                obj.parentNode.removeChild(obj);
            }
        });
        this.crazyObjects = [];
    }

    transformText() {
        const transformations = [
            text => text.toUpperCase(),
            text => text.split('').map(char => Math.random() > 0.8 ? char + '!' : char).join(''),
            text => text.replace(/[а-я]/gi, char => Math.random() > 0.5 ? char : char.toUpperCase()),
            text => text + ' 🤪',
            text => 'УПОРОТЫЙ: ' + text,
            text => text.split('').reverse().join('')
        ];
        
        document.querySelectorAll('h1, h2, h3, p, span, .filter-btn').forEach(element => {
            if (Math.random() > 0.4 && element.textContent.length > 3) {
                const original = element.textContent;
                element.setAttribute('data-original-mad', original);
                
                const transform = transformations[Math.floor(Math.random() * transformations.length)];
                element.textContent = transform(original);
            }
        });
    }

    restoreText() {
        document.querySelectorAll('[data-original-mad]').forEach(element => {
            element.textContent = element.getAttribute('data-original-mad');
            element.removeAttribute('data-original-mad');
        });
    }

    startCursorTrails() {
        this.cursorTrailHandler = (e) => {
            if (Math.random() > 0.7) {
                createCursorTrail(e.pageX, e.pageY);
            }
        };
        document.addEventListener('mousemove', this.cursorTrailHandler);
    }

    stopCursorTrails() {
        if (this.cursorTrailHandler) {
            document.removeEventListener('mousemove', this.cursorTrailHandler);
        }
        document.querySelectorAll('.cursor-trail').forEach(trail => trail.remove());
    }

    playMadSounds() {
        this.clickHandler = () => {
            if (Math.random() > 0.5) {
                // В будущем можно добавить реальные звуки
                console.log('🔊 Безумный звук!');
            }
        };
        document.addEventListener('click', this.clickHandler);
    }

    showMadAlert() {
        const alert = document.createElement('div');
        alert.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff00ff, #00ffff);
            color: white;
            padding: 2rem;
            border-radius: 20px;
            border: 5px dashed #39ff14;
            font-family: 'Comic Neue', cursive;
            font-size: 1.5rem;
            text-align: center;
            z-index: 10000;
            animation: madShake 0.3s infinite;
        `;
        alert.innerHTML = '🚨 ВКЛЮЧЕН РЕЖИМ УПОРОТОСТИ! 🚨<br>Держитесь крепче!';
        
        document.body.appendChild(alert);
        setTimeout(() => {
            document.body.removeChild(alert);
        }, 3000);
    }

    showNormalAlert() {
        alert('😅 Безумие окончено! Можете открывать глаза.');
    }
}

// Инициализация безумного режима при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.madMode = new MadMode();
});