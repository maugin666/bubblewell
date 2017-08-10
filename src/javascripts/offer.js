var offer = (function () {

  function addComment(comment, offerId) {
    $.ajax({
      type: "POST",
      url: '/offers/comment/' + offerId,
      contentType: 'application/json',
      async: false,
      data: JSON.stringify({
        commentId: offers[offerId].comments.length,
        userId: user.userId,
        userImage: user.userImage,
        isDeleted: false,
        comment: comment
      }),
      success: function () {
        controller.getAllOffers();
      }
    })
  }

  function addReview(review, offerId) {
    $.ajax({
      type: "POST",
      url: '/offers/review/' + offerId,
      contentType: 'application/json',
      dataType: 'json',
      async: false,
      data: JSON.stringify({
        reviewId: offers[offerId].reviews.length,
        userId: user.userId,
        userImage: user.userImage,
        isDeleted: false,
        review: review
      }),
      success: function () {
        controller.getOffer(offerId);
      }
    })
  }

  function deleteComment(offerId, commentId) {
    $.ajax({
      type: "PUT",
      url: '/offers/comment/' + offerId,
      contentType: 'application/json',
      dataType: 'json',
      async: false,
      data: JSON.stringify({index: commentId}),
      success: function () {
        controller.getAllOffers();
      }
    })
  }

  function deleteReview(offerId, reviewId) {
    $.ajax({
      type: "PUT",
      url: '/offers/review/' + offerId,
      contentType: 'application/json',
      dataType: 'json',
      async: false,
      data: JSON.stringify({index: reviewId}),
      success: function () {
        controller.getOffer(offerId);
      }
    })
  }

  function deleteOffer(offerId) {
    $.ajax({
      type: "PUT",
      url: '/offers/' + offerId,
      contentType: 'application/json',
      dataType: 'json',
      async: false,
      success: function () {
        controller.getAllOffers();
        offers.forEach(function (item, i) {
          console.log(offers);
          if (item.isDeleted == true) {
            $('.offer-item[data-id="' + item.offerId + '"]').addClass('deleted');
          }
        });
      }
    })
  }

  function likeOffer(offerId) {
    if (offers[offerId].likes.every(function (item) {
        return item.userId != user.userId;
      })) {
      $.ajax({
        type: "POST",
        url: '/offers/likes/' + offerId,
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        data: JSON.stringify({userId: user.userId, userImage: user.userImage}),
        success: function () {
          controller.getAllOffers();
        }
      });
    } else {
      $.ajax({
        type: "DELETE",
        url: '/offers/likes/' + offerId,
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        data: JSON.stringify({userId: user.userId}),
        success: function () {
          controller.getAllOffers();
        }
      });
    }
  }

  function _listeners() {
    $(document)
      .on('submit', '.add-review', function (event) {
        event.preventDefault();
        $('.review-section').val();
        $('.overlay').show();
      })
      .on('submit', '.add-comment', function (event) {
        event.preventDefault();
        addComment($(this).find($('.comment-section')).val(), parseInt($(this).data('id')));
      })
      .on('keypress', '.review-section', function (event) {
        if (event.which == 13 && !event.shiftKey) {
          addReview($(this).val(), parseInt($(this).closest('.add-review').data('id')));
        }
      })
      .on('click', '.js-delete-comment', function (event) {
        var
          offerId = parseInt($(this).closest('.offer-item').data('id')),
          commentId = parseInt($(this).closest('.comment-item').data('id'));

        event.preventDefault();
        deleteComment(offerId, commentId);
      })
      .on('click', '.js-delete-review', function (event) {
        var
          offerId = parseInt($(this).closest('.reviews').data('id')),
          reviewId = parseInt($(this).closest('.review-item').data('id'));

        event.preventDefault();
        deleteReview(offerId, reviewId);
      })
      .on('click', '.js-delete-offer', function (event) {
        var id = parseInt($(this).closest('.popup-right-block').data('id'));

        event.preventDefault();
        $('.popup').hide();
        deleteOffer(id);
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
    addOffer: function () {
      return basket.length;
    },
    deleteOffer: function () {
      return basket.length;
    }
  }
}());
