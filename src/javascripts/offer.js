var offer = (function () {

  function _sendRequest(method, url, data, success) {
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
      _sendRequest('GET', '/offers', {}, function (data) {
        data.offers.find(function(item) {
          if (item.offerId === id) {
            var _slidesTemplate = Handlebars.compile($('#popup-template').html());
            $('.js-popup').html(_slidesTemplate({offer: item, user: bubblewellUser}));
          }
        });
      });
    },
    addComment: function(comment, offerId) {
      var commentObj = {
        commentId: bubblewellOffers[offerId].comments.length,
        userId: bubblewellUser.userId,
        userImage: bubblewellUser.userImage,
        isDeleted: false,
        comment: comment
      };
      _sendRequest('POST', '/offers/' + offerId + '/comment/', commentObj, function () {
        listing.getAllOffers();
      });
  },
    addReview: function(review, offerId) {
      var reviewObj = {
        reviewId: bubblewellOffers[offerId].reviews.length,
        userId: bubblewellUser.userId,
        userImage: bubblewellUser.userImage,
        isDeleted: false,
        review: review
      };
      _sendRequest('POST', '/offers/' + offerId + '/review/', reviewObj, function () {
        listing.getAllOffers();
        offer.getOffer(offerId);
      });
  },
    deleteComment: function(offerId, commentId) {
      _sendRequest('PUT', '/offers/' + offerId + '/comment/', {index: commentId}, function () {
        listing.getAllOffers();
      });
  },
    deleteReview: function(offerId, reviewId) {
      _sendRequest('PUT', '/offers/' + offerId + '/review/', {index: reviewId}, function () {
        listing.getAllOffers();
        offer.getOffer(offerId);
      });
  },
    deleteOffer: function(offerId) {
      _sendRequest('PUT', '/offers/' + offerId, {}, function () {
        listing.getAllOffers();
      });
  },
    likeOffer: function(offerId) {
      var userObj = {
        userId: bubblewellUser.userId,
        userImage: bubblewellUser.userImage
      };

    if (bubblewellOffers[offerId].likes.every(function (item) {
        return item.userId != bubblewellUser.userId;
      })) {
      _sendRequest('POST', '/offers/' + offerId + '/likes/', userObj, function () {
        listing.getAllOffers();
        offer.getOffer(offerId);
      });
    } else {
      _sendRequest('DELETE', '/offers/' + offerId + '/likes/', {userId: bubblewellUser.userId}, function () {
        listing.getAllOffers();
        offer.getOffer(offerId);
      });
    }
  },
    addOffer: function(offerId) {
      var userObj = {
        userId: bubblewellUser.userId,
        userImage: bubblewellUser.userImage
      };

    if (bubblewellOffers[offerId].added.every(function (item) {
        return item.userId != bubblewellUser.userId;
      })) {
      _sendRequest('POST', '/offers/' + offerId + '/added/', userObj, function () {
        listing.getAllOffers();
        offer.getOffer(offerId);
      });
    } else {
      _sendRequest('DELETE', '/offers/' + offerId + '/added/', {userId: bubblewellUser.userId}, function () {
        listing.getAllOffers();
        offer.getOffer(offerId);
      });
    }
  }
  }
}());
