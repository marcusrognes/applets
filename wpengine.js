(function () {
    var accounts = [];
    var installs = [];
    jQuery('.install-list .install').remove();
    var $installsCounter = jQuery('#page-dashboard .panel-heading.dark h4');
    $installsCounter.text('Installs: 0');
    var $installSearch = jQuery('<input type="text" placeholder="Search..." id="installSearch"/>');

    jQuery('.blue-thead-links th').click(function (e) {
        e.stopPropagation();
        e.preventDefault();
    });

    $installSearch.on('keyup', function (e) {
        var searchWord = $installSearch.val();
        jQuery('.install-list .install').hide();
        jQuery('.install-list .install').each(function () {
            if (jQuery(this).find('.install-name a').text().indexOf(searchWord) > -1) {
                jQuery(this).show();
            }
        });
    });

    $installSearch.css({
        width: '100%',
        height: '30px',
        color: 'black'
    });

    $installSearch.appendTo(jQuery('#page-dashboard .panel-heading.dark'));

    jQuery('.shared-header .dropdown').first().find('.dropdown-menu li a').each(function () {
        accounts.push(jQuery(this).text());
    });

    var current = 0;
    loadIframeRecursive(current, accounts);

    function loadIframeRecursive(i, list) {
        if (list.length == i || list.length < i) {
            return;
        }

        jQuery('body').append('<iframe id="frame_' + accounts[i] + '">');

        var $frame = jQuery('#frame_' + accounts[i]);

        $frame.hide();
        $frame.attr('src', 'https://my.wpengine.com/accounts/' + accounts[i]);
        $frame.load(function () {
            jQuery(this).contents().find('.install-list .install').each(function () {
                jQuery('.install-list tbody').append(jQuery(this));
                installs.push(jQuery(this).find('.install-name a').text());
            });

            $installsCounter.text('Installs: ' + installs.length);
            loadIframeRecursive(i + 1, list);
        });
    }
})();