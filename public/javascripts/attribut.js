$(document)
    .ready(
    function (e) {

         loadingTask();

        function loadingTask() {
            $(".imloadDialog").fadeOut("1000");
            $('#codePoste').val('');
            $('#libellePoste').val('');
            $('#etatFodep').val('');

        }
          getAttribut();
          function getAttribut() {
            $('#tbodyAttribut').html('');
            jsRoutes.controllers.AttributController.getAllAttribut().ajax({
                success: function (data) {
                    if (data.result == "ok") {
                         console.log(data)
                        var etat = data.attributs;
                         for (var i in etat) {
                            var html = '';
                            html += '<tr">';
                            html += '<td>' + etat[i].codeAttribut +  '</td>';
                            html += '<td>' + etat[i].libelleAttribut+ '</td>';
                            html += '<td>' + etat[i].sourceValeur+ '</td>';
                            html += '<td>' + etat[i].sourceDonnees+ '</td>';
                            html += '<td><button type="button" class="btn btn-danger btn-icon btn-xs line_button" data-toggle="modal" data-target="#updateAttribut" id="line_action-'+etat[i].codeAttribut+'"> Modifier <i class="fa fa-fire"></i> </button></td>';
                            html += '<td><button type="button" class="btn btn-black btn-xs line_supp" id="line_supp-'+etat[i].codeAttribut+'"><i class="fa fa-trash"></i> </button></td>';

                            html += '</tr>';
                            $('#tbodyAttribut').append(html);
                        }



                        $(".line_supp")
                            .click(
                            function() {
                            var id = $(this).attr('id');
                            var sp = id.split('-');
                            console.log(sp);

                            var reponse = window.confirm("Souhaitez-vous vraiment supprimer cet Attribut ?");
                                if(reponse)
                                {
                                   deleteAttribut(sp[1]);
                                }
                          });

                        $(".line_button")
                            .click(
                            function() {
                            var id = $(this).attr('id');
                            var sp1 = id.split('-');
                             showAttribut(sp1[1]);
                            $('#id_selected_attribut').val(sp1[1]);
                        });



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

        $('#createAttribut').click(function (e) {
            verifyBeforeDoCreate();
        });
        function verifyBeforeDoCreate(){
            $('#createAttribut').attr("disabled", true);
            var codeAttribut = $('#codeAttribut').val();
            var libelleAttribut = $('#libelleAttribut').val();
            var sourceValeur = $('#sourceValeur').val();
            var sourceDonnees = $('#sourceDonnee').val();
            var sourceValeur2 = $('#sourceValeur2').val();
            var sourceDonnees2 = $('#sourceDonnee2').val();

            if(codeAttribut == ''){
                doShowErrorAdd(labelVerifyTel);
                $('#createAttribut').attr("disabled", false);
            }
            else {

                var data ={
                    'codeAttribut' : codeAttribut,
                    'libelleAttribut' : libelleAttribut,
                    'sourceValeur' : sourceValeur,
                    'sourceDonnees' : sourceDonnees,
                    'sourceValeur2' : sourceValeur2,
                    'sourceDonnees2' : sourceDonnees2
                };

                doCreateAttribut(data);
            }
        }
        function doCreateAttribut(data){
                    $(".imloadAdd").fadeIn("1000");
                    jsRoutes.controllers.AttributController.addAttribut().ajax({
                        data : JSON.stringify(data),
                        contentType : 'application/json',
                        success : function (json) {
                        console.log(json);
                            if (json.result == "ok") {
                                $('#closeModalAddAttribut').click();
                                doShowSuccess(json.message);
                                 getAttribut();
                            }
                            else{
                                doShowErrorAdd(json.message);
                            }
                            $(".imloadAdd").fadeOut("1000");
                            $('#createAttribut').attr("disabled", false);
                        },
                        error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                            if(objetExeption == "Unauthorized"){
                                $(location).attr('href',"/");
                            }
                            $(".imload").fadeOut("1000");
                            $('#createAttribut').attr("disabled", false);
                        }
                    });
                }

    function deleteAttribut(codeAttribut) {
            $(".imloadDialog").fadeIn("1000");
            jsRoutes.controllers.AttributController.deleteAttribut(codeAttribut).ajax({
                success : function (data) {
                    if(data.result == "ok"){
                        $(".imloadDialog").fadeIn("1000");
                        $('#btnClose').click();
                        alert(data.message);
                        getAttribut();
                    }else {
                        $(".imloadDialog").fadeIn("1000");
                        $('#btnClose').click();
                        alert(data.message);
                    }
                },
                error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                    if(objetExeption == "Unauthorized"){
                        $(location).attr('href',"/");
                    }
                    $(".imloadDialog").fadeIn("1000");
                    $('#btnClose').click();
                    alert(data.message);
                }
            });
            $(".imloadDialog").fadeIn("1000");
            $('#btnConfirm').attr("disabled", false);
     }


     function showAttribut(codeAttribut) {
           $(".imload").fadeIn("1000");
                 jsRoutes.controllers.AttributController.getAttributbyCode(codeAttribut).ajax({
                     success: function (data) {
                         if (data.result == "ok"){
                             var attr = data.attributbyid;
                             console.log(attr);
                             for (var i in attr) {
                                 var html = '';
                                 html += '<tr id="' + attr[i].codeAttribut + '">';
                                 $('#codeAttributUp').val(attr[i].codeAttribut);
                                 $('#libelleAttributUp').val(attr[i].libelleAttribut);
                                 $('#sourceDonneeUp').val(attr[i].sourceDonnees);
                                 $('#sourceValeurUp').val(attr[i].sourceValeur);

                                 if(attr[i].sourceValeur2 != null ){

                                    $("#trSourceUp2").show();
                                    $("#trValeurUp2").show();
                                    $('#sourceValeurUp2').val(attr[i].sourceValeur2);
                                    $('#sourceDonneeUp2').val(attr[i].sourceDonnees2);
                                 }
                                 else{
                                    $("#trSourceUp2").hide();
                                    $("#trValeurUp2").hide();
                                 }
                                 html += '</tr>';
                                 $('#tbodyAttributUp').append(html);

                             }
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

         function verifyBeforeUpdate(codeAttribut){

              $('#bt_modifier_attribut').attr("disabled", true);
              var codeAttribut = $('#codeAttributUp').val();
              var libelleAttribut = $('#libelleAttributUp').val();
              var sourceValeur = $('#sourceValeurUp').val();
              var sourceDonnees = $('#sourceDonneeUp').val();

              if(codeAttribut == ''){
                  alert('code Poste obligatoire !!!');
                  $('#bt_modifier_attribut').attr("disabled", false);
              }

              else {
                  var data ={
                      'codeAttribut' : codeAttribut,
                      'libelleAttribut' : libelleAttribut,
                      'sourceValeur' : sourceValeur,
                      'sourceDonnees' : sourceDonnees
                  };
                  console.log(" selected attribut code = "+codeAttribut);
                  updateAttribut(codeAttribut,libelleAttribut,sourceValeur,sourceDonnees);
              }
          }

        function updateAttribut(codeAttribut,libelleAttribut,sourceValeur,sourceDonnees){
          $(".imloadAdd").fadeIn("1000");
          jsRoutes.controllers.AttributController.updateAttribut(codeAttribut,libelleAttribut,sourceValeur,sourceDonnees).ajax({
              success : function (json) {

                  if (json.result == "ok") {
                      alert(json.message);
                      getAttribut();
                      $("#updateAttribut").modal("hide");
                  }
                  else{
                      alert(json.message);
                      $('#bt_modifier_Aatribut').attr("disabled", false);
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

         $('#bt_modifier_attribut').click(function() {
             verifyBeforeUpdate($('#id_selected_attribut').val());
         });
         $('#bt_annuler_update_attribut').click(function (e) {
               $("#updateAttribut").modal("hide");
         });


    $("#sourceDonnee").change(function () {
        var val = $(this).val();
        if (val == "client") {
            getColumns("client")
        } else if (val == "balance") {
            getColumns("balance")
        }
    });


             function getColumns(table){
                    jsRoutes.controllers.AttributController.getColumnsNames(table).ajax({
                        success: function (data) {
                        if (data.result == "ok") {
                            var data = data.columns;
                            var columns = data.split(',');
                            $("#sourceValeur").html('');
                             for (var i = 1; i < columns.length; i++) {
                               var html = '<option value="'+columns[i]+'">'+columns[i]+'</option>';
                               $('#sourceValeur').append(html);
                               $('#sourceValeurUp').append(html);
                              }

                            }
                        }
                    });
             }
             function getColumns2(table){
                    jsRoutes.controllers.AttributController.getColumnsNames(table).ajax({
                        success: function (data) {
                        if (data.result == "ok") {
                            var data = data.columns;
                            var columns = data.split(',');
                             $("#sourceValeur2").html('');
                             for (var i = 1; i < columns.length; i++) {
                               var html = '<option value="'+columns[i]+'">'+columns[i]+'</option>';
                               $('#sourceValeur2').append(html);
                               $('#sourceValeurUp2').append(html);
                              }

                            }
                        }
                    });

        }

        $('#addSource2').click(function (e) {
            $('#addDonnee2').hide();
            $("#trSource2").show();
            $("#trValeur2").show();
        });

        $("#sourceDonnee2").change(function () {
            var val = $(this).val();
            if (val == "client") {
                getColumns2("client")
            } else if (val == "balance") {
                getColumns2("balance")
            }
        });

        $("#sourceDonneeUp").change(function () {
            var val = $(this).val();
            if (val == "client") {
                 getColumns2("client")
            } else if (val == "balance") {
                 getColumns2("balance")
            }
        });

        $("#sourceDonneeUp2").change(function () {
            var val = $(this).val();
            if (val == "client") {
                getColumns2("client")
            } else if (val == "balance") {
                getColumns("balance")
            }
        });


});