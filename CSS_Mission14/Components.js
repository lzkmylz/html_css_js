
// js code about Carousel

var log = console.log;
//自动播放
var timer = null;
var key = 0;
var circle_key = 0;
timer = setInterval(autoplay,5000);
function autoplay() {
  //播放哪个
  var total_items = $('.item').length;
  next_key = key + 1;
  if(next_key > total_items-1) {
    next_key = 0;
  }
  carousel_animate(key, next_key);
  key = next_key;
}

function carousel_animate(current_item_key, next_item_key) {
  //从右向左滑
  if($('.item.active').length == 0) {
    setTimeout(function() {
      carousel_animate(current_item_key, next_item_key);
    }, 200);
    return;
  }
  var $current_item = $('.item.active');
  var $next_item = $($('.item')[next_item_key]);
  var $current_circle = $($('.circle.active'));
  var $next_circle = $($('.circle')[next_item_key]);
  var item_width = $current_item.width();

  if (current_item_key < next_item_key) {
    $current_item.removeClass('active');
    $current_item.addClass('active_left');
    $next_item.addClass('active_next');

    if ($next_item.css('display') == 'none') {
      $next_item.css('display', 'block');
      $next_item.css('left', '100%');
    }

    $current_circle.removeClass('active');
    $next_circle.addClass('active');


    $current_item.animate({left:String(-item_width)+'px'}).fadeOut('slow', function() {
      $current_item.removeClass('active_left');
      $current_item.css('left', 0);
      $next_item.removeClass('active_next');
      $next_item.addClass('active');
    });
    $next_item.animate({left:0}).fadeIn('slow', function() {
      $next_item.css('left', 0);
    });

  } else {
    $current_item.removeClass('active');
    $current_item.addClass('active_right');
    $next_item.addClass('active_prev');

    if ($next_item.css('display') == 'none') {
      $next_item.css('display', 'block');
      $next_item.css('left', '-100%');
    }

    $current_circle.removeClass('active');
    $next_circle.addClass('active');

    $current_item.animate({left:String(item_width)+'px'}).fadeOut('slow', function() {
      $current_item.removeClass('active_right');
      $current_item.css('left', 0);
      $next_item.removeClass('active_prev');
      $next_item.addClass('active');
    });
    $next_item.animate({left:0}).fadeIn('slow', function() {
      $next_item.css('left', 0);
    });
  }
}

$(function() {
  $('.circle').click(function(obj, e) {
    var $current_circle = $($('.circle.active')[0]);
    var $next_circle = $(obj.target);
    if ($current_circle.index() == $next_circle.index()) {
      clearInterval(timer)
      timer = setInterval(autoplay, 5000);
    } else {
      clearInterval(timer)
      carousel_animate($current_circle.index(), $next_circle.index());
      key = $next_circle.index();
      timer = setInterval(autoplay, 5000);
    }
  })
});

$(function() {
  $('.left.carousel-control').click(function() {
    var next_key = key - 1;
    if (next_key < 0) {
      next_key = 2;
    }
    clearInterval(timer)
    carousel_animate(key, next_key);
    key = next_key;
    timer = setInterval(autoplay, 5000);
  })
});

$(function() {
  $('.right.carousel-control').click(function() {
    var next_key = key + 1;
    if (next_key > 2) {
      next_key = 0;
    }
    clearInterval(timer)
    carousel_animate(key, next_key);
    key = next_key;
    timer = setInterval(autoplay, 5000);
  })
});
