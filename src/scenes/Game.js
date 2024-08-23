import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }
    init(data) {
     // iniciar el multiplicador de velocidad de la pelota
     this.ballSpeedMultiplier = data.ballSpeedMultiplier || 1;
     }
    create(){

     //inicializar el puntaje
     this.score = 0;

     //crear un texto para mostrar el puntaje
     this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: '#fff' });
    
     //crear la paleta rectangular
     this.paddle = this.add.rectangle(400, 500, 100, 20,0x6666ff);

     //crear la pelota
     this.ball = this.add.circle(310, 300, 10, 0xff6666);
 
 
     //crear contenedor de obstaculos
     this.obstacleContainer = this.add.container();
     //generar mas obstaculos
     for (let row = 0; row < 3; row++) {
       for (let col = 0; col < 10; col++) {
         let x = 165 + col * 80;
         let y = 100 + row * 50;
         let obstacle = this.add.rectangle(x, y, 60, 20, 0x66ff66);
         this.physics.add.existing(obstacle);
         obstacle.body.setImmovable(true);
         this.obstacleContainer.add(obstacle);
         obstacle.body.setAllowGravity(false); 
       }
     }
 
     //agregar cursor
     this.mousePointer = this.input.activePointer;

     //agregar fisicas a los objetos
     this.physics.add.existing(this.paddle);
     this.physics.add.existing(this.ball);
     
     //FISICAS DE LA PALETA
     //hacer la paleta inamovible
     this.paddle.body.setImmovable(true);
     //agregar choque de la paleta con los limites de la pantalla
     this.paddle.body.setCollideWorldBounds(true);
     //hacer que la paleta no se vea afectada por la gravedad
     this.paddle.body.setAllowGravity(false);
 
     //FISICAS DE LA PELOTA
     //colision con los limites
     this.ball.body.setCollideWorldBounds(true);
     this.ball.body.onWorldBounds = true; 
     //rebote de la pelota
     this.ball.body.setBounce(1, 1);
     // Aplicar el multiplicador de velocidad a la pelota
     this.ball.body.setVelocity(200 * this.ballSpeedMultiplier, 270 * this.ballSpeedMultiplier);
 
     //COLISIONES
     //colision de la pelota con la paleta
     this.physics.add.collider(this.paddle, this.ball, null, null, this);
 
     //colision de la pelota con el obstaculo
     this.physics.add.collider(this.obstacleContainer.list, this.ball, this.handleCollision, null, this);

     // Colisión de la pelota con el límite inferior
     this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      if (down && body.gameObject === this.ball) {
        console.log("hit bottom");
        this.GameOver();
      }
    });
 
   }
 
   update(){
    // Mueve la paleta con el cursor del mouse
    this.paddle.x = this.mousePointer.x;
   }
   handleCollision = (obstacle, ball) => {
     console.log("collision");
     obstacle.destroy();
    // Incrementar el puntaje y actualizar el texto
     this.score += 10;
     this.scoreText.setText('Score: ' + this.score);
    // Verificar si todos los obstáculos han sido eliminados
     if (this.obstacleContainer.list.length === 0) {
      // Aumentar la velocidad de la pelota 
      this.ballSpeedMultiplier *= 1.2;

      // Reiniciar la escena
      this.scene.restart({ ballSpeedMultiplier: this.ballSpeedMultiplier });
    };
   }
   GameOver() {
     this.scene.start('GameOver',  { finalScore: this.score });
   }
  }
  



