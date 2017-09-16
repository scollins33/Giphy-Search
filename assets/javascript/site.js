// Listen for search term to be added
$('#search-button').on('click', function (event) {
    // handle blank inputs
    event.preventDefault();

    // get value of input box and convert to query
    let searchValue = $('#search-input').val();
    let queryValue = searchValue.replace(' ', '%20');

    // if searchValue has value then generate the button
    if (searchValue) {
        // create button and assign value
        $('#terms-div').append('<button value="'+ queryValue
            +'" class="btn btn-default term-tag">'
            + searchValue + '</button>');
    }
});

// Listen for term to be clicked
// target parent container (gif container) so dynamically added buttons get event as well
// button.term-tag(s) within terms-div are our target
$('#terms-div').on('click', 'button.term-tag', function () {
    let queryVal = this.value;

    // create promise to get the gifs
    let tryToQuery = new Promise (
        function (resolve, reject) {
            // set up query
            const apiKey = '80af7ac88a42465599c1d40a5276327a';
            const queryLimit = 10;
            let apiURL = 'https://api.giphy.com/v1/gifs/search?api_key=' +
                apiKey + '&limit=' + queryLimit + '&q=' + queryVal;

            // async call to attempt to get the gifs
            $.ajax({
                url: apiURL,
                method: 'GET',
                timeout: 5000 // set timeout to 5 seconds
            }).done(function (response) {
                // once the call is done, resolve with the web response
                if (response) { console.log(response); resolve(response); }
                // reject if we never get a response
                else { reject('hit 5 second timeout') }
            });
        }
    );

    // chain function once you get the gifs back
    let displayGifs = function (response) {
        // clear the gif area
        $('#gif-container').empty();

        // set up data array for looping
        let gifData = response.data;
        // loop through the returned array to build the gif images in the DOM
        for (let i = 0; i < gifData.length; i++) {
            // create still image link and gif link
            let stillLink = gifData[i].images['original_still'].url;
            let gifLink = gifData[i].images['original'].url;

            $('#gif-container').append('<img src="'+ stillLink
                +'" data-stillURL="'+ stillLink
                +'" data-gifURL="'+ gifLink
                +'" class="term-img" ' +
                'onmouseover="gifMouseOver(this)" ' +
                'onmouseout="stillMouseOff(this)">');
        }
    };

    tryToQuery.then(displayGifs);
});

// Change src of img tag when mouse over
function gifMouseOver (pTarget) {
    let gifUrl = $(pTarget).attr('data-gifURL');
    $(pTarget).attr('src', gifUrl);
}

// Change src of img tag when mouse off
function stillMouseOff (pTarget) {
    let stillUrl = $(pTarget).attr('data-stillURL');
    $(pTarget).attr('src', stillUrl);
}