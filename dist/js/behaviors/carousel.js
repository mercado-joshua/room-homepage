"use strict";

var carousel = function carousel() {
  var prevBtn = document.querySelector('[data-js-prev-btn] ');
  var nextBtn = document.querySelector('[data-js-next-btn]');
  var slider = document.querySelector('[data-js-slider]');
  var slides = Array.from(slider.children); // get width of the first slide

  var sliderWidth = slides[0].getBoundingClientRect().width; // dynamically arrange the slides next to each other

  var setSlidePosition = function setSlidePosition(slide, index) {
    slide.style.left = "".concat(sliderWidth * index, "px");
  };

  slides.forEach(setSlidePosition);

  var moveToSlide = function moveToSlide(slider, currentSlide, targetSlide) {
    slider.style.transform = "translateX( -".concat(targetSlide.style.left, " )");
    currentSlide.removeAttribute('data-js-current-slide');
    targetSlide.setAttribute('data-js-current-slide', '');
  }; // hide / show arrows


  var displayArrows = function displayArrows(slides, prevBtn, nextBtn, targetIndex) {
    // first item
    if (targetIndex === 0) {
      nextBtn.classList.add('-hidden');
      prevBtn.classList.remove('-hidden');
    } // last item
    else if (targetIndex === slides.length - 1) {
      nextBtn.classList.remove('-hidden');
      prevBtn.classList.add('-hidden');
    } // in-between items
    else {
      prevBtn.classList.remove('-hidden');
      nextBtn.classList.remove('-hidden');
    }
  }; // when I click left, move slides to the left


  nextBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var currentSlide = slider.querySelector('[data-js-current-slide]');
    var nextSlide = currentSlide.nextElementSibling; // get the index number from the next slide

    var nextIndex = slides.findIndex(function (slide) {
      return slide === nextSlide;
    }); // move to the next slide

    moveToSlide(slider, currentSlide, nextSlide); // update buttons

    displayArrows(slides, nextBtn, prevBtn, nextIndex);
  }); // when I click right, move slides to the right

  prevBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var currentSlide = slider.querySelector('[data-js-current-slide]');
    var prevSlide = currentSlide.previousElementSibling; // get the index number from the previous slide

    var prevIndex = slides.findIndex(function (slide) {
      return slide === prevSlide;
    }); // move to the previous slide

    moveToSlide(slider, currentSlide, prevSlide); // update buttons

    displayArrows(slides, nextBtn, prevBtn, prevIndex);
  });
};

document.addEventListener('readystatechange', function (event) {
  if (event.target.readyState === 'complete') carousel();
});