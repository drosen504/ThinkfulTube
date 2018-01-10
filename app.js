'use strict';
/* global $ */

const YT_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyA13I4b3i6USOCq0Z5yPX1VsCYeE0dzE-E';

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

function renderMoreButton() {
  $('#more-results').html(`
  <button type='button'>More results</button>`);
}

function displayYTSearchData(data) {
  const results = data.items.map((item) => renderResult(item));
  $('.js-search-results').html(results);
  renderMoreButton();
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

$('#more-results').on('click', event => {
  console.log('nextbutton clicked');
});


$(watchSubmit);
