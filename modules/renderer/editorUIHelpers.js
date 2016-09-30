(function()
{
    var path = require('path');

    var textHelpers = require(path.resolve('./modules/textHelpers.js')),
        editorUtility = require(path.resolve('./modules/renderer/editorUtility.js'));

    function getPostAsStr(viewID)
    {
        var str = editorTextEditHelpers.getContent(editorTextEditHelpers.getEditorID(viewID));
        return (str) ? str : ''; //if null will give a blank string
    }

    module.exports = {
        resize: function()
        {
            var windowWidth = $(window).width(); //retrieve current window width
            var windowHeight = $(window).height(); //retrieve current window height

            var sidebarSize = 300;
            var paddingTopSize = 60;

            var titleBoxHeight = $('.editorLeft .form-group').outerHeight(true);

            $('#editorHolder .editorLeft').width((windowWidth - sidebarSize - 15) + 'px');
            $('#editorHolder .editorRight').width((sidebarSize - 15) + 'px');

            $('#editorHolder .editorRight').height((windowHeight - paddingTopSize) + 'px');

            var editorHolderHeight = windowHeight - (paddingTopSize + titleBoxHeight);

            editorHolderHeight = editorHolderHeight - 36; //toolbar size

            $('#editorHolder .editorHolder').height(editorHolderHeight + 'px');
        },
        checkPostTitleLength: function(viewID)
        {
            var text = $('#' + viewID + " [name='postTitle']").val().trim();

            var errMsg = editorUtility.validate.postTitleLength(text);

            if (errMsg)
            {
                if ($('#' + viewID + ' .titleError .postTitleLength').length === 0) $('#' + viewID + ' .titleError').append('<div class="alert alert-warning postTitleLength" role="alert">' + errMsg + '</div>');
            }
            else
            {
                $('#' + viewID + ' .titleError .postTitleLength').remove();
            }

            return errMsg;
        },
        getPostBodyLength: function(viewID)
        {
            return editorUtility.getPostStrLen(getPostAsStr(viewID));
        },
        checkPostBodyLength: function(viewID)
        {
            var text = getPostAsStr(viewID);
            var len = editorUtility.getPostStrLen(text);

            var errMsg = editorUtility.validate.postBody(text, len);

            //update tab view
            if (len > 0)
            {
                $('#navMiddleButtons .editorTabHasContent li').removeClass('active');
                $('#navMiddleButtons .editorTabHasContent .edittab').addClass('active');

                $('#navMiddleButtons .editorTabNoContent').hide();
                $('#navMiddleButtons .editorTabHasContent').show();
            }
            else
            {
                $('#navMiddleButtons .editorTabHasContent').hide();
                $('#navMiddleButtons .editorTabNoContent').show();
            }

            //update errors view
            if (errMsg)
            {
                if ($('#' + viewID + ' .bodyError .postBodyLength').length === 0) $('#' + viewID + ' .bodyError').append('<div class="alert alert-warning postBodyLength" role="alert">' + errMsg + '</div>');
            }
            else
            {
                $('#' + viewID + ' .bodyError .postBodyLength').remove();
            }

            return errMsg;
        },
        checkAdditionalJSON: function(viewID)
        {
            var text = $('#' + viewID + " [name='postJSONTextarea']").val().trim();

            var errMsg = editorUtility.validate.additionalJSONParse(text).errMsg;

            //update errors view
            if (errMsg)
            {
                if ($('#' + viewID + ' .bodyError .jsonError').length === 0) $('#' + viewID + ' .bodyError').append('<div class="alert alert-warning jsonError" role="alert">' + errMsg + '</div>');
            }
            else
            {
                $('#' + viewID + ' .bodyError .jsonError').remove();
            }

            return errMsg;
        }

    };

})();
