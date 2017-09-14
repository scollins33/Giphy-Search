// Listen for search term to be added
$('#search-button').on('click', function () {
    // get value of input box
    var searchValue = $('#search-input').val();
    var queryValue = searchValue.replace(' ', '%20');

    // create button and assign value
    $('#terms-div').append('<button class="btn btn-default term-tag" value="' + queryValue + '">' + searchValue + '</button>');
});

