// Listen for search term to be added
$('#search-button').on('click', function () {
    // get value of input box
    var searchValue = $('#search-input').val();

    // create button and assign value
    $('#terms-div').append('<button class="btn btn-default term-tag" value="' + searchValue + '">' + searchValue + '</button>');
});