$(document).ready(function() {

  $('#mainmenu li').click(function() {
    submenu = $(this).data('submenu');
    $('.submenu.' + submenu).fadeToggle();
  })

  $("#colors li").click(function() {
    color = $(this).data("color");
    img = $(this).data("color-img");
    hex = $(this).css("background-color");
    $("#logo-display").css("background-color", color);
    $("#product-image").attr('src', img);
    $("#colors li span").removeClass('glyphicon-ok');
    $(this).children('span').addClass('glyphicon-ok');
    $("#colors li").css('box-shadow', '');
    $(this).css('box-shadow','0 0 0 2px #eee, 0 0 0 4px '+hex);
  });

  $("#sizes li").click(function() {
    $("#sizes li").removeClass('active');
    $(this).addClass('active');
    sizePrice = $(this).data('price');
    if (!sizePrice) {
      sizePrice = 0;
    }
    quantity = $('.quantity').val();
    price = basePrice + sizePrice;
    $('.price h1').text('$' + (price * quantity).toFixed(2));
  });

  $('#add-text').click(function(){
    text = $(this).text();
    if(text == 'Add Text'){
      $(this).text('Remove Text');
    }
    if(text == 'Remove Text'){
      $(this).text('Add Text');
      $("#text-display").val('');
    }
  });
  
  $('#text-preview-submit').click(function() {
    text = $('#text-preview-input').val();
    $("#text-display").text(text);
  });

  $('#text-preview-sans').click(function() {
    $("#text-display").css("font-family", "sans-serif");
    $("#text-display").css("font-style", "");
  });
  $('#text-preview-serif').click(function() {
    $("#text-display").css("font-family", "serif");
    $("#text-display").css("font-style", "");
  });
  $('#text-preview-italic').click(function() {
    $("#text-display").css("font-family", "serif");
    $("#text-display").css("font-style", "italic");
  });

  $('#text-preview-color').click(function() {
    color = $("#text-preview-color").data("color");
    if (color == "black" || color == "Black" || color == "000000") {
      $("#text-display").css("color", "white");
      $('#text-preview-color').css("background-color", "black");
      $('#text-preview-color').data("color", "white");
    } else {
      $("#text-display").css("color", "black");
      $('#text-preview-color').css("background-color", "white");
      $('#text-preview-color').data("color", "black");
    }
  });

  $('.modal .logo').click(function() {
    src = $(this).attr('src');
    $('.product-options .logo').attr('src', src);
    $('#product-logo').attr('src', src);
    $('#logosModal').modal('hide');
  });

  // preview image logo placement
  resizeLogo();
  resizeZoomLogo();

  var basePrice = 19.95;
  $('.quantity').on('change', function() {
    quantity = $(this).val();
    sizePrice = $('#sizes ul li.active').data('price');
    if (!sizePrice) {
      sizePrice = 0;
    }
    price = basePrice + sizePrice;
    console.log(sizePrice);
    $('.price h1').text('$' + (price * quantity).toFixed(2));
  })

})

window.onresize = function(event) {
  resizeLogo();
  resizeZoomLogo();
};

position = "left_chest";
placement = {
  "left_chest": {
    "width": "9",
    "height": "9",
    "top": "42",
    "left": "62",
    "rotate": "0",
    "skew-x": "0",
    "skew-y": "0"
  }
};

function resizeLogo() {
  var img = document.getElementById('product-image');
  logo = $('#product-logo');
  var width = img.clientWidth;
  var height = img.clientHeight;
  logo.css('height', height * (placement[position].height / 100));
  logo.css('width', width * (placement[position].width / 100));
  logo.css('top', height * (placement[position].top / 100));
  logo.css('left', width * (placement[position].left / 100));
};


// ZOOM ZOOM !!!

$('.product-preview').click(function(){
  $('.zoom-btn').toggleClass('active');
  $(this).toggleClass('activeZoom');
  $('.zoom-view').toggle();
});

$(document).on('mousemove', '.activeZoom', function(event){            
  var relX = event.pageX - $(this).offset().left;
  var relY = event.pageY - $(this).offset().top;
  var relBoxCoords = "(" + relX + "," + relY + ")";
  
  zoomW =  $('.zoom-view').width();
  zoomH =  $('.zoom-view').height();
  $('.zoom-view').css('top',relY-(zoomH/2));
  $('.zoom-view').css('left',relX-zoomW/2);

  width = $(this).width();
  height = $(this).height();
  pX = (relX/width);
  pY = (relY/height);
  zimgW =  $('#zoom-image').width();
  zimgH =  $('#zoom-image').height();
  zX = (zimgW * pX)-(zoomW/1.375);
  zY = (zimgH * pY)-(zoomH/2);
  $('#zoom-image').css('top', '-' + zY + 'px' );
  $('#zoom-image').css('left', '-' + zX + 'px' );
  resizeZoomLogo();
});

function resizeZoomLogo() {
  img = $('#zoom-image');
  logo = $('#zoom-logo');
  width = img.width();
  height = img.height();
  imgX = img.css('left');
  imgY = img.css('top');
  
  logo.css('height', height * (placement[position].height / 100));
  logo.css('width', width * (placement[position].width / 100));
  logo.css('top', imgY + (height * (placement[position].top / 100)));
  logo.css('left', imgX + (width * (placement[position].left / 100)));
  
  console.log(imgX);
  console.log((width * (placement[position].left / 100)));
  
};
