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
            jsRoutes.controllers.ReglePonderationController.getAllPiste(page).ajax({
                success: function (data) {
                    if (data.result == "ok") {
                        var pistes = data.pistes;
                        console.log(pistes)
                        var numLine = (data.per_page * data.current_page) - data.per_page;
                        if (data.current_page == -1){numLine = 0}
                         for (var i in pistes) {
                            var html = '';
                             numLine += 1;
                            html += '<tr">';
                            html += '<td>' + numLine + '</td>';
                            html += '<td>' + pistes[i].codeReglePonderation +  '</td>';
                            html += '<td>' + pistes[i].codeAttribut+ '</td>';
                            html += '<td>' + pistes[i].codePoste+ '</td>';
                            html += '<td>' + pistes[i].codeEtat+ '</td>';
                            if(pistes[i].sourceDonnees2==null || pistes[i].sourceDonnees2=='') {
                              html += '<td>' + pistes[i].sourceDonnees+ '</td>';
                            }
                            else if(pistes[i].sourceDonnees2!=null || pistes[i].sourceDonnees2!=''){
                             html += '<td>' + pistes[i].sourceDonnees+ '/'+ pistes[i].sourceDonnees2+'</td>';
                            }
                            if(pistes[i].sourceValeur2==null || pistes[i].sourceValeur2==''){
                               html += '<td>' + pistes[i].sourceValeur+ '</td>';
                            }
                            else if(pistes[i].sourceValeur2!=null || pistes[i].sourceValeur2!=''){
                              html += '<td>' + pistes[i].sourceValeur+ '/'+ pistes[i].sourceValeur2+'</td>';
                            }
                            if(pistes[i].valeur==null || pistes[i].valeur==''){
                              html += '<td> </td>';
                            }else{
                             html += '<td>' + pistes[i].valeur+ '</td>';
                            }
                            if(pistes[i].condition == null || pistes[i].condition!=''){
                                html += '<td> </td>';
                            }else{
                                html += '<td>' + pistes[i].condition+ '</td>';
                            }
                            html += '<td><button type="button" class="btn btn-danger btn-icon btn-xs line_button" data-toggle="modal" data-target="#updatePonderation" id="line_action-'+pistes[i].codeReglePonderation+'-'+pistes[i].codeAttribut+'-'+pistes[i].codePoste+'"> Modifier <i class="fa fa-fire"></i> </button></td>';
                            html += '<td><button type="button" class="btn btn-black btn-xs line_supp" id="line_supp-'+pistes[i].codeReglePonderation+'-'+pistes[i].codeAttribut+'-'+pistes[i].codePoste+'"><i class="fa fa-trash"></i> </button></td>';
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

                        $(".line_supp").click(function() {
                            var id = $(this).attr('id');
                            var sp = id.split('-');
                            console.log(sp);

                            var reponse = window.confirm("Souhaitez-vous vraiment supprimer cette Ponderation ?");
                                if(reponse)
                                {
                                   deletePoste(sp[1],sp1[2],sp1[3]);
                                }
                          });

                        $(".line_button").click(function() {
                            var id = $(this).attr('id');
                            var sp1 = id.split('-');
                            console.log("id---",sp1[1])
                             showPonderation(sp1[1],sp1[2],sp1[3]);
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
            var condition = "";
            var source = $('#source').val();
            var operateur = $('#operateur').val();
            var valeur = $('#valeur').val();
            var source2 = $('#source2').val();
            var operateur2 = $('#operateur2').val();
            var valeur2 = $('#valeur2').val();

            if(operateur =="com"){
             var val = valeur.split(',');
             var line= "";
               console.log(val);
               for (var i in val){
                 line = source+" like '"+val[i]+"%'";
                 if(condition == ""){
                    condition = line;
                 }else{
                   condition = condition+' OR '+line;
                 }
               }
            }
            else if(operateur =="ter"){
                         var val = valeur.split(',');
                         var line= "";
                           console.log(val);
                           for (var i in val){
                             line = source+" like '%"+val[i]+"'";
                             if(condition == ""){
                                condition = line;
                             }else{
                               condition = condition+' OR '+line;
                             }
                           }
                        }
             else if(operateur =="="){
                          var val = valeur.split(',');
                          var line= "";
                            console.log(val);
                            for (var i in val){
                              line = source+" = '"+val[i]+"'";
                              if(condition == ""){
                                 condition = line;
                              }else{
                                condition = condition+' OR '+line;
                              }
                            }
             }
           if(source2 !=null ){
              var condition2= "";
              if(operateur =="com"){
              var val = valeur2.split(',');
              var line= "";
                for (var i in val){
                  line = source2+" like '"+val[i]+"%'";
                  if(condition2 == ""){
                     condition2 = line;
                  }else{
                    condition2 = condition2+' OR '+line;
                  }
                }
              }

               condition = condition+' AND '+condition2
           }
            if(codePonderation == ''){
                doShowErrorAdd(labelVerifyTel);
                $('#createPonderation').attr("disabled", false);
            }
            else {
                var data ={
                    'codeReglePonderation' : codePonderation,
                    'codeAttribut' : codeAttribut,
                    'codePoste' : codePoste,
                    'source' : source,
                    'operateur' : operateur,
                    'valeur' : valeur,
                    'condition': condition
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

                         if (data.result == "ok"){
                             console.log(data)
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
              //var condition = $('#conditionUp').val();
              var source = $('#source').val();
              var operateur = $('#operateur').val();
              var valeur = $('#valeur').val();

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
                      'source' : source,
                      'operateur' : operateur,
                      'valeur' : valeur
                  };
                  updatePonderation(codePonderation,codeAttribut,codePoste,source,operateur,valeur);
              }
          }

          function updatePonderation(codePonderation,codeAttribut,codePoste,source,operateur,valeur){
          $(".imloadAdd").fadeIn("1000");
          jsRoutes.controllers.ReglePonderationController.updatePonderation(codePonderation,codeAttribut,codePoste,source,operateur,valeur).ajax({
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

         //getAllPoste();
         function getAllPoste(codeEtat){
                jsRoutes.controllers.PosteFodepController.getAllPosteByEtat(codeEtat).ajax({
                    success: function (data) {
                    if (data.result == "ok") {
                        var postes = data.postes;
                        for (var i in postes) {
                            var html = '';
                             if(postes[i].libellePoste!=null){
                                html='<option value="'+postes[i].codePoste+'">'+postes[i].libellePoste+'</option>';
                                $('#codePoste').append(html);
                                $('#codePosteUp').append(html);
                             }
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

   $("#codeAttribut").change(function () {
        var val = $(this).val();
        $('#sourceD').html('');
        $('#sourceD2').html('');
        getSource(val);
    });

              function getSource(codeAttribut){
                     jsRoutes.controllers.AttributController.getAttributbyCode(codeAttribut).ajax({
                          success: function (data) {
                          if (data.result == "ok") {

                              var data = data.attributbyid;
                              console.log(data);
                              for (var i in data) {
                              var html = '';
                              var html2 = '';

                                   if(data[i].sourceDonnees2 == null || data[i].sourceDonnees2 == ""){
                                     html='<input type="text" id="source" class="form-control" aria-describedby="sizing-addon3" readonly value='+data[i].sourceDonnees+'.'+data[i].sourceValeur+'>';
                                     $("#trSource2").hide();
                                     $("#trOperande2").hide();
                                     $("#trValeur2").hide();
                                     $('#sourceD').append(html);
                                   }
                                   else{
                                      html='<input type="text" id="source" class="form-control" aria-describedby="sizing-addon3" readonly value='+data[i].sourceDonnees+'.'+data[i].sourceValeur+'>';
                                      html2='<input type="text" id="source2" class="form-control" aria-describedby="sizing-addon3" readonly value='+data[i].sourceDonnees2+'.'+data[i].sourceValeur2+'>';
                                      $("#trSource2").show();
                                      $("#trOperande2").show();
                                      $("#trValeur2").show();
                                      $('#sourceD').append(html);
                                      $('#sourceD2').append(html2);
                                   }
                              }
                              }
                          }
                      });

                   }

         getAllEtat();
         function getAllEtat(){
                jsRoutes.controllers.EtatFodepController.getAll().ajax({
                    success: function (data) {
                    if (data.result == "ok") {
                        var etats = data.etats;
                        for (var i in etats) {
                            var html = '';
                            html='<option value="'+etats[i].codeEtat+'">'+etats[i].codeEtat+': '+etats[i].libelleEtat+'</option>';
                            $('#codeEtat').append(html);
                        }
                    }
                    }
                });
         }

          $("#codeEtat").change(function () {
              var val = $(this).val();
              getAllPoste(val);
          });
});