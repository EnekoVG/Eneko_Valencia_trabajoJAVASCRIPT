const carousel = document.getElementById('carousel');
const boxes = document.querySelectorAll('.box');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');

const content = ["A", "B", "C", "D" , "E", "F", "G", "H"];

const images = [
    './../assests/images/galeria/photo1.jpg',
    './../assests/images/galeria/photo2.jpg',
    './../assests/images/galeria/photo3.jpg',
    './../assests/images/galeria/photo4.jpg',
    './../assests/images/galeria/photo5.jpg',
    './../assests/images/galeria/photo6.jpg',
    './../assests/images/galeria/photo7.jpg',
    './../assests/images/galeria/photo8.jpg',
    './../assests/images/galeria/photo9.jpg',
]

let currentIndex = 0;
let startX = 0;
let isDragging = false;

// Elementos para cada una de las cajas
boxes.forEach((box) => {
    const img = document.createElement('img');
    img.alt = "Carousel image";
    img.draggable = false;
    box.appendChild(img);
})

// Punto para cada una de las imágenes
images.forEach(() => {
    const dot = document.createElement('div');
    dot.classList.add('dot', 'inactive');
    dotsContainer.appendChild(dot);
})

function updateCarousel(){
    const prevIndex = (currentIndex -1 + content.length) % content.length;
    const nextIndex = (currentIndex + 1) % content.length;

    boxes.forEach((box, index) => {
        const img = box.querySelector('img');
        if(index === 0){
            img.src = images[prevIndex];
        } else if (index === 1){
            img.src = images[currentIndex];
        } else if (index === 2){
            img.src = images[nextIndex];
        }
    })

    // Actualizar Puntos
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if(index === currentIndex){
            dot.classList.add('active');
            dot.classList.remove('inactive');
        } else {
            dot.classList.remove('active');
            dot.classList.add('inactive');
        }
    })
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + content.length) % content.length;
    updateCarousel();
})

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % content.length;
    updateCarousel();
})

carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
})

carousel.addEventListener('mousemove', (e) => {
    if(!isDragging){
        return
    }

    const moveX = e.pageX - startX;

    if(Math.abs(moveX) > 100){
        if(moveX > 0){
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        } else {
            currentIndex = (currentIndex + 1) % images.length;
        }

        updateCarousel();
        isDragging = false;
    }
})

carousel.addEventListener('mouseup', () => {
    isDragging = false;
})

updateCarousel();