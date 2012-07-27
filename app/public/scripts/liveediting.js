(function () {
    var savecontent = function (page) {
        var content = $('article').html();
        console.log('save content to ' + page);
        $.post('/saveedition', { editedContent: content, page : page }, function (res) {
            console.log(res);
        });
    };

    $(function () {
        $('.startediting').live('click', function () {
            $this = $(this);
            $this.removeClass('startediting');
            $this.html('Sauver les modifications');
            $('article').attr('contenteditable', 'true');
            $this.click(function () {
                savecontent($this.data('page'));
            });
        });
    });
})();