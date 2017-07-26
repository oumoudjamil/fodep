$(document)
    .ready(
    function(e) {

    getCategories();

    function getCategories() {
                //$('#categories').val('');
                appRoutes.controllers.RecetteController.getAllCategory().ajax({
                    success: function (data) {
                        if (data.result == "ok") {

                            var categories = data.categories;
                             for (var i in categories) {
                                var html = '';

                                html += '<div class="col-md-4 event-grid wow bounceIn animated" data-wow-delay="0.4s">';
                                html += '<a class="event-item" href="single.html">' + categories[i].categoryName +  '</a>';
                                html += '<a href="/single.html"><img src="' + categories[i].categoryPhoto + '" height="252" width="270" alt=""/></a>';
                                html += '</div>';

                                $('#categories').append(html);
                            }
                        } else if (data.result == "nok") {
                            alert(data.message);
                        }

                        $(".imload").fadeOut("1000");
                    },
                    error: function (xmlHttpReques, chaineRetourne, objetExeption) {
                        if (objetExeption == "Unauthorized") {
                            $(location).attr('href', "/");
                        }
                        $(".imload").fadeOut("1000");
                    }
                });
            }



























    });