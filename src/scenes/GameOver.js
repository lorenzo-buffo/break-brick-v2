import { Scene } from 'phaser';

export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    init(data){
        //cargar puntaje
        this.finalScore = data.finalScore || 0;
    }

    create ()
    {
        const width = this.scale.width;
        const height = this.scale.height;
        
        // Mostrar el mensaje de Game Over 
        this.add.text(width / 2, height / 2 - 100, "GAME OVER", {
          fontSize: "64px",
          fill: "#fff"
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2, `Score: ${this.finalScore}`, {
            fontSize: "32px",
            fill: "#fff"
          }).setOrigin(0.5);
        }
    }

