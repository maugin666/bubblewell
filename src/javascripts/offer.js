var offer = (function () {

  function addComment(comment, offerId) {
    $.ajax({
      type: "POST",
      url: '/offers/' + offerId + '/comment/',
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
        listing.getAllOffers();
      }
    })
  }

  function addReview(review, offerId) {
    $.ajax({
      type: "POST",
      url: '/offers/' + offerId + '/review/',
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
        listing.getAllOffers();
        controller.getOffer(offerId);
      }
    })
  }

  function deleteComment(offerId, commentId) {
    $.ajax({
      type: "PUT",
      url: '/offers/' + offerId + '/comment/',
      contentType: 'application/json',
      dataType: 'json',
      async: false,
      data: JSON.stringify({index: commentId}),
      success: function () {
        listing.getAllOffers();
      }
    })
  }

  function deleteReview(offerId, reviewId) {
    $.ajax({
      type: "PUT",
      url: '/offers/' + offerId + '/review/',
      contentType: 'application/json',
      dataType: 'json',
      async: false,
      data: JSON.stringify({index: reviewId}),
      success: function () {
        listing.getAllOffers();
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
        listing.getAllOffers();
        /*offers.find(function (item, i) {
          if (item.isDeleted === true) {
            $('.offer-item[data-id="' + i + '"]').addClass('deleted');
          }
        });*/
      }
    })
  }

  function likeOffer(offerId) {
    if (offers[offerId].likes.every(function (item) {
        return item.userId != user.userId;
      })) {
      $.ajax({
        type: "POST",
        url: '/offers/' + offerId + '/likes/',
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        data: JSON.stringify({userId: user.userId, userImage: user.userImage}),
        success: function () {
          listing.getAllOffers();
          controller.getOffer(offerId);
        }
      });
    } else {
      $.ajax({
        type: "DELETE",
        url: '/offers/' + offerId + '/likes/',
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        data: JSON.stringify({userId: user.userId}),
        success: function () {
          listing.getAllOffers();
          controller.getOffer(offerId);
        }
      });
    }
  }

  function addOffer(offerId) {
    if (offers[offerId].added.every(function (item) {
        return item.userId != user.userId;
      })) {
      $.ajax({
        type: "POST",
        url: '/offers/' + offerId + '/added/',
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        data: JSON.stringify({userId: user.userId, userImage: user.userImage}),
        success: function () {
          listing.getAllOffers();
          controller.getOffer(offerId);
        }
      });
    } else {
      $.ajax({
        type: "DELETE",
        url: '/offers/' + offerId + '/added/',
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        data: JSON.stringify({userId: user.userId}),
        success: function () {
          listing.getAllOffers();
          controller.getOffer(offerId);
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
      .on('keypress', '.comment-section', function (event) {
        if (event.which == 13 && !event.shiftKey) {
          addComment($(this).val(), parseInt($(this).closest('.add-comment').data('id')));
        }
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
        $('.popup, .overlay').hide();
        deleteOffer(id);
      })
      .on('click', '.js-popup-like-offer', function (event) {
        event.preventDefault();
        likeOffer(parseInt($(this).parent().data('id')));
      })
      .on('click', '.js-like-offer', function (event) {
        event.preventDefault();
        likeOffer(parseInt($(this).closest('.offer-item').data('id')));
      })
      .on('click', '.js-popup-add-offer', function (event) {
        event.preventDefault();
        addOffer(parseInt($(this).parent().data('id')));
      })
      .on('click', '.js-add-offer', function (event) {
        event.preventDefault();
        addOffer(parseInt($(this).closest('.offer-item').data('id')));
      });
  }

  return {
    init: function () {
      _listeners();
    }
  }
}());
