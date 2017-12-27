$(window).load(function() {
  draw();
  //statusAlert();

});


/*Header stick*/
$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('nav').addClass('shrink');
  } else {
    $('nav').removeClass('shrink');
  }
});


/*Status active (Cuando hay una alerta de envio)*/
/*function statusAlert(){

  if ($( "body" ).has( ".bar-status" )) {

    $('.jumbotron').addClass('positionStatus');
  } else {
    $('.jumbotron').removeClass('positionStatus');
  }
}*/


/*Heigth and width script*/
function draw() {

  var colLeftHeight = $('#col-left').height();
 $('#map-container').css("height", colLeftHeight);
 var windowHeight = $(window).height();
 var btnHeight = $(".cerrar-movil-container").height();
 var windowWidth = $(window).width();


//

 if (windowWidth <= 500) {
   
    $('.modal-content').css("min-height", windowHeight );

 } else {
    $('.navbar-collapse.collapse').css("min-height", "auto" );
    $('.modal-content').css("min-height", "auto" );
 }

}

/*Parallax effect*/
 
var $animation_elements = $('.animation-element');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);
 
  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);
 
    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');





/*Qualification plugin*/
// Starrr plugin (https://github.com/dobtco/starrr)
var __slice = [].slice;

(function($, window) {
  var Starrr;

  Starrr = (function() {
    Starrr.prototype.defaults = {
      rating: void 0,
      numStars: 5,
      change: function(e, value) {}
    };

    function Starrr($el, options) {
      var i, _, _ref,
        _this = this;

      this.options = $.extend({}, this.defaults, options);
      this.$el = $el;
      _ref = this.defaults;
      for (i in _ref) {
        _ = _ref[i];
        if (this.$el.data(i) != null) {
          this.options[i] = this.$el.data(i);
        }
      }
      this.createStars();
      this.syncRating();
      this.$el.on('mouseover.starrr', 'span', function(e) {
        return _this.syncRating(_this.$el.find('span').index(e.currentTarget) + 1);
      });
      this.$el.on('mouseout.starrr', function() {
        return _this.syncRating();
      });
      this.$el.on('click.starrr', 'span', function(e) {
        return _this.setRating(_this.$el.find('span').index(e.currentTarget) + 1);
      });
      this.$el.on('starrr:change', this.options.change);
    }

    Starrr.prototype.createStars = function() {
      var _i, _ref, _results;

      _results = [];
      for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
        _results.push(this.$el.append("<span class='star-container .star-empty'></span>"));
      }
      return _results;
    };

    Starrr.prototype.setRating = function(rating) {
      if (this.options.rating === rating) {
        rating = void 0;
      }
      this.options.rating = rating;
      this.syncRating();
      return this.$el.trigger('starrr:change', rating);
    };

    Starrr.prototype.syncRating = function(rating) {
      var i, _i, _j, _ref;

      rating || (rating = this.options.rating);
      if (rating) {
        for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          this.$el.find('span').eq(i).removeClass('star-empty').addClass('star-full');
        }
      }
      if (rating && rating < 5) {
        for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
          this.$el.find('span').eq(i).removeClass('star-full').addClass('star-empty');
        }
      }
      if (!rating) {
        return this.$el.find('span').removeClass('star-full').addClass('star-empty');
      }
    };

    return Starrr;

  })();
  return $.fn.extend({
    starrr: function() {
      var args, option;

      option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this.each(function() {
        var data;

        data = $(this).data('star-rating');
        if (!data) {
          $(this).data('star-rating', (data = new Starrr($(this), option)));
        }
        if (typeof option === 'string') {
          return data[option].apply(data, args);
        }
      });
    }
  });
})(window.jQuery, window);

$(function() {
  return $(".starrr").starrr();
});

$( document ).ready(function() {
      
  $('#stars').on('starrr:change', function(e, value){
    $('#count').html(value);
  });
  
  $('#stars-existing').on('starrr:change', function(e, value){
    $('#count-existing').html(value);
  });
});





//Calendar

ko.bindingHandlers.dateTimePicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        //initialize datepicker with some optional options
        var options = allBindingsAccessor().dateTimePickerOptions || {};
        $(element).datetimepicker(options);

        //when a user changes the date, update the view model
        ko.utils.registerEventHandler(element, "dp.change", function (event) {
            var value = valueAccessor();
            if (ko.isObservable(value)) {
                if (event.date != null && !(event.date instanceof Date)) {
                    value(event.date.toDate());
                } else {
                    value(event.date);
                }
            }
        });

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            var picker = $(element).data("DateTimePicker");
            if (picker) {
                picker.destroy();
            }
        });
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {

        var picker = $(element).data("DateTimePicker");
        //when the view model is updated, update the widget
        if (picker) {
            var koDate = ko.utils.unwrapObservable(valueAccessor());

            //in case return from server datetime i am get in this form for example /Date(93989393)/ then fomat this
            koDate = (typeof (koDate) !== 'object') ? new Date(parseFloat(koDate.replace(/[^0-9]/g, ''))) : koDate;

            picker.date(koDate);
        }
    }
};




//Range control
function setSliderHandle(i, value) {
  var r = [null,null];
  r[i] = value;
  html5Slider.noUiSlider.set(r);
}

// Listen to keydown events on the input field.
inputs.forEach(function(input, handle) {

  input.addEventListener('change', function(){
    setSliderHandle(handle, this.value);
  });

  input.addEventListener('keydown', function( e ) {

    var values = html5Slider.noUiSlider.get();
    var value = Number(values[handle]);

    // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
    var steps = html5Slider.noUiSlider.steps();

    // [down, up]
    var step = steps[handle];

    var position;

    // 13 is enter,
    // 38 is key up,
    // 40 is key down.
    switch ( e.which ) {

      case 13:
        setSliderHandle(handle, this.value);
        break;

      case 38:

        // Get step to go increase slider value (up)
        position = step[1];

        // false = no step is set
        if ( position === false ) {
          position = 1;
        }

        // null = edge of slider
        if ( position !== null ) {
          setSliderHandle(handle, value + position);
        }

        break;

      case 40:

        position = step[0];

        if ( position === false ) {
          position = 1;
        }

        if ( position !== null ) {
          setSliderHandle(handle, value - position);
        }

        break;
    }
  });
});



///¡Modal Video


$(document).ready(function(){

    /* Get iframe src attribute value i.e. YouTube video url

    and store it in a variable */

    var url = $("#storableVideo").attr('src');

    

    /* Assign empty url value to the iframe src attribute when

    modal hide, which stop the video playing */

    $("#myModalVideo").on('hide.bs.modal', function(){

        $("#storableVideo").attr('src', '');

    });

    

    /* Assign the initially stored url back to the iframe src

    attribute when modal is displayed again */

    $("#myModalVideo").on('show.bs.modal', function(){

        $("#storableVideo").attr('src', url);

    });

});






