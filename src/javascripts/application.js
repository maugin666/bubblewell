var controller = (function() {
  var
    user = {
    userId: 6,
    fullName: "Мурзик Забияка",
    userImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKbY1H2x-x225ThT1Nu3zyfpST9KomTdS6pmPEOA_9KfyNnc2G"
  },
    offers = [],
    users = [];

  function getAllOffers() {
    $.ajax({
      type: "GET",
      url: 'http://127.0.0.1:8000/offers',
      dataType: 'json',
      //async: false,
      //data: formData,
      success: function (data) {
        var _slidesTemplate = Handlebars.compile($('#offers-template').html());

        data.offers.forEach(function (item) {
          offers.push(item);
          $('.js-container').append(_slidesTemplate({offer: item, user: user}));
        });
      }
    })
  }

  function getAllUsers() {
    $.ajax({
      type: "GET",
      url: 'http://127.0.0.1:8000/users',
      dataType: 'json',
      //async: false,
      //data: formData,
      success: function (data) {
        data.users.forEach(function (item) {
          users.push(item);
        });
      }
    })
  }

  /*function getUser(id) {
    users.find(function(item) {
      if (item.id !== id) {
        return item;
      }
    });
  }*/

  /*function getOffer(id) {
    $.ajax({
      type: "GET",
      url: 'http://127.0.0.1:8000/offers',
      dataType: 'json',
      success: function (data) {
        data.offers.find(function(item, i) {
          if (item.offerId === id) {
            var _slidesTemplate = Handlebars.compile($('#popup-template').html());
            $('.js-popup').html(_slidesTemplate({offer: item, user: user}));
          }
        });
      }
    })
  }*/
  
  function counter() {
    
  }

  function _listeners() {
    $(document)
      .on('click', '.more-button', function () {
      getOffer(parseInt($(this).data('id')));
      $('.popup').show();
      $('.overlay').show();
    }).on('click', '.overlay, .close-icon', function () {
      $('.popup').hide();
      $('.overlay').hide();
    });
  }

  return {
    init: function () {
      getAllOffers();
      getAllUsers();
      _listeners();
      offer.init();
    }
  }
}());

$(window).ready(function () {
  controller.init();
});

