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

function renderResult(result) {
  console.log(result);
  return `
  </div><br>   
    <div>
    <a href = 'https://www.youtube.com/watch?v=${result.id.videoId}' target= '_blank'>${result.snippet.title}<br>
      <img class='js-thumbnail' src='${result.snippet.thumbnails.medium.url}'
    </a><br>
    <a href = 'https://www.youtube.com/channel/${result.snippet.channelId}/videos' target= '_blank'>More videos from ${result.snippet.channelTitle}.</a> 
    </div>
    <br>
  `;
}

function renderMoreButton(token) {
  $('#more-results').html(`
    <button id='more-vids' type='button' data-token='${token}'>More results</button>
    `);
}

// function renderPrevButton(token) {
//   $('#prev-results').html(`
//   <button id='prev-vids' type='button' data-token='${token}'>Previous results</button>
//   `);
// }

function displayYTSearchData(data) {
  const results = data.items.map((item) => renderResult(item));
  let nextPageToken = data.nextPageToken;
  $('.js-search-results').html(results);
  // console.log($('#prev-vids').data('token'));
  // if ($('#prev-vids').data('token') === undefined) {
  //   $('#prev-vids').data('#prev-vides', 'token', data.prevPageToken);
  // }
  renderMoreButton(nextPageToken);
  
} 

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val('');
    getDataFromApi(query, displayYTSearchData);
  });
}

//waits for more results button to be clicked and triggers new API call be made.
$('#more-results').click(event => {
  getDataFromApi(lastSearch, displayYTSearchData, $('#more-vids').data('token'));
  renderPrevButton();
});

// $('#prev-results').click(event => {
//   getDataFromApi(lastSearch, displayYTSearchData, $('#prev-vids').data('token'));
// });


$(watchSubmit);
