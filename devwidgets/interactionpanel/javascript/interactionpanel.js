var sakai = sakai || {};

sakai.interactionpanel = function(tuid, placement, showSettings){
    $('#interaction_panel_menu li').hover(
        function() { $(this).addClass('menu-hover-item'); },
        function() { $(this).removeClass('menu-hover-item'); }
    );
    $('#interaction_panel_menu li a').click(function() {
        if (!$(this).parent().hasClass('menu-active-item')) {
            var current = $('#interaction_panel_menu li.menu-active-item a').attr('id').split('_')[2];
            var selected = $(this).attr('id').split('_')[2];
            var currentPane = '#interaction_pane_' + current;
            var selectedPane = '#interaction_pane_' + selected;

            $('#interaction_panel_menu li').removeClass('menu-active-item');
            $(this).parent().addClass('menu-active-item');
            $('.interaction_pane').removeClass('active-pane');
            $(selectedPane).addClass('active-pane');
            $(currentPane).slideUp();
            $(selectedPane).slideDown();
        }

        $(this).blur();
        return false;
    });
};

sdata.widgets.WidgetLoader.informOnLoad("interactionpanel");
