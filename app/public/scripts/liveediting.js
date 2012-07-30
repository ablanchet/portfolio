(function () {
    var savecontent = function (page) {
        $article = $('article');
		$article.removeAttr('contenteditable');
		var content = $article.parent().html();
        console.log('save content to ' + page);
        $.post('/saveedition', { editedContent: content, page : page }, function (res) {
            window.location = window.location;
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