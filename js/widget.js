function resize() {
    var width  = $(window).width(),
        height = $(window).height();

    $('body').css({
        width : width,
        height: height
    });
}

$(function () {
    $('#search').bind('keydown', 'return', function () {
        var $firstItem = $('.mv-list .item:first'),
            url;


        if ($firstItem.length == 0) {
            return;
        }

        url = $firstItem.find('a').attr('href');
        chrome.extension.sendMessage({purpose:"goto", url: url});
    });

    $(window).bind("resize", resize);

    resize();

});