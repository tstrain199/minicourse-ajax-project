
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var googleStr = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=';
    var apiKey = 'AIzaSyBLZUDNLNjSZ-i9qn22ZTfvp-KEmgMO2Ag';
    var urlStr = googleStr.concat(streetStr,',',cityStr,'&key=',apiKey);
    console.log(urlStr);
    $('.nytimes-container').append('<img class="bgimg" src="'+urlStr+'">');
    return false;
};

$('#form-container').submit(loadData);
