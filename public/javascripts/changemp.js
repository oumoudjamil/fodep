/**
 * Created by bosco on 25/02/2015.
 */
$(document)
    .ready(
    function(e) {
         $(".imload").fadeOut("1000");
//        getSession();
//        function getSession(){
//            $(".imload").fadeIn("1000");
//            appRoutes.controllers.UserController.userSession().ajax({
//                success : function (data) {
//
//                    if(data.result == 'ok'){
//                        var user  = data.session.prenom + ' ' + data.session.nom;
//                        $('#sessionUserName').append(user);
//                    }
//                    else{
//                        alert(data.message);
//                    }
//                 $(".imload").fadeOut("1000");
//                },
//                error: function (xmlHttpReques,chaineRetourne,objetExeption) {
//                    if(objetExeption == "Unauthorized"){
//                        //$(location).attr('href',"/");
//                    }
//                 $(".imload").fadeOut("1000");
//                }
//            });
//        }

        $('#saveChangePWD').click(function (e) {
            verifyChangePWD();
        });

        $("#oldPWD" ).keydown(function( event ) {
            if(event.keyCode == 13){
                verifyChangePWD()
            }
        });

        $("#newPWD" ).keydown(function( event ) {
            if(event.keyCode == 13){
                verifyChangePWD()
            }
        });
        $("#ReNewPWD" ).keydown(function( event ) {
            if(event.keyCode == 13){
                verifyChangePWD()
            }
        });



        function verifyChangePWD(){
            var oldPWD = $('#oldPWD').val();
            var newPWD = $('#newPWD').val();
            var reNewPWD = $('#ReNewPWD').val();
            if (oldPWD == '') {
                doShowError(labelVerifyOld);
                $('#saveChangePWD').attr("disabled", false);
            }
            else if (newPWD == '') {
                doShowError(labelVerifyNew);
                $('#saveChangePWD').attr("disabled", false);
            }
            else if (reNewPWD == '') {
                doShowError(labelVerifyRenew);
                $('#saveChangePWD').attr("disabled", false);
            }
            else if (newPWD != reNewPWD) {
                doShowError(labelVerifyNewSame);
                $('#saveChangePWD').attr("disabled", false);
            }
            else{
                var data = {
                    'oldmdp' : oldPWD,
                    'mdp' : newPWD
                };
                doSaveChangePWD(data);
            }
        }

        function doSaveChangePWD(data){
            $(".imload").fadeIn("1000");
            $('#saveChangePWD').attr("disabled", true);
            appRoutes.controllers.UserController.changePassword().ajax({
                data : JSON.stringify(data),
                contentType : 'application/json',
                success : function (json) {
                    if (json.result == "ok") {
                        $(location).attr('href',
                            "/");
                    }
                    else{
                        doShowError(json.message);
                    }
                    $(".imload").fadeOut("1000");
                    $('#saveChangePWD').attr("disabled", false);
                },
                error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                    if(objetExeption == "Unauthorized"){
                        alert('error');
                    }

                    $(".imload").fadeOut("1000");
                    $('#saveChangePWD').attr("disabled", false);
                }
            });
        }

        $('#bt_deconnexion').click(
            function (e) {
                disConnectUser();
            });

        function disConnectUser() {
            $(".imload").fadeIn("1000");
            appRoutes.controllers.UserController.disconnect().ajax({
                success: function (data) {
                    $(location).attr('href',"/");
                    $(".imload").fadeOut("1000");
                },
                error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                    if(objetExeption == "Unauthorized"){
                        $(location).attr('href',"/");
                    }
                    $(".imload").fadeOut("1000");
                }
            });
        }

        function doShowError(message) {
            $('#olShowError').find('div#showError').remove();
            var html = '<div class="alert alert-danger alertWidth" id="showError" role="alert">' +
                '<span class="fa fa-exclamation-triangle" aria-hidden="true"></span>' +
                '<span class="sr-only">Error:</span></div>';
            $('#olShowError').prepend(html);
            $('#showError').html('');
            $('#showError').append(message);
            $('#showError').fadeIn();
            setTimeout(function () {
                $('#showError').fadeOut();
            }, 3000);
        }

    });
