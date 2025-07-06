// Enhanced Solar System Simulation JavaScript
let content = document.getElementsByClassName('content')[0];
let width = content.offsetWidth;
let height = content.offsetHeight;
let verticalKaificent = 0.2;
let deltaMerc = 0;
let deltaVenus = 0;
let deltaEarth = 0;
let deltaMars = 0;
let deltaJupiter = 0;
let deltaSaturn = 0;
let deltaUranus = 0;
let deltaNeptune = 0;
let deltaMoon = 0;
let n = 20;

// Animation state
let timerId;
let isAnimating = false;
let currentZoomedPlanet = null;

// Asteroid belt variables
let asteroids = [];
let asteroidBeltRadius = 280;
let asteroidBeltWidth = 15;

// Planet data for information panels
const planetData = {
    sun: {
        name: "Sun",
        type: "Star",
        distance: "0 AU",
        diameter: "1,392,700 km",
        day: "25 Earth days",
        year: "N/A",
        temp: "5,778 K (surface)",
        description: "The Sun is the star at the center of our solar system. It's a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core. The Sun is by far the most important source of energy for life on Earth."
    },
    mercury: {
        name: "Mercury",
        type: "Terrestrial Planet",
        distance: "0.39 AU",
        diameter: "4,879 km",
        day: "59 Earth days",
        year: "88 Earth days",
        temp: "427°C day / -173°C night",
        description: "Mercury is the smallest and innermost planet in our solar system. It has extreme temperature variations and no atmosphere to speak of. Its surface is heavily cratered, similar to our Moon."
    },
    venus: {
        name: "Venus",
        type: "Terrestrial Planet",
        distance: "0.72 AU",
        diameter: "12,104 km",
        day: "243 Earth days",
        year: "225 Earth days",
        temp: "462°C (surface)",
        description: "Venus is the hottest planet in our solar system due to its thick, toxic atmosphere which traps heat in a runaway greenhouse effect. It rotates backwards compared to most planets."
    },
    earth: {
        name: "Earth",
        type: "Terrestrial Planet",
        distance: "1.00 AU",
        diameter: "12,756 km",
        day: "24 hours",
        year: "365.25 days",
        temp: "15°C (average)",
        description: "Earth is the third planet from the Sun and the only known planet to harbor life. It has a protective magnetic field, breathable atmosphere, and liquid water on its surface."
    },
    mars: {
        name: "Mars",
        type: "Terrestrial Planet",
        distance: "1.52 AU",
        diameter: "6,792 km",
        day: "24.6 hours",
        year: "687 Earth days",
        temp: "-65°C (average)",
        description: "Mars is known as the Red Planet due to iron oxide on its surface. It has polar ice caps, the largest volcano in the solar system (Olympus Mons), and evidence of ancient water flows."
    },
    jupiter: {
        name: "Jupiter",
        type: "Gas Giant",
        distance: "5.20 AU",
        diameter: "142,984 km",
        day: "9.9 hours",
        year: "12 Earth years",
        temp: "-110°C (cloud tops)",
        description: "Jupiter is the largest planet in our solar system. It's a gas giant with a Great Red Spot that's a storm larger than Earth. Jupiter acts as a cosmic vacuum cleaner, protecting inner planets from asteroids and comets."
    },
    saturn: {
        name: "Saturn",
        type: "Gas Giant",
        distance: "9.58 AU",
        diameter: "120,536 km",
        day: "10.7 hours",
        year: "29 Earth years",
        temp: "-140°C (cloud tops)",
        description: "Saturn is famous for its spectacular ring system made of ice and rock particles. It's the least dense planet in our solar system and would float in water if there were an ocean large enough."
    },
    uranus: {
        name: "Uranus",
        type: "Ice Giant",
        distance: "19.20 AU",
        diameter: "51,118 km",
        day: "17.2 hours",
        year: "84 Earth years",
        temp: "-195°C (cloud tops)",
        description: "Uranus is unique because it rotates on its side, likely due to an ancient collision. It's an ice giant with a faint ring system and is composed mainly of water, methane, and ammonia ices."
    },
    neptune: {
        name: "Neptune",
        type: "Ice Giant",
        distance: "30.05 AU",
        diameter: "49,528 km",
        day: "16.1 hours",
        year: "165 Earth years",
        temp: "-200°C (cloud tops)",
        description: "Neptune is the windiest planet in our solar system, with winds reaching speeds of up to 2,100 km/h. It's a deep blue color due to methane in its atmosphere and was the first planet discovered through mathematical prediction."
    },
    "asteroid-belt": {
        name: "Asteroid Belt",
        type: "Debris Field",
        distance: "2.2 - 3.2 AU",
        diameter: "Various sizes",
        day: "N/A",
        year: "3-6 Earth years",
        temp: "-73°C to -108°C",
        description: "The asteroid belt is a region between Mars and Jupiter containing numerous rocky objects. Despite popular belief, it's mostly empty space. The largest object is Ceres, which is classified as a dwarf planet."
    }
};

// Initialize everything
spacePosition();
drawCircles();
createAsteroidBelt();
scaleHandler();
addPlanetClickHandlers();
$(window).scrollTop($(window).height());
$(window).scrollLeft($(window).width()/2);

// Element references
let $mercuryContainer = $('.mercury_container').eq(0);
let mercuryX = width/2 - $mercuryContainer[0].offsetWidth /2;
let mercuryY = height/2 - $mercuryContainer[0].offsetHeight /2;
let mercury = $('.shadow_mercury').eq(0);	

let $venusContainer = $('.venus_container').eq(0);
let venusX = width/2 - $venusContainer[0].offsetWidth /2;
let venusY = height/2 - $venusContainer[0].offsetHeight /2;
let venus = $('.shadow_venus').eq(0);	

let $earthMoonContainer = $('.earth_moon_container').eq(0);
let earthX = width/2 - $earthMoonContainer[0].offsetWidth /2;
let earthY = height/2 - $earthMoonContainer[0].offsetHeight /2;
let earth = $('.shadow_earth').eq(0);	

let $moon = $('.moon').eq(0);
let moonX = $earthMoonContainer[0].offsetWidth /2  - $moon[0].offsetWidth/2;
let moonY = $earthMoonContainer[0].offsetHeight /2 - $moon[0].offsetHeight/2;

let $marsContainer = $('.mars_container').eq(0);
let marsX = width/2 - $marsContainer[0].offsetWidth /2;
let marsY = height/2 - $marsContainer[0].offsetHeight /2;
let mars = $('.shadow_mars').eq(0);	

let $jupiterContainer = $('.jupiter_container').eq(0);
let jupiterX = width/2 - $jupiterContainer[0].offsetWidth /2;
let jupiterY = height/2 - $jupiterContainer[0].offsetHeight /2;
let jupiter = $('.shadow_jupiter').eq(0);	

let $saturnRingContainer = $('.saturn_ring_container').eq(0);
let saturnX = width/2 - $saturnRingContainer[0].offsetWidth /2;
let saturnY = height/2 - $saturnRingContainer[0].offsetHeight /2;
let saturn = $('.shadow_saturn').eq(0);	

let $ringContainer = $('.ring_container').eq(0);

let $uranusContainer = $('.uranus_container').eq(0);
let uranusX = width/2 - $uranusContainer[0].offsetWidth /2;
let uranusY = height/2 - $uranusContainer[0].offsetHeight /2;
let uranus = $('.shadow_uranus').eq(0);	

let $neptuneContainer = $('.neptune_container').eq(0);
let neptuneX = width/2 - $neptuneContainer[0].offsetWidth /2;
let neptuneY = height/2 - $neptuneContainer[0].offsetHeight /2;
let neptune = $('.shadow_neptune').eq(0);	

function spacePosition(){
    let sun = document.getElementsByClassName('sun')[0];
    sun.style.top = (height/2 - sun.offsetHeight /2 ) + 'px';
    sun.style.left = (width/2 - sun.offsetWidth /2 ) + 'px';

    let mercuryContainer = document.getElementsByClassName('mercury_container')[0];
    let Rmercury = 90;
    mercuryContainer.style.top = (height/2 - mercuryContainer.offsetHeight /2 ) + 'px';
    mercuryContainer.style.left = (width/2 - mercuryContainer.offsetWidth /2 + Rmercury ) + 'px';

    let venusContainer = document.getElementsByClassName('venus_container')[0];
    let Rvenus = 130;
    venusContainer.style.top = (height/2 - venusContainer.offsetHeight /2 ) + 'px';
    venusContainer.style.left = (width/2 - venusContainer.offsetWidth /2 + Rvenus ) + 'px';

    let earthMoonContainer = document.getElementsByClassName('earth_moon_container')[0];
    let Rearth = 185;
    earthMoonContainer.style.top = (height/2 - earthMoonContainer.offsetHeight /2 ) + 'px';
    earthMoonContainer.style.left = (width/2 - earthMoonContainer.offsetWidth /2 + Rearth ) + 'px';
    
    let moon = document.getElementsByClassName('moon')[0];
    let Rmoon = 28;
    moon.style.top = (earthMoonContainer.offsetHeight /2  - moon.offsetHeight/2) + 'px';
    moon.style.left = (earthMoonContainer.offsetWidth /2 - moon.offsetWidth/2 + Rmoon ) + 'px';

    let marsContainer = document.getElementsByClassName('mars_container')[0];
    let Rmars = 240;
    marsContainer.style.top = (height/2 - marsContainer.offsetHeight /2 ) + 'px';
    marsContainer.style.left = (width/2 - marsContainer.offsetWidth /2 + Rmars ) + 'px';

    let jupiterContainer = document.getElementsByClassName('jupiter_container')[0];
    let Rjupiter = 320;
    jupiterContainer.style.top = (height/2 - jupiterContainer.offsetHeight /2 ) + 'px';
    jupiterContainer.style.left = (width/2 - jupiterContainer.offsetWidth /2 + Rjupiter ) + 'px';

    let Rsaturn = 430;
    let saturnRingContainer = document.getElementsByClassName('saturn_ring_container')[0];
    saturnRingContainer.style.top = (height/2 - saturnRingContainer.offsetHeight /2 ) + 'px';
    saturnRingContainer.style.left = (width/2 - saturnRingContainer.offsetWidth /2 + Rsaturn ) + 'px';

    let uranusContainer = document.getElementsByClassName('uranus_container')[0];
    let Ruranus = 510;
    uranusContainer.style.top = (height/2 - uranusContainer.offsetHeight /2 ) + 'px';
    uranusContainer.style.left = (width/2 - uranusContainer.offsetWidth /2 + Ruranus ) + 'px';

    let neptuneContainer = document.getElementsByClassName('neptune_container')[0];
    let Rneptune = 560;
    neptuneContainer.style.top = (height/2 - neptuneContainer.offsetHeight /2 ) + 'px';
    neptuneContainer.style.left = (width/2 - neptuneContainer.offsetWidth /2 + Rneptune ) + 'px';
}

// Enhanced start/stop functionality
let start = document.getElementById('start');
start.onclick = function(){
    if (!isAnimating) {
        timerId = setInterval(move, 20);
        isAnimating = true;
        start.textContent = 'Running';
        start.style.background = '#4CAF50';
    }
};

let stop = document.getElementById('stop');
stop.onclick = function(){
    if (isAnimating) {
        clearInterval(timerId);
        isAnimating = false;
        start.textContent = 'Start';
        start.style.background = '#333';
    }
};

function move(){
    moveEarth();
    moveMercury();
    moveVenus();
    moveMars();
    moveJupiter();
    moveSaturn();
    moveUranus();
    moveNeptune();
    moveMoon();
    moveAsteroids();
}

function moveMercury(){
    let alpha = Math.PI*deltaMerc/180;
    $mercuryContainer.css('top', mercuryY + 90 * Math.sin(alpha)* verticalKaificent);
    $mercuryContainer.css('left', mercuryX + 90 * Math.cos(alpha));
    mercury.css('transform','rotate(' + deltaMerc + 'deg)');
    if (deltaMerc<180) {
        $mercuryContainer.css('z-index', 11);
    }else{
        $mercuryContainer.css('z-index', 9);
    }
    deltaMerc+=47.87/n;	
    if(deltaMerc>360){deltaMerc-=360;}
}

function moveVenus(){
    let alpha = Math.PI*deltaVenus/180;
    $venusContainer.css('top', venusY + 130 * Math.sin(alpha)* verticalKaificent);
    $venusContainer.css('left', venusX + 130 * Math.cos(alpha));
    venus.css('transform','rotate(' + deltaVenus + 'deg)');
    if (deltaVenus<180) {
        $venusContainer.css('z-index', 12);
    }else{
        $venusContainer.css('z-index', 8);
    }
    deltaVenus+=35.02/n;	
    if(deltaVenus>360){deltaVenus-=360;}
}

function moveEarth(){
    let alpha = Math.PI*deltaEarth/180;
    $earthMoonContainer.css('top', earthY + 185 * Math.sin(alpha)* verticalKaificent);
    $earthMoonContainer.css('left', earthX + 185 * Math.cos(alpha));
    earth.css('transform','rotate(' + deltaEarth + 'deg)');
    if ((deltaEarth<180)) {
        $earthMoonContainer.css('z-index', 13);
    }else{
        $earthMoonContainer.css('z-index', 7);
    }
    deltaEarth+=29.78/n;	
    if(deltaEarth>360){deltaEarth-=360;}
}

function moveMoon(){
    let alpha = Math.PI*deltaMoon/180;
    $moon.css('top', moonY + 28 * Math.sin(alpha)* verticalKaificent);
    $moon.css('left', moonX + 28 * Math.cos(alpha));
    if (deltaMoon<180) {
        $moon.css('z-index', 11);
    }else{
        $moon.css('z-index', 9);
    }
    deltaMoon += 340/n;
    if(deltaMoon>360){deltaMoon-=360;}
}

function moveMars(){
    let alpha = Math.PI*deltaMars/180;
    $marsContainer.css('top', marsY + 240 * Math.sin(alpha)* verticalKaificent);
    $marsContainer.css('left', marsX + 240 * Math.cos(alpha));
    mars.css('transform','rotate(' + deltaMars + 'deg)');
    if (deltaMars<180) {
        $marsContainer.css('z-index', 14);
    }else{
        $marsContainer.css('z-index', 6);
    }
    deltaMars+=24.077/n;	
    if(deltaMars>360){deltaMars-=360;}
}

function moveJupiter(){
    let alpha = Math.PI*deltaJupiter/180;
    $jupiterContainer.css('top', jupiterY + 320 * Math.sin(alpha)* verticalKaificent);
    $jupiterContainer.css('left', jupiterX + 320 * Math.cos(alpha));
    jupiter.css('transform','rotate(' + deltaJupiter + 'deg)');
    if (deltaJupiter<180) {
        $jupiterContainer.css('z-index', 15);
    }else{
        $jupiterContainer.css('z-index', 5);
    }
    deltaJupiter += 13.07/n;	
    if(deltaJupiter>360){deltaJupiter-=360;}
}

function moveSaturn(){
    let alpha = Math.PI*deltaSaturn/180;
    $saturnRingContainer.css('top', saturnY + 430 * Math.sin(alpha)* verticalKaificent);
    $saturnRingContainer.css('left', saturnX + 430 * Math.cos(alpha));
    saturn.css('transform','rotate(' + deltaSaturn + 'deg)');
    if (deltaSaturn<180){
        $saturnRingContainer.css('z-index', 16);
    }else{
        $saturnRingContainer.css('z-index', 4);
    }
    deltaSaturn += 9.69/n;	
    if(deltaSaturn>360){deltaSaturn-=360;}
}

function moveUranus(){
    let alpha = Math.PI*deltaUranus/180;
    $uranusContainer.css('top', uranusY + 510 * Math.sin(alpha)* verticalKaificent);
    $uranusContainer.css('left', uranusX + 510 * Math.cos(alpha));
    uranus.css('transform','rotate(' + deltaUranus + 'deg)');
    if (deltaUranus<180){
        $uranusContainer.css('z-index', 17);
    }else{
        $uranusContainer.css('z-index', 3);
    }
    deltaUranus+=6.81/n;	
    if(deltaUranus>360){deltaUranus-=360;}
}

function moveNeptune(){
    let alpha = Math.PI*deltaNeptune/180;
    $neptuneContainer.css('top', neptuneY + 560 * Math.sin(alpha)* verticalKaificent);
    $neptuneContainer.css('left', neptuneX + 560 * Math.cos(alpha));
    neptune.css('transform','rotate(' + deltaNeptune + 'deg)');
    if (deltaNeptune<180){
        $neptuneContainer.css('z-index', 17);
    }else{
        $neptuneContainer.css('z-index', 3);
    }
    deltaNeptune+=5.43/n;	
    if(deltaNeptune>360){deltaNeptune-=360;}
}

function drawCircles(){
    let mercuryCircle = $('.mercury_circle').eq(0);
    mercuryCircle.css('left', width/2 - 90);
    mercuryCircle.css('top', height/2 - 90*verticalKaificent);
    mercuryCircle.css('width', 90*2);
    mercuryCircle.css('height', 90*2*verticalKaificent);

    let venusCircle = $('.venus_circle').eq(0);
    venusCircle.css('left', width/2 - 130);
    venusCircle.css('top', height/2 - 130*verticalKaificent);
    venusCircle.css('width', 130*2);
    venusCircle.css('height', 130*2*verticalKaificent);

    let earthCircle = $('.earth_circle').eq(0);
    earthCircle.css('left', width/2 - 185);
    earthCircle.css('top', height/2 - 185*verticalKaificent);
    earthCircle.css('width', 185*2);
    earthCircle.css('height', 185*2*verticalKaificent);

    let marsCircle = $('.mars_circle').eq(0);
    marsCircle.css('left', width/2 - 240);
    marsCircle.css('top', height/2 - 240*verticalKaificent );
    marsCircle.css('width', 240*2);
    marsCircle.css('height', 240*2*verticalKaificent);

    let jupiterCircle = $('.jupiter_circle').eq(0);
    jupiterCircle.css('left', width/2 - 320);
    jupiterCircle.css('top', height/2 - 320*verticalKaificent);
    jupiterCircle.css('width', 320*2);
    jupiterCircle.css('height', 320*2*verticalKaificent);

    let saturnCircle = $('.saturn_circle').eq(0);
    saturnCircle.css('left', width/2 - 430);
    saturnCircle.css('top', height/2 - 430*verticalKaificent);
    saturnCircle.css('width', 430*2);
    saturnCircle.css('height', 430*2*verticalKaificent);
    
    let saturnRing = $('.gif_ring').eq(0);
    saturnRing.css('height', 60*2* verticalKaificent);

    let uranusCircle = $('.uranus_circle').eq(0);
    uranusCircle.css('left', width/2 - 510);
    uranusCircle.css('top', height/2 - 510*verticalKaificent);
    uranusCircle.css('width', 510*2);
    uranusCircle.css('height', 510*2*verticalKaificent);

    let neptuneCircle = $('.neptune_circle').eq(0);
    neptuneCircle.css('left', width/2 - 560);
    neptuneCircle.css('top', height/2 - 560*verticalKaificent);
    neptuneCircle.css('width', 560*2);
    neptuneCircle.css('height', 560*2*verticalKaificent);
}

function createAsteroidBelt() {
    let asteroidBelt = document.querySelector('.asteroid_belt');
    let numAsteroids = 80;
    
    for (let i = 0; i < numAsteroids; i++) {
        let asteroid = document.createElement('div');
        let size = Math.random();
        let className = 'asteroid';
        
        if (size > 0.8) {
            className += ' asteroid-large';
        } else if (size > 0.4) {
            className += ' asteroid-medium';
        } else {
            className += ' asteroid-small';
        }
        
        asteroid.className = className;
        
        let angle = Math.random() * 2 * Math.PI;
        let radius = asteroidBeltRadius + (Math.random() - 0.5) * asteroidBeltWidth;
        let speed = 0.15 + Math.random() * 0.3;
        
        asteroids.push({
            element: asteroid,
            angle: angle,
            radius: radius,
            speed: speed,
            originalRadius: radius
        });
        
        asteroidBelt.appendChild(asteroid);
    }
}

function moveAsteroids() {
    asteroids.forEach(function(asteroid) {
        asteroid.angle += asteroid.speed / n;
        if (asteroid.angle > 2 * Math.PI) {
            asteroid.angle -= 2 * Math.PI;
        }
        
        let constrainedRadius = Math.max(250, Math.min(310, asteroid.radius));
        
        let x = width/2 + constrainedRadius * Math.cos(asteroid.angle);
        let y = height/2 + constrainedRadius * Math.sin(asteroid.angle) * verticalKaificent;

        asteroid.element.style.left = (x - asteroid.element.offsetWidth / 2) + 'px';
        asteroid.element.style.top = (y - asteroid.element.offsetHeight / 2) + 'px';

        x = Math.max(50, Math.min(width - 50, x));
        y = Math.max(50, Math.min(height - 50, y));
        
        if (asteroid.angle < Math.PI) {
            asteroid.element.style.zIndex = 10;
        } else {
            asteroid.element.style.zIndex = 6;
        }
    });
}

function updateAsteroidPositions() {
    asteroids.forEach(function(asteroid) {
        let constrainedRadius = Math.max(250, Math.min(310, asteroid.radius));
        
        let x = width/2 + constrainedRadius * Math.cos(asteroid.angle);
        let y = height/2 + constrainedRadius * Math.sin(asteroid.angle) * verticalKaificent;
        
        x = Math.max(50, Math.min(width - 50, x));
        y = Math.max(50, Math.min(height - 50, y));
        
        asteroid.element.style.left = (x - 1) + 'px';
        asteroid.element.style.top = (y - 1) + 'px';
    });
}

function scaleHandler(){
    let currentMousePos = { x: -1, y: -1 };
    let isDragged = false;

    $(document).mousemove(function(event) {
        if(!isDragged){
            currentMousePos.x = event.pageX;
            currentMousePos.y = event.pageY;
        }
        else{
            let delta = (event.pageY - currentMousePos.y)/10000 + verticalKaificent;
            if( delta <= 1 && delta >=0 ){
                verticalKaificent = delta;
            }
            drawCircles();
            $mercuryContainer.css('top', mercuryY + 90 * Math.sin(Math.PI*deltaMerc/180)* verticalKaificent);
            $venusContainer.css('top', venusY + 130 * Math.sin(Math.PI*deltaVenus/180)* verticalKaificent);
            $earthMoonContainer.css('top', earthY + 185 * Math.sin(Math.PI*deltaEarth/180)* verticalKaificent);
            $moon.css('top', moonY + 28 * Math.sin(Math.PI*deltaMoon/180)* verticalKaificent);
            $marsContainer.css('top', marsY + 240 * Math.sin(Math.PI*deltaMars/180)* verticalKaificent);
            $jupiterContainer.css('top', jupiterY + 320 * Math.sin(Math.PI*deltaJupiter/180)* verticalKaificent);
            $saturnRingContainer.css('top', saturnY + 430 * Math.sin(Math.PI*deltaSaturn/180)* verticalKaificent);
            $uranusContainer.css('top', uranusY + 510 * Math.sin(Math.PI*deltaUranus/180)* verticalKaificent);
            $neptuneContainer.css('top', neptuneY + 560 * Math.sin(Math.PI*deltaNeptune/180)* verticalKaificent);
            updateAsteroidPositions();
        }
    });

    $(document).mousedown(function() { 	
        isDragged = true;
        $('body').css('cursor','-webkit-grabbing');
    });

    $(document).mouseup(function() {
        isDragged = false;
        $('body').css('cursor','-webkit-grab');
    });
}

// Enhanced planet interaction system
function addPlanetClickHandlers() {
    // Add click handlers for all planets
    $('[data-planet]').on('click', function(e) {
        e.stopPropagation();
        let planetName = $(this).data('planet');
        showPlanetInfo(planetName, this);
    });
}

function showPlanetInfo(planetName, element) {
    if (currentZoomedPlanet === planetName) {
        resetView();
        return;
    }
    
    // Reset previous zoom
    if (currentZoomedPlanet) {
        resetView();
    }
    
    currentZoomedPlanet = planetName;
    
    // Add zoom effect
    $(element).addClass('zoomed highlight');
    
    // Dim other planets
    $('[data-planet]').not(element).addClass('dimmed');
    $('.circles > div').addClass('dimmed');
    
    // Show planet info
    displayPlanetInfo(planetName);
    
    // Show back button
    $('#backToSystem').addClass('visible');
    
    // Pause animation for better viewing
    if (isAnimating) {
        clearInterval(timerId);
    }
}

function displayPlanetInfo(planetName) {
    let data = planetData[planetName];
    if (!data) return;
    
    $('#planetName').text(data.name);
    $('#planetType').text(data.type);
    $('#planetDistance').text(data.distance);
    $('#planetDiameter').text(data.diameter);
    $('#planetDay').text(data.day);
    $('#planetYear').text(data.year);
    $('#planetTemp').text(data.temp);
    $('#planetDescription').text(data.description);
    
    $('#planetInfo').addClass('visible');
}

function closePlanetInfo() {
    $('#planetInfo').removeClass('visible');
    resetView();
}

function resetView() {
    // Remove zoom and effects
    $('[data-planet]').removeClass('zoomed highlight dimmed');
    $('.circles > div').removeClass('dimmed');
    
    // Hide UI elements
    $('#planetInfo').removeClass('visible');
    $('#backToSystem').removeClass('visible');
    
    // Resume animation
    if (!isAnimating) {
        timerId = setInterval(move, 20);
        isAnimating = true;
        start.textContent = 'Running';
        start.style.background = '#4CAF50';
    }
    
    currentZoomedPlanet = null;
}

// UI Event Handlers
$(document).ready(function() {
    $('#backToSystem').on('click', resetView);
    $('#closePlanetInfo').on('click', closePlanetInfo);
    
    // Close planet info when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#planetInfo, [data-planet]').length) {
            if (currentZoomedPlanet) {
                resetView();
            }
        }
    });
});

// Speed control
let speedSlider = document.getElementById('speedSlider');
if (speedSlider) {
    speedSlider.oninput = function() {
        n = parseInt(this.value);
        document.getElementById('speedValue').textContent = n;
    };
}

// Keyboard controls
$(document).keydown(function(e) {
    switch(e.which) {
        case 32: // Space bar - pause/resume
            e.preventDefault();
            if (isAnimating) {
                stop.click();
            } else {
                start.click();
            }
            break;
        case 27: // Escape - reset view
            if (currentZoomedPlanet) {
                resetView();
            }
            break;
    }
});

// Window resize handler
$(window).resize(function() {
    width = content.offsetWidth;
    height = content.offsetHeight;
    
    // Recalculate all positions
    spacePosition();
    drawCircles();
    updateAsteroidPositions();
});