const matrixCanvas = document.querySelector('.matrix-canvas');
if (matrixCanvas) {
  const ctx = matrixCanvas.getContext('2d');
  let width = 0;
  let height = 0;
  let columns = 0;
  let rows = 0;
  let drops = [];
  const fontSize = 14;
  const columnWidth = 14;
  const characters = ['0', '1'];

  function randomChar() {
    return characters[Math.floor(Math.random() * characters.length)];
  }

  function createDrops() {
    return Array.from({ length: columns }, () => ({
      y: Math.random() * height - height,
      speed: fontSize * (0.4 + Math.random() * 0.8),
      length: 20 + Math.floor(Math.random() * 20)
    }));
  }

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    matrixCanvas.width = width;
    matrixCanvas.height = height;
    columns = Math.floor(width / columnWidth);
    rows = Math.ceil(height / fontSize);
    drops = createDrops();
  }

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, width, height);

    ctx.textAlign = 'center';
    ctx.font = `${fontSize}px Courier New, monospace`;

    for (let i = 0; i < columns; i += 1) {
      const x = i * columnWidth + columnWidth / 2;
      const drop = drops[i];

      for (let j = 0; j < drop.length; j += 1) {
        const y = drop.y + j * fontSize;
        if (y < 0 || y > height) continue;

        ctx.fillStyle = j === drop.length - 1 ? '#d6ffda' : '#39ff14';
        ctx.shadowColor = '#39ff14';
        ctx.shadowBlur = j === drop.length - 1 ? 10 : 0;
        ctx.fillText(randomChar(), x, y);
      }

      drop.y += drop.speed;
      if (drop.y > height + drop.length * fontSize) {
        drops[i] = {
          y: -Math.random() * height,
          speed: fontSize * (0.2 + Math.random() * 0.4),
          length: 20 + Math.floor(Math.random() * 20)
        };
      }
    }

    requestAnimationFrame(drawMatrix);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  drawMatrix();
}
