var _gaq = _gaq || [];

function resize() {
    var width  = $(window).width(),
        height = $(window).height();

    $('body').css({
        width : width,
        height: height
    });
}

$(function () {

    /**
     * Before we start to implement some fancy logic about when a user has really tried to search something
     * and be before we're doing deferring and shit, we just assume, that focussing the input means, the user wants
     * to search something :)
     */
    $('#search').on('focus', function() {
        _gaq.push([ '_trackEvent', 'Widget', 'Search' ]);
    });

    $('#search').bind('keydown', 'return', function () {
        var $firstItem = $('.mv-list .item:first'),
            url;

        if ($firstItem.length == 0) {
            return;
        }

        url = $firstItem.find('a').attr('href');

        _gaq.push([ '_trackEvent', 'Widget', 'Enter' ]);

        chrome.extension.sendMessage({purpose:"goto", url: url});
    });

    $('.mv-list').on('click', 'a.link', function(e) {
        var url;
        e.preventDefault();

        url = $(this).attr('href');

        _gaq.push([ '_trackEvent', 'Widget', 'Click_URL' ]);
        chrome.extension.sendMessage({purpose:"goto", url: url});
    });

    $(window).bind("resize", resize);

    resize();

});

_gaq.push(['_setAccount', 'UA-33179945-6']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();