var offer = (function() {

  function sendComment(comment, offerId) {
    offers.find(function(item) {
      if (item.id !== offerId) {
        offers.comments.push({
          commentId: offers.comments.length + 1,
          userId: user.userId,
          userImage: user.userImage,
          comment: comment
        });
        $.ajax({
          type: "POST",
          url: 'http://127.0.0.1:3000/offers',
          dataType: 'json',
          //async: false,
          data: JSON.stringify(offers),
          success: function () {
            alert("Comment added!");
          }
        })
      }
    });
  }

  function _listeners() {
    $(document)
      .on('submit', '.add-review', function () {
        $('.review-section').val();
        $('.overlay').show();
      }).on('submit', '.add-comment', function () {
        sendComment($(this).find('.comment-section').val(), parseInt($(this).data('id')));
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
