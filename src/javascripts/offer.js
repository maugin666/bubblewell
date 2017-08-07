var offer = (function() {
  var basket = [];
  return {
    likeIt: function(values) {
      basket.push(values);
    },
    addIt: function() {
      return basket.length;
    }
  }
}());
