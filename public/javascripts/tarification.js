$(document)
    .ready(
    function (e) {

        $(".imloadAdd").fadeOut("1000");
        $('#topParam').addClass('opened');
        $('#menutarif').addClass('active');
        $(".imloadUpdate").fadeOut("1000");
        $("#valeurtarifUpdate").numeric();
        $(".numeric").numeric();

        var idTarifToUpdate;
        var idService;
        var libelleService;
        var idTypeClient;
        var libelleTypeClient;
        var valueUpdate;

        var paliers = [];

        getTarification();

        function getTarification(){
            $(".imload").fadeIn("1000");
            $('#typeClientSelected').html('');
            appRoutes.controllers.TarificationController.listeTarifs().ajax({
                success: function (json) {
                    if (json.result == "ok") {

                        var typeClients = json.type_client;

                        var htmlHeadTypeTarif = '<option value="">' + labelChoiceType + '</option>';
                        $('#typeClientSelected').append(htmlHeadTypeTarif);
                        for (var i in typeClients) {
                            var html = '<option value="' + typeClients[i].id + '">' + typeClients[i].libelle + '</option>';
                            $('#typeClientSelected').append(html);
                        }

                        var services = json.services;
                        showAlltarifs(services);

                    } else if (json.result == "nok") {
                        doShowError(json.message);
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

        function showAlltarifs(services){

            $('#bodytarif').html('');
            var html = '';

            for (var i in services){

                html += '<div class="row">';
                    html +='<div class="row">';
                        html +='<div class="col-md-4">';
                            html += '<h5 class="text-primary">' + services[i].libelle + '</h5>';
                        html +='</div>';
                        html +='<div class="col-md-2">';
                            if (profilUser == profil_rssi) {
                                html += '<button id="' + services[i].id + '_' + services[i].libelle +  '" type="button" class="btn btn-primary btnNewTarification" data-toggle="modal" data-target="#AddNewTypeCLientTarif">' + labelNewTarif + '</button>';
                            }
                        html +='</div>';
                    html +='</div>';

                    html += '<div class="panel-group" id="' + services[i].id + '" role="tablist" aria-multiselectable="true">';

                        for (var j in services[i].typeClients){

                            html += '<div class="panel panel-default">';

                                html += '<div class="panel-heading" role="tab" id="' + services[i].id + '_TypeClientHeading' + j + '">';
                                    html += '<h4 class="text-default panel-title">';
                                        html += '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#' + services[i].id + '" ';
                                           html += ' href="#' + services[i].id + '_TypeClient' + j + '" aria-expanded="false" aria-controls="' + services[i].id + '_TypeClient' + j + '">';
                                            html += services[i].typeClients[j].libelle;
                                        html += '</a>';
                                    html += '</h4>';
                                html += '</div>';

                                html += '<div id="' + services[i].id + '_TypeClient' + j + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="' + services[i].id + '_TypeClientHeading' + j + '">';
                                    html += '<div class="panel-body">';
                                        if( (services[i].typeClients[j].id != "0") &&
                                            (profilUser == profil_rssi) ){
                                            html += '<button type="button" id="' + services[i].id + '_' + services[i].libelle + '_' + services[i].typeClients[j].id + '_' + services[i].typeClients[j].libelle + '" class="btn btn-danger btnDeleteTab" data-toggle="modal" data-target="#myModalConfirm" style="margin-bottom:15px;">' + btnDelete + '</button>';
                                        }
                                        html += '<div class="table-responsive">';
                                            html += '<table class="table table-hover table-striped" id="tabJournal">';
                                                html += '<thead>';
                                                html += '<tr>';
                                                    html += '<th>' + labelMontantMin + '</th>';
                                                    html += '<th>' + labelMontantMax + '</th>';
                                                    html += '<th>' + labelValeurTarif + '</th>';
                                                    if (profilUser == profil_rssi){
                                                        html += '<th>' + labelAction + '</th>';
                                                    }
                                                html += '</tr>';
                                                html += '</thead>';
                                                html += '<tbody>';


                                                        for (var k in services[i].typeClients[j].tarifs){
                                                            html += '<tr>';
                                                                html += '<input type="hidden" class="typeTarif" id="' + services[i].typeClients[j].tarifs[k].typeTarif + '">';
                                                                html += '<td>' + services[i].typeClients[j].tarifs[k].montantMin + '</td>';
                                                                html += '<td>' + services[i].typeClients[j].tarifs[k].montantMax + '</td>';
                                                                if(services[i].typeClients[j].tarifs[k].typeTarif == '0'){
                                                                    html += '<td class="valeur" id="' + services[i].typeClients[j].tarifs[k].valeur + '">' + services[i].typeClients[j].tarifs[k].valeur + '</td>';
                                                                }
                                                                else if (services[i].typeClients[j].tarifs[k].typeTarif == '1'){
                                                                    html += '<td class="valeur" id="' + (parseFloat(services[i].typeClients[j].tarifs[k].valeur) * 100) + '">' + (parseFloat(services[i].typeClients[j].tarifs[k].valeur) * 100)  + ' %' + '</td>';
                                                                }
                                                                if (profilUser == profil_rssi) {
                                                                    html += '<td><button id="' + services[i].typeClients[j].tarifs[k].idTarif + '" class="btn btn-xs btn-success btnUpdateTarif" data-toggle="modal" data-target="#UpdateTarif">' + btnUpdate + '</button></td>';
                                                                }
                                                            html += '</tr>';
                                                        }

                                                html += '</tbody>';
                                            html += '</table>';
                                        html += '</div>';
                                    html += '</div>';
                                html += '</div>';

                            html += '</div>';

                        }

                    html += '</div>';
                html += '</div>';
                html += '<hr>';

            }
            $('#bodytarif').append(html);

            $(".btnNewTarification").click(function(){
                $('#myModalLabelTitle').html('');
                var id = $(this).attr('id');
                var sp = id.split('_');
                idService = sp[0];
                $('#myModalLabelTitle').append(sp[1]);
            });

            $(".btnUpdateTarif").click(function(){
                idTarifToUpdate = $(this).attr('id');
                console.log(idTarifToUpdate);
                $('#typeTarif').val($(this).parent().parent().children('.typeTarif').attr('id'));
                $('#valeurtarifUpdate').val($(this).parent().parent().children('.valeur').attr('id'));
            });

            $('.btnDeleteTab').click(function (e) {
                $('#messageDialog').html('');
                var id = $(this).attr('id');
                var sp = id.split('_');
                idService = sp[0];
                libelleService = sp[1];
                idTypeClient = sp[2];
                libelleTypeClient = sp[3];
                $('#messageDialog').append(labelDelete + ' ' + sp[3] + ' ' + labelDeleteService + ' ' + sp[1] + '?');
            });

        }

        $("#btnNewPalier").click(function() {

            var duplicate = true;

            var arrayLastLine = [];

            $(".lastLineTarif").find('input:text, select').each(function() {
                var edited = $(this).val();
                arrayLastLine.push(edited);
                if(edited == "") {
                    doShowErrorAdd(labelVerifyLine);
                    duplicate = false;
                }
            });

            if( parseFloat(arrayLastLine[0]) >= parseFloat(arrayLastLine[1]) ){
                doShowErrorAdd(labelVerifyMax);
                duplicate = false;
            }

            if( (arrayLastLine[2] == '1' && parseInt(arrayLastLine[3]) > 100) || (parseInt(arrayLastLine[3]) < 0) ){
                doShowErrorAdd(labelVerifyValue);
                duplicate = false;
            }

            if( arrayLastLine[2] == '0' && parseInt(arrayLastLine[3]) < 0 ){
                doShowErrorAdd(labelVerifyValue);
                duplicate = false;
            }

            if(duplicate == true){

                //Ajout du palier bon dans l'array pour json to send
                var palierBon = {
                        'min' : arrayLastLine[0],
                        'max' : arrayLastLine[1],
                        'valeur' : arrayLastLine[3],
                        'typevaleur' : arrayLastLine[2]
                    };
                paliers.push(palierBon);

                //Recuperation du dernier montant Max pour inxrémenter cette valeur de 1
                var lastMontantMax = $(".lastLineTarif").find('.montantMax').val();

                //Cloner le dernier palier
                var newLine = $(".lastLineTarif").clone();

                //Desactiver tous les champs du dernier palier deja editer
                $(".lastLineTarif").find('.numeric').attr("disabled", true);

                //Effacer tous les champs qui se trouve dans le clone
                clear_form_elements(newLine);

                //Incrémenter de 1 ce le dernier montant max et le mettre dans le montant min du clone
                $(newLine).find('.montantMin').val( (parseFloat(lastMontantMax) + 1 ) );

                //Desactiver ce montant min cloner
                $(newLine).find('.montantMin').attr("disabled", true);

                //Enlever la classe lastLineTarif du dernier palier edite
                $('#TabTarif').find('*').removeClass("lastLineTarif");

                //Append le clone dans le tableau
                newLine.appendTo("#TabTarif");

                //rendre tout les input du nouveau dernier palier en numeric
                $(".numeric").numeric();
            }
        });

        $('#addNewTypeTarif').click(function (e) {
            var arrayLast = [];
            var addIsRAS = true;

            var typeClientSelected = $('#typeClientSelected').val();

            $(".lastLineTarif").find('input:text, select').each(function() {
                var edited = $(this).val();
                arrayLast.push(edited);
                if(edited == "") {
                    doShowErrorAdd(labelVerifyLine);
                    addIsRAS = false;
                }
            });

            if( parseFloat(arrayLast[0]) >= parseFloat(arrayLast[1]) ){
                doShowErrorAdd(labelVerifyMax);
                addIsRAS = false;
            }

            if( (arrayLast[2] == '1' && parseInt(arrayLast[3]) > 100) || (parseInt(arrayLast[3]) < 0) ){
                doShowErrorAdd(labelVerifyValue);
                addIsRAS = false;
            }
            if(typeClientSelected == ""){
                doShowErrorAdd(labelVerifyTypeClient);
                addIsRAS = false;
            }

            if(addIsRAS == true){

                //Ajout du palier bon dans l'array pour json to send
                var palierLast = {
                        'min' : arrayLast[0],
                        'max' : arrayLast[1],
                        'valeur' : arrayLast[3],
                        'typevaleur' : arrayLast[2]
                    };
                paliers.push(palierLast);

                if(paliers.length == 0){
                    doShowErrorAdd(labelVerifyTab);
                }
                else{
                    var data = {
                            'idservice' : idService,
                            'typeclient' : typeClientSelected,
                            'palier' : paliers
                        };
                    //console.log(data);
                    doAddNewTarification(data);
                }
            }

        });

        function doAddNewTarification(data){
            $(".imloadAdd").fadeIn("1000");
            $('#addNewTypeTarif').attr("disabled", true);
            appRoutes.controllers.TarificationController.addTarif().ajax({
                data : JSON.stringify(data),
                contentType : 'application/json',
                success : function (json) {
                    if (json.result == "ok") {
                        $('#closeModalAddTarif').click();
                        doShowSuccess(json.message);
                        paliers = [];
                        var services = json.services;
                        showAlltarifs(services);
                    }
                    else {
                        doShowErrorAdd(json.message);
                    }
                    $(".imloadAdd").fadeOut("1000");
                    $('#addNewTypeTarif').attr("disabled", false);
                },
                error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                    if(objetExeption == "Unauthorized"){
                        $(location).attr('href',"/");
                    }
                    $(".imloadAdd").fadeOut("1000");
                    $('#addNewTypeTarif').attr("disabled", false);
                }
            });
        }

        $('#closeModalAddTarif').click(function (e) {
            $("#TabTarif").html('');

            var html = '';
            html += '<div class="row lastLineTarif">';
                html += '<div class="col-xs-3">';
                    html += '<input type="text" class="form-control montantMin numeric" placeholder="' + labelMontantMin + '">';
                html += '</div>';
                html += '<div class="col-xs-3">';
                    html += '<input type="text" class="form-control montantMax numeric" placeholder="' + labelMontantMax + '">';
                html += '</div>';
                html += '<div class="col-xs-3">';
                    html += '<select class="form-control selectNatTypeTarif">';
                        html += '<option value="0">' + labelValeur + '</option>';
                        html += '<option value="1">' + labelValeurPourcentage + '</option>';
                    html += '</select>';
                html += '</div>';
                html += '<div class="col-xs-3">';
                    html += '<input type="text" class="form-control valueTarif numeric" placeholder="' + labelValeurTarif + '">';
                html += '</div>';
            html += '</div>';

            $('#TabTarif').append(html);

            paliers = [];

        });


        $('#doUpdateTarif').click(function (e) {
            doVerifyUpdateTarif();
        });

        $("#typeTarif" ).keydown(function( event ) {
            if(event.keyCode == 13){
                doVerifyUpdateTarif();
            }
        });

        $("#valeurtarifUpdate" ).keydown(function( event ) {
            if(event.keyCode == 13){
                doVerifyUpdateTarif();
            }
        });



        function doVerifyUpdateTarif(){
            var typeTarif = $('#typeTarif').val();
            var valeurtarifUpdate = $('#valeurtarifUpdate').val();
            if(valeurtarifUpdate == ''){
                doShowErrorUpdate(labelVerifyValue);
            }
            else if(typeTarif == '0' && parseInt(valeurtarifUpdate) < 0 ){
                doShowErrorUpdate(labelVerifyValue);
            }
            else if(typeTarif == '1' && parseInt(valeurtarifUpdate) > 100 ){
                doShowErrorUpdate(labelVerifyValue);
            }
            else{
                var data = {
                    'idtarif' : idTarifToUpdate,
                    'typeValeur' : typeTarif,
                    'valeur' : valeurtarifUpdate
                };
                doUpdateTarif(data);
            }
        }

        function doUpdateTarif(data){
            $(".imloadUpdate").fadeIn("1000");
            $('#doUpdateTarif').attr("disabled", true);
            appRoutes.controllers.TarificationController.majValeurTarif().ajax({
                data : JSON.stringify(data),
                contentType : 'application/json',
                success : function (json) {
                    if (json.result == "ok") {
                        $('#closeModalUpdateTarif').click();
                        doShowSuccess(json.message);
                        var services = json.services;
                        showAlltarifs(services);
                    }
                    else{
                        doShowErrorUpdate(json.message);
                    }
                    $(".imloadUpdate").fadeOut("1000");
                    $('#doUpdateTarif').attr("disabled", false);
                },
                error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                    if(objetExeption == "Unauthorized"){
                        $(location).attr('href',"/");
                    }
                    $(".imloadUpdate").fadeOut("1000");
                    $('#doUpdateTarif').attr("disabled", false);
                }
            });
        }


        $('#btnConfirm').click(function (e) {
            var data = {
                'idservice' : idService,
                'typeclient' : idTypeClient
            };
            doDeleteTabTarif(data);
        });

        function doDeleteTabTarif(data){
            $(".imloadDialog").fadeIn("1000");
            $('#btnConfirm').attr("disabled", true);
            appRoutes.controllers.TarificationController.delTarif().ajax({
                 data : JSON.stringify(data),
                 contentType : 'application/json',
                 success : function (json) {
                     if (json.result == "ok") {
                         $('#btnClose').click();
                         doShowSuccess(json.message);
                         var services = json.services;
                         showAlltarifs(services);
                     }
                     else{
                         doShowError(json.message);
                     }
                     $(".imloadDialog").fadeOut("1000");
                     $('#btnConfirm').attr("disabled", false);
                 },
                 error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                     if(objetExeption == "Unauthorized"){
                        $(location).attr('href',"/");
                     }
                    $(".imloadDialog").fadeOut("1000");
                     $('#btnConfirm').attr("disabled", false);
                 }
             });
        }


        function clear_form_elements(ele) {

            $(ele).find(':input').each(function() {
                switch(this.type) {
                    case 'text':
                        $(this).val('');
                        break;
                }
            });

        }


    });