// Header

const MENU = document.getElementById('menu');
const anchors = document.querySelectorAll('a[href^="#"');

MENU.addEventListener('click', (event) => {
    MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
});

// Scroll

    anchors.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        let href = this.getAttribute('href').substring(1);
        const scrollTarget = document.getElementById(href);
        const topOffset = document.querySelector('.header').offsetHeight;
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Slider

let items = document.querySelectorAll('.item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
    currentItem = ( n  + items.length ) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('activated', direction);
    });
}


function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('activated');
        isEnabled = true;
    });
}

function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
    changeBackgroundColor();
}

function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
    changeBackgroundColor();
}

function changeBackgroundColor() {
    if(document.querySelector('.item').classList.contains('activated')) {
        let slider = document.querySelector('.slider');
        slider.style.backgroundColor = '#648bf0';
    } else {
        slider.style.backgroundColor = '#f06c64';
    }
}


document.querySelector('.control.left').addEventListener('click', function() {
    if (isEnabled) {
        previousItem(currentItem);
    } 
    });

    document.querySelector('.control.right').addEventListener('click', function() {
        if (isEnabled) {
            nextItem(currentItem);
        }
    });

// Swiper    

const swipedetect = (el) => {

let surface = el;
let startX = 0;
let startY = 0;
let distX = 0;
let distY = 0;
let dist = 0;

let startTime = 0;
let elapsedTime = 0;

let threshold = 150;
let restraint = 100;
let allowedTime = 300;

surface.addEventListener('mousedown', function(e){
startX = e.pageX;
startY = e.pageY;
startTime = new Date().getTime();
e.preventDefault();
});

surface.addEventListener('mouseup', function(e){
distX = e.pageX - startX;
distY = e.pageY - startY;
elapsedTime = new Date().getTime() - startTime;
if (elapsedTime <= allowedTime){
    if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
        if ((distX > 0)) {
            if (isEnabled) {
                previousItem(currentItem);
            }
        } else {
            if (isEnabled) {
                nextItem(currentItem);
            }
        }
    }
}  
 
e.preventDefault();
});

surface.addEventListener('touchstart', function(e){
if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
    if (e.target.classList.contains('left')) {
        if (isEnabled) {
            previousItem(currentItem);
        }
    } else if (e.target.classList.contains('right')) {
        if (isEnabled) {
            nextItem(currentItem);
        }
    }
}

let touchObj = e.changedTouches[0];
startX = touchObj.pageX;
startY = touchObj.pageY;
startTime = new Date().getTime();
e.preventDefault();
});

surface.addEventListener('touchmove', function(e){
e.preventDefault();
});

surface.addEventListener('touchend', function(e){
let touchObj = e.changedTouches[0];
distX = touchObj.pageX - startX;
distY = touchObj.pageY - startY;
elapsedTime = new Date().getTime() - startTime;
if (elapsedTime <= allowedTime){
    if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
        if ((distX > 0)) {
            if (isEnabled) {
                previousItem(currentItem);
            }
        } else {
            if (isEnabled) {
                nextItem(currentItem);
            }
        }
    }
}

e.preventDefault();
});

}
let el = document.querySelector('.wrapper-slider');
swipedetect(el);

// Black Screen phone

const verticalTransperentDiv = document.querySelector('.vertical-iphone');
const verticalblackScreen = document.querySelector('.black-screen');
const horizontalTransperentDiv = document.querySelector('.horizontal-iphone');
const horizontalblackScreen = document.querySelector('.black-screen-2');

verticalTransperentDiv.addEventListener('click', () => {
verticalblackScreen.classList.toggle('visible');
});

horizontalTransperentDiv.addEventListener('click', () => {
horizontalblackScreen.classList.toggle('visible');
});


// Portfolio


const portfolioTags = document.querySelector('.portfolio_tags');
const tags = document.querySelectorAll('.portfolio_tags .tag');
const imageContainer = document.querySelector('.portfolio-images');
const images = document.querySelectorAll('.portfolio-images img');

portfolioTags.addEventListener('click', (e) => {
    tags.forEach(tag => tag.classList.remove('selected'));
    e.target.classList.add('selected');
    images.forEach(img => img.style.order = Math.floor(Math.random() - 0.5));
    images.forEach(img => img.classList.remove('bordered'));
});

imageContainer.addEventListener('click', (e) => {
    images.forEach(img => img.classList.remove('bordered'));
    e.target.classList.add('bordered');
});

// Window for form

const button = document.querySelector('.form_button');
const closeButton = document.querySelector('.close-button');
const modalSubject = document.querySelector('.modal-subject');
const modalDescribe = document.querySelector('.modal-describe');
const form = document.querySelector('.contact-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const subject = document.querySelector('.subject').value.toString();
    const describe = document.querySelector('.describe').value.toString();
    document.querySelector('#message-block').classList.remove('hidden');
    if (subject != '') {
        modalSubject.textContent = 'Subject: ' + subject
    } 
    else {
        modalSubject.textContent = 'Without subject'
    };
    if (describe != '') {
        modalDescribe.textContent = 'Description: ' + describe
    } 
    else {
        modalDescribe.textContent = 'Without description'
    }

});

closeButton.addEventListener('click', () => {
    document.querySelectorAll('#message-block span').innerText = '';
    document.querySelector('#message-block').classList.add('hidden');
    document.querySelector('.contact-form').reset();
});


