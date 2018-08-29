/**
 * Created by oumou on 26/10/2015.
 */
$(document)
    .ready(
    function(e) {
        $('#bt_submit_connexion').click(
            function(e) {
                $('#bt_submit_connexion').attr("disabled", true);
                $(".load").fadeIn("1000");
                var login = $('#tf_userlogin').val();
                var mp = $('#tf_userpwd').val();

                var data = {
                      'login' : login,
                      "password" : mp
                };

                appRoutes.controllers.UtilisateurController.connectUser().ajax({
                    data : JSON.stringify(data),
                    contentType : 'application/json',
                    success : function (data) {
                        if(data.result == "ok"){
                               $(location).attr('href',
                               "/recette");
                        }
                        else {
                            $('#erreur').html('');
                            $('#erreur').fadeIn();
                            $('#erreur').append(data.message);
                            alert(data.message);
                        }
                        console.log(data);
                        $(".load").fadeOut("1000");
                        $('#bt_submit_connexion').attr("disabled", false);
                    },
                    error: function(){
                        console.log(data)
                    }
                });
            });
         $( "#tf_userlogin" ).keydown(function( event ) {
            if(event.keyCode == 13){
                $('#bt_submit_connexion').attr("disabled", true);
                $(".load").fadeIn("1000");
                var login = $('#tf_userlogin').val();
                var mp = $('#tf_userpwd').val();

                var data = {
                      'login' : login,
                      "password" : mp
                };

                appRoutes.controllers.UtilisateurController.connectUser().ajax({
                    data : JSON.stringify(data),
                    contentType : 'application/json',
                    success : function (data) {
                        if(data.result == "ok"){
                               $(location).attr('href',
                               "/recette");
                        }
                        else {
                            $('#erreur').html('');
                            $('#erreur').fadeIn();
                            $('#erreur').append(data.message);
                            alert(data.message);
                        }
                        console.log(data);
                        $(".load").fadeOut("1000");
                        $('#bt_submit_connexion').attr("disabled", false);
                    },
                    error: function(){
                        console.log(data)
                    }
                });
              }
            });
        $( "#tf_userpwd" ).keydown(function( event ) {
            if(event.keyCode == 13){
                $('#bt_submit_connexion').attr("disabled", true);
                $(".load").fadeIn("1000");
                var login = $('#tf_userlogin').val();
                var mp = $('#tf_userpwd').val();

                var data = {
                      'login' : login,
                      "password" : mp
                };

                appRoutes.controllers.UtilisateurController.connectUser().ajax({
                    data : JSON.stringify(data),
                    contentType : 'application/json',
                    success : function (data) {
                        if(data.result == "ok"){
                               $(location).attr('href',
                               "/recette");
                        }
                        else {
                            $('#erreur').html('');
                            $('#erreur').fadeIn();
                            $('#erreur').append(data.message);
                            alert(data.message);
                        }
                        console.log(data);
                        $(".load").fadeOut("1000");
                        $('#bt_submit_connexion').attr("disabled", false);
                    },
                    error: function(){
                        console.log(data)
                    }
                });
              }
            });

        $(window).load(function() {
            $(".load").fadeOut("1000");
        });


    });