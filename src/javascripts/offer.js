var offer = (function () {

  function sendRequest(method, url, data, success) {
    $.ajax({
      type: method,
      url: url,
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: success,
      error: function (err) {
        alert(JSON.parse(err));
      }
    })
  }

  return {
    getOffer: function(id) {
      sendRequest('GET', '/offers', {}, function (data) {
        data.offers.find(function(item) {
          if (item.offerId === id) {
            var _slidesTemplate = Handlebars.compile($('#popup-template').html());
            $('.js-popup').html(_slidesTemplate({offer: item, user: user}));
          }
        });
      });
    },
    addComment: function(comment, offerId) {
      var commentObj = {
        commentId: offers[offerId].comments.length,
        userId: user.userId,
        userImage: user.userImage,
        isDeleted: false,
        comment: comment
      };
      sendRequest('POST', '/offers/' + offerId + '/comment/', commentObj, function () { listing.getAllOffers(); });
  },
    addReview: function(review, offerId) {
      var reviewObj = {
        reviewId: offers[offerId].reviews.length,
        userId: user.userId,
        userImage: user.userImage,
        isDeleted: false,
        review: review
      };
      sendRequest('POST', '/offers/' + offerId + '/review/', reviewObj, function () {
        listing.getAllOffers(); offer.getOffer(offerId);
      });
  },
    deleteComment: function(offerId, commentId) {
      sendRequest('PUT', '/offers/' + offerId + '/comment/', {index: commentId}, function () { listing.getAllOffers(); });
  },
    deleteReview: function(offerId, reviewId) {
      sendRequest('PUT', '/offers/' + offerId + '/review/', {index: reviewId}, function () {
        listing.getAllOffers(); offer.getOffer(offerId);
      });
  },
    deleteOffer: function(offerId) {
      sendRequest('PUT', '/offers/' + offerId, {}, function () { listing.getAllOffers(); });
  },
    likeOffer: function(offerId) {
    if (offers[offerId].likes.every(function (item) {
        return item.userId != user.userId;
      })) {
      sendRequest('POST', '/offers/' + offerId + '/likes/', {userId: user.userId, userImage: user.userImage}, function () {
        listing.getAllOffers();
        offer.getOffer(offerId);
      });
    } else {
      sendRequest('DELETE', '/offers/' + offerId + '/likes/', {userId: user.userId}, function () {
        listing.getAllOffers();
        offer.getOffer(offerId);
      });
    }
  },
    addOffer: function(offerId) {
    if (offers[offerId].added.every(function (item) {
        return item.userId != user.userId;
      })) {
      sendRequest('POST', '/offers/' + offerId + '/added/', {userId: user.userId, userImage: user.userImage}, function () {
        listing.getAllOffers();
        offer.getOffer(offerId);
      });
    } else {
      sendRequest('DELETE', '/offers/' + offerId + '/added/', {userId: user.userId}, function () {
        listing.getAllOffers();
        offer.getOffer(offerId);
      });
    }
  }
  }
}());
