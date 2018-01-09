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
  return `
  <nav class "js-nav">
  <button class="js-button-prev" type = "submit">Previous</button>
  <button class="js-button-next" type = "submit">Next</button>
  </nav><br>   
    <div>
    <a href = 'https://www.youtube.com/watch?v=${result.id.videoId}' target= '_blank'>${result.snippet.title}<br>
      <img class='js-thumbnail' src='${result.snippet.thumbnails.medium.url}'
    </a><br>
    <a href = 'https://www.youtube.com/channel/${result.snippet.channelId}/videos' target= '_blank'>More videos from ${result.snippet.channelTitle}.</a> 
    </div>
    <br>
  `;
}

function displayYTSearchData(data) {
  const results = data.items.map((item) => renderResult(item));
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
