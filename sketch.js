function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  noLoop(); // Убираем автоматическую перерисовку
}

function draw() {
  background(240);
  translate(width / 2, height); // Начинаем рисование снизу по центру
  drawBranch(120, 0); // Начальная длина и глубина 0
}

function drawBranch(len, depth) {
  // Ограничиваем глубину рекурсии (например, до 8 уровней)
  if (depth > 8) {
    return;
  }

  // Рассчитываем толщину ветки: уменьшается с глубиной
  let thickness = map(depth, 0, 8, 12, 2);
  strokeWeight(thickness);

  // Плавный переход цвета от коричневого (на стволе) к зелёному (на листьях)
  let brown = color(139, 69, 19);
  let green = color(34, 139, 34);
  let branchColor = lerpColor(brown, green, depth / 8);
  stroke(branchColor);

  // Рисуем ветку (линию вверх)
  line(0, 0, 0, -len);

  // Сохраняем текущую систему координат
  push();
  translate(0, -len); // Перемещаемся в конец ветки

  // Анимация углов с помощью sin(millis()):
  // Колебания от -30 до 30 градусов, синхронизированные по глубине
  let angle = sin(millis() * 0.001 + depth * 0.5) * 30;

  // Левая ветвь: отклоняем на угол
  rotate(-20 + angle);
  drawBranch(len * 0.7, depth + 1); // Рекурсивный вызов с уменьшенной длиной и увеличенной глубиной

  // Правая ветвь: отклоняем в другую сторону
  pop();
  push();
  translate(0, -len);
  rotate(20 + angle);
  drawBranch(len * 0.7, depth + 1);

  pop(); // Восстанавливаем систему координат
}

// Запускаем анимацию при наведении курсора
function mouseMoved() {
  redraw();
}
