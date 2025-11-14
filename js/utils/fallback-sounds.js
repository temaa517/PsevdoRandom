// ===== ЗАГЛУШКИ ДЛЯ СЛУЧАЯ ОТСУТСТВИЯ ЗВУКОВЫХ ФАЙЛОВ =====

// Эта функция создаёт базовые звуки через Web Audio API
function createFallbackSounds() {
    if (!window.soundManager) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Простой звук клика
    function createClickSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    // Переопределяем метод play для использования заглушек
    const originalPlay = window.soundManager.play;
    window.soundManager.play = function(name, options) {
        // Если звук не загружен, используем заглушку
        if (!this.sounds.get(name) || !this.sounds.get(name).src) {
            console.log(`🎵 Используется заглушка для звука: ${name}`);
            
            switch(name) {
                case 'click':
                    createClickSound();
                    break;
                case 'spell':
                    // Другой тип звука для заклинания
                    setTimeout(createClickSound, 50);
                    break;
            }
            return;
        }
        
        // Иначе используем оригинальный звук
        originalPlay.call(this, name, options);
    };
}

// Запускаем после загрузки soundManager
setTimeout(createFallbackSounds, 1000);