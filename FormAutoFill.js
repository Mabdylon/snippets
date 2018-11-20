
(function() {
    'use strict';

    const $firstVisibleForm = $('form[style!="display:none"]:first');

    if($firstVisibleForm[0]) {
        const actionNameForm = $firstVisibleForm[0].action;
        loadlastSearchOptionsForm(actionNameForm);
        listenAndSaveLastSearch(actionNameForm);
    }

    
    function loadlastSearchOptionsForm(actionNameForm) {
        const lastSearchOptionsForm = localStorage.getItem(actionNameForm);
        if(lastSearchOptionsForm)
        {

            const data = JSON.parse(lastSearchOptionsForm);
            $.each(data, function(key, value) {
                var $elem = $('[name="'+key+'"]', $firstVisibleForm)
                var type = $elem.first().attr('type')
                if(type == 'radio'){
                    $('[name="'+key+'"][value="'+value+'"]').prop('checked', true)
                } else if(type == 'checkbox' && (value == true || value == 'true')){
                    $('[name="'+key+'"]').prop('checked', true)
                } else if(type == 'file') {
                    // DO NOTHING
                } else {
                    $elem.val(value)
                }
            });
        }
    }

    function listenAndSaveLastSearch(actionNameForm) {
        $firstVisibleForm.find('button[type=submit]').on('click',
                                                                 (e) => {
            var $elements = {};
            $firstVisibleForm.find('input, select, textarea').each(function(){
                var name = $(this).attr('name')
                var type = $(this).attr('type')
                if(name){
                    var $value;
                    if(type == 'radio'){
                        $value = $('input[name='+name+']:checked', $firstVisibleForm).val()
                    } else if(type == 'checkbox'){
                        $value = $(this).is(':checked')
                    } else {
                        $value = $(this).val()
                    }
                    $elements[$(this).attr('name')] = $value
                }
            });

            localStorage.setItem(actionNameForm, JSON.stringify( $elements ));

        });
    }


})();
