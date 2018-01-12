'use strict';
/*$ global $*/

const generator = function() {
  return { 
    renderResult: function(result) {
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
    },
                
    renderMoreButton: function(token) {
      $('#more-results').html(`
          <button id='more-vids' type='button' data-token='${token}'>More results</button>
          `);
    },

    displayYTSearchData: function(data) {
      console.log('generator triggered');
      const results = data.items.map((item) => this.renderResult(item));
      let nextPageToken = data.nextPageToken;
      $('.js-search-results').html(results);
      this.renderMoreButton(nextPageToken);
        
    } 
  };
};
