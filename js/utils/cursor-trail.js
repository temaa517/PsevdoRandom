// ===== СЛЕДЫ КУРСОРА ДЛЯ БЕЗУМНОГО РЕЖИМА =====

function createCursorTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    
    // Случайный цвет
    const hue = Math.random() * 360;
    trail.style.background = `hsl(${hue}, 100%, 50%)`;
    
    // Случайный размер
    const size = 10 + Math.random() * 20;
    trail.style.width = size + 'px';
    trail.style.height = size + 'px';
    
    // Позиционирование
    trail.style.left = x - size/2 + 'px';
    trail.style.top = y - size/2 + 'px';
    
    document.body.appendChild(trail);
    
    // Автоудаление через время
    setTimeout(() => {
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
    }, 500);
}