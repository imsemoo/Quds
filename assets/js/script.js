$(document).ready(function () {
  var $heroSection = $('#hero-section');
  var $slider = $('.hero-slider');

  // Initialize Owl Carousel
  $slider.owlCarousel({
    loop: true,
    margin: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--space-md')),
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      992: { items: 4 }
    }
  });

  var $owl = $('.news-slider').owlCarousel({
    loop: false,
    margin: 0,
    nav: false,
    dots: false,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      992: { items: 3 },
      1200: { items: 4 }
    }
  });

  // Update range text
  function updateRange() {
    var info = $owl.data('owl.carousel');
    // current() تُرجع الـ absolute position داخل الـ items array
    var currentIndex = info.current();
    var total = info.items().length; // إجمالي عدد العناصر
    // عرض رقم العنصر الحالي (1-based) و الإجمالي
    $('.slider-range').text((currentIndex + 1) + ' - ' + total);
  }


  // Initial range
  updateRange();

  // Bind nav buttons
  $('.next').click(function () { $owl.trigger('next.owl.carousel'); });
  $('.prev').click(function () { $owl.trigger('prev.owl.carousel'); });

  // Update on translate
  $owl.on('translated.owl.carousel', updateRange);
  // Function to change background image of the hero section
  function updateBackground(imageUrl) {
    $heroSection.css('background-image', 'url(' + imageUrl + ')');
  }

  // On page load, set the default background from the first slide
  var firstBg = $slider.find('.slide-item').eq(0).data('bg');
  if (firstBg) {
    updateBackground(firstBg);
  }

  // When a slide item is clicked, update the background
  $slider.on('click', '.slide-item', function () {
    var bgUrl = $(this).data('bg');
    if (bgUrl) {
      updateBackground(bgUrl);
    }
  });


  $(window).on('load', hideLoader);

  var $loader = $('#preloadr'),
    isHidden = false;


  function hideLoader() {
    if (isHidden) return;
    isHidden = true;
    $loader.fadeOut(500);
  }

  // When all page assets (images, scripts, etc.) have finished loading, hide the loader.
  $(window).on('load', hideLoader);

  // Fallback: If window.load never fires (e.g. due to a hung resource),
  // automatically hide the loader after 10 seconds.
  setTimeout(hideLoader, 7000);

});


document.addEventListener('DOMContentLoaded', function () {
  // Play video on click
  function createPlayer(container, id, type) {
    var player;
    if (type === 'youtube') {
      player = document.createElement('iframe');
      player.setAttribute('src', 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0');
      player.setAttribute('allow', 'autoplay; encrypted-media');
      player.setAttribute('frameborder', '0');
      player.style.width = '100%';
      player.style.height = '100%';
    } else if (type === 'local') {
      player = document.createElement('video');
      player.setAttribute('src', id);
      player.setAttribute('controls', '');
      player.setAttribute('autoplay', '');
      player.style.width = '100%';
    }
    container.innerHTML = '';
    container.appendChild(player);
  }

  // Main video click
  document.querySelector('#video-stories .video-player').addEventListener('click', function () {
    var id = this.getAttribute('data-video-id');
    var type = this.getAttribute('data-video-type');
    createPlayer(this, id, type);
  });

  // Links click
  document.querySelectorAll('#video-stories .video-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var id = this.getAttribute('data-video-id');
      var type = this.getAttribute('data-video-type');
      var container = document.querySelector('#video-stories .video-player');
      createPlayer(container, id, type);
    });
  });
});