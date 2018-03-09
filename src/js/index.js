require('../styles/styles.scss');
const Hammer = require("hammerjs");

$(document).ready(function(){

  const body = $("body"),
            win = $(window),
            slider = body.find(".slider"),
            slides = slider.find(".slide"),
            slideNavLinks = body.find("#slide-nav .slide-link");

  //have to use native getElementById for Hammer;
  const slideContainer = document.getElementById("slide-container"),
           sliding = new Hammer(slideContainer);

  //throttle function to limit swipe events while swiping
  const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  function onSwipe(event)  {
    //swiped right = 4
    //swiped left = 2
    const currentSlide = $(event.target),
             currentSlideContainerLength = currentSlide.siblings().length + 1,
             currentSlideId = currentSlide.data('slide'),
             currentSlideWidth = currentSlide.innerWidth();

    if (event.direction == 4) {
      console.log("Swiped right", currentSlideWidth);
      if (currentSlideId > 0) {
        slider.animate({
          "margin-left": `+=${currentSlideWidth}`
        }, 1000)
      //swipe right logic for adding active class to slide that shows up after sliding animation
      $(slides[currentSlideId-1]).siblings().removeClass("active");
      $(slides[currentSlideId-1]).addClass("active");
      }
    }
    else if (event.direction == 2) {
      console.log("Swiped left");
      if (currentSlideId < currentSlideContainerLength - 1) {
        slider.animate({
          "margin-left": `-=${currentSlideWidth}`
        }, 1000)
      }
      //swipe left logic for adding active class to slide that shows up after sliding animation
      $(slides[currentSlideId+1]).siblings().removeClass("active");
      $(slides[currentSlideId+1]).addClass("active");
    }
  }

  function onNavSelect(event) {
    const clickedLink = $(event.currentTarget),
             clickedLinkId = clickedLink.data('link'),
             currentSliderWidth = slider.innerWidth();

    slider.animate({
      "margin-left": `-${currentSliderWidth * clickedLinkId}`
    }, 0)
    //on click logic for adding active class to slide that shows up after clicking nav link
    $(slides[clickedLinkId]).siblings().removeClass("active");
    $(slides[clickedLinkId]).addClass("active");
  }

  function adjustSliderPosition() {
    //need a set timeout here in order for orientation to adjust first before grabbing values
    setTimeout(() => {
      const currentSliderWidth = slider.innerWidth(),
      currentSlideId = slider.find(".slide.active").data('slide');

      slider.animate({
        "margin-left": `-${currentSliderWidth * currentSlideId}`
      }, 0);
    }, 0);
  }

  //events
  //using throttle so user can only trigger one swipe event every set amount of time
  sliding.on("swipe", throttle(onSwipe, 1000));
  slideNavLinks.on("click", onNavSelect);
  win.on('resize', adjustSliderPosition)
});
