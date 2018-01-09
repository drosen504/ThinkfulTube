'use strict';
/* global $ */

const YT_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyA13I4b3i6USOCq0Z5yPX1VsCYeE0dzE-E'

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    q: searchTerm,
    key: API_KEY
    
  };
  $.getJSON(YT_SEARCH_URL, query, callback);
}

function renderResult(result) {
  console.log(result);
  //   console.log(result.id.videoID);
  return `
    <div>
      <a href= 'https://www.youtube.com/watch?v=${result.id.videoID}' target= '_blank'> ${result.snippet.title}
      <img class='js-thumbnail' src='${result.snippet.thumbnails.medium.url}'</a>

    </div>
  `;
}

function displayYTSearchData(data) {
  const results = data.items.map((item) => renderResult(item));
  console.log(results);
  $('.js-search-results').html(results);
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

$(watchSubmit);
