var controller = (function() {

  function _listeners() {
    $(document)
      .on('click', '.more-button', function () {
      controller.getOffer(parseInt($(this).closest('.offer-item').data('id')));
      $('.popup').show();
      $('.overlay').show();
    })
      .on('click', '.offer-item', function () {
        var comments = $(this).find('.comments');

        if (comments.hasClass('hidden')) {
          comments.removeClass('hidden');
        } else {
          comments.addClass('hidden');
        }
      })
      .on('click', '.overlay, .close .close-icon', function () {
      $('.popup').hide();
      $('.overlay').hide();
    });
  }

  Handlebars.registerHelper('limit', function (arr, limit) {
    var newArr = arr.filter(function(item) {
      return item.isDeleted === false;
    });
    return newArr.slice(-limit);
  });

  return {
    init: function() {
      _listeners();
      offer.init();
    },
    getAllOffers: function() {
      $.ajax({
        type: "GET",
        url: '/offers',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          var _slidesTemplate = Handlebars.compile($('#offers-template').html());
          $('.js-container').html('');
          offers.length = 0;
          data.offers.forEach(function (item) {
            offers.push(item);
            $('.js-container').append(_slidesTemplate({offer: item, user: user}));
          });
        }
      })
    },
    getOffer: function(id) {
    $.ajax({
      type: "GET",
      url: '/offers',
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        data.offers.find(function(item, i) {
          if (item.offerId === id) {
            var _slidesTemplate = Handlebars.compile($('#popup-template').html());
            $('.js-popup').html(_slidesTemplate({offer: item, user: user}));
          }
        });
      }
    })
  }
  }
}());

var
  user = {
    userId: 6,
    fullName: "Мурзик Забияка",
    userImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKbY1H2x-x225ThT1Nu3zyfpST9KomTdS6pmPEOA_9KfyNnc2G"
  },
  offers = [];

$(document).ready(function () {
  controller.init();
  controller.getAllOffers();
});

