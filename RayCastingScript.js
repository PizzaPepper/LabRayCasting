var canvas;
var ctx;
var FPS = 50;

//DIMENSIONAS DEL CANVAS EN PX
var canvasAncho = 500;
var canvasAlto = 500;

var escenario;
var jugador;

const paredColor = '#000000';
const sueloColor = '#666666';
const jugadorColor = '#FFFFFF';
//--------------------------------
//NIVEL 1

var nivel1 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
//--------------------------------
//TECLADO
document.addEventListener('keydown', function (tecla) {
    switch (tecla.keyCode) {
        case 38:
            jugador.arriba();
            break;
        case 40:
            jugador.abajo();
            break;
        case 39:
            jugador.derecha();
            break;
        case 37:
            jugador.izquierda();
            break;

    }
});

document.addEventListener('keyup', function (tecla) {
    switch (tecla.keyCode) {
        case 38:
            jugador.avanzaSuelta();
            break;
        case 40:
            jugador.avanzaSuelta();
            break;
        case 39:
            jugador.giraSuelta();
            break;
        case 37:
            jugador.giraSuelta();
            break;

    }
});

//--------------------------------
//CLASE ESCENARIO
class level {

    constructor(canvas, ctx, arr) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.matriz = arr;

        //DIMENSIONES MATRIZ
        this.altoM = this.matriz.length;
        this.anchoM = this.matriz[0].length;

        //DIMENSIONES REALES DEL CANVAS
        this.altoC = this.canvas.height;
        this.anchoC = this.canvas.width;

        //DIMENSIONES DE LOS TILES
        this.altoT = parseInt(this.altoC / this.altoM);
        this.anchoT = parseInt(this.anchoC / this.anchoM);
    }

    dibuja() {
        var color;

        for (var y = 0; y < this.altoM; y++) {
            for (var x = 0; x < this.anchoM; x++) {
                if (this.matriz[y][x] == 1)
                    color = paredColor;
                else
                    color = sueloColor;

                this.ctx.fillStyle = color;
                this.ctx.fillRect(x * this.anchoT, y * this.altoT, this.anchoT, this.altoT);
            }
        }
    }
}
//--------------------------------
//CLASE JUGADOR

class Player {
    constructor(ctx, escenario, x, y) {
        this.ctx = ctx;
        this.escenario = escenario;

        this.x = x;
        this.y = y;

        this.avanza = 0; // 0 = Parado 1 = adelante -1 = atras
        this.gira = 0; // -1 = Izquierda 1 = Derecha

        this.anguloRotacion = 0;

        this.velMovimiento = 3; //Pixeles
        this.velGiro = 3 * (Math.PI / 180) // Grados
    }

    arriba() {
        this.avanza = 1;
    }
    abajo() {
        this.avanza = -1;
    }
    izquierda() {
        this.gira = -1;
    }
    derecha() {
        this.gira = 1;
    }

    avanzaSuelta() {
        this.avanza = 0;
    }

    giraSuela() {
        this.gira = 0;
    }

    actualiza() {
        //AVANZAMOS
        var nuevaX = this.x + (this.avanza * Math.cos(this.anguloRotacion) * this.velMovimiento);
        var nuevaY = this.y + (this.avanza * Math.sin(this.anguloRotacion) * this.velMovimiento);

        this.x = nuevaX;
        this.y = nuevaY;

        //GIRAMOS
        this.anguloRotacion += this.gira * this.velGiro;
    }

    dibuja() {
        this.actualiza();
        //CUADRADO
        this.ctx.fillStyle = jugadorColor;
        this.ctx.fillRect(this.x - 3, this.y - 3, 6, 6);

        //LINEA DE DIRECCION
        var xDestino = this.x + Math.cos(this.anguloRotacion) *20;
        var yDestino = this.y + Math.sin(this.anguloRotacion) *20;

        this.ctx.beginPath();
        this.ctx.moveTo(this.x,this.y);
        this.ctx.lineTo(xDestino,yDestino);
        this.strokeStyle = '#FFFFFF';
        this.ctx.stroke();
    }
}

function inicializar() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    //MODIFICA EL TAMAÑO DEL CANVAS
    canvas.width = canvasAncho;
    canvas.height = canvasAlto;

    escenario = new level(canvas, ctx, nivel1);
    jugador = new Player(ctx, escenario, 75, 75);

    setInterval(function () {
        principal();
    }, 1000 / FPS);
}

function borrarCanvas() {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
}

function principal() {
    borrarCanvas();
    escenario.dibuja();
    jugador.dibuja();
}