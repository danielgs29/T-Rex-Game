
//lee la pulsacion de el espacio
document.addEventListener("keydown",(evento)=>{
    if(evento.keyCode==32){
        console.log("salta");
        if(nivel.muerto==false){
            if(trex.saltando==false){
        saltar();}}
        else{
            nivel.velocidad=9;
            nube.velocidad=1;
            cactus.x=ancho+100;
            nube.x=ancho+100;
            nivel.muerto=false
            nivel.marcador=0;
        }
    }
});

var imgRex, imgNubes, imgCactus, imgSuelo, imgCactus2, imgCactus3, imgTero, imgStep, imgMuerto;
var aleatorio=0;
var step=0;
var contador=0;
var imagenesCactus=[];

//carga las imagenes a usar
function cargaImagenes(){
    imgRex=new Image();
    imgStep= new Image();
    imgNubes= new Image();
    imgCactus=new Image();
    imgSuelo=new Image();
    imgCactus2= new Image();
    imgCactus3= new Image();
    imgTero= new Image();
    imgMuerto= new Image();

    imgNubes.src="images/cloud2.png"
    imgRex.src="images/dinostep2.png"
    imgCactus.src="images/cactus1.png"
    imgCactus2.src="images/cactu.png"
    imgCactus3.src="images/cactus4.png"
    imgTero.src="images/tero.png"
    imgSuelo.src="images/landf.png"
    imgStep.src="images/dinostep1.png"
    imgMuerto.src="images/muerto.png"
}


//dimensiones del espacio
var ancho=700;
var alto=300;
var canvas,ctx;


function inicializa(){
    canvas=document.getElementById("canvas");
    ctx=canvas.getContext("2d");
    cargaImagenes();
    imagenesCactus.push(imgCactus);
    imagenesCactus.push(imgCactus2);
    imagenesCactus.push(imgCactus3);
    imagenesCactus.push(imgTero);
}

function borraCanvas(){
    canvas.width=ancho;
    canvas.height=alto;
}

var suelo=200;
var nivel={velocidad:9, muerto:false, marcador:0, record:0};
var cactus={x:ancho+100,y:suelo-10}
var trex = {y: suelo, vy:0, gravedad:2, salto:24, vymax:9, saltando:false};
var nube={x:400, y:50, velocidad:1};
var suelog={x:0,y:suelo+40};

function dibujaRex(){
    if(contador>=0 && contador<=12){
        ctx.drawImage(imgStep,0,0,546,568,100,trex.y,50 ,50);
        contador++;
    }
    if(contador>=13 &&contador<=25){
        ctx.drawImage(imgRex,0,0,546,568,100,trex.y,50 ,50);
        contador++;
    }
    if(contador>=26 && contador<=38){
        ctx.drawImage(imgStep,0,0,546,568,100,trex.y,50 ,50);
        contador++;
    }
    if(contador>=39 &&contador<50){
        ctx.drawImage(imgRex,0,0,546,568,100,trex.y,50 ,50);
        contador++;
    }
    if(contador==50){
        contador=0;
    }
    if(nivel.muerto){
        ctx.drawImage(imgMuerto,0,0,546,568,100,trex.y,50 ,50);
    }
}

function dibujaCactus(){
    ctx.drawImage(imagenesCactus[aleatorio],0,0,282,290,cactus.x, cactus.y,60,60);
}

function dibujaNube(){
    ctx.drawImage(imgNubes,0,0,820,441,nube.x, nube.y,82,31);
}

function dibujaSuelo(){
    ctx.drawImage(imgSuelo,suelog.x,0,700,70,0, suelog.y,700,30);
}

function logicaSuelo(){
    if(suelog.x>700){
        suelo.x=0;
    }
    else{
        suelog.x+=nivel.velocidad
    }
}

function logicaNube(){
    if(nube.x<-100){
        nube.x=ancho+100;
    }
    else{
        nube.x-=nube.velocidad;
    }
}

function logiCactus(){
    if(cactus.x<-100){
         aleatorio=Math.floor(Math.random()*4);
    }
    if(cactus.x<-100){
        cactus.x=ancho+100;
        nivel.marcador++;
        nivel.velocidad+=0.3 ;
    }
    else{
        cactus.x-=nivel.velocidad;
    }
}


function saltar(){
    trex.saltando=true;
    trex.vy=trex.salto;
}


function gravedad(){
    if(trex.saltando==true){
        if(trex.y -trex.vy-trex.gravedad>suelo){
            trex.saltando=false;
            trex.vy=0;
            trex.y=suelo;
        }
        else{
        trex.vy-=trex.gravedad;
        trex.y-=trex.vy;
        }
    }
}

function colision(){
    if(cactus.x>=100 && cactus.x<=134){
        if(trex.y>=suelo-25|| trex.y>=suelo-60){
            nivel.muerto=true;
            nivel.velocidad=0;
            nube.velocidad=0;
            contador=0;
        }
    }
}

function puntuacion(){
    ctx.font="25px impact";
    ctx.fillStyle="#5555555";
    ctx.fillText(`Puntuación: ${nivel.marcador}`,520,40);
    ctx.fillText(`Record: ${nivel.record}`,400,40);
    
    if(nivel.muerto==true){
        if(nivel.marcador>nivel.record){
            nivel.record=nivel.marcador;
        }
        ctx.font="60px impact";
        ctx.fillText(`GAME OVER`,240,150);
        ctx.font="15px impact";
        ctx.fillText(`Press Space To Play Again`,290,180);
    }

}

//----------------------------------------------------
//bucle principal
var FPS=50;
setInterval(()=>{
    principal();
},1000/FPS);

function principal(){
    inicializa();
    borraCanvas();
    gravedad();
    colision();
    logicaSuelo();
    dibujaSuelo();
    logiCactus();
    logicaNube();
    dibujaNube(); 
    dibujaCactus();
    dibujaRex();
    puntuacion();
}