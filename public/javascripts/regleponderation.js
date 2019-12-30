$(document)
    .ready(
    function (e) {

        loadingTask();

        function loadingTask() {
            $(".imload").fadeIn("1000");
                       $('#pagingTop').html('');
                       $('#pagingBottom').html('');
                       $('#divPaginationhaut').empty();
                       $('#divPaginationhaut').removeData("twbs-pagination");
                       $('#divPaginationhaut').unbind("page");
                       $('#divPagination').empty();
                       $('#divPagination').removeData("twbs-pagination");
                       $('#divPagination').unbind("page");
            $('#etatFodep').val('');

        }
          getPonderation();
          function getPonderation(page) {
            $('#tbodyRegles').html('');
            jsRoutes.controllers.ReglePonderationController.getAll(page).ajax({
                success: function (data) {
                    if (data.result == "ok") {
                        var ponderations = data.ponderations;
                        var numLine = (data.per_page * data.current_page) - data.per_page;
                        if (data.current_page == -1){numLine = 0}
                         for (var i in ponderations) {
                            var html = '';
                             numLine += 1;
                            html += '<tr">';
                            html += '<td>' + numLine + '</td>';
                            html += '<td>' + ponderations[i].codeReglePonderation +  '</td>';
                            html += '<td>' + ponderations[i].codeAttribut+ '</td>';
                            html += '<td>' + ponderations[i].codePoste+ '</td>';
                            html += '<td>' + ponderations[i].condition+ '</td>';
                            html += '<td><button type="button" class="btn btn-danger btn-icon btn-xs line_button" data-toggle="modal" data-target="#updatePonderation" id="line_action-'+ponderations[i].codeReglePonderation+'"> Modifier <i class="fa fa-fire"></i> </button></td>';
                            html += '<td><button type="button" class="btn btn-black btn-xs line_supp" id="line_supp-'+ponderations[i].codeReglePonderation+'"><i class="fa fa-trash"></i> </button></td>';
                            html += '</tr>';
                            $('#tbodyRegles').append(html);

                        }
                            var current_page = data.current_page;
                            if(current_page == -1){current_page = 1}
                            $('#pagingTop').append(current_page + '/' + data.total_page + ' ' + labelPaging);
                            $('#pagingBottom').append(current_page + '/' + data.total_page + ' ' + labelPaging);
                            $('#divPaginationhaut').twbsPagination({
                                totalPages: data.total_page,
                                visiblePages: 3,
                                startPage: page,
                                onPageClick: function (event, numPage) {
                                    page = numPage;
                                    getPonderation(page);
                                }
                            });
                            $('#divPagination').twbsPagination({
                                totalPages: data.total_page,
                                visiblePages: 3,
                                startPage: page,
                                onPageClick: function (event, numPage2) {
                                    page = numPage2;
                                    getPonderation(page);
                                }
                            });

                        $(".line_supp")
                            .click(
                            function() {
                            var id = $(this).attr('id');
                            var sp = id.split('-');
                            console.log(sp);

                            var reponse = window.confirm("Souhaitez-vous vraiment supprimer cette Ponderation ?");
                                if(reponse)
                                {
                                   deletePoste(sp[1]);
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
            var codeAttribut = $('#codeAttribut').val();
            var codePoste = $('#codePoste').val();
            var condition = $('#condition').val();

            if(codePonderation == ''){
                doShowErrorAdd(labelVerifyTel);
                $('#createPonderation').attr("disabled", false);
            }
            else {
                var data ={
                    'codeReglePonderation' : codePonderation,
                    'codeAttribut' : codeAttribut,
                    'codePoste' : codePoste,
                    'condition' : condition,
                };

                doCreatePonderation(data);
            }
        }
        function doCreatePonderation(data){
                    $(".imloadAdd").fadeIn("1000");
                    jsRoutes.controllers.ReglePonderationController.addPonderation().ajax({
                        data : JSON.stringify(data),
                        contentType : 'application/json',
                        success : function (json) {
                        console.log(json);
                            if (json.result == "ok") {
                                $('#closeModalAddPonderation').click();
                                doShowSuccess(json.message);
                                alert(json.message);
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

    function deletePonderation(codePonderation,codeAttribut,codePoste) {
            $(".imloadDialog").fadeIn("1000");
            jsRoutes.controllers.ReglePonderationController.deletePonderation(codePonderation,codeAttribut,codePoste).ajax({
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


     function showPonderation(codePonderation,codeAttribut,codePoste) {
           $(".imload").fadeIn("1000");
                 jsRoutes.controllers.ReglePonderationController.getPonderationbyCode(codePonderation,codeAttribut,codePoste).ajax({
                     success: function (data) {
                     console.log("data--",data)
                         if (data.result == "ok"){
                             var ponderation = data.ponderations;

                             for (var i in ponderation) {
                                 var html = '';
                                 html += '<tr id="' + ponderation[i].codeReglePonderation + '">';
                                 $('#codePonderationUp').val(ponderation[i].codeReglePonderation);
                                 $('#codeAttributUp').val(ponderation[i].codeAttribut);
                                 $('#codePosteUp').val(ponderation[i].codePoste);
                                 $('#conditionUp').val(ponderation[i].condition);
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

         function verifyBeforeUpdate(codePonderation,codeAttribut,codePoste){

              $('#bt_modifier_poste').attr("disabled", true);
              var codePonderation = $('#codePonderationUp').val();
              var codeAttribut = $('#codeAttributUp').val();
              var codePoste = $('#codePosteUp').val();
              var condition = $('#conditionUp').val();

              if(codePonderation == ''){
                  alert('code Poste obligatoire !!!');
                  $('#bt_modifier_ponderation').attr("disabled", false);
              }
              else if(codeAttribut == ''){
                  alert('libelle Poste obligatoire !!!');
                  $('#bt_modifier_ponderation').attr("disabled", false);
              }

              else {
                  var data ={
                      'codePonderation' : codePonderation,
                      'codeAttribut' : codeAttribut,
                      'codePoste' : codePoste,
                      'condition' : condition,
                  };
                  updatePonderation(codePonderation,codeAttribut,codePoste,condition);
              }
          }

          function updatePonderation(codePonderation,codeAttribut,codePoste,condition){
          $(".imloadAdd").fadeIn("1000");
          jsRoutes.controllers.ReglePonderationController.updatePonderation(codePonderation,codeAttribut,codePoste,condition).ajax({
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

         getAllAttribut();
         function getAllAttribut(){
                jsRoutes.controllers.AttributController.getAllAttribut().ajax({
                    success: function (data) {
                    if (data.result == "ok") {
                        var attributs = data.attributs;
                        for (var i in attributs) {

                            var html = '';
                            html='<option value="'+attributs[i].codeAttribut+'">'+attributs[i].libelleAttribut+'</option>';
                            $('#codeAttribut').append(html);
                            $('#codeAttributUp').append(html);
                        }
                        }
                    }
                });
         }

         getAllPoste();
         function getAllPoste(){
                jsRoutes.controllers.PosteFodepController.getAllPoste().ajax({
                    success: function (data) {
                    if (data.result == "ok") {
                        var postes = data.postes;
                        for (var i in postes) {

                            var html = '';
                            html='<option value="'+postes[i].codePoste+'">'+postes[i].libellePoste+'</option>';
                            $('#codePoste').append(html);
                            $('#codePosteUp').append(html);
                        }
                        }
                    }
                });
         }
         getAllPonderation();
          function getAllPonderation(){
                 jsRoutes.controllers.PonderationDefaultController.getAll().ajax({
                     success: function (data) {
                     if (data.result == "ok") {
                         var ponderations = data.ponderations;
                         for (var i in ponderations) {

                             var html = '';
                             html='<option value="'+ponderations[i].codeReglePonderation+'">'+ponderations[i].ponderationDefaut+'</option>';
                             $('#codePonderation').append(html);
                             $('#codePonderationUp').append(html);
                         }
                         }
                     }
                 });
          }

                $("#fileUploader").change(function(evt){
                    var selectedFile = evt.target.files[0];
                    var reader = new FileReader();
                    reader.onload = function(event) {
                      var data = event.target.result;
                      var workbook = XLSX.read(data, {
                          type: 'binary'
                      });
                      workbook.SheetNames.forEach(function(sheetName) {

                          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                          var json_object = JSON.stringify(XL_row_object);
                          var ponderation = JSON.parse(json_object);
                          for (var i in ponderation) {
                             doCreatePonderationWithFile(ponderation[i].coderegle,ponderation[i].codeattribut,ponderation[i].codeposte,ponderation[i].conditions)
                          }
                          getPonderation();
                        })
                    };
                    reader.onerror = function(event) {
                      console.error("File could not be read! Code " + event.target.error.code);
                    };
                    reader.readAsBinaryString(selectedFile);
              });

              function doCreatePonderationWithFile(coderegle,codeAttribut,codePoste,condition){
                        $(".imloadAdd").fadeIn("1000");
                        jsRoutes.controllers.ReglePonderationController.addPonderationWhithFile(coderegle,codeAttribut,codePoste,condition).ajax({
                            success : function (json) {

                                if (json.result == "ok") {
                                    //alert(json.message);
                                }
                                else{
                                    //alert(json.message);
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