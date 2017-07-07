(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 100
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 50
        }
    })

})(jQuery); // End of use strict

function under18() {
    window.history.back();
}

function over18() {
    $("#adultCheck").hide();
}

// Replace content if from blog post
$(document).ready(function() {
    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    var blogName = getParameterByName("blog");
    var postId = getParameterByName("p");

    if (blogName && postId) {
        var screenshotDom = $("#screenshot");
        screenshotDom.attr("src", "./img/screenshot-loading.png");

        $.getJSON('https://api.tumblr.com/v2/blog/' + blogName + '.tumblr.com/posts/photo?callback=?', {
            api_key: 'wgOM8hf18vYY6j7MgXztXOalk0gZv3ZdHopgYFTWTOUzAhhtb7',
            id: postId,
        }).then(function (json) {
            if (json.response && json.response.posts
                && json.response.posts.length >= 0 && json.response.posts[0]) {

                var post = json.response.posts[0];

                console.log(post);

                var linkDom = $("#screenshot-link");
                linkDom.attr("title", post.slug);
                linkDom.attr("href", post.post_url);

                if (post.photos && post.photos.length > 0 && post.photos[0]) {
                    var photo = post.photos[0];

                    if (photo.alt_sizes && photo.alt_sizes.length > 0) {
                        screenshotDom.attr("src", photo.alt_sizes[0].url);
                    }
                }
            }
        });
    }
});
