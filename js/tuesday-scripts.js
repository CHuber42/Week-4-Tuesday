function ticket(movieType, ticketType, movieTime) {
  this.movieType = movieType;
  this.ticketType = ticketType;
  if (movieTime < 5) {
    this.movieTime = 0.5;
  } 
  else {
    this.movieTime = 1
  }
}

function addTicket (movieType, ticketType, movieTime) {
  shoppingCart.push(new ticket(movieType, ticketType, movieTime))
}


shoppingCart = [];

function computeTotal(shoppingCart) {
  var total = 0;
  var thisTicket = 0;
  for (i = 0; i < shoppingCart.length; i++){
    if (shoppingCart[i].movieType === "old-movie") {
      thisTicket = 7;
    }
    else {
      thisTicket = 10;
    }
    if (shoppingCart[i].ticketType === "senior") {
      thisTicket -= 2;
    }
    thisTicket *= shoppingCart[i].movieTime;
    total += thisTicket;
  }
  return total;
} 



$(document).ready(function() {
  
  $("#ticketButton").click(function(event) {
  
  var movieType = $("#movies").val();
  var ticketType = $("#age").val();
  var movieTime = parseInt($("#movieTime").val());
  
  addTicket(movieType, ticketType, movieTime);
  })

  $("#checkout").click(function(event) {
    event.preventDefault();
    
    var total = computeTotal(shoppingCart);
    $("#finalBill").text(total);
    });
  })

  

