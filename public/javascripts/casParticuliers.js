$(document)
    .ready(
    function (e) {

    $('#chargeClientele').click(function (e) {
    console.log("errrer")
       verifyBeforeDoCharge();
    });

    function verifyBeforeDoCharge(){
                var client_id;

                 jsRoutes.controllers.ClientFodepController.getAll().ajax({
                    success: function (data) {
                        if (data.result == "ok") {
                             var clients = data.clients;
                             console.log(clients);
                             for (var i in clients) {
                                client_id = clients[i].client_id;
                                var data ={
                                     'client_id' : client_id
                                };
                                doCreateClientele(data)
                             }
                        }
                 }
                 });
            }


                    function doCreateClientele(data){
                                $(".imloadAdd").fadeIn("1000");
                                jsRoutes.controllers.CasParticulierController.chargeClinetele().ajax({
                                data : JSON.stringify(data),
                                contentType : 'application/json',
                                success : function (json) {
                                console.log(json);
                                    if (json.result == "ok") {
                                    $(".imloadAdd").fadeOut("1000");
                                       // alert(json.message);
                                         //getPosteFodep();
                                    }
                                    else{
                                        doShowErrorAdd(json.message);
                                    }
                                    $(".imloadAdd").fadeOut("1000");
                                },
                                error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                                    if(objetExeption == "Unauthorized"){
                                        $(location).attr('href',"/");
                                    }
                                    $(".imload").fadeOut("1000");
                                }
                            });
                        }


});