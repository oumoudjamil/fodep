/**
 * Created by MOMBOY on 16/01/2015.
 */
$(document)
    .ready(
    function(e) {
        
        $('#btConnexion').click(
            function(e) {
                $('#btConnexion').attr("disabled", true);
                $(".load").fadeIn("1000");
                var login = $('#userLogin').val();
                var mp = $('#userPassword').val();

                var data = {
                      'login' : login,
                      "mdp" : mp
                };

                appRoutes.controllers.Application.showIndexPage().ajax({
                    data : JSON.stringify(data),
                    contentType : 'application/json',
                    success : function (data) {
                        if(data.result == "ok"){
                                var idProfil = data.utilisateur.idProfil;
                                console.log("Profil connect : " + idProfil);
                                if(idProfil == profil_caissier){
                                    $(location).attr('href', "/depotTransaction");
                                }else if(idProfil == profil_serviceClient){
                                    $(location).attr('href', "/serviceClientCanal");
                                }else if(idProfil == profil_base){
                                    $(location).attr('href', "/clients");
                                }else{
                                    $(location).attr('href', "/fluxFinancier");
                                }
                        }else if(data.result == "pwd"){
                            $(location).attr('href', "/changePass");
                        }
                        else {
                            $('#erreur').html('');
                            $('#erreur').fadeIn();
                            $('#erreur').append(data.message);
                        }
                        console.log(data);
                        //$(".load").fadeOut("1000");
                        $('#btConnexion').attr("disabled", false);

                    }
                });
            });

        $( "#userLogin" ).keydown(function( event ) {
            if(event.keyCode == 13){
                $('#btConnexion').attr("disabled", true);
                $(".load").fadeIn("1000");
                var login = $('#userLogin').val();
                var mp = $('#userPassword').val();

                var data = {
                      'login' : login,
                      "mdp" : mp
                };

                appRoutes.controllers.Application.showIndexPage().ajax({
                    data : JSON.stringify(data),
                    contentType : 'application/json',
                    success : function (data) {
                        if(data.result == "ok"){
                            var idProfil = data.utilisateur.idProfil;
                            console.log("Profil connect : " + idProfil);
                            if(idProfil == profil_caissier){
                                $(location).attr('href', "/depotTransaction");
                            }else if(idProfil == profil_serviceClient){
                                $(location).attr('href', "/serviceClientCanal");
                            }else if(idProfil == profil_base){
                                $(location).attr('href', "/clients");
                            }else{
                                $(location).attr('href', "/fluxFinancier");
                            }
                        }else if(data.result == "pwd"){
                          $(location).attr('href', "/changePass");
                        }
                        else {
                            $('#erreur').html('');
                            $('#erreur').fadeIn();
                            $('#erreur').append(data.message);
                        }
                        //console.log(data);
                        $(".load").fadeOut("1000");
                        $('#btConnexion').attr("disabled", false);
                    }
                });          
            
              }
            });

        $( "#userPassword" ).keydown(function( event ) {
            if(event.keyCode == 13){
                $('#btConnexion').attr("disabled", true);
                $(".load").fadeIn("100000000");
                var login = $('#userLogin').val();
                var mp = $('#userPassword').val();

                var data = {
                      'login' : login,
                      "mdp" : mp
                };

                appRoutes.controllers.Application.showIndexPage().ajax({
                    data : JSON.stringify(data),
                    contentType : 'application/json',
                    success : function (data) {
                        if(data.result == "ok"){
                            var idProfil = data.utilisateur.idProfil;
                            console.log("Profil connect : " + idProfil);
                            if(idProfil == profil_caissier){
                                $(location).attr('href', "/depotTransaction");
                            }else if(idProfil == profil_serviceClient){
                                $(location).attr('href', "/serviceClientCanal");
                            }else if(idProfil == profil_base){
                                $(location).attr('href', "/clients");
                            }else{
                                $(location).attr('href', "/fluxFinancier");
                            }
                        }else if(data.result == "pwd"){
                          $(location).attr('href', "/changePass");
                        }
                        else {
                            $('#erreur').html('');
                            $('#erreur').fadeIn();
                            $('#erreur').append(data.message);
                        }
                        //console.log(data);
                        $(".load").fadeOut("1000");
                        $('#btConnexion').attr("disabled", false);
                    }
                });          
            
              }
            });
        
        $(window).load(function() {
            $(".load").fadeOut("1000");
        });

    });