
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');


    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');
    // debugger;

    // load nytimes

    // YOUR CODE GOES HERE!
    var nyt_url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nyt_url += '?' + $.param({
      'api-key': "751ec68137734ff0a09da10dafe1be06",
      'q': address
    });

    //debugger;
    $.getJSON(nyt_url, function(data) {
        for (doc in data.response.docs) {
          //console.log(data.response.docs[doc].headline.main);
          var href = data.response.docs[doc].web_url;
          var lead = data.response.docs[doc].headline.main;
          var para = data.response.docs[doc].lead_paragraph;
          var item = "<li class='article'> <a href='" + href + "'>" + lead + "</a> <p>" + para + "</p>";
          $('#nytimes-articles').append(item);
        }
    })
      .fail(function() {
        var err_msg = "<h2 class='greeting'>New York Times Articles Could Not Be Found </h2>";
        $(err_msg).appendTo(".nytimes-container");
      });

    // load wikipedia-links
    var wiki_url = "https://en.wikipedia.org/w/api.php";

//debugger;
    $.ajax({
      url: wiki_url,
      data: {
        action: "opensearch",
        search: cityStr,
        format: "json"
      },
      dataType: "jsonp",
      success: function(data) {
      console.log(data);
      for (var d = 0; d < data.length; d++) {
      var href = data[3][d];
      var title = data[1][d];
      var item = "<li> <a href='" + href + "'>" + title + "</a>";
      $('#wikipedia-links').append(item);
      }
      //console.log(data.1[2]);
      }
    });


        return false;
    };



$('#form-container').submit(loadData);
