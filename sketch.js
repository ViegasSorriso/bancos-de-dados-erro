//variáveis
//bola, bancoDeDados, Posição
var hypnoticBall, database;
var position;


function setup() {
  //Iniciando o banco de dados
  database = firebase.database();

  createCanvas(500, 500);

  //sprite da bola e cor
  hypnoticBall = createSprite(250, 250, 30, 30);
  hypnoticBall.shapeColor = "white";

  //usado para se referir a localização do valor no banco 
  var hypnoticBallPosition = database.ref('ball/position');
  //cria um ouvinte que continua acompanhando as mudanças desse valor
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw() {
  background("black");

   if (position !== undefined){

   


  if (keyDown(LEFT_ARROW)) {
    writePosition(-1, 0);
  }
  else if (keyDown(RIGHT_ARROW)) {
    writePosition(1, 0);
  }
  else if (keyDown(UP_ARROW)) {
    writePosition(0, -1);
  }
  else if (keyDown(DOWN_ARROW)) {
    writePosition(0, 1);
  }
  drawSprites();
}
}
//configurar função para novas posições da bola
//writePosition
  function writePosition (x,y){
       database.ref('ball/position').set({
         'x': position.x + x, 
         'y': position.y + y
       })
  }





function readPosition(data) {
  position = data.val();


  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError() {
  console.log("Dados não recebidos do Banco de Dados");
}
