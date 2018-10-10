getLocalisation();

//------------Creation de l'entête--------------//
document.getElementsByTagName('body')[0].style.background= " #000000 no-repeat 100%"
var elt_header = document.createElement("header")
//elt_header.setAttribute('class','container row')
document.getElementsByTagName("body")[0].insertAdjacentElement('afterbegin',elt_header);
var titre= '<h1 id="titre" class= "text-light"> ---- CASSE BRIQUE ----</h1>';
elt_header.innerHTML = titre;
var elt_titre = document.getElementById("titre");
elt_titre.style.textAlign = "center";
elt_titre.style.border = "2px white solid";
elt_titre.style.padding = "0.5em"
elt_titre.style.margin = "0.3em 2em 0.3em 2em"


//------------Affichage de la Météo dans l'entête--------------//
elt_titre.insertAdjacentElement('afterend',document.createElement('div'));
document.getElementsByTagName('div')[0].setAttribute('id','meteo');
var elt_meteo = document.getElementById('meteo');
var maLatitude;
var maLongitude;
var url;

function getLocalisation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(saveGeoPos);
    }
    else{
        alert("votre navigateur ne prend pas en charge la géolocalisation")
    }
    function saveGeoPos(position){
        maLatitude = position.coords.latitude;
        maLongitude = position.coords.longitude;
        getMeteo();
        
    }
}


function getMeteo(){
    var requeteXhr = new XMLHttpRequest();
    var url = 'https://www.prevision-meteo.ch/services/json/lat='+maLatitude+'lng='+maLongitude;
    var methode = "GET"
    requeteXhr.open(methode,url,false);
    requeteXhr.send();
    var respons = JSON.parse(requeteXhr.responseText);
    elt_meteo.insertAdjacentElement('afterbegin',document.createElement('img'))
    document.getElementsByTagName('img')[0].setAttribute("src",respons.current_condition.icon);
    document.getElementsByTagName('img')[0].setAttribute("alt",respons.current_condition.condition);
    elt_meteo.style.position = 'fixed'
    elt_meteo.style.top = '2%';
    elt_meteo.style.right = '10%';

}



//------------Creation du formulaire de création Joueur--------------//
//Création du formulaire de saisie
elt_header.insertAdjacentElement("afterend",document.createElement('p'));
document.getElementsByTagName('p')[0].setAttribute("class","container")
document.getElementsByTagName('p')[0].insertAdjacentElement('afterbegin',document.createElement('div'));
document.getElementsByTagName('div')[1].setAttribute("class","row");

//Création des blocs pour les infos joueur et jeux
document.getElementsByClassName("row")[0].insertAdjacentElement('afterbegin',document.createElement('div'));
document.getElementsByTagName('div')[2].insertAdjacentElement('afterend',document.createElement('div'));
document.getElementsByTagName('div')[2].setAttribute("id","playerInformation");
document.getElementsByTagName('div')[3].setAttribute("id","gameInformation")


var elt_playerInformation = document.getElementById('playerInformation');
var elt_gameInformation = document.getElementById('gameInformation');

elt_playerInformation.setAttribute("class","col-6 form-group text-light");
elt_gameInformation.setAttribute("class","col-6 form-group text-light");

elt_playerInformation.innerHTML= '<h2 id="playerInformationTitle" class="text-light">Information du Joueur</h2>';
elt_gameInformation.innerHTML= '<h2 id="gameInformationTitle" class="text-light">Information du Jeux</h2>';

//modification style H2
document.getElementsByTagName('h2')[0].style.textAlign = "center"
document.getElementsByTagName('h2')[1].style.textAlign = "center"

//modification du style de Player Info  
elt_playerInformation.textAlign = "center"

//modification du style de Player Info 
elt_gameInformation.textAlign = "center"

//insertion des input dans infos joueur
document.getElementById('playerInformationTitle').insertAdjacentElement('afterend',document.createElement('label'));
document.getElementsByTagName('label')[0].setAttribute("for","playerName");
document.getElementsByTagName('label')[0].setAttribute("class","text-light");
document.getElementsByTagName('label')[0].innerHTML = 'Entre ton pseudo : ';
document.getElementsByTagName('label')[0].insertAdjacentElement('afterend',document.createElement('input'));
var elt_inputName = document.getElementsByTagName("input")[0];
elt_inputName.setAttribute("type",'text');
elt_inputName.setAttribute('class','form-control');
elt_inputName.setAttribute('id','playerName');
elt_inputName.setAttribute('aria-describedby','pseudo');
elt_inputName.setAttribute('placeholder','Entre ton pseudo');


//insertion des inputs pour le jeux du jeux
//liste pour la taille du plateau 
document.getElementById('gameInformationTitle').insertAdjacentElement('afterend',document.createElement('label'));
document.getElementsByTagName('label')[1].setAttribute("for","gameDimension");
document.getElementsByTagName('label')[1].setAttribute("class","text-light");
document.getElementsByTagName('label')[1].innerHTML = 'Dimension du plateau : ';
document.getElementsByTagName('label')[1].insertAdjacentElement('afterend',document.createElement('select'));
var elt_listDimension = document.getElementsByTagName("select")[0];
elt_listDimension.setAttribute('id','listeDimension');
elt_listDimension.setAttribute('class','form-control');
elt_listDimension.innerHTML= "<option>Petit</option><option>Moyen</option><option>Grand</option>"

//liste pour la vitesse initiale de la bille 
document.getElementById('listeDimension').insertAdjacentElement('afterend',document.createElement('label'));
document.getElementsByTagName('label')[2].setAttribute("for","ballSpeed");
document.getElementsByTagName('label')[2].innerHTML = 'Vitesse initiale de la bille : ';
document.getElementsByTagName('label')[2].insertAdjacentElement('afterend',document.createElement('select'));
var elt_listVitesseBille = document.getElementsByTagName("select")[1];
elt_listVitesseBille.setAttribute('id','vitesseBille');
elt_listVitesseBille.setAttribute('class','form-control');
elt_listVitesseBille.innerHTML= "<option>Lente</option><option>Normale</option><option>Rapide</option>"

// ajout du bouton de validation 
document.getElementsByClassName("row")[0].insertAdjacentElement('afterend',document.createElement('div'));
document.getElementsByTagName('div')[4].setAttribute('class','row');
document.getElementsByTagName('div')[4].insertAdjacentElement('afterbegin',document.createElement('button'));
var elt_buttonStart = document.getElementsByTagName('button')[0];
elt_buttonStart.setAttribute("type","start");
elt_buttonStart.setAttribute("class","btn btn-primary offset-5 col-2 ");
elt_buttonStart.innerText="START"

//Zone de création du canvas pour le jeux
document.getElementsByClassName("row")[1].insertAdjacentElement('afterend',document.createElement('div'));
document.getElementsByTagName('div')[5].setAttribute('class','row');

//Zone d'affichage du Best score
var elt_bestScore =document.getElementsByClassName('row')[2].insertAdjacentElement('afterend',document.createElement('div'))
elt_bestScore.setAttribute('class','col-12 text-align-center text-light');

elt_buttonStart.addEventListener("click",startGame);

var intervalGameId;

function setCanvas(setWidth,setHeight){
    document.getElementsByClassName('row')[2].innerHTML='<canvas></canvas>';
    var elt_canvas = document.getElementsByTagName('canvas')[0];
    elt_canvas.setAttribute('id',"myCanvas");
    elt_canvas.setAttribute('width',setWidth);
    elt_canvas.setAttribute('height',setHeight);
    
}

function setBallSpeed(){
    if(elt_listVitesseBille.options[elt_listVitesseBille.selectedIndex].innerHTML=="Lente"){
        return 2/5;
    }
    if(elt_listVitesseBille.options[elt_listVitesseBille.selectedIndex].innerHTML=="Normale"){
        return 3/5;
    }
    if(elt_listVitesseBille.options[elt_listVitesseBille.selectedIndex].innerHTML=="Rapide"){
        return 4/5;
    }
}

function setAccelerationCoeficient(){
    if(elt_listDimension.options[elt_listDimension.selectedIndex].innerHTML==="Petit"){
        return 1.1;
    }
    if(elt_listDimension.options[elt_listDimension.selectedIndex].innerHTML==="Moyen"){
        return 1.05;
    }
    if(elt_listDimension.options[elt_listDimension.selectedIndex].innerHTML==="Grand"){
        return 1.025;
    }
}

function setGame(){
    if (elt_listDimension.options[elt_listDimension.selectedIndex].innerHTML==="Petit"){
        setCanvas("480","320"); 
    }
    if (elt_listDimension.options[elt_listDimension.selectedIndex].innerHTML==="Moyen"){
        setCanvas("600","400");
    }
    if (elt_listDimension.options[elt_listDimension.selectedIndex].innerHTML==="Grand"){
        setCanvas("750","500");
    }
    sessionStorage.setItem('username', elt_inputName.value);
    sessionStorage.setItem('size', elt_listDimension.options[elt_listDimension.selectedIndex]);
    sessionStorage.setItem('speed', elt_listVitesseBille.options[elt_listVitesseBille.selectedIndex]);
    var elt_canvas = document.getElementsByTagName('canvas')[0];
    context = elt_canvas.getContext("2d"); 
    game(context,elt_canvas);
}

function startGame(){
    if(document.getElementsByTagName('div')[5].innerHTML != ""){
        clearInterval(intervalGameId);
        document.getElementsByTagName('div')[5].innerHTML="";
        if(elt_inputName.value == "" || elt_inputName.value == "Entre ton pseudo"){
            alert("Tu n'as pas entré ton pseudo")
        }
        else{
            setGame();
        }
    }
    else{
        if(elt_inputName.value == "" || elt_inputName.value == "Entre ton pseudo"){
            alert("Tu n'as pas entré ton pseudo")
        }
        else{
            setGame();
        }
    }
}
//fonction de fin de partie 
function scoreSave(){
    if(localStorage.getItem('bestscore')==''){
        localStorage.setItem('bestScore',score);
        localStorage.setItem('username',sessionStorage.getItem('username'))
        best_score=score
    }else if(localStorage.getItem('bestScore')<score){
        if(localStorage.getItem('username'==''))
        {
            localStorage.setItem('bestScore',score);
            localStorage.setItem('username',sessionStorage.getItem('username'))
        }else if (localStorage.getItem('username') != sessionStorage.getItem('username')){
            localStorage.setItem('bestScore',score);
            localStorage.setItem('username',sessionStorage.getItem('username'))
        }else{
            localStorage.setItem('bestScore',score);
        }
    }
}
/* Si ensemble des brique effacer sauvegarde du scroe dans local storage associé au nom de joueur 
sinon game over idem*/
function finDePartie(nbLigneBrique,nbColonneBrique){
    if (score===nbLigneBrique*nbColonneBrique){
        alert('tu as gagné '+sessionStorage.getItem('username'))
        scoreSave()
    }
    else{
        alert('Tu as perdu '+sessionStorage.getItem('username'))
        scoreSave();
        }

    elt_bestScore.innerHTML='Le Meilleur score de ' + localStorage.getItem('username') + ' est : ' + localStorage.getItem('bestScore');
    
    //supression du canvas avant création de la partie suivante 
    document.getElementsByTagName('div')[5].innerHTML='';

    if (sessionStorage.getItem('username')!='')
        elt_inputName.value=sessionStorage.getItem('username');
    else
    elt_inputName.value='Entre ton pseudo'
    score=0
    clearInterval(intervalGameId);
}

//---- Les Variables ----//
// SAUVEGARDE DES SCORE 
var score = 0 
var best_score


function game(context,elt_canvas){
//--------Récupération des éléments du DOM---------------///
//récupération de l'élément canvas pour le modifier et dessiner dedans :

//-----------------Déroulement du jeux ---------------------------------//
//ajout d'venement d'écoute des touches du clavier
    document.addEventListener("keydown",keyDownHandler, false)
    document.addEventListener("keyup",keyUpHandler, false)
    document.addEventListener('mousemove',mouseMoveHandler,false)

// définition des variable pour le mouvement de la balle 
    var x= elt_canvas.width/2;
    var y = elt_canvas.height/2;
    var dx = setBallSpeed();
    var dy = setBallSpeed();
    var accelerationCoeficient=setAccelerationCoeficient();
    var radius = 5;
    var couleurBille = "#000000";

//définition des variable pour le dessin des briques 
    if (elt_listDimension.options[elt_listDimension.selectedIndex].innerHTML=="Petit"){
        var nombreLignesBrique = 4;
        var nombreColonnesBrique = 5;
        var largeurBrique = 75;
        var hauteurBrique = 20;
    }
    if (elt_listDimension.options[elt_listDimension.selectedIndex].innerHTML=="Moyen"){
        var nombreLignesBrique = 5;
        var nombreColonnesBrique = 10;
        var largeurBrique = 45;
        var hauteurBrique = 20;
    }
    if (elt_listDimension.options[elt_listDimension.selectedIndex].innerHTML=="Grand"){
        var nombreLignesBrique = 10;
        var nombreColonnesBrique = 20;
        var largeurBrique = 25;
        var hauteurBrique = 10;
        var paddingBrique = 10;
    }

    var paddingBrique = 10;
    var briqueOffsetTop= 30;
    var briqueOffsetLeft =30;
    var briques = [];

//définitions des variable pour le dessin et le mouvement de la raquette:
    var paddleHeight =10;
    var paddleWidth = 75;
    var paddleXpos= (elt_canvas.width-paddleWidth)/2;
    var paddleYpos = elt_canvas.height-paddleHeight - 15
    var vitessePaddle = 7;

//Controle de la raquette :
    var rightButtonPressed = false;
    var leftButtonPressed = false;

//--------Les Briques--------//

//creation d'un tableau de brique précisant leur position x/Y 
    for(var c = 0; c< nombreColonnesBrique ; c++){
        briques[c] = [];
        for (var r=0 ; r<nombreLignesBrique; r++){
            briques[c][r]={x:0 , y:0, status :1};
        }
    }

//dessin des briques :
    function drawBriques(){
        for(var c=0; c<nombreColonnesBrique; c++) {
            for(var r=0; r<nombreLignesBrique; r++) {
                if (briques[c][r].status==1){
                    var posBriqueX = (c * (largeurBrique+paddingBrique))+briqueOffsetLeft;
                    var posBriqueY = (r * (hauteurBrique+paddingBrique))+briqueOffsetTop;
                    briques[c][r].x = posBriqueX;
                    briques[c][r].y = posBriqueY;
                    context.beginPath();
                    context.rect(posBriqueX, posBriqueY, largeurBrique, hauteurBrique);
                    context.fillStyle = "#0095DD";
                    context.fill();
                    context.closePath();
                }
            }
        }
    }

// Détection des collisions de briques
    function detectionCollision(){
        for(var c = 0 ; c<nombreColonnesBrique ; c++){
            for(var r=0; r<nombreLignesBrique ; r++){
                var bric=briques[c][r];
                if( bric.status==1){
                    if(x+radius > bric.x && x-radius<bric.x+largeurBrique && y-radius>bric.y && y-radius< bric.y + hauteurBrique){
                        dy= -dy;
                        briques[c][r].status=0;
                        couleurBille = '#'+Math.floor(Math.random()*16777215).toString(16); ;
                        score++;
                        if (score == nombreColonnesBrique*nombreLignesBrique){
                            finDePartie(nombreLignesBrique,nombreColonnesBrique)
                        }
                    }
                }
            }
        }
    }

//--------La raquette--------//
//fonctions suite à appuie sur une touche du clavier
    function keyDownHandler(e){
        if(e.keyCode==39){
            rightButtonPressed=true;
        }
        if(e.keyCode == 37){
            leftButtonPressed=true;
        }
    }
    function keyUpHandler(e){
        if(e.keyCode==39){
            rightButtonPressed=false;
        }
        if(e.keyCode == 37){
            leftButtonPressed=false;
        }
    }
    //fonctions de suivi du mouvement de la souris 
    function mouseMoveHandler(e) {
        var relativeX = e.clientX - elt_canvas.offsetLeft;
        if(relativeX>0 &&relativeX<elt_canvas.width){
            paddleXpos = relativeX-paddleWidth/2;
            if (paddleXpos <0)
                paddleXpos=0
            if (paddleXpos > elt_canvas.width-paddleWidth)
                paddleXpos = elt_canvas.width-paddleWidth
        }
      }

//dessin du paddle
    function drawPaddle(){
        context.beginPath();
        context.rect(paddleXpos,paddleYpos,paddleWidth,paddleHeight);
        context.fillStyle = "#0000ff";
        context.fill();
        context.closePath();
    }

//------- La Balle ---------//
//dessin de la balle 
    function drawBall(){
        context.beginPath();
        context.arc(x,y,radius,0, Math.PI*2, false);
        context.fillStyle = couleurBille;
        context.fill();
        context.closePath();
    }

//------- le score --------//
    function drawScore() {
        context.font = "26px Arial"
        context.fillStyle = "#000000";
        context.fillText("Score : " +score,8,20);
    }

//-------- le main du jeu ---------//
    function draw(){
        context.clearRect(0,0,elt_canvas.width,elt_canvas.height),
        drawBall();
        drawPaddle();
        drawBriques();
        detectionCollision();
        drawScore();

        
        x+=dx
        y+=dy
    //controle de colision de la balle avec les bords et la raquette
        if (x < radius || x+radius >elt_canvas.width){
            dx=-dx;
        }
        if (y + dy < radius){
            dy=-dy;
        }
        else if (x > paddleXpos && x < paddleXpos+paddleWidth && y+radius>paddleYpos ){
                dy= -dy*accelerationCoeficient;
            }
        else if (y > elt_canvas.height-radius){
            finDePartie(nombreLignesBrique,nombreColonnesBrique);
        }
            
        
        
        //mouvement du paddle
        if(rightButtonPressed && paddleXpos < elt_canvas.width-paddleWidth){
            paddleXpos+=vitessePaddle
        }
        if(leftButtonPressed && paddleXpos>0){
            paddleXpos-=vitessePaddle
        }
    }
    intervalGameId=setInterval(draw,10);
}




