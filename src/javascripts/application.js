var controller = (function() {

  Handlebars.registerHelper('limit', function (arr, limit) {
    var newArr = arr.filter(function(item) {
      return item.isDeleted === false;
    });
    return newArr.slice(-limit);
  });

  function _listeners() {
    $(document)
      .on('click', '.open-popup-button', function () {
      controller.getOffer(parseInt($(this).closest('.offer-item').data('id')));
      $('.popup').fadeIn();
      $('.overlay').fadeIn();
    })
      .on('click', '.js-show-comments', function () {
        var comments = $(this).closest('.offer-item').find('.comments');

        if (comments.hasClass('hidden')) {
          comments.removeClass('hidden');
        } else {
          comments.addClass('hidden');
        }
      })
      .on('click', '.overlay, .close .close-icon', function () {
      $('.popup').fadeOut();
      $('.overlay').fadeOut();
    });
  }

  return {
    init: function() {
      _listeners();
      offer.init();
      listing.getAllOffers();
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
});

