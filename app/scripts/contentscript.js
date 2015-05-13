'use strict';

(function($){
  var changeMergeButtonState = function() {
    var $container = $('#js-repo-pjax-container');
    var issueTitle = $container.find('.js-issue-title').text();
    var $buttonMerge = $container.find('.merge-message button.merge-branch-action');
    var disabled = false;
    var buttonHtml = '';

    chrome.runtime.sendMessage({from: 'content', subject: 'localStorage'}, function(response){
      if (!response) { return; }

      var localStorage = response.localStorage;
      disabled = true;
      chrome.storage.local.get('disabled', function(result){
        if(typeof result.disabled === 'undefined'){
           disabled = true
         } else {
           disabled = result.disabled
         }
        buttonHtml = '<span class="octicon octicon-git-merge"></span> ' + (disabled ? 'Use the merge tool!' : 'Merge pull request');

        $buttonMerge.attr('disabled', disabled);
        $buttonMerge.html(buttonHtml);
        
      });      
    });
  };

  changeMergeButtonState();
  setInterval(changeMergeButtonState, 1000);
})(jQuery);
