'use strict';
/* global $ */

const generator = function() {
  return { 
    renderResult: function(result) {
      return `
                <br>   
                    <div>
                    <a href = 'https://www.youtube.com/watch?v=${result.id.videoId}' target= '_blank'>${result.snippet.title}<br>
                    <img class='js-thumbnail' role="link" alt="youtube result thumbnail image" tabindex="0" src='${result.snippet.thumbnails.medium.url}'
                    </a><br>
                    <a role="link" href = 'https://www.youtube.com/channel/${result.snippet.channelId}/videos' target= '_blank'>More videos from ${result.snippet.channelTitle}.</a> 
                    </div>
                    <br>
                    <hr>
                `;
    },
                
    renderMoreButton: function(token) {
      $('#more-results').html(`
          <button id='more-vids' type='button' data-token='${token}'>More results</button>
          `);
    },

    displayYTSearchData: function(data) {
      const results = data.items.map((item) => generator.renderResult(item)); /*why won't this.renderResult work?*/
      let nextPageToken = data.nextPageToken;
      $('.js-search-results').html(results);
      generator.renderMoreButton(nextPageToken); /*why won't this.renderMoreButton work?*/
        
    } 
  };
}();
