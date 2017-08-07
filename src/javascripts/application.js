var controller = (function() {
  var user = {
    id: 6,
    fullName: "Котофей Котофеич",
    userImage: "http://i.imgur.com/187Y4u3.png"
  };

  function getAllOffers() {
    $.ajax({
      type: "GET",
      url: 'http://127.0.0.1:8000/offers',
      dataType: 'json',
      //async: false,
      //data: formData,
      success: function (data) {
        var _slidesTemplate = Handlebars.compile($('#offers-template').html());
        $('.js-container').html(_slidesTemplate(data));
      }
    })
  }
  
  function counter() {
    
  }

  function _listeners() {
    $('.user').attr('src', user.userImage);
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
    /*addItem: function(values) {
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
    },*/
    authorize: function () {
      /*$.ajax({
        type: "GET",
        url: 'http://127.0.0.1:8000/users',
        dataType: 'json',
        success: function (data) {
          console.log(user);
          data.users.find(function(item, i) {
            if (item.userId === user.id) {
              $('.user').attr('src', item.userImage);
            }
          });
        }
      })*/
      $('.user').attr('src', user.userImage);
    },
    init: function () {
      getAllOffers();
      _listeners();
    }
  }
}());

function sendJSON(formData) {
  $.ajax({
    type: "POST",
    url: 'http://127.0.0.1:3000/database',
    dataType: 'json',
    //async: false,
    data: formData,
    success: function () {
      alert("Thanks!");
    }
  })
}


function getOffer(id) {
  $.ajax({
    type: "GET",
    url: 'http://127.0.0.1:8000/offers',
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

$(document).ready(function () {

  controller.init();
  controller.authorize();
});

