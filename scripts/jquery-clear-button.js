(function($) {
    $.fn.jQueryClearButton = function(options){


        if (!this.is(':visible')) {
            return this;
        }

        var obj = this;
        var obj_id = obj.attr('id');
        var btn_class_name = 'dokodemo-input-clear-' + obj_id;

        //option
        var defaults = {
            'always': true,
            'zindex': 0,
            'offset_right': 19,
            'button_width': 12,
            'button_height': 11,
            'color': '#aaa'
        };
        var setting = $.extend(defaults, options); 

        $('body').append('<style> input::-ms-clear { visibility:hidden; } </style>');

        var btn_parent = $('<div style="position:relative; margin:0; padding:0; border:none;">');
        this.before(btn_parent);
        this.prependTo(btn_parent);

        //make batsu button
        var btn = $('<div class="glyphicon glyphicon-remove ' + btn_class_name + '"></div>');
        this.before(btn);

        //button style
        btn.css({
            'position': 'absolute',
            'display': 'none',
            'cursor': 'pointer',
            'z-index': setting.zindex,
			'background-image': 'url(images/button.png)',
            'width': setting.button_width + 'px',
            'height': setting.button_height + 'px',
            'color': setting.color
        });

        var btn_parent_height = btn_parent.height();
        if (!btn_parent_height) {
            btn_parent_height = obj.height();
        }

        var offset_top = (btn_parent_height / 2) - (setting.button_height / 2) + 2;
        btn.css({
            'top': 13.5 + 'px',
            'right': setting.offset_right + 'px'
        });

        //button event - click
        btn.on('click', function() {
            //clear
            obj.val('').focus();
            if (obj_id == "top_input") deleteCookie("form_first"); // чистим костылями cookie т.к. хз как массив пока замутить
            if (obj_id == "bottom_input") deleteCookie("form_second");
            if (obj_id == "cost_input") deleteCookie("form_cost");
            if (!setting.always) {
                btn.hide();
            }
        });

        //input event - input
        obj.on('input', function() {
            if (obj.val()) {
                btn.show();
            } else {
                if (!setting.always) {
                    btn.hide();
                }
            }
        });

        if (setting.always) {
            //always display
            btn.show();
        } else {

            //input event - focus
            obj.on('focus', function() {
                if (obj.val()) {
                    btn.show();
                } else {
                    btn.hide();
                }
            });

            //input event - blur
            obj.on('blur', function() {
                setTimeout('$(\'.' + btn_class_name + '\').hide()', 200);
            });

            obj.on('mouseover', function() {
                if (obj.val()) {
                    btn.show();
                } else {
                    btn.hide();
                }
            });

        }


        return (this);
    };
})(jQuery);

