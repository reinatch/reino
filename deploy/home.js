window.addEventListener("resize", function () {
    const body = document.querySelector("body");
    resizeCanvas(body.clientWidth, window.innerHeight);
    setLinesPosition();
});

let lineLeft, lineRight, lineTop, lineBottom;
let crossLeft, crossRight, crossTop, crossBottom;
let arcLargeTopLeft, arcLargeTopRight, arcLargeBottomLeft, arcLargeBottomRight;
let smallArcRadius, largeArcRadius;

const sideMargin = 24;
const topMargin = 48;

const crossSpeed = 0.05;
const lineSpeed = 0.05;
const arcSpeed = 0.05;

let linesAnimationFinished = false;
let artistsOpen = false;

// Mobile
let currentIndex = 0;
let slideshowInterval = null;
window.addEventListener("DOMContentLoaded", function() {
    if (window.innerWidth < 768) {
        setSlideshowInterval();

        const cardsContainer = document.querySelector(".home__cards");
        const slides = document.querySelectorAll(".overlapping-card");
        
        // Handle Touch
        var xDown = null;

        cardsContainer.addEventListener('touchstart', handleTouchStart, false);
        cardsContainer.addEventListener('touchmove', handleTouchMove, false);

        function handleTouchMove(evt) {
            if (!yDown) {
                return;
            }

            var yUp = evt.touches[0].clientY;
            var yDiff = yDown - yUp;

            if (yDiff > 0) {
                /* down swipe */
                currentIndex = currentIndex == 0 ? slides.length - 1 : currentIndex - 1;
                updateSlideshowPosition();
                setSlideshowInterval();
            } else {
                /* up swipe */
                /* bottom swipe */
                currentIndex = currentIndex == slides.length - 1 ? 0 : currentIndex + 1;
                updateSlideshowPosition();
                setSlideshowInterval();
            }
            
            /* reset values */
            yDown = null;
        };

        function getTouches(evt) {
            return evt.touches || evt.originalEvent.touches;
        }

        function handleTouchStart(evt) {
            const firstTouch = getTouches(evt)[0];
            xDown = firstTouch.clientX;
            yDown = firstTouch.clientY;
        }; 
    }
});

function setSlideshowInterval() {
    clearInterval(slideshowInterval);
    slideshowInterval = setInterval(() => {
        const cardsContainer = document.querySelector(".home__cards");
        const slides = document.querySelectorAll(".overlapping-card");

        currentIndex = currentIndex == slides.length - 1 ? 0 : currentIndex + 1;
        cardsContainer.setAttribute("data-current-index", currentIndex);
        updateSlideshowPosition();
    }, 3000);
}

function updateSlideshowPosition() {
    const cards = document.querySelectorAll(".overlapping-card");

    cards.forEach(card => {
        card.classList.remove("first", "second", "third");
        if (card.getAttribute("data-index") == currentIndex) {
            card.classList.add("first");
        } else if (card.getAttribute("data-index") - 1 == currentIndex)  {
            card.classList.add("second");
        } else if (card.getAttribute("data-index") - 2 == currentIndex)  {
            card.classList.add("third");
        }
    });
}

function setup() {
    const body = document.querySelector("body");
    const cnv = createCanvas(body.clientWidth, window.innerHeight);
    cnv.parent("home-lines");

    setLinesPosition();
    noFill();

    pixelDensity(displayDensity());

    stroke("#12203F");
};

function draw() {
    clear();
    
    calculateLinesCoordinates();

    // Draw lines
    line(lineLeft.x1, lineLeft.y1, lineLeft.x2, lineLeft.y2);
    line(lineRight.x1, lineRight.y1, lineRight.x2, lineRight.y2);

    // Draw Cross
    line(crossLeft.x1, crossLeft.y1, crossLeft.x2, crossLeft.y2);
    line(crossRight.x1, crossRight.y1, crossRight.x2, crossRight.y2);

    if (millis() > 200) {
        arc(arcLargeTopLeft.x, arcLargeTopLeft.y, arcLargeTopLeft.radius, arcLargeTopLeft.radius, arcLargeTopLeft.start, arcLargeTopLeft.end);
        arc(arcLargeTopRight.x, arcLargeTopRight.y, arcLargeTopRight.radius, arcLargeTopRight.radius, arcLargeTopRight.start, arcLargeTopRight.end);
        arc(arcLargeBottomLeft.x, arcLargeBottomLeft.y, arcLargeBottomLeft.radius, arcLargeBottomLeft.radius, arcLargeBottomLeft.start, arcLargeBottomLeft.end);
        arc(arcLargeBottomRight.x, arcLargeBottomRight.y, arcLargeBottomRight.radius, arcLargeBottomRight.radius, arcLargeBottomRight.start, arcLargeBottomRight.end);
    }
    
    if (millis() > 1200) {
        linesAnimationFinished = true;
    }
}

function calculateLinesCoordinates() {
    // Cross Right
    if (millis() > 900) {
        crossRight.x2 = lerp(crossRight.x2, crossRight.targetX2, crossSpeed);
        crossRight.y2 = lerp(crossRight.y2, crossRight.targetY2, crossSpeed);
        crossRight.x1 = lerp(crossRight.x1, crossRight.targetX1, crossSpeed);
        crossRight.y1 = lerp(crossRight.y1, crossRight.targetY1, crossSpeed);
    }
    
    // Cross Left
    if (millis() > 1600) {
        crossLeft.x2 = lerp(crossLeft.x2, crossLeft.targetX2, crossSpeed);
        crossLeft.y2 = lerp(crossLeft.y2, crossLeft.targetY2, crossSpeed);
        crossLeft.x1 = lerp(crossLeft.x1, crossLeft.targetX1, crossSpeed);
        crossLeft.y1 = lerp(crossLeft.y1, crossLeft.targetY1, crossSpeed);
    }
    
    if (millis() > 1300) {
        // Line Left
        lineLeft.x2 = lerp(lineLeft.x2, lineLeft.targetX2, lineSpeed);
        lineLeft.y2 = lerp(lineLeft.y2, lineLeft.targetY2, lineSpeed);
        lineLeft.x1 = lerp(lineLeft.x1, lineLeft.targetX1, lineSpeed);
        lineLeft.y1 = lerp(lineLeft.y1, lineLeft.targetY1, lineSpeed);

        // Line Right
        lineRight.x2 = lerp(lineRight.x2, lineRight.targetX2, lineSpeed);
        lineRight.y2 = lerp(lineRight.y2, lineRight.targetY2, lineSpeed);
        lineRight.x1 = lerp(lineRight.x1, lineRight.targetX1, lineSpeed);
        lineRight.y1 = lerp(lineRight.y1, lineRight.targetY1, lineSpeed);
    }
    
    // Arc Top Left
    if (millis() > 200) {
        arcLargeTopLeft.start = lerp(arcLargeTopLeft.start, arcLargeTopLeft.targetStart, arcSpeed);
        arcLargeTopLeft.end = lerp(arcLargeTopLeft.end, arcLargeTopLeft.targetEnd, arcSpeed);
    }

    // Arc Top Right
    if (millis() > 500) {
        arcLargeTopRight.start = lerp(arcLargeTopRight.start, arcLargeTopRight.targetStart, arcSpeed);
        arcLargeTopRight.end = lerp(arcLargeTopRight.end, arcLargeTopRight.targetEnd, arcSpeed);
    }

    // Arc Bottom Right
    if (millis() > 800) {
        arcLargeBottomRight.start = lerp(arcLargeBottomRight.start, arcLargeBottomRight.targetStart, arcSpeed);
        arcLargeBottomRight.end = lerp(arcLargeBottomRight.end, arcLargeBottomRight.targetEnd, arcSpeed);
    }
    
    // Arc Bottom Left
    if (millis() > 1100) {
        arcLargeBottomLeft.start = lerp(arcLargeBottomLeft.start, arcLargeBottomLeft.targetStart, arcSpeed);
        arcLargeBottomLeft.end = lerp(arcLargeBottomLeft.end, arcLargeBottomLeft.targetEnd, arcSpeed);
    }
}

function setLinesPosition() {
    // Create lines (boundaries)
    lineLeft = {
        targetX1: sideMargin,
        targetY1: topMargin * 2,
        targetX2: sideMargin,
        targetY2: height - topMargin * 2,
        x1: sideMargin,
        y1: height / 2,
        x2: sideMargin,
        y2: height / 2
    };
    lineRight = {
        targetX1: width - sideMargin,
        targetY1: topMargin * 2,
        targetX2: width - sideMargin,
        targetY2: height - topMargin * 2,
        x1: width - sideMargin,
        y1: height / 2,
        x2: width - sideMargin,
        y2: height / 2
    };

    // Create cross
    crossLeft = {
        targetX1: sideMargin,
        targetY1: height / 2,
        targetX2: width / 4 - sideMargin * 2,
        targetY2: height / 2,
        x1: width / 4 - sideMargin * 2,
        y1: height / 2,
        x2: width / 4 - sideMargin * 2,
        y2: height / 2
    };
    crossRight = {
        targetX1: width / 4 * 3 + sideMargin * 2,
        targetY1: height / 2,
        targetX2: width - sideMargin,
        targetY2: height / 2,
        x1: width / 4 * 3 + sideMargin * 2,
        y1: height / 2,
        x2: width / 4 * 3 + sideMargin * 2,
        y2: height / 2
    };

    // Arcs
    arcLargeTopRight = {
        x: width / 2,
        y: height / 2,
        radius: window.innerHeight - topMargin * 4.5,
        start: radians(280),
        end: radians(280),
        targetStart: radians(280),
        targetEnd: radians(350),
    }

    arcLargeTopLeft = {
        x: width / 2,
        y: height / 2,
        radius: window.innerHeight - topMargin * 4.5,
        start: radians(190),
        end: radians(190),
        targetStart: radians(190),
        targetEnd: radians(260),
    }

    arcLargeBottomRight = {
        x: width / 2,
        y: height / 2,
        radius: window.innerHeight - topMargin * 4.5,
        start: radians(10),
        end: radians(10),
        targetStart: radians(10),
        targetEnd: radians(80),
    }

    arcLargeBottomLeft = {
        x: width / 2,
        y: height / 2,
        radius: window.innerHeight - topMargin * 4.5,
        start: radians(100),
        end: radians(100),
        targetStart: radians(100),
        targetEnd: radians(170),
    }
}


// Bullets
let randomInsideRotationIncrement = 0;
let isHovering = false;
window.addEventListener("DOMContentLoaded",  function() {
    if (window.innerWidth > 768) {
        distributeBulletsInside();
        distributeBulletsOutside();
    }

    // Continuous Rotation
    setInterval(() => {
        if (!isHovering) {
            randomInsideRotationIncrement += 0.6;
        }
    }, 300);


    setTimeout(() => {
        const bullets = document.querySelectorAll(".bullet");
        bullets.forEach(bullet => {
            bullet.classList.add("visible");
        })
    }, 3000);
});

// Wrap the event listener functions with debounce
let rotationIntervalsInside = [];
let rotationIntervalsOutside = [];
const debounceScrollDistributeBulletsInside = debounce(distributeBulletsInside, 100); // Adjust the delay as needed
const debounceDistributeBulletsInside = debounce(distributeBulletsInside, 600); // Adjust the delay as needed
const debounceDistributeBulletsOutside = debounce(distributeBulletsOutside, 600); // Adjust the delay as needed

window.addEventListener("resize",  function() {
    if (window.innerWidth > 768) {
        debounceDistributeBulletsInside();
        debounceDistributeBulletsOutside();
    }
});

// Artists Distribution
let minCircleSize = 200;
let maxCircleSize = 0;
let numberOfCircles = 5;
async function distributeBulletsInside() {
    await rotationIntervalsInside.forEach(async (interval) => {
        await clearInterval(interval);
    })


    minCircleSize = topMargin * 4;
    maxCircleSize = window.innerHeight - topMargin * 5.5;
    const bullets = document.querySelectorAll(".bullet");
    let artists = [];

    let usedPositions = [];
    
    randomInsideRotationIncrement = 0;

    // Set objects based on circle numbers
    for (let i = 1; i <= numberOfCircles; i++) {
        usedPositions.push([])
    }

    // Set Video Player
    usedPositions[2].push(45);
    usedPositions[3].push(30);
    usedPositions[3].push(45);
    usedPositions[3].push(60);
    usedPositions[4].push(45);

    for await (const bullet of bullets) {
        
        if (bullet.getAttribute("data-category") == "artist") {
            artists.push(bullet);

            const artistTitle = bullet.nextElementSibling;
            const artistImage = artistTitle?.nextElementSibling;
            
            const randomRadiusPosition = weightedRandomNumber(1, numberOfCircles);
            const diameter = mapValue(randomRadiusPosition, 1, numberOfCircles, minCircleSize, maxCircleSize);

            bullet.style.setProperty("--radius", diameter / 2 + "px");
            artistTitle.style.setProperty("--radius", diameter / 2 + "px");
            artistImage.style.setProperty("--radius", diameter / 2 + "px");

            // set Random Rotation between quadrants
            let randomRadialPosition = Math.ceil(Math.random() * 360);
            
            // Check for close values within the specific array object
            let tries = 0;
            while (true) {
                if (tries > 600) {
                    break;
                } 

                randomRadialPosition = Math.ceil(Math.random() * 360);

                const positionsArray = usedPositions[randomRadiusPosition - 1];
                let isClose = false;

                let threshold = 15;
                switch (randomRadiusPosition) {
                    case 1:
                        threshold = 30;
                        break;
                    case 2:
                        threshold = 26;
                        break;
                    case 3:
                        threshold = 22;
                        break;
                    case 4:
                        threshold = 20;
                        break;
                    case 5:
                        threshold = 12;
                        break;
                }
                for (const position of positionsArray) {
                    if (Math.abs(randomRadialPosition - position) < threshold) {
                        isClose = true;
                        break;
                    }
                }

                if (!isClose) {
                    usedPositions[randomRadiusPosition - 1].push(randomRadialPosition);
                    break;
                }
                tries++;
            }

            // Set Random Rotation between quadrants
            bullet.style.setProperty("--radialRotation", randomRadialPosition + "deg");
            artistTitle.style.setProperty("--radialPosition", randomRadialPosition);
            artistImage.style.setProperty("--radialPosition", randomRadialPosition);
            artistTitle.style.setProperty("--radialRotation", randomRadialPosition + "deg");
            artistImage.style.setProperty("--radialRotation", randomRadialPosition + "deg");
            

            // Set Image Random Position
            const positions = ["top-left", "top-right", "bottom-left", "bottom-right"];
            const randomImagePosition = positions[Math.floor(Math.random() * positions.length)];
            artistImage.classList.add(randomImagePosition);

            artistTitle.classList.add(randomImagePosition);

            rotationIntervalsInside.push( setInterval(() => {
                bullet.style.setProperty("--radialRotation", randomRadialPosition + randomInsideRotationIncrement + "deg");
                artistTitle.style.setProperty("--radialRotation", randomRadialPosition + randomInsideRotationIncrement + "deg");
                artistImage.style.setProperty("--radialRotation", randomRadialPosition + randomInsideRotationIncrement + "deg");
            }, 300));
        }

        // Wait for lines animation to finish and Draw Bullets
        var linesAnimationInterval = setInterval(() => {
            if (linesAnimationFinished) {
                if (bullet.getAttribute("data-category") == "artist") {
                    this.setTimeout(() => {
                        bullet.classList.add("visible");
                    }, Math.random() * 300);

                    
                } else {
                    this.setTimeout(() => {
                        bullet.classList.add("visible");
                    }, (Math.random() * 300) + 1200);
                }
                this.clearInterval(linesAnimationInterval);
            }
        }, 100);
    }
}

// Distribute Bullets Outside
let numberOfOuterCircles = 5;
let maxOuterCircleSize = 0;
let minOuterCircleSize = 200;

async function distributeBulletsOutside() {
    rotationIntervalsOutside.forEach(interval => {
        clearInterval(interval);
    })

    minOuterCircleSize = window.innerHeight - topMargin * 2.5;
    maxOuterCircleSize = window.innerWidth - topMargin * 2;
    const bullets = document.querySelectorAll(".bullet");
    let secondary = [];

    let usedOuterPositions = [];

    // Continuous Rotation

    // Set objects based on circle numbers
    for (let i = 1; i <= numberOfOuterCircles; i++) {
        usedOuterPositions.push([])
    }

    for (const bullet of bullets) {
        if (bullet.getAttribute("data-category") != "artist") {
            secondary.push(bullet);

            // Check for close values within the specific array object
            let side = "left";
            let tries = 0;
            while (true) {
                
                if (tries > 500) {
                    break;
                } 
                
                const randomRadiusPosition = Math.ceil( Math.random() * numberOfOuterCircles);

                switch (randomRadiusPosition) {
                    case 1:
                        threshold = 30;
                        break;
                    case 2:
                        threshold = 26;
                        break;
                    case 3:
                        threshold = 22;
                        break;
                    case 4:
                        threshold = 20;
                        break;
                    case 5:
                        threshold = 12;
                        break;
                }
                
                // If is first level
                let randomRadialPosition = 90;
                if (randomRadiusPosition > 1) {
                    // set Random Side
                    side = Math.random() < 0.5 ? "left" : "right";
                    if (side == "right" ) {
                        if (randomRadiusPosition == 2) {
                            // Between 60 and 120
                            randomRadialPosition = Math.floor(Math.random() * 90 - 45);
                        } else if (randomRadiusPosition == 3) {
                            // Between 45 and 135
                            randomRadialPosition = Math.floor(Math.random() * 80 - 40);
                        } else if (randomRadiusPosition == 4) {
                            // Between 30 and 150
                            randomRadialPosition = Math.floor(Math.random() * 70 - 35);
                        } else if (randomRadiusPosition == 5) {
                            // Between 20 and 160
                            randomRadialPosition = Math.floor(Math.random() * 50 - 25);
                        }
                    } else {
                        if (randomRadiusPosition == 2) {
                            // Between 240 and 300
                            randomRadialPosition = Math.floor(Math.random() * 90 - 45) + 180;
                        } else if (randomRadiusPosition == 3) {
                            // Between 225 and 315
                            randomRadialPosition = Math.floor(Math.random() * 80 - 40) + 180;
                        } else if (randomRadiusPosition == 4) {
                            // Between 210 and 330
                            randomRadialPosition = Math.floor(Math.random() * 70 - 35) + 180;
                        } else if (randomRadiusPosition == 5) {
                            // Between 200 and 340
                            randomRadialPosition = Math.floor(Math.random() * 50 - 25) + 180;
                        }
                    }
                } else {
                    randomRadialPosition = Math.ceil(Math.random() * 360);
                }
                
                const positionsArray = usedOuterPositions[randomRadiusPosition - 1];
                let isClose = false;

                for (const position of positionsArray) { 
                    let threshold = 8; 
                    switch (randomRadiusPosition) {
                        case 1:
                            threshold = 10;
                            break;
                        case 2:
                            threshold = 14;
                            break;
                        case 3:
                            threshold = 16;
                            break;
                        case 4:
                            threshold = 18;
                            break;
                        case 5:
                            threshold = 20;
                            break;
                    } 
                    // Check if close to Another element in the same array
                    if (Math.abs(randomRadialPosition - position) < threshold) {
                        isClose = true;
                        break;
                    }
                }
            
                if (!isClose) {
                    usedOuterPositions[randomRadiusPosition - 1].push(randomRadialPosition);
                    const diameter = mapValue(randomRadiusPosition, 1, numberOfOuterCircles, minOuterCircleSize, maxOuterCircleSize);
                    bullet.style.setProperty("--radius", diameter / 2 + "px");
                    bullet.style.setProperty("--radialRotation", randomRadialPosition + "deg");
                    if (side == "right") {
                        bullet.classList.add("right");
                    }
                    break;
                }
                tries++;
            }

            setTimeout(() => {
                const randomInterval = Math.ceil(Math.random() * 6) * 300;
                setInterval(() => {
                    if (!isHovering) {
                        const randomX = Math.floor(Math.random() * 12) - 6;
                        const randomY = Math.floor(Math.random() * 12) - 6;
                        bullet.style.setProperty("--randomShiftX", randomX + "px");
                        bullet.style.setProperty("--randomShiftY", randomY + "px");
                    }
                }, randomInterval);
            }, 200);
        }
    }

    let usedPositions = [];

    // Set objects based on circle numbers
    for (let i = 1; i <= numberOfCircles; i++) {
        usedPositions.push([])
    }

}

// Cluster
let usedClusterPositions = [
    [],
    [],
    [],
];

let clusterRandomIntervals = [];

function handleBulletEnter (event, cluster = false) {
    isHovering = true;
    
    const logo = document.querySelector(".home__visualization__logo");
    const videoCta = document.querySelector(".home__video__cta");
    const bullets = document.querySelectorAll(".bullet");
    const artistTitles = document.querySelectorAll(".artist-title");
    const artistImages = document.querySelectorAll(".artist-image");
    const elementComputedStyle = getComputedStyle(event.srcElement);

    videoCta.classList.add("disabled");
    logo.classList.add("disabled");
    
    bullets.forEach(bullet => {
        // bullet.classList.remove("preview");
        bullet.classList.add("disabled");
    });

    artistTitles.forEach(title => {
        title.classList.add("disabled");
    });

    artistImages.forEach(image => {
        image.classList.add("disabled");
    });

    event.srcElement.classList.remove("disabled");

    // Set Cluster Relations
    const relatedArtistsString = event.srcElement.getAttribute("data-artists");
    const relatedResourcesString = event.srcElement.getAttribute("data-resources");
    const relatedPartnersString = event.srcElement.getAttribute("data-partners");
    const relatedCycleString = event.srcElement.getAttribute("data-cycle");

    // Clear Intervals
    clusterRandomIntervals.forEach(interval => {
        clearInterval(interval);
    });

    if (relatedArtistsString && relatedArtistsString.length) {
        const relatedArtists = relatedArtistsString.split(",");
    
        relatedArtists.forEach((artist) => {
            document.getElementById(artist+"-bullet").classList.remove("disabled");
            document.getElementById(artist+"-title").classList.remove("disabled");
            document.getElementById(artist+"-image").classList.remove("disabled");
            document.getElementById(artist+"-bullet").classList.add("active");
            document.getElementById(artist+"-title").classList.add("active");
            document.getElementById(artist+"-image").classList.add("active");
        })
    }

    const imageElement = event.srcElement.nextElementSibling?.nextElementSibling;

    let imagePosition = "";
    if (imageElement.classList.contains("top-left")) {
        imagePosition = "top-left";
    } else if (imageElement.classList.contains("top-right")) {
        imagePosition = "top-right";
    } else if (imageElement.classList.contains("bottom-left")) {
        imagePosition = "bottom-left";
    } else if (imageElement.classList.contains("bottom-right")) {
        imagePosition = "bottom-right";
    }

    // Set Artist Preview on Nav
    if (event.srcElement.classList.contains("artist")) {
        const artistPreviewElement = document.querySelector("#artist-nav-preview");
        artistPreviewElement.innerHTML = event.srcElement.nextElementSibling.innerText;
    }

    // console.log("handleBulletEnter: event:", event.srcElement.nextElementSibling);

    // Cluster Resources
    if (relatedResourcesString && relatedResourcesString.length) {
        const relatedResources = relatedResourcesString.split(",");
        let resourcePreviewGroup = [];
        relatedResources.forEach((resource) => {
            const resourceEl = document.getElementById(resource);
            if (resourceEl) {
                resourceEl.classList.remove("disabled");
                resourceEl.classList.add("active");
            }

            // Calculate Position
            const radialRotationInt = parseInt(elementComputedStyle.getPropertyValue("--radialRotation"), 10);
            const numberOfRotations = Math.floor(radialRotationInt / 360);
            const clusterRadialRotation = radialRotationInt - 360 * numberOfRotations + "deg";
            const translateOffset = Math.ceil(Math.random() * 3) + 1;

            let clusterPlusRotation = calculateClusterPlusRotation(imagePosition, translateOffset);
            
            resourceEl.style.setProperty("--clusterRadialRotation", clusterRadialRotation);
            resourceEl.style.setProperty("--clusterRadius", elementComputedStyle.getPropertyValue("--radius"))
            resourceEl.style.setProperty("--clusterPlusRotation", clusterPlusRotation + "deg");
            resourceEl.style.setProperty("--translateOffset", translateOffset * 1.1 + "rem");
            // resourceEl.style.setProperty("--clusterPlusRotation", Math.random() * 45 + "deg");
            resourceEl.classList.add("cluster");

            resourceEl.style.setProperty("--randomOffsetX", 0 + "px");
            resourceEl.style.setProperty("--randomOffsetY", 0 + "px");

            setTimeout(() => {
                clusterRandomIntervals.push( 
                    setInterval(() => {
                        resourceEl.style.setProperty("--randomOffsetX", Math.floor(Math.random() * 12) + "px");
                        resourceEl.style.setProperty("--randomOffsetY", Math.floor(Math.random() * 12) + "px");
                    }, 1000)
                );
            }, 500);
            
            resourcePreviewGroup.push(resourceEl.querySelector("h3").innerText);
        })

        // Set resource Preview on Nav
        const resourcePreviewElement = document.querySelector("#resources-nav-preview");
        resourcePreviewGroup.forEach((resource, index) => {
            resourcePreviewElement.innerHTML += resource;
            if (index != resourcePreviewGroup.length - 1) {
                resourcePreviewElement.innerHTML += ", ";
            }
        })

    }

    // Cluster Partners
    if (relatedPartnersString && relatedPartnersString.length) {
        const relatedPartners = relatedPartnersString.split(",");
        let partnerPreviewGroup = [];
        relatedPartners.forEach((partner) => {
            const partnerEl = document.getElementById(partner);
            partnerEl.classList.remove("disabled");
            partnerEl.classList.add("active");

            // Calculate Position
            const radialRotationInt = parseInt(elementComputedStyle.getPropertyValue("--radialRotation"), 10);
            const numberOfRotations = Math.floor(radialRotationInt / 360);
            const clusterRadialRotation = radialRotationInt - 360 * numberOfRotations + "deg";
            const translateOffset = Math.ceil(Math.random() * 3) + 1;

            let clusterPlusRotation = calculateClusterPlusRotation(imagePosition, translateOffset);
            
            partnerEl.style.setProperty("--clusterRadialRotation", clusterRadialRotation);
            partnerEl.style.setProperty("--clusterRadius", elementComputedStyle.getPropertyValue("--radius"))
            partnerEl.style.setProperty("--clusterPlusRotation", clusterPlusRotation + "deg");
            partnerEl.style.setProperty("--translateOffset", translateOffset * 1.1 + "rem");
            
            partnerEl.style.setProperty("--randomOffsetX", 0 + "px");
            partnerEl.style.setProperty("--randomOffsetY", 0 + "px");
            
            setTimeout(() => {
                clusterRandomIntervals.push(
                    setInterval(() => {
                        partnerEl.style.setProperty("--randomOffsetX", Math.floor(Math.random() * 12) + "px");
                        partnerEl.style.setProperty("--randomOffsetY", Math.floor(Math.random() * 12) + "px");
                    }, 1000)
                );
            }, 500);
            
            partnerEl.classList.add("cluster");
            
            partnerPreviewGroup.push(partnerEl.querySelector("h3").innerText);
        })
        
        // Set Partner Preview on Nav
        const partnerPreviewElement = document.querySelector("#partners-nav-preview");
        partnerPreviewGroup.forEach((partner, index) => {
            partnerPreviewElement.innerHTML += partner;
            if (index != partnerPreviewGroup.length - 1) {
                partnerPreviewElement.innerHTML += ", ";
            }
        })
    }

    // Cluster Cycle
    if (relatedCycleString && relatedCycleString.length) {
        const cycleEl = document.getElementById(relatedCycleString);
        cycleEl.classList.remove("disabled");
        cycleEl.classList.add("active");
        
        const radialRotationInt = parseInt(elementComputedStyle.getPropertyValue("--radialRotation"), 10);
        const numberOfRotations = Math.floor(radialRotationInt / 360);
        const clusterRadialRotation = radialRotationInt - 360 * numberOfRotations + "deg";
        const translateOffset = Math.ceil(Math.random() * 3) + 1;
        
        let clusterPlusRotation = calculateClusterPlusRotation(imagePosition, translateOffset);

        cycleEl.style.setProperty("--clusterRadialRotation", clusterRadialRotation);
        cycleEl.style.setProperty("--clusterRadius", elementComputedStyle.getPropertyValue("--radius"))
        cycleEl.style.setProperty("--clusterPlusRotation", clusterPlusRotation + "deg");
        cycleEl.style.setProperty("--translateOffset", translateOffset * 1.1 + "rem");
        cycleEl.classList.add("cluster");

        cycleEl.style.setProperty("--randomOffsetX", 0 + "px");
        cycleEl.style.setProperty("--randomOffsetY", 0 + "px");

        setTimeout(() => {
            clusterRandomIntervals.push(
                setInterval(() => {
                    cycleEl.style.setProperty("--randomOffsetX", Math.floor(Math.random() * 24) + "px");
                    cycleEl.style.setProperty("--randomOffsetY", Math.floor(Math.random() * 24) + "px");
                }, 1000)
            );
        }, 500);

        // Set Cycle Preview on Nav
        const cyclePreviewElement = document.querySelector("#cycle-nav-preview");
        cyclePreviewElement.innerHTML = cycleEl.querySelector("h3").innerText;
    }
}

function calculateClusterPlusRotation(imagePosition, translateOffset) {
    let tries = 0;
    let clusterPlusRotation = 0;
    
    // Try multiple times to get a good position
    while (true) {
        if (tries > 200) {
            break;
        } 
        
        if (imagePosition == "top-left") {
            clusterPlusRotation = Math.random() * 160 + 20;
        } else if (imagePosition == "top-right") {
            clusterPlusRotation = Math.random() * 240 + 20;
        } else if (imagePosition == "bottom-left") {
            clusterPlusRotation = Math.random() * 160 + 180;
        } else {
            clusterPlusRotation = Math.random() * 240 + 100;
        }

        let isClose = false
        let threshold = 8;
        if (usedClusterPositions[translateOffset - 2].length) {
            for (const position of usedClusterPositions[translateOffset - 2]) {
                // Check if close to Another element in the same array
                if (Math.abs(clusterPlusRotation - position) < threshold) {
                    isClose = true;
                    break;
                }
            }

            if (!isClose) {
                usedClusterPositions[translateOffset - 2].push(clusterPlusRotation);
                break;
            }
        } else {
            usedClusterPositions[translateOffset - 2].push(clusterPlusRotation);
            break;
        }

        tries++;
    }

    return clusterPlusRotation;
}

function handleBulletLeave(event, cluster = false) {
    isHovering = false;

    const logo = document.querySelector(".home__visualization__logo");
    const videoCta = document.querySelector(".home__video__cta");
    const bullets = document.querySelectorAll(".bullet");
    const artistTitles = document.querySelectorAll(".artist-title");
    const artistImages = document.querySelectorAll(".artist-image");
    
    videoCta.classList.remove("disabled");
    logo.classList.remove("disabled");

    bullets.forEach(bullet => {
        bullet.classList.remove("disabled");
        // bullet.classList.remove("preview");
        bullet.classList.remove("active");
    });

    const headerButtons = document.querySelectorAll(".header__designation__nav button.chip");
    for (const button of headerButtons) {
        button.classList.remove("active");
        button.setAttribute("data-state", "inactive");
    }

    artistTitles.forEach(title => {
        title.classList.remove("disabled");
    });

    artistImages.forEach(image => {
        image.classList.remove("disabled");
    });

    // Set Relations
    const relatedArtistsString = event.srcElement.getAttribute("data-artists");
    const relatedResourcesString = event.srcElement.getAttribute("data-resources");
    const relatedPartnersString = event.srcElement.getAttribute("data-partners");
    const relatedCycleString = event.srcElement.getAttribute("data-cycle");

    // Cluster Artists
    if (relatedArtistsString && relatedArtistsString.length) {
        const relatedArtists = relatedArtistsString.split(",");
        relatedArtists.forEach((artist) => {
            document.getElementById(artist + "-bullet").classList.remove("disabled");
            document.getElementById(artist + "-title").classList.remove("disabled");
            document.getElementById(artist + "-image").classList.remove("disabled");
            document.getElementById(artist + "-title").classList.remove("active");
            document.getElementById(artist + "-image").classList.remove("active");
            if (!artistsOpen) {
                document.getElementById(artist + "-bullet").classList.remove("active");
            }
        })
    }

    // Clear Intervals
    clusterRandomIntervals.forEach(interval => {
        clearInterval(interval);
    });

    // Cluster Resources
    if (relatedResourcesString && relatedResourcesString.length) {
        const relatedResources = relatedResourcesString.split(",");
        relatedResources.forEach((resource) => {
            const resourceEl = document.getElementById(resource);

            if (resourceEl) {
                resourceEl.classList.remove("disabled");
                resourceEl.classList.remove("active");
                resourceEl.classList.remove("cluster");
            } 
        })
    }

    // Cluster Partners
    if (relatedPartnersString && relatedPartnersString.length) {
        const relatedPartners = relatedPartnersString.split(",");
        relatedPartners.forEach((partner) => {
            const partnerEl = document.getElementById(partner);
            partnerEl.classList.remove("disabled");
            partnerEl.classList.remove("active");
            partnerEl.classList.remove("cluster");
        })
    }

    // Highlight Cycle
    if (relatedCycleString && relatedCycleString.length) {
        const cycleEl = document.getElementById(relatedCycleString);
        cycleEl.classList.remove("active");
        cycleEl.classList.remove("cluster");
    }

    // Clear Previews on Nav
    const artistsPreviewElement = document.querySelector("#artist-nav-preview");
    artistsPreviewElement.innerHTML = "";
    const resourcePreviewElement = document.querySelector("#resources-nav-preview");
    resourcePreviewElement.innerHTML = "";
    const partnerPreviewElement = document.querySelector("#partners-nav-preview");
    partnerPreviewElement.innerHTML = "";
    const cyclePreviewElement = document.querySelector("#cycle-nav-preview");
    cyclePreviewElement.innerHTML = "";
}

// highlightBullets
function highlightBullets(event, category) {
    const bullets = document.querySelectorAll(".bullet");
    const headerButtons = document.querySelectorAll(".header__designation__nav button.chip");

    // for (const button of headerButtons) {
    //     button.classList.remove("active");
    //     button.setAttribute("data-state", "inactive");
    // }

    if (event.srcElement.getAttribute("data-state") == "active") {
        event.srcElement.classList.remove("active");
        for (const bullet of bullets) {
            if (bullet.getAttribute("data-category") == category) {
                bullet.classList.remove("preview");
            }
        }

        event.srcElement.setAttribute("data-state", "inactive");
    } else {
        event.srcElement.classList.add("active");
        for (const bullet of bullets) {
            // bullet.classList.remove("preview");
            if (bullet.getAttribute("data-category") == category) {
                bullet.classList.add("preview");
            }
        }
        event.srcElement.setAttribute("data-state", "active");
    }

    if (category == "artist") {
        artistsOpen = !artistsOpen;
    }
}

// Set bullets scale based on scroll
window.addEventListener("scroll", () => {
    addScrollValueToBullets();
})

window.addEventListener("DOMContentLoaded", () => {
    // Scroll to exactly half of the page
    window.scrollTo(0, window.innerHeight, {
        behavior: "instant"
    });

    setTimeout(() => {
        window.addEventListener("scroll", () => {
            if (window.innerWidth > 768) {
                debounceScrollDistributeBulletsInside();
                debounceDistributeBulletsOutside();
            } 
        })
    }, 2000);

});

function addScrollValueToBullets () {
    // Map scroll Y from 0.6 to 1.4
    const scale = mapValue(window.scrollY, 0, window.innerHeight, 0.6, 1);
    
    const bullets = document.querySelectorAll(".bullet");
    bullets.forEach(bullet => {
        bullet.style.setProperty("--scrollScale", scale);
    });
}

// Set Video CTA Position
let ctaSelfRotation = 0;
let ctaRotation = 0;
window.addEventListener("DOMContentLoaded", function() {
    const homeVideoCta = document.querySelector(".home__video__cta");

    if (homeVideoCta) {
        const diameter = mapValue(3, 1, numberOfCircles, minCircleSize, maxCircleSize);
        homeVideoCta.style.setProperty("--radius", diameter / 2 + "px");
        
        ctaRotation = 45;
        setInterval(() => {
            if (!isHovering) {
                ctaSelfRotation += 2;
            }
            homeVideoCta.style.setProperty("--radialRotation", ctaRotation + randomInsideRotationIncrement + "deg");
            homeVideoCta.style.setProperty("--selfRotation", ctaSelfRotation + "deg");
        }, 300);
    }
});

// Videos
function toggleVideoPreview() {
    const video = document.querySelector(".home__video .video-player");
    const videoElement = document.querySelector(".home__video .video-player video");
    const videoClose = document.querySelector(".home__video__close_bg");

    if (video.getAttribute("data-state") == "active") {
        video.classList.remove("active");
        video.setAttribute("data-state", "inactive");
        videoElement.pause();
        videoClose.classList.remove("active");
    } else {
        video.classList.add("active");
        video.setAttribute("data-state", "active");
        videoClose.classList.add("active");
    }
}

let videosIsOpen = false;
function openVideos() {
    const video = document.querySelector(".videos");
    video.classList.add("active");
    video.querySelector(".videos__preview.active video").play();
    video.querySelector(".videos__preview.active .play-btn").innerHTML = "PAUSE";
    videosIsOpen = true;
}

function closeVideos() {
    const video = document.querySelector(".videos");
    video.classList.remove("active");
    videosIsOpen = false;
}


// Open Call
function hideCall() {
    const call = document.querySelector(".call__container");
    call.classList.add("hidden");
}


// Map a value from one range to another
function mapValue(value, fromMin, fromMax, toMin, toMax) {
    // Calculate the ratio of the value in the 'from' range
    const ratio = (value - fromMin) / (fromMax - fromMin);

    // Map the ratio to the 'to' range and return the result
    return toMin + ratio * (toMax - toMin);
}

function weightedRandomNumber(min, max) {
    const values = [];
    for (let i = min; i <= max; i++) {
        values.push(i);
    }

    const weights = values.map((value) => value); // Example: Weight based on the square of the value

    // Calculate the sum of weights
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

    // Generate a random number between 0 and the total weight
    const randomValue = Math.random() * totalWeight;

    // Determine which value corresponds to the random number
    let cumulativeWeight = 0;
    for (let i = 0; i < values.length; i++) {
        cumulativeWeight += weights[i];
        if (randomValue < cumulativeWeight) {
            return values[i];
        }
    }

    // Fallback in case of issues
    return min;
}

// Define a debounce function
function debounce(func, delay) {
    let timeoutId;

    return function () {
        const context = this;
        const args = arguments;

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}