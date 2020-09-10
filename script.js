var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var counter = 0;

function drawObject(object) {
    var currentImageIndex = counter % object.images.length;
    var currentImage = object.images[currentImageIndex];
    ctx.drawImage(currentImage, object.x - (object.width / 2), object.y - (object.height / 2), object.width, object.height);
}

var WIDTH = 900;
var HEIGHT = 900;

var fires = [];
var lastFireAt = new Date().getTime();
var fireImage = new Image(); fireImage.src = ["https://user-images.githubusercontent.com/64878501/92730112-ed484c80-f390-11ea-8ad4-4e34c1f095e6.jpg"];
function addFire(x, y) {
    var fire = {};
    fire.images = [fireImage];
    fire.x = x;
    fire.y = y;
    fire.width = 10;
    fire.height = 10;
    fire.speedX = 0;
    fire.speedY = -7;
    fire.active = true;
    fire.move = function () {
        this.y += this.speedY;
        if (this.y <= 0) {
            this.active = false;
        }
    }
    fires.push(fire);
}

function drawAndMoveFires() {
    var temp = [];
    for (var i = 0; i < fires.length; i++) {
        fires[i].move();
        drawObject(fires[i]);
        if (fires[i].active) {
            temp.push(fires[i]);
        }
    }
    fires = temp;
}

var bullets = [];
var bulletImage1 = new Image(); bulletImage1.src = ["https://user-images.githubusercontent.com/64878501/92730291-300a2480-f391-11ea-813e-4f0e3415ce92.gif"];
var bulletImage2 = new Image(); bulletImage2.src = ["https://user-images.githubusercontent.com/64878501/92730376-4c0dc600-f391-11ea-9b67-273ee614db34.gif"];

function addBullet(x, y) {
    var bullet = {};
    bullet.images = [bulletImage1, bulletImage2];
    bullet.x = x;
    bullet.y = y;
    bullet.width = 50;
    bullet.height = 50;
    bullet.speedX = 0;
    bullet.speedY = 7;
    bullet.active = true;
    bullet.move = function () {
        this.y += this.speedY;
        if (this.y >= HEIGHT) {
            this.active = false;
        }
    }
    bullets.push(bullet);
}

function drawAndMoveBullets() {
    var temp = [];
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].move();
        drawObject(bullets[i]);
        if (bullets[i].active) {
            temp.push(bullets[i]);
        }
    }
    bullets = temp;
}


var ships = [];
var shipImages = [];
var shipUrls = ["https://user-images.githubusercontent.com/64878501/92730813-ed951780-f391-11ea-8ebb-62235cadbd7d.png",
    "https://user-images.githubusercontent.com/64878501/92730818-ef5edb00-f391-11ea-9be6-7177f6a83e18.png",
    "https://user-images.githubusercontent.com/64878501/92730740-d0604900-f391-11ea-8c5d-774706533d98.png",
    "https://user-images.githubusercontent.com/64878501/92730732-cf2f1c00-f391-11ea-9e16-1b61eb8f970a.png",
    "https://user-images.githubusercontent.com/64878501/92730727-cd655880-f391-11ea-838c-a01f28a10cfa.png",
    "https://user-images.githubusercontent.com/64878501/92730717-cb9b9500-f391-11ea-92f7-c09c3a953b93.png",
    "https://user-images.githubusercontent.com/64878501/92730713-cb02fe80-f391-11ea-8e34-d75509944296.png"];


for (var i = 0; i < shipUrls.length; i++) {
    var shipImage = new Image();
    shipImage.src = shipUrls[i];
    shipImages.push(shipImage);
}


for (var i = 0; i < 8; i++) {
    var ship = {};
    ship.images = shipImages;
    ship.x = (Math.random() * 1000000) % WIDTH;
    ship.y = 0;
    ship.width = 80;
    ship.height = 80;
    ship.speedX = 1 + Math.random() * 3;
    ship.speedY = 0.7;

    ship.move = function () {
        if (this.x >= WIDTH && this.speedX > 0) {
            this.speedX = - this.speedX;
        }
        if (this.x <= 0 && this.speedX < 0) {
            this.speedX = - this.speedX;
        }
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y >= 950) {
            this.y = -50;
        }
    }

    ship.fireBullet = function () {
        if (Math.random() < 0.01)
            addBullet(this.x, this.y);
    }

    ships.push(ship);
}


var alienImages = [];
var alienImageUrls = ["https://user-images.githubusercontent.com/64878501/92731595-e9b5c500-f392-11ea-8689-281a1a5d617b.png",
 "https://user-images.githubusercontent.com/64878501/92731618-f20e0000-f392-11ea-886f-08858831eb92.png",
 "https://user-images.githubusercontent.com/64878501/92731645-fa663b00-f392-11ea-98cd-4bde0aeba359.png",
 "https://user-images.githubusercontent.com/64878501/92731684-07832a00-f393-11ea-8beb-480076a1f71d.png",
 "https://user-images.githubusercontent.com/64878501/92731700-0ce07480-f393-11ea-9918-a48677c541c7.png",
 "https://user-images.githubusercontent.com/64878501/92731716-12d65580-f393-11ea-89de-dcd584520c4e.png"];

for (var i = 0; i < alienImageUrls.length; i++) {
    var image = new Image();
    image.src = alienImageUrls[i];
    alienImages.push(image);
}

var alien = {}; alien.images = alienImages; alien.width = 100; alien.height = 100; alien.x = 300; alien.y = HEIGHT - 100; alien.speed = 7;

var keyMap = {};
keyMap[38] = { name: "up", active: false, onactive: function () { alien.y -= alien.speed; } };
keyMap[40] = { name: "down", active: false, onactive: function () { alien.y += alien.speed; } };
keyMap[37] = { name: "left", active: false, onactive: function () { alien.x -= alien.speed; } };
keyMap[39] = { name: "right", active: false, onactive: function () { alien.x += alien.speed; } };
keyMap[32] = {
    name: "space", active: false, onactive: function () {
        if (new Date().getTime() - lastFireAt > 300) {
            lastFireAt = new Date().getTime();
            addFire(alien.x, alien.y - 30);
        }
    }
};

function handleKey(event, status) {
    var currentController = keyMap[event.keyCode];
    if (!!currentController) {
        currentController.active = status;
    }
}
var isPlayingMusic = false;
function playMusicNow() {
    isPlayingMusic = true;
    var audio = new Audio('./music.mp3');
    audio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);

    audio.play();
}



document.addEventListener("keydown", function (event) {
    if (!isPlayingMusic) playMusicNow();
    handleKey(event, true);
});

document.addEventListener("keyup", function (event) {
    handleKey(event, false);
});


function update() {
    counter++;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 900, 900);

    alien.x += -2 + Math.random() * 4;
    alien.y += -2 + Math.random() * 4;

    for (var key in keyMap) {
        var currentController = keyMap[key];
        if (currentController.active) {
            currentController.onactive();
        }
    }

    drawObject(alien);
    for (var i = 0; i < ships.length; i++) {
        drawObject(ships[i]);
        ships[i].move();
        ships[i].fireBullet();
    }

    drawAndMoveBullets();
    drawAndMoveFires();

    for (var i = 0; i < fires.length; i++) {
        var fire = fires[i];
        for (var j = 0; j < ships.length; j++) {
            var ship = ships[j];
            var x1x2 = (fire.x - ship.x) * (fire.x - ship.x);
            var y1y2 = (fire.y - ship.y) * (fire.y - ship.y);
            var distance = Math.sqrt(x1x2 + y1y2);
            if (distance < ship.width - 20) {
                ship.x = (Math.random() * 10000000) % WIDTH;
                ship.speedX = 3 + Math.random() * 4;
                ship.y = 0;
                fire.acive = false;
            }
            console.log(distance);
        }
    }
}

setInterval(update, 50);
