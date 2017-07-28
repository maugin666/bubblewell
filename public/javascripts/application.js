var controller = (function() {
  var basket = []; // приватная переменная
  return { // методы доступные извне
    addItem: function(values) {
      basket.push(values);
    },
    getItemCount: function() {
      return basket.length;
    },
    getTotal: function() {
      var q = this.getItemCount(),p=0;
      while(q--){
        p+= basket[q].price;
      }
      return p;
    }
  }
}());

function sendJSON(formData) {
  $.ajax({
    type: "POST",
    url: 'http://127.0.0.1:3000/offers',
    dataType: 'json',
    //async: false,
    data: formData,
    success: function () {
      alert("Thanks!");
    }
  })
}

function getAllOffers() {
  $.ajax({
    type: "GET",
    url: /*'http://127.0.0.1:3000/offers'*/'../offers.json',
    dataType: 'json',
    //async: false,
    //data: formData,
    success: function (data) {
      var _slidesTemplate = Handlebars.compile($('#offers-template').html());
      $('.js-container').html(_slidesTemplate(data));
    }
  })
}
function getOffer(id) {
  $.ajax({
    type: "GET",
    url: '../offers.json',
    dataType: 'json',
    success: function (data) {
      data.offers.find(function(item, i) {
        if (item.offerId === id) {
          var _slidesTemplate = Handlebars.compile($('#popup-template').html());
          $('.js-popup').html(_slidesTemplate(item));
        }
      });
    }
  })
}
/*function getUser(id) {
  $.ajax({
    type: "GET",
    url: '../users.json',
    dataType: 'json',
    success: function (data) {
      data.users.find(function(item, i) {
        if (item.userId === id) {
          console.log(item);
        }
      });

    }
  })
}*/

$(document).ready(function () {
  var obj = {"author": "qwerty", "title": "qwerty"};
  //sendJSON(obj);

  getAllOffers();

  $(document).on('click', '.more-button', function () {
    getOffer(parseInt($(this).data('id')));
    $('.popup').show();
    $('.overlay').show();
  });
  $(document).on('click', '.overlay, .close-icon', function () {
    $('.popup').hide();
    $('.overlay').hide();
  });
});

