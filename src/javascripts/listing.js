var listing = (function() {

  function _renderOffers(data) {
    var _slidesTemplate = Handlebars.compile($('#offers-template').html());

    $('.js-container').html('');
    bubblewellOffers.length = 0;

    data.offers.forEach(function (item, i) {
      bubblewellOffers.push(item);
      $('.js-container').append(_slidesTemplate({offer: item, user: bubblewellUser}));
      if (item.isDeleted === true) {
        $('.js-offer-item[data-id="' + i + '"]').addClass('deleted');
      }
      item.likes.find(function(like) {
        if (like.userId == bubblewellUser.userId) {
          $('.js-counter-liked[data-id="' + i + '"]').addClass('noted');
        } else {
          $('.js-counter-liked[data-id="' + i + '"]').removeClass('noted');
        }
      });
      item.added.find(function(add) {
        if (add.userId == bubblewellUser.userId) {
          $('.js-counter-added[data-id="' + i + '"]').addClass('noted');
        } else {
          $('.js-counter-added[data-id="' + i + '"]').removeClass('noted');
        }
      });
    });

    $('.js-counter-reviewed').each(function() {
      $(this).html(_changeEndingsWords($(this).text(), ['отзыв', 'отзыва', 'отзывов']));
    });
    $('.js-counter-commented').each(function() {
      $(this).html(_changeEndingsWords($(this).text(), ['комментарий', 'комментария', 'комментариев']));
    });

  }

  function _changeEndingsWords(number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return number + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  }

  return {
    getAllOffers: function() {
      $.ajax({
        type: "GET",
        url: '/offers',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          _renderOffers(data);

        },
        error: function (err) {
          alert('Ошибка загрузки' + err);
        }
      })
    }
  }
}());
