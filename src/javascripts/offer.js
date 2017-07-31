var offer = (function() {
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
