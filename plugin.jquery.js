(function () 
{
    $.fn.plugin = function (options) 
    {
        var Plugin = function (element, options) 
        {
            this.defaults = {};
            this.element = element;

            this.options = $.extend(this.defaults, options);

            this.init = function () 
            {
                var number = -1;
                var currentNumber = 0;
                var timer1 = 0;
                var timer2 = 0;
                var images = this.element.find('.images .image');
                var change = null;
                var self = this;

                function bindEvents()
                {
                    var nav = self.element.find('.navigation');
                    nav.bind("click", function()
                    {
                        var direction = $(this).attr("data-direction");
                        changeImg2(direction);
                    });

                    var change = self.element.find('.change');
                    change.bind("click", function()
                    {
                        number = $(this).attr("data-index");
                        showSlide(number, "left");
                    });
                }

                function setCircles()
                {
                    var con = self.element.find('#container2');
                    for(i = 0; i<images.length; i++)
                    {
                        con.append('<div class="change" data-index="'+i+'"><i class="ion-record"></i></div>');
                    }
                    change = self.element.find('.change');
                }

                function setImg(nrSlide)
                {
                    number = nrSlide;
                    showSlide(number, "left");
                    resetIimeout();
                }

                function resetIimeout()
                {
                    clearTimeout(timer1);
                    timer1 = setTimeout(changeImg, 5000);
                }

                function showSlide(newNumber, direction)
                {
                    var current = images.eq(currentNumber);
                    var next    = images.eq(newNumber);

                    images.css('left', 'auto').css('right', 'auto').not(next).css('z-index', 0);

                    current.css('z-index', 1);
                    change.removeClass('active');

                    var style = {};
                    style[direction] = 0;

                    next.css(direction, '100%').css('z-index', 2).animate(style, 500);

                    change.eq(newNumber).addClass('active');

                    currentNumber = newNumber;

                    resetIimeout();
                }

                function changeImg2(direction)
                {

                    if(direction == "right")
                    {
                        number++;
                        if(number >= images.length) number = 0;
                    }
                    if(direction == "left")
                    {
                        number--;
                        if(number < 0) number = images.length - 1;
                    }

                    showSlide(number, direction);
                    resetIimeout();
                }

                function changeImg()
                {
                    number++;
                    if(number >= images.length) number = 0;

                    showSlide(number, "left");
                }
                setCircles();
                changeImg();
                bindEvents();
            }
        };

        $(this).each(function () 
        {
            (new Plugin($(this), options)).init();
        });
    };
})();

$(function() {
    $('.container').plugin();
});
