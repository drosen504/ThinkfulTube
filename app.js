'use strict';
/* global $ */

const YT_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyA13I4b3i6USOCq0Z5yPX1VsCYeE0dzE-E';
let lastSearch = '';


function getDataFromApi(searchTerm, callback, pageToken) {
  const query = {
    part: 'snippet',
    pageToken: pageToken,
    q: searchTerm,
    key: API_KEY
  };
  $.getJSON(YT_SEARCH_URL, query, callback);
  lastSearch = query.q;
}

// function renderPrevButton(token) {
//   $('#prev-results').html(`
//   <button id='prev-vids' type='button' data-token='${token}'>Previous results</button>
//   `);
// }

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val('');
    getDataFromApi(query, generator.displayYTSearchData);
  });
}

//waits for more results button to be clicked and triggers new API call be made.
$('#more-results').click(event => {
  getDataFromApi(lastSearch, generator.displayYTSearchData, $('#more-vids').data('token'));
});

// $('#prev-results').click(event => {
//   getDataFromApi(lastSearch, displayYTSearchData, $('#prev-vids').data('token'));
// });

$(watchSubmit);

// function renderPrevButton(token) {
//   $('#prev-results').html(`
//   <button id='prev-vids' type='button' data-token='${token}'>Previous results</button>
//   `);
// }



// console.log($('#prev-vids').data('token'));
// if ($('#prev-vids').data('token') === undefined) {
//   $('#prev-vids').data('#prev-vides', 'token', data.prevPageToken);
// }