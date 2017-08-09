var offer = (function() {

  function sendComment(comment, offerId) {
    $.ajax({
      type: "POST",
      url: 'http://127.0.0.1:8000/offers/' + offerId,
      dataType: 'json',
      async: false,
      data: {commentId: offers[offerId].comments.length, userId: user.userId, userImage: user.userImage, comment: comment},
      success: function () {
        controller.getAllOffers();
      }
    })
  }

  function likeOffer(offerId) {
    if (offers[offerId].likes.indexOf(user) == -1) {
      $.ajax({
        type: "POST",
        url: 'http://127.0.0.1:8000/offers/likes/' + offerId,
        dataType: 'json',
        async: false,
        data: {userId: user.userId, userImage: user.userImage},
        success: function () {
          controller.getAllOffers();
        }
      });
    }
    offers[offerId].likes.some(function (item, i) {
      if (item.userId == user.userId) {
        $.ajax({
          type: "DELETE",
          url: 'http://127.0.0.1:8000/offers/likes/' + offerId,
          dataType: 'json',
          async: false,
          data: {index: i},
          success: function () {
            controller.getAllOffers();
          }
        });
      }
    });

  }

  function _listeners() {
    $(document)
      .on('submit', '.add-review', function () {
        $('.review-section').val();
        $('.overlay').show();
    })
      .on('submit', '.add-comment', function (event) {
        event.preventDefault();
        sendComment($(this).find($('.comment-section')).val(), parseInt($(this).data('id')));
    })
      .on('click', '.like-offer', function (event) {
      event.preventDefault();
        likeOffer(parseInt($(this).parent().data('id')));
    });
  }

  return {
    init: function () {
      _listeners();
    },
    likeOffer: function(values) {
      basket.push(values);
    },
    addOffer: function() {
      return basket.length;
    },
    deleteOffer: function() {
      return basket.length;
    },
    addComment: function() {
      return basket.length;
    },
    deleteComment: function() {
      return basket.length;
    },
    addReview: function() {
      return basket.length;
    },
    deleteReview: function() {
      return basket.length;
    }
  }
}());
