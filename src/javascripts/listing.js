var listing = (function() {

  function renderOffers(data) {
    var _slidesTemplate = Handlebars.compile($('#offers-template').html());

    $('.js-container').html('');
    bubblewellOffers.length = 0;

    data.offers.forEach(function (item, i) {
      bubblewellOffers.push(item);
      $('.js-container').append(_slidesTemplate({offer: item, user: bubblewellUser}));
      if (item.isDeleted === true) {
        $('.offer-item[data-id="' + i + '"]').addClass('deleted');
      }
    });

    $('.counter.reviewed').each(function() {
      $(this).html(changeEndingsWords($(this).text(), ['отзыв', 'отзыва', 'отзывов']));
    });
    $('.counter.commented').each(function() {
      $(this).html(changeEndingsWords($(this).text(), ['комментарий', 'комментария', 'комментариев']));
    });

  }

  function changeEndingsWords(number, titles) {
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
          renderOffers(data);

        },
        error: function (err) {
          alert('Ошибка загрузки' + err);
        }
      })
    }
  }
}());
