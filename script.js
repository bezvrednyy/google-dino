
var canvasContext = null;

var game = {
  fps: 1000/60,
  width: 600,
  height: 150,
  process: 'play',
  over: new Image()
} 

//Земля
var ground = {
  x: 0,
  y: 130,                                
  width: 2500,
  height: 20,
  xDirection: 6,
  skin: new Image()
}

//Небо
var sky = {
  x: 0,
  y: 15,
  width: 1800,
  height: 80,
  xDirection: 1,
  skin: new Image()
}

//Кактусы
var cactus1 = {
  x: 900,
  y: 110,
  Xstart:900,     //Начальная позиция кактуса
  width: 30,
  height: 29,
  skin: new Image() 
}

var cactus2 = {
  x: 1300,
  y: 98,
  Xstart: 1300,
  width: 24,
  height: 42,
  skin: new Image() 
}

var cactus3 = {
  x: 1550,
  y: 98,
  Xstart: 1550, 
  width: 55,
  height: 42,
  skin: new Image() 
}

var cactus4 = {
  x: 2000,
  y: 123,
  Xstart: 2000,
  width: 15,
  height: 18,
  skin: new Image() 
}

var cactus5 = {
  x: 2300,
  y: 106,
  Xstart: 2300,
  width: 33,
  height: 34,
  skin: new Image() 
}

//Динозаврик
var dino1 = {
  x: 10,
  y: 96,
  yDirection: 0,
  Ystart: 96,
  width: 40,
  height: 47,
  jump: 60,
  skin: new Image() 
}

var dino2 = {
  x: 10,
  y: 96,
  yDirection: 0,
  Ystart: 96,
  width: 40,
  height: 47,
  jump: 60,
  skin: new Image() 
}


function init() {
    var canvas = document.getElementById('canvas');  //Создали холст(взяли его из index.html) где будем рисовать
    canvasContext = canvas.getContext('2d');        //Взяли маркер в руки, т.к. 2d

    ground.skin.src = 'img/ground.png'      //Адрес картинки
    sky.skin.src = 'img/sky.png'
    cactus1.skin.src = 'img/cactus1.png'
    cactus2.skin.src = 'img/cactus2.png' 
    cactus3.skin.src = 'img/cactus3.png' 
    cactus4.skin.src = 'img/cactus4.png' 
    cactus5.skin.src = 'img/cactus5.png'
    dino1.skin.src = 'img/dino1.png' 
    dino2.skin.src = 'img/dino2.png'
    game.over.src = 'img/wasted.png'


    document.addEventListener('keypress', onDocumentKeyDown);  //События клавиаутуры

    
    setInterval(play, game.fps);                    //Каждую секунду Запускает функцию play с нужной частотой кадров
       
                                             //Если бы сделали в цикли, то мы бы ничего не заметили, т. к. всё прошло бы очень быстро
}




//Сама игра
function play() { 
  if (game.process == 'play') {
    draw();
    update();
  } else {
      canvasContext.drawImage(game.over, 125, -15, 350, 200);
  }
}

function update() {
  //Движем землю влево
  if (ground.x + ground.width < game.width) {
    ground.x = 0;
  }
  ground.x += -ground.xDirection;

  //Движем небо влево
  if (sky.x + sky.width < game.width) {
    sky.x = 0;
  }
  sky.x += -sky.xDirection;

  //Движем кактусы влево
  if (cactus5.x < -10) {
    cactus1.x = cactus2.Xstart;                             //Возвращаем в начальное положение
  }
  cactus1.x += -ground.xDirection;                         //Сдвигаем влево на xDirection

  if (cactus5.x < -10) {
    cactus2.x = cactus4.Xstart;
  }
  cactus2.x += -ground.xDirection;

  if (cactus5.x < -10) {
    cactus3.x = cactus1.Xstart;
  }
  cactus3.x += -ground.xDirection;

  if (cactus5.x < -10) {
    cactus4.x = cactus3.Xstart;
  }
  cactus4.x += -ground.xDirection;

  if (cactus5.x < -10) {
    cactus5.x = cactus5.Xstart;
  }
  cactus5.x += -ground.xDirection;

  //Прыжок динозавра
  if (dino1.y < dino1.Ystart - dino1.jump) {
    dino1.yDirection +=5
  } else {
      if  (dino1.y > dino1.Ystart) {
        dino1.y = dino1.Ystart;
        dino1.yDirection = 0;
      }
  }

  if (dino2.y < dino2.Ystart - dino2.jump) {
    dino2.yDirection +=5
  } else {
      if  (dino2.y > dino2.Ystart) {
        dino2.y = dino2.Ystart;
        dino2.yDirection = 0;
      }
  }

  dino1.y += dino1.yDirection
  dino2.y += dino2.yDirection

  //Проверка на соприкосновение дино и кактуса
  if (((dino1.x + dino1.width - 18 > cactus1.x) && (dino1.x + dino1.width - 18 < cactus1.x + cactus1.width)) && (dino1.y + dino1.height > cactus1.y + 10)) {
    game.process = 'end';
    console.log('hello');
  }

  if (((dino1.x + dino1.width - 18 > cactus2.x) && (dino1.x + dino1.width - 18 < cactus2.x + cactus2.width)) && (dino1.y + dino1.height > cactus2.y + 10)) {
    game.process = 'end';
    console.log('hello');
  }

  if (((dino1.x + dino1.width - 18 > cactus3.x) && (dino1.x + dino1.width - 18 < cactus3.x + cactus3.width)) && (dino1.y + dino1.height > cactus3.y + 10)) {
    game.process = 'end';
    console.log('hello');
  }

  if (((dino1.x + dino1.width - 18 > cactus4.x) && (dino1.x + dino1.width - 18 < cactus4.x + cactus4.width)) && (dino1.y + dino1.height > cactus4.y + 10)) {
    game.process = 'end';
    console.log('hello');
  }

  if (((dino1.x + dino1.width - 18 > cactus5.x) && (dino1.x + dino1.width - 18 < cactus5.x + cactus5.width)) && (dino1.y + dino1.height > cactus5.y + 10)) {
    game.process = 'end';
    console.log('hello');
  }

  //Увеличение движение земли, неба и кактусов
  if (count % 500 == 0) {
    ground.xDirection += 1
    sky.xDirection += 1
  }
  
}

var count = 0;
    dino_flag = 1; 

function draw() {
    count += 1;
    //Создаём эффект бега динозаврика(просто по очереди рисуем dino1 и dino2)                                   Как настроить время смены картинки?
    if (count % 5 == 0 && dino_flag == 1) {
      dino_flag = 2;
    } else {
        if (count % 5 == 0 && dino_flag == 2) { 
      dino_flag = 1;
      }
    } 

    canvasContext.clearRect(0, 0, 600, 150);
    canvasContext.drawImage(ground.skin, ground.x, ground.y, ground.width, ground.height);
    canvasContext.drawImage(sky.skin, sky.x, sky.y, sky.width, sky.height);
    canvasContext.drawImage(cactus1.skin, cactus1.x, cactus1.y, cactus1.width, cactus1.height);
    canvasContext.drawImage(cactus2.skin, cactus2.x, cactus2.y, cactus2.width, cactus2.height);
    canvasContext.drawImage(cactus3.skin, cactus3.x, cactus3.y, cactus3.width, cactus3.height);
    canvasContext.drawImage(cactus4.skin, cactus4.x, cactus4.y, cactus4.width, cactus4.height);
    canvasContext.drawImage(cactus5.skin, cactus5.x, cactus5.y, cactus5.width, cactus5.height);
    if (dino_flag == 1) {
      canvasContext.drawImage(dino1.skin, dino1.x, dino1.y, dino1.width, dino1.height);
    } else {
      if (dino_flag == 2) {
        canvasContext.drawImage(dino2.skin, dino2.x, dino2.y, dino2.width, dino2.height);
      }
    }

}

function onDocumentKeyDown(event) {
  console.log(event);
  if (event.key == 'w') {
      dino1.yDirection = -5;
      dino2.yDirection = -5;
  }
  if (event.key == 'n') {
    dino1.skin.src = 'img/dino1n.png';
    sky.skin.src = 'img/Nsky.png'; 
    ground.xDirection = 12;
    sky.xDirection = 12;
  }
}
