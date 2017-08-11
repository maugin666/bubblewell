var listing = (function() {

  function renderOffers(data) {
    var _slidesTemplate = Handlebars.compile($('#offers-template').html());

    $('.js-container').html('');
    offers.length = 0;

    data.offers.forEach(function (item, i) {
      offers.push(item);
      $('.js-container').append(_slidesTemplate({offer: item, user: user}));
      if (item.isDeleted === true) {
        $('.offer-item[data-id="' + i + '"]').addClass('deleted');
      }
    });
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
        }
      })
    }
  }
}());
