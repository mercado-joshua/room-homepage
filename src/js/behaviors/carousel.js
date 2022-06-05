const carousel = () => {
    const prevBtn = document.querySelector( '[data-js-prev-btn] ');
    const nextBtn = document.querySelector( '[data-js-next-btn]' );
    const slider = document.querySelector( '[data-js-slider]' );
    const slides = Array.from( slider.children );

    // get width of the first slide
    const sliderWidth = slides[0].getBoundingClientRect().width;

    // dynamically arrange the slides next to each other
    const setSlidePosition = ( slide, index ) => {
        slide.style.left = `${ sliderWidth * index }px`;
    };

    slides.forEach( setSlidePosition );

    const moveToSlide = ( slider, currentSlide, targetSlide ) => {
        slider.style.transform = `translateX( -${ targetSlide.style.left } )`;
        currentSlide.removeAttribute( 'data-js-current-slide' );
        targetSlide.setAttribute( 'data-js-current-slide', '' );
    };

    // hide / show arrows
    const displayArrows = ( slides, prevBtn, nextBtn, targetIndex ) => {
        // first item
        if ( targetIndex === 0 ) {
            nextBtn.classList.add( '-hidden' );
            prevBtn.classList.remove( '-hidden' );
        } 
        
        // last item
        else if ( targetIndex === ( slides.length - 1 ) ) {
            nextBtn.classList.remove( '-hidden' );
            prevBtn.classList.add( '-hidden' );
        }

        // in-between items
        else { 
            prevBtn.classList.remove( '-hidden' );
            nextBtn.classList.remove( '-hidden' );
        }
    };

    // when I click left, move slides to the left
    nextBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const currentSlide = slider.querySelector( '[data-js-current-slide]' );
        const nextSlide = currentSlide.nextElementSibling;

        // get the index number from the next slide
        const nextIndex = slides.findIndex( slide => slide === nextSlide );

        // move to the next slide
        moveToSlide( slider, currentSlide, nextSlide );

        // update buttons
        displayArrows( slides, nextBtn, prevBtn, nextIndex );
    });

    // when I click right, move slides to the right
    prevBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const currentSlide = slider.querySelector( '[data-js-current-slide]' );
        const prevSlide = currentSlide.previousElementSibling;

        // get the index number from the previous slide
        const prevIndex = slides.findIndex( slide => slide === prevSlide );

        // move to the previous slide
        moveToSlide( slider, currentSlide, prevSlide );

        // update buttons
        displayArrows( slides, nextBtn, prevBtn, prevIndex );
    });
};

document.addEventListener('readystatechange', (event) => {
    if (event.target.readyState === 'complete') carousel();
});
