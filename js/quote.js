$(document).ready(function() {
	var theQuote = '';
	var theAuthor = '';
	createQuote();
	
	$('.btn-quote').on("click", function() {
		createQuote();
	});
	
	$('.btn-tweet').on("click", function() {
		var url = "https://twitter.com/intent/tweet?text=" + theQuote + " " + theAuthor;
		window.open(url, 'twitter');
		return false;
	});
	
	function createQuote() {
		//Mashape API
		var output = $.ajax({
			url: "https://andruxnet-random-famous-quotes.p.mashape.com/cat=famous",
			type: 'GET',
			data: {},
			dataType: 'json',
			success: function(data) {
				theQuote = data.quote;
				theAuthor = data.author;
				document.getElementById('quote').innerHTML = theQuote;
				document.getElementById('author').innerHTML = theAuthor;
			},
			error: function(err) {
				//Saving the day if for some reason the API doesn't work
				var quotes = {
					1: ["Everybody pities the weak; jeaslousy you have to earn", "Arnold Schwarzenegger"],
					2: ["Be nice to people on yout way up because you meet them on your way down", "Jimmy Durante"],
					3: ["Not because someone is smaller than the largest you can call him small", "Seneca"],
				};
				var randomQuoteNumber = Math.ceil(Math.random() * Object.keys(quotes).length);
				
				$('#quote').text(quotes[randomQuoteNumber][0]);
		    $('#author').text(quotes[randomQuoteNumber][1]);
      },
			beforeSend: function(xhr) {
				xhr.setRequestHeader("X-Mashape-Authorization", "Sr4ugfUfUHmshOQ2IbeGXw8i1Gujp15JgPZjsnIcl0TaxHmdX3");
			}
		});
	}
});