var controller = (function() {

  Handlebars.registerHelper('limit', function (arr, limit) {
    var newArr = arr.filter(function(item) {
      return item.isDeleted === false;
    });
    return newArr.slice(-limit);
  });

  Handlebars.registerHelper("length", function(arr) {
    var newArr = arr.filter(function(item) {
      return item.isDeleted === false;
    });
    return newArr.length;
  });

  function _listeners() {
    $(document)
      .on('click', '.js-open-popup', function () {
      offer.getOffer(parseInt($(this).closest('.js-offer-item').data('id')));
      $('.js-popup').fadeIn();
      $('.js-overlay').fadeIn();
    })
      .on('click', '.js-show-comments', function () {
        var comments = $(this).closest('.js-offer-item').find('.js-comments');

        if (comments.hasClass('hidden')) {
          comments.removeClass('hidden');
        } else {
          comments.addClass('hidden');
        }
      })
      .on('click', '.js-overlay, .js-close-popup', function () {
        $('.js-popup').fadeOut();
        $('.js-overlay').fadeOut();
    })
      .on('keypress', '.js-comment-section', function (event) {
        if (event.which == 13 && !event.shiftKey) {
          offer.addComment($(this).val(), parseInt($(this).closest('.js-add-comment').data('id')));
        }
      })
      .on('keypress', '.js-review-section', function (event) {
        if (event.which == 13 && !event.shiftKey) {
          offer.addReview($(this).val(), parseInt($(this).closest('.js-add-review').data('id')));
        }
      })
      .on('click', '.js-delete-comment', function () {
        var
          offerId = parseInt($(this).closest('.js-offer-item').data('id')),
          commentId = parseInt($(this).closest('.js-comment-item').data('id'));

        offer.deleteComment(offerId, commentId);
      })
      .on('click', '.js-delete-review', function () {
        var
          offerId = parseInt($(this).closest('.js-reviews').data('id')),
          reviewId = parseInt($(this).closest('.js-review-item').data('id'));

        offer.deleteReview(offerId, reviewId);
      })
      .on('click', '.js-delete-offer', function () {
        var id = parseInt($(this).closest('.js-buttons').data('id'));

        $('.js-popup, .js-overlay').hide();
        offer.deleteOffer(id);
      })
      .on('click', '.js-popup-like-offer', function () {
        offer.likeOffer(parseInt($(this).parent().data('id')));
      })
      .on('click', '.js-like-offer', function () {
        offer.likeOffer(parseInt($(this).closest('.js-offer-item').data('id')));
      })
      .on('click', '.js-popup-add-offer', function () {
        offer.addOffer(parseInt($(this).parent().data('id')));
      })
      .on('click', '.js-add-offer', function () {
        offer.addOffer(parseInt($(this).closest('.js-offer-item').data('id')));
      });
  }

  return {
    init: function() {
      _listeners();
      listing.getAllOffers();
    }
  }
}());

var
  bubblewellUser = {
    userId: 6,
    fullName: "Мурзик Забияка",
    userImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKbY1H2x-x225ThT1Nu3zyfpST9KomTdS6pmPEOA_9KfyNnc2G"
  },
  bubblewellOffers = [];

$(document).ready(function () {
  controller.init();
});


