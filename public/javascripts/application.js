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
function getJSON() {
  $.ajax({
    type: "GET",
    url: /*'http://127.0.0.1:3000/offers'*/'../offers.json',
    dataType: 'json',
    //async: false,
    //data: formData,
    success: function (data) {
      console.log(data);
      var _slidesTemplate = Handlebars.compile($('#template').html());
      $('.js-container').html(_slidesTemplate(data));
    }
  })
}

$(document).ready(function () {
  var obj = {"author": "qwerty", "title": "qwerty"};

  getJSON();
});

