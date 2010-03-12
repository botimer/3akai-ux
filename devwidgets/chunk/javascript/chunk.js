var sakai = sakai || {};

sakai.chunk = function(tuid, placement, showSettings) {
    var rootel = $("#" + tuid); 
    var container = $('#comment_link_container');
    var template = 'comment_link_template';

    $(container).html($.Template.render(template, {foo: 'bar'}));
    $.get('/system/batch/get?resources=/devwidgets/chunk/chunk.html', function(data) {
        $('#batch_results').text(data);
    });
};

sdata.widgets.WidgetLoader.informOnLoad("chunk");
