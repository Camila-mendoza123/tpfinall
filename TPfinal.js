let imagenes = [];
let estado = 0;
let texto = [];
let inicioPantalla0 = {x:220, y:60, w:200, h:50};
let frasesExtra = {
  3: ["¿Qué debe hacer Pulgarcito con las piedritas?", "Usarlas para marcar el camino de regreso", "Guardarlas para despues."],
  6: ["¿Qué debería usar ahora Pulgarcito para no perderse?", "Buscar migas de pan para marcar el camino", "Seguir las estrellas"],
  16: ["¿Qué deberían hacer los hermanos perdidos?", "Buscar una casa iluminada", "Seguir la luz de la luna"]
};

function preload() {
  for (let i = 0; i < 23; i++) {
    imagenes[i] = loadImage("data/Pantalla" + (i + 1) + ".jpg");
  }
  texto = loadStrings("data/texto.txt");
}

function setup() {
  createCanvas(640, 480);
  textAlign(CENTER, CENTER);
  textSize(18);
}

function draw() {
  background(220);

  if (imagenes[estado]) {
    image(imagenes[estado], 0, 0, width, height);
  }

  //pantalla 0
  if (estado == 0) {
    fill(0, 150);
    rect(220, 60, 200, 50, 16);
    fill(255);
    textAlign(CENTER, CENTER);
    text(texto[estado], width / 2, 85);

  //pantallas con texto abajo
  } else if (
    estado == 8 || estado == 9 || estado == 10 || estado == 11 || 
    estado == 12 || estado == 13 || estado == 20 || estado == 22
  ) {
    fill(0, 150);
    rect(40, 360, 560, 100, 16);
    fill(255);
    textAlign(LEFT, TOP);
    text(texto[estado], 50, 375, 540, 90);

  //pantallas normales
  } else {
    fill(0, 150);
    rect(40, 45, 560, 100, 16);
    fill(255);
    textAlign(LEFT, TOP);
    text(texto[estado], 50, 60, 540, 90);
  }

  if (frasesExtra[estado]) {
    let x = 80;
    let y = 300;
    let ancho = 480;
    let alto = 40;

    for (let i = 0; i < frasesExtra[estado].length; i++) {
      fill(0, 150);
      rect(x, y, ancho, alto, 16);

      if (i === 0) fill(50, 100, 255);
      else fill(255);

      textAlign(CENTER, CENTER);
      text(frasesExtra[estado][i], x + ancho / 2, y + alto / 2);
      y += alto + 20;
    }
  }

  // BOTÓN VOLVER
  if (estado == 9 || estado == 13 || estado == 20 || estado == 22) {
    let x = width - 160;
    let y = height / 2 - 30;
    let w = 120;
    let h = 60;

    fill(0, 150);
    rect(x, y, w, h, 16);

    fill(255);
    textAlign(CENTER, CENTER);
    text("VOLVER", x + w / 2, y + h / 2);
  }
}

function mousePressed() {
  //solo clic en el recuadro de inicio
  if (estado === 0) {
    if (
      mouseX > inicioPantalla0.x &&
      mouseX < inicioPantalla0.x + inicioPantalla0.w &&
      mouseY > inicioPantalla0.y &&
      mouseY < inicioPantalla0.y + inicioPantalla0.h
    ) {
      estado++;
    }
    return;
  }

  // botón VOLVER 
  if (estado == 9 || estado == 13 || estado == 20 || estado == 22) {
    let x = width - 160;
    let y = height / 2 - 30;
    let w = 120;
    let h = 60;

    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
      estado = 0;
    }
    return;
  }

  //pantallas para eleguir opcion
  if (estado === 3) {
    if (mouseX > 80 && mouseX < 560 && mouseY > 360 && mouseY < 400) estado = 4;
    else if (mouseX > 80 && mouseX < 560 && mouseY > 420 && mouseY < 460) estado = 15;
    return;
  }
  if (estado === 6) {
    if (mouseX > 80 && mouseX < 560 && mouseY > 360 && mouseY < 400) estado = 7;
    else if (mouseX > 80 && mouseX < 560 && mouseY > 420 && mouseY < 460) estado = 10;
    return;
  }
  if (estado === 16) {
    if (mouseX > 80 && mouseX < 560 && mouseY > 360 && mouseY < 400) estado = 22;
    else if (mouseX > 80 && mouseX < 560 && mouseY > 420 && mouseY < 460) estado = 17;
    return;
  }

  //pantallas que avanzan normal
  if (
    estado == 1 || estado == 2 || estado == 4 || estado == 5 ||
    estado == 7 || estado == 8 || estado == 10 || estado == 11 ||
    estado == 12 || estado == 14 || estado == 15 || estado == 17 ||
    estado == 18 || estado == 19 || estado == 21
  ) {
    estado++;
    if (estado >= imagenes.length) estado = 0;
  }
}
