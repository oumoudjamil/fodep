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
          getPonderation();
          function getPonderation() {
            $('#tbodyPonderation').html('');
            jsRoutes.controllers.PonderationDefaultController.getAll().ajax({
                success: function (data) {
                    if (data.result == "ok") {
                        var ponderations = data.ponderations;
                         for (var i in ponderations) {
                            var html = '';
                            html += '<tr">';
                            html += '<td>' + ponderations[i].codeReglePonderation +  '</td>';
                            html += '<td>' + ponderations[i].ponderationDefaut+ '</td>';
                            html += '<td><button type="button" class="btn btn-danger btn-icon btn-xs line_button" data-toggle="modal" data-target="#updatePonderation" id="line_action-'+ponderations[i].codeReglePonderation+'"> Modifier <i class="fa fa-fire"></i> </button></td>';
                            html += '<td><button type="button" class="btn btn-black btn-xs line_supp" id="line_supp-'+ponderations[i].codeReglePonderation+'"><i class="fa fa-trash"></i> </button></td>';
                            html += '</tr>';
                            $('#tbodyPonderation').append(html);
                        }

                        $(".line_supp")
                            .click(
                            function() {
                            var id = $(this).attr('id');
                            var sp = id.split('-');
                            console.log(sp);

                            var reponse = window.confirm("Souhaitez-vous vraiment supprimer cette Ponderation ?");
                                if(reponse)
                                {
                                   deletePonderation(sp[1]);
                                }
                          });

                        $(".line_button")
                            .click(
                            function() {
                            var id = $(this).attr('id');
                            var sp1 = id.split('-');
                            console.log("id---",sp1[1])
                             showPonderation(sp1[1]);
                            $('#id_selected_ponderation').val(sp1[1]);
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

        $('#createPonderation').click(function (e) {
            verifyBeforeDoCreate();
        });
        function verifyBeforeDoCreate(){
            $('#createPonderation').attr("disabled", true);
            var codePonderation = $('#codePonderation').val();
            var libellePonderation = $('#ponderationDefault').val();

console.log("code",codePonderation);
console.log("lib",libellePonderation);

            if(codePonderation == ''){
                doShowErrorAdd(labelVerifyTel);
                $('#createPonderation').attr("disabled", false);
            }
            else {
                var data ={
                    'codeReglePonderation' : codePonderation,
                    'ponderationDefaut' : libellePonderation,
                };

                doCreatePonderation(data);
            }
        }
        function doCreatePonderation(data){
                    $(".imloadAdd").fadeIn("1000");
                    jsRoutes.controllers.PonderationDefaultController.addPonderation().ajax({
                        data : JSON.stringify(data),
                        contentType : 'application/json',
                        success : function (json) {
                        console.log(json);
                            if (json.result == "ok") {
                                $('#closeModalAddPonderation').click();
                                doShowSuccess(json.message);
                                 getPonderation();
                            }
                            else{
                                doShowErrorAdd(json.message);
                            }
                            $(".imloadAdd").fadeOut("1000");
                            $('#createPonderation').attr("disabled", false);
                        },
                        error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                            if(objetExeption == "Unauthorized"){
                                $(location).attr('href',"/");
                            }
                            $(".imload").fadeOut("1000");
                            $('#createPonderation').attr("disabled", false);
                        }
                    });
                }

    function deletePonderation(codePonderation) {
            $(".imloadDialog").fadeIn("1000");
            jsRoutes.controllers.PonderationDefaultController.deletePonderation(codePonderation).ajax({
                success : function (data) {
                    if(data.result == "ok"){
                        $(".imloadDialog").fadeIn("1000");
                        $('#btnClose').click();
                        alert(data.message);
                        getPonderation();
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


     function showPonderation(codePonderation) {
           $(".imload").fadeIn("1000");
                 jsRoutes.controllers.PonderationDefaultController.getPonderationbyCode(codePonderation).ajax({
                     success: function (data) {
                     console.log("data--",data)
                         if (data.result == "ok"){
                             var ponderation = data.ponderations;

                             for (var i in ponderation) {
                                 var html = '';
                                 html += '<tr id="' + ponderation[i].codeReglePonderation + '">';
                                 $('#codePonderationUp').val(ponderation[i].codeReglePonderation);
                                 $('#libelleAttributUp').val(ponderation[i].ponderationDefaut);
                                 html += '</tr>';
                                 $('#tbodyPonderationUp').append(html);

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

         function verifyBeforeUpdate(codePonderation){

              $('#bt_modifier_poste').attr("disabled", true);
              var codePonderation = $('#codePonderationUp').val();
              var libellePonderation = $('#libelleAttributUp').val();

              if(codePonderation == ''){
                  alert('code Poste obligatoire !!!');
                  $('#bt_modifier_ponderation').attr("disabled", false);
              }
              else if(libellePonderation == ''){
                  alert('libelle Poste obligatoire !!!');
                  $('#bt_modifier_ponderation').attr("disabled", false);
              }

              else {
                  var data ={
                      'codePonderation' : codePonderation,
                      'libellePonderation' : libellePonderation,
                  };
                  console.log(" selected poste code = "+codePonderation);
                  updatePonderation(codePonderation,libellePonderation);
              }
          }

          function updatePonderation(codePonderation,libellePonderation){
          $(".imloadAdd").fadeIn("1000");
          jsRoutes.controllers.PonderationDefaultController.updatePonderation(codePonderation,libellePonderation).ajax({
              success : function (json) {

                  if (json.result == "ok") {
                      alert(json.message);
                      getPonderation();
                      $("#updatePonderation").modal("hide");
                  }
                  else{
                      alert(json.message);
                      $('#bt_modifier_ponderation').attr("disabled", false);
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

         $('#bt_modifier_ponderation').click(function() {
             verifyBeforeUpdate($('#id_selected_poste').val());
         });
         $('#bt_annuler_update_ponderation').click(function (e) {
               $("#updatePonderation").modal("hide");
         });

});