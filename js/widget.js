var _gaq = _gaq || [];

function Amazon() {
    this.tag = 'robdresblo-21';
    /**
     * blatantly copied from http://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
     * @param uri
     * @param key
     * @param value
     * @return {*}
     */
    function updateQueryStringParameter(uri, key, value) {
        var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
        separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    }

    this.addTag = function (url) {
        return updateQueryStringParameter(url, 'tag', 'robdresblo-21');
    }

    this.isAmazonURL = function (url) {
        return !!~url.indexOf('amazon.');
    }
}

function resize() {
    var width = $(window).width(),
        height = $(window).height();

    $('body').css({
        width:width,
        height:height
    });
}

$(function () {
    var $search = $('#search'),
        amazon = new Amazon();
    /**
     * Before we start implementing some fancy logic about when a user really has tried to search something
     * and be before we're doing deferring and shit, we just assume, that focusing the input expresses the
     * users intend to search
     */
    $search.on('focus', function () {
        _gaq.push([ '_trackEvent', 'Widget', 'Search' ]);
    });

    /**
     * Measure if people try to use arrow keys to navigate to links (after search)
     */
    $search.on('keydown', function (e) {
        if (e.which == 38 || e.which == 40) {
            _gaq.push([ '_trackEvent', 'Widget', 'Arrow_Key' ]);
        }

    });

    $search.bind('keydown', 'return', function () {
        var $firstItem = $('.mv-list .item:first'),
            url;

        if ($firstItem.length == 0) {
            return;
        }

        url = $firstItem.find('a').attr('href');

        _gaq.push([ '_trackEvent', 'Widget', 'Enter' ]);

        chrome.extension.sendMessage({purpose:"goto", url:url});
    });

    $('.mv-list').on('click', 'a.link', function (e) {
        var url;
        e.preventDefault();

        url = $(this).attr('href');

        _gaq.push([ '_trackEvent', 'Widget', 'Click_URL' ]);

        if (amazon.isAmazonURL(url)) {
            url = amazon.addTag(url);
            _gaq.push([ '_trackEvent', 'Widget', 'Amazon' ]);
        }

        chrome.extension.sendMessage({purpose:"goto", url:url});
    });

    $(window).bind("resize", resize);

    resize();

});

_gaq.push(['_setAccount', 'UA-33179945-6']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();