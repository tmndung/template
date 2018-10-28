function outlineTab() {
    if (typeof (Storage) != "undefined") {
        $('.thead').click(function () {
            sessionStorage.activeTab = $(this).find('.total-subm').text();
        });
        if (sessionStorage.activeTab) {
            var total_subm = parseInt(sessionStorage.activeTab) + 1;
            $('.table-wrap:not(.left-sidebar)').find('.thead.active').removeClass('active');
            $(`.table-wrap:not(.left-sidebar) > .table-body:nth-child(${total_subm}) .thead`).addClass('active');
        }
    }
    $.each($('.table-wrap:not(.left-sidebar)'), function () {
        $(this)
            .find('.table-item')
            .children('.thead:not(.active)')
            .next('.tbody').hide();
        $(this)
            .find('.table-item')
            .delegate('.thead', 'click', function (evt) {
            evt.preventDefault();
            if ($(this).hasClass('active') == false) {
                $('.table-wrap:not(.left-sidebar) .table-item')
                    .find('.thead')
                    .removeClass('active')
                    .siblings('.tbody')
                    .slideUp(200);
            }
            $(this)
                .toggleClass('active')
                .siblings('.tbody')
                .slideToggle(200);
        });
    });
}
function outlineYoutubeSave() {
    var serverName = $('.server').text();
    $("body").on('click', '.youtube-link', function () {
        var youtube_id = $(this).attr('href');
        $.post(serverName + youtube_id.split("=")[1]);
    });
}
function videoClick() {
    $("body").on('click', '.video-link', function () {
        var lession_learned = parseInt($('.lession-learned').text()) + 1;
        $('.lession-learned').text(lession_learned);
        var video_total = parseInt($('.video-number').text());
        var percent_learned = Math.round(lession_learned / video_total * 100);
        console.log(percent_learned);
        if (!$(this).closest('li').hasClass('o-view')) {
            $('.lession-learned').text();
            $('.percent-learn-run-add').css('style', 'width:' + percent_learned + '%');
            $('.percent-learn').text(percent_learned + '%');
        }
        $(this).closest('li').addClass('o-view');
    });
}
$(function () {
    outlineTab();
    videoClick();
});
