var imagemDaTorre, torre;

var imagemDaPorta, porta, grupoDePortas;

var imagemDeEscalador, escalador, grupoDeEscaladores;

var fantasma, imagemDoFantasma;

var grupoDeBlocoInvisivel, blocoInvisivel;

var estadoJogo = "JOGAR";

var rand;

var parede, parede2;

function preload()  {
  
  imagemDaTorre = loadImage("tower.png");
  imagemDaPorta = loadImage("door.png");
  imagemDeEscalador = loadImage("climber.png");
  imagemDoFantasma = loadImage("ghost-standing.png");
  somAssustador = loadSound("spooky.wav");
}

function setup()  {
  
  createCanvas(600,600);
  
  torre = createSprite(300,300);
  torre.addImage("tower",imagemDaTorre);
  torre.velocityY = 1;
  
  fantasma = createSprite(300,300);
  fantasma.addImage("fantasma", imagemDoFantasma);
  fantasma.scale = 0.4;
  fantasma.setCollider("rectangle", -20, 30, 175, 250);
  
  parede = createSprite(65, 300, 5, 600);
  parede.visible = false;
  parede2 = createSprite(535, 300, 5, 600);
  parede2.visible = false;
  
  grupoDePortas = new Group();
  grupoDeEscaladores = new Group();
  grupoDeBlocoInvisivel = new Group();
  
  //somAssustador.play();
  //somAssustador.loop();
}


function draw()  {
  
  background(200);
  
  if(estadoJogo === "JOGAR")  {
    
  fantasma.velocityY = fantasma.velocityY + 0.8;
  
  fantasma.collide(grupoDeEscaladores);
  fantasma.collide(parede);
  fantasma.collide(parede2);
    
  if(torre.y > 400)  {
    
      torre.y = 300
  }
  
  if(keyWentDown("space"))  {
    
    fantasma.velocityY = -10;
  }
  
  if(keyDown("right_arrow"))  {
    
    fantasma.x = fantasma.x + 10;
  }
  
  if(keyDown("left_arrow"))  {
    
    fantasma.x = fantasma.x - 10;
  }
  
  if(fantasma.isTouching(grupoDeBlocoInvisivel) || fantasma.y > 625)  {
    
    fantasma.destroy();
    estadoJogo = "ENCERRAR";
  }
  
  gerarPorta();
  
  drawSprites();
  
  } else if(estadoJogo === "ENCERRAR")  {
    
    fill("black");
    textSize(40);
    text("Game Over", 200, 300);
  }
}

function gerarPorta()  {
  
  if(frameCount%250 === 0)  {
    
    rand = Math.round(random(150,450));
    porta = createSprite(rand,-100);
    porta.addImage("porta",imagemDaPorta);
    porta.velocityY = 1;
    porta.lifetime = 700;
    
    escalador = createSprite(porta.x, -35);
    escalador.addImage("escalador", imagemDeEscalador);
    escalador.velocityY = 1;
    escalador.lifetime = 700;
    
    blocoInvisivel = createSprite(porta.x, -25, 80, 5);
    blocoInvisivel.velocityY = 1;
    blocoInvisivel.lifetime = 700;
    blocoInvisivel.visible = false;
    
    grupoDePortas.add(porta);
    grupoDeEscaladores.add(escalador);
    grupoDeBlocoInvisivel.add(blocoInvisivel);
    
    fantasma.depth = escalador.depth + 1;
  }
}