$(document)
    .ready(
    function (e) {

        var compteClient;
        var prenomClient;
        var nomClient;
        var telephoneClient;
        var emailClient;
        var action;
        var ntc;

        loadingTask();

        function loadingTask() {
            $(".imloadDialog").fadeOut("1000");
            $('#prenomtf').val('');
            $('#nomtf').val('');
            $('#telephonetf').val('');
            $('#topMenuClient').addClass('opened');
            $('#topMenuClient').addClass('active');
            $('#menuClient').addClass('active');
        }

        getListClients();

        function getListClients(page) {
            $(".imload").fadeIn("1000");
            $('#tbodyClients').html('');
            $('#pagingTop').html('');
            $('#pagingBottom').html('');
            $('#divPaginationhaut').empty();
            $('#divPaginationhaut').removeData("twbs-pagination");
            $('#divPaginationhaut').unbind("page");
            $('#divPagination').empty();
            $('#divPagination').removeData("twbs-pagination");
            $('#divPagination').unbind("page");
            appRoutes.controllers.Client.getAllClients(page).ajax({
                success: function (data) {
                    if (data.result == "ok") {
                         if(data.total_page == 0){
                            doShowWarning("Aucun client enregistré !!! ");
                        } else {
                            var clients = data.clients;
                            var numLine = (data.per_page * data.current_page) - data.per_page;
                            if (data.current_page == -1){numLine = 0}
                            for (var i in clients) {
                                var html = '';
                                numLine += 1;
                                html += '<tr id="' + clients[i].compte + '">';
                                html += '<td>' + numLine + '</td>';
                                html += '<td class="telephoneCli" id="' + clients[i].tel + '">' + clients[i].tel + '</td>';
                                html += '<td class="prenomCli" id="' + clients[i].prenom + '">' + clients[i].prenom + '</td>';
                                html += '<td class="nomCli" id="' + clients[i].nom + '">' + clients[i].nom + '</td>';
                                html += '<input type="hidden" class="compte" id="' + clients[i].compte + '">';
                                html += '<input type="hidden" class="emailCli" id="' + clients[i].email + '">';
                                html += '<input type="hidden" class="adress" id="' + clients[i].adress + '">';
                                html += '<input type="hidden" class="solde" id="' + clients[i].solde + '">';
                                html += '<input type="hidden" class="dateDouverture" id="' + clients[i].dateDouverture + '">';
                                html += '<input type="hidden" class="typeClient" id="' + clients[i].typeClient + '">';
                                html += '<td> <button type="button" class=" btn btn-default btn-xs btn-details-client" data-toggle="modal" data-target="#pop-details-client">' + btnDetail + '</button></td>';
                                if ( (profilUser != profil_controle_permanent) &&
                                     (profilUser != profil_compliance) &&
                                     (profilUser != profil_rssi) ){
                                html += '<td> <button type="button" class="reinitPass btn btn-default btn-xs" data-toggle="modal" data-target="#myModalConfirm">' + btnReinit + '</button> </td>';
                                html += '<td> <button type="button" class="getContrat btn btn-default btn-xs">' + btnContrat + '</button> </td>';
                                }
                                if (clients[i].ntc == 0){
                                    html += '<td> <button type="button" class="block btn btn-danger btn-xs" data-toggle="modal" data-target="#myModalConfirm">' + btnBlock + '</button> </td>';
                                }
                                else{
                                    html += '<td> <button type="button" class="unblock btn btn-success btn-xs" data-toggle="modal" data-target="#myModalConfirm">' + btnDeblock + '</button> </td>';
                                }
                                html += '<td> <button type="button" id="CLient_'+ clients[i].compte +'" class="showJournalCli btn btn-default btn-xs btn-journal">' + btnJournal + '</button> </td>';

                                html += '</tr>';
                                $('#tbodyClients').append(html);

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
                                    getListClients(page);
                                }
                            });
                            $('#divPagination').twbsPagination({
                                totalPages: data.total_page,
                                visiblePages: 3,
                                startPage: page,
                                onPageClick: function (event, numPage2) {
                                    page = numPage2;
                                    getListClients(page);
                                }
                            });

                            $(".btn-details-client").click(function(){

                                $('#tel').html('');               $('#prenom_cli').html('');
                                $('#nom_cli').html('');           $('#email_cli').html('');
                                $('#adress_cli').html('');        $('#compte_cli').html('');
                                $('#solde_cli').html('');         $('#dateouv_cli').html('');
                                $('#type_cli').html('');

                                $('#tel').append($(this).parent().parent().children('.telephoneCli').attr('id'));
                                $('#prenom_cli').append($(this).parent().parent().children('.prenomCli').attr('id'));
                                $('#nom_cli').append($(this).parent().parent().children('.nomCli').attr('id'));
                                $('#email_cli').append($(this).parent().parent().children('.emailCli').attr('id'));
                                $('#adress_cli').append($(this).parent().parent().children('.adress').attr('id'));
                                $('#compte_cli').append($(this).parent().parent().children('.compte').attr('id'));
                                $('#solde_cli').append($(this).parent().parent().children('.solde').attr('id') + " XAF");
                                $('#dateouv_cli').append($(this).parent().parent().children('.dateDouverture').attr('id'));
                                var type = $(this).parent().parent().children('.typeClient').attr('id');
                                if(type == 1){
                                    $('#type_cli').append(labelClientPersonel);
                                }else if(type == 2){
                                    $('#type_cli').append(labelClientBank);
                                }else if(type == 3){
                                    $('#type_cli').append(labelClientNoBank);
                                }else if(type == 4){
                                    $('#type_cli').append(labelClientVIP);
                                }

                            });

                            $(".showJournalCli").click(function(){
                                var id = $(this).attr('id');
                                var sp = id.split('_');
                                $(location).attr('href', "/journalCptClient?compte="+sp[1]);
                            });

                            $(".getContrat").click(function(){

                                var tel = $(this).parent().parent().children('.telephoneCli').attr('id');
                                var prenom = $(this).parent().parent().children('.prenomCli').attr('id');
                                var nom = $(this).parent().parent().children('.nomCli').attr('id');
                                var email = $(this).parent().parent().children('.emailCli').attr('id');
                                var adresse = $(this).parent().parent().children('.adress').attr('id');
                                var compte = $(this).parent().parent().children('.compte').attr('id');
                                var adhesion = $(this).parent().parent().children('.dateDouverture').attr('id');
                                var type = $(this).parent().parent().children('.typeClient').attr('id');

                                var url = "/client/contrat?tel=" + tel + "&prenom=" + prenom +
                                                    "&nom=" + nom + "&email=" + email + "&adresse=" + adresse +
                                                     "&compte=" + compte + "&adhesion=" + adhesion +
                                                     "&type=" + type ;

                                window.open(url, '_blank');


                            });

                            $(".reinitPass").click(function(){
                                telephoneClient = $(this).parent().parent().children('.telephoneCli').attr('id');
                                prenomClient = $(this).parent().parent().children('.prenomCli').attr('id');
                                nomClient = $(this).parent().parent().children('.nomCli').attr('id');
                                emailClient = $(this).parent().parent().children('.emailCli').attr('id');
                                action = "reinit";
                                $('#messageDialog').html('');
                                $('#messageDialog').append(labelMessageReinit + ' ' +
                                                            prenomClient + ' ' + nomClient + ' ?');
                            });

                            $(".block").click(function(){
                                compteClient = $(this).parent().parent().attr('id');
                                telephoneClient = $(this).parent().parent().children('.telephoneCli').attr('id');
                                prenomClient = $(this).parent().parent().children('.prenomCli').attr('id');
                                nomClient = $(this).parent().parent().children('.nomCli').attr('id');
                                emailClient = $(this).parent().parent().children('.emailCli').attr('id');
                                action = "Bloquage";
                                ntc = "5";
                                $('#messageDialog').html('');
                                $('#messageDialog').append( labelMessageBlock + ' ' +
                                                            prenomClient + ' ' + nomClient + ' ?');
                            });

                            $(".unblock").click(function(){
                                compteClient = $(this).parent().parent().attr('id');
                                telephoneClient = $(this).parent().parent().children('.telephoneCli').attr('id');
                                prenomClient = $(this).parent().parent().children('.prenomCli').attr('id');
                                nomClient = $(this).parent().parent().children('.nomCli').attr('id');
                                emailClient = $(this).parent().parent().children('.emailCli').attr('id');
                                action = "Debloquage";
                                ntc = "0";
                                $('#messageDialog').html('');
                                $('#messageDialog').append(labelMessageDeblock + ' ' +
                                                            prenomClient + ' ' + nomClient + ' ?');
                            });
                        }

                    } else if (data.result == "nok") {
                        doShowWarning(data.message);
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

        $('#btnConfirm').click(function (e) {
            if (action == 'reinit'){
                var data = {
                        'telephone' : telephoneClient,
                        'prenom' : prenomClient,
                        'nom' : nomClient,
                        'email' : emailClient
                    };
                doReinitPassword(data);
            }
            else if (action == 'Bloquage' || action == 'Debloquage'){
                var data = {
                    'compte' : compteClient,
                    /*'telephone' : telephoneClient,
                    'prenom' : prenomClient,
                    'nom' : nomClient,*/
                    'ntc' : ntc,
                    'action' : action
                };
                doBlockOrUnblock(data);
            }
        });

        function doReinitPassword(data) {
            $(".imloadDialog").fadeIn("1000");
            $('#btnConfirm').attr("disabled", true);
            appRoutes.controllers.Client.reinitPwd().ajax({
                data : JSON.stringify(data),
                contentType : 'application/json',
                success : function (data) {
                    $(".imloadDialog").fadeOut("1000");
                    $('#btnConfirm').attr("disabled", false);
                    $('#btnClose').click();
                    if(data.result == "ok"){
                        doShowSuccess(data.message + ', nouveau mot de passe : ' + data.pass);
                    }else {
                        doShowWarning(data.message);
                    }
                },
                error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                    if(objetExeption == "Unauthorized"){
                        $(location).attr('href',"/");
                    }
                    $(".imloadDialog").fadeOut("1000");
                    $('#btnConfirm').attr("disabled", false);
                    $('#btnClose').click();
                }
            });
        }

        function doBlockOrUnblock(data) {
            $(".imloadDialog").fadeIn("1000");
            $('#btnConfirm').attr("disabled", true);
            appRoutes.controllers.Client.blockOrUnblockClient().ajax({
                data : JSON.stringify(data),
                contentType : 'application/json',
                success : function (data) {
                    $(".imloadDialog").fadeOut("1000");
                    $('#btnConfirm').attr("disabled", false);
                    $('#btnClose').click();
                    if(data.result == "ok"){
                        doShowSuccess(data.message);
                        getListClients();
                    }else {
                        doShowWarning(data.message);
                    }
                },
                error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                    if(objetExeption == "Unauthorized"){
                        $(location).attr('href',"/");
                    }
                    $(".imloadDialog").fadeOut("1000");
                    $('#btnConfirm').attr("disabled", false);
                    $('#btnClose').click();
                }
            });
        }

        function showRechForClient(page) {
                $(".imload").fadeIn("1000");
                $('#btnsearch').attr("disabled", true);
                $('#tbodyClients').html('');
                $('#pagingTop').html('');
                $('#pagingBottom').html('');
                $('#divPaginationhaut').empty();
                $('#divPaginationhaut').removeData("twbs-pagination");
                $('#divPaginationhaut').unbind("page");
                $('#divPagination').empty();
                $('#divPagination').removeData("twbs-pagination");
                $('#divPagination').unbind("page");

                $( "#dateDebut").datepicker( "option", "dateFormat", "yy-mm-dd" );
                $( "#dateFin").datepicker( "option", "dateFormat", "yy-mm-dd" );
                var debut = $('#dateDebut').val();
                var fin = $('#dateFin').val();
                var nom = $('#nomtf').val();
                var telephone = $('#telephonetf').val();
                var actifornot = $('#actifornot').val();
                var bankornot = $('#bankornot').val();
                var data = {
                    "debut": debut,
                    "fin": fin,
                    "telephone": telephone,
                    "nom": nom,
                    "actifornot": actifornot,
                    "bankornot": bankornot
                };

                appRoutes.controllers.Client.searchClient(page).ajax({
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (data) {
                    if (data.result == "ok") {

                        if(data.total == 0){
                            doShowWarning("Aucun client pour cette recharche.");
                        }

                        else{

                            var clients = data.clients;
                            var numLine = (data.per_page * data.current_page) - data.per_page;
                            if (data.current_page == -1){numLine = 0}
                            for (var i in clients) {
                                var html = '';
                                numLine += 1;
                                html += '<tr id="' + clients[i].compte + '">';
                                html += '<td>' + numLine + '</td>';
                                html += '<td class="telephoneCli" id="' + clients[i].tel + '">' + clients[i].tel + '</td>';
                                html += '<td class="prenomCli" id="' + clients[i].prenom + '">' + clients[i].prenom + '</td>';
                                html += '<td class="nomCli" id="' + clients[i].nom + '">' + clients[i].nom + '</td>';
                                html += '<input type="hidden" class="compte" id="' + clients[i].compte + '">';
                                html += '<input type="hidden" class="emailCli" id="' + clients[i].email + '">';
                                html += '<input type="hidden" class="adress" id="' + clients[i].adress + '">';
                                html += '<input type="hidden" class="solde" id="' + clients[i].solde + '">';
                                html += '<input type="hidden" class="dateDouverture" id="' + clients[i].dateDouverture + '">';
                                html += '<input type="hidden" class="typeClient" id="' + clients[i].typeClient + '">';
                                html += '<td> <button type="button" class=" btn btn-default btn-xs btn-details-client" data-toggle="modal" data-target="#pop-details-client">' + btnDetail + '</button></td>';
                                if ( (profilUser != profil_controle_permanent) &&
                                     (profilUser != profil_compliance) &&
                                     (profilUser != profil_rssi) ){
                                    html += '<td> <button type="button" class="reinitPass btn btn-default btn-xs" data-toggle="modal" data-target="#myModalConfirm">' + btnReinit + '</button> </td>';
                                    html += '<td> <button type="button" class="getContrat btn btn-default btn-xs">' + btnContrat + '</button> </td>';
                                }
                                if (clients[i].ntc == 0){
                                    html += '<td> <button type="button" class="block btn btn-danger btn-xs" data-toggle="modal" data-target="#myModalConfirm">' + btnBlock + '</button> </td>';
                                }
                                else{
                                    html += '<td> <button type="button" class="unblock btn btn-success btn-xs" data-toggle="modal" data-target="#myModalConfirm">' + btnDeblock + '</button> </td>';
                                }
                                html += '<td> <button type="button" id="CLient_'+ clients[i].compte +'" class="showJournalCli btn btn-default btn-xs btn-journal">' + btnJournal + '</button> </td>';

                                html += '</tr>';
                                $('#tbodyClients').append(html);

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
                                    showRechForClient(page);
                                }
                            });
                            $('#divPagination').twbsPagination({
                                totalPages: data.total_page,
                                visiblePages: 3,
                                startPage: page,
                                onPageClick: function (event, numPage2) {
                                    page = numPage2;
                                    showRechForClient(page);
                                }
                            });

                            $(".btn-details-client").click(function(){

                                $('#tel').html('');               $('#prenom_cli').html('');
                                $('#nom_cli').html('');           $('#email_cli').html('');
                                $('#adress_cli').html('');        $('#compte_cli').html('');
                                $('#solde_cli').html('');         $('#dateouv_cli').html('');
                                $('#type_cli').html('');

                                $('#tel').append($(this).parent().parent().children('.telephoneCli').attr('id'));
                                $('#prenom_cli').append($(this).parent().parent().children('.prenomCli').attr('id'));
                                $('#nom_cli').append($(this).parent().parent().children('.nomCli').attr('id'));
                                $('#email_cli').append($(this).parent().parent().children('.emailCli').attr('id'));
                                $('#adress_cli').append($(this).parent().parent().children('.adress').attr('id'));
                                $('#compte_cli').append($(this).parent().parent().children('.compte').attr('id'));
                                $('#solde_cli').append($(this).parent().parent().children('.solde').attr('id') + " XAF");
                                $('#dateouv_cli').append($(this).parent().parent().children('.dateDouverture').attr('id'));
                                var type = $(this).parent().parent().children('.typeClient').attr('id');
                                if(type == 1){
                                    $('#type_cli').append(labelClientPersonel);
                                }else if(type == 2){
                                    $('#type_cli').append(labelClientBank);
                                }else if(type == 3){
                                    $('#type_cli').append(labelClientNoBank);
                                }else if(type == 4){
                                    $('#type_cli').append(labelClientVIP);
                                }

                            });

                            $(".showJournalCli").click(function(){
                                var id = $(this).attr('id');
                                var sp = id.split('_');
                                $(location).attr('href', "/journalCptClient?compte=" + sp[1]);
                            });

                            $(".getContrat").click(function(){

                                var tel = $(this).parent().parent().children('.telephoneCli').attr('id');
                                var prenom = $(this).parent().parent().children('.prenomCli').attr('id');
                                var nom = $(this).parent().parent().children('.nomCli').attr('id');
                                var email = $(this).parent().parent().children('.emailCli').attr('id');
                                var adresse = $(this).parent().parent().children('.adress').attr('id');
                                var compte = $(this).parent().parent().children('.compte').attr('id');
                                var adhesion = $(this).parent().parent().children('.dateDouverture').attr('id');
                                var type = $(this).parent().parent().children('.typeClient').attr('id');

                                var url = "/client/contrat?tel=" + tel + "&prenom=" + prenom +
                                                    "&nom=" + nom + "&email=" + email + "&adresse=" + adresse +
                                                     "&compte=" + compte + "&adhesion=" + adhesion +
                                                     "&type=" + type ;

                                window.open(url, '_blank');


                            });

                            $(".reinitPass").click(function(){
                                telephoneClient = $(this).parent().parent().children('.telephoneCli').attr('id');
                                prenomClient = $(this).parent().parent().children('.prenomCli').attr('id');
                                nomClient = $(this).parent().parent().children('.nomCli').attr('id');
                                emailClient = $(this).parent().parent().children('.emailCli').attr('id');
                                action = "reinit";
                                $('#messageDialog').html('');
                                $('#messageDialog').append(labelMessageReinit + ' ' +
                                                            prenomClient + ' ' + nomClient + ' ?');
                            });

                            $(".block").click(function(){
                                compteClient = $(this).parent().parent().attr('id');
                                telephoneClient = $(this).parent().parent().children('.telephoneCli').attr('id');
                                prenomClient = $(this).parent().parent().children('.prenomCli').attr('id');
                                nomClient = $(this).parent().parent().children('.nomCli').attr('id');
                                emailClient = $(this).parent().parent().children('.emailCli').attr('id');
                                action = "Bloquage";
                                ntc = "5";
                                $('#messageDialog').html('');
                                $('#messageDialog').append( labelMessageBlock + ' ' +
                                                            prenomClient + ' ' + nomClient + ' ?');
                            });

                            $(".unblock").click(function(){
                                compteClient = $(this).parent().parent().attr('id');
                                telephoneClient = $(this).parent().parent().children('.telephoneCli').attr('id');
                                prenomClient = $(this).parent().parent().children('.prenomCli').attr('id');
                                nomClient = $(this).parent().parent().children('.nomCli').attr('id');
                                emailClient = $(this).parent().parent().children('.emailCli').attr('id');
                                action = "Debloquage";
                                ntc = "0";
                                $('#messageDialog').html('');
                                $('#messageDialog').append(labelMessageDeblock + ' ' +
                                                            prenomClient + ' ' + nomClient + ' ?');
                            });

                        }



                    } else if (data.result == "nok") {
                        doShowWarning(data.message);
                    }

                    $(".imload").fadeOut("1000");
                    $('#btnsearch').attr("disabled", false);
                },
                error: function (xmlHttpReques, chaineRetourne, objetExeption) {
                    if (objetExeption == "Unauthorized") {
                        $(location).attr('href', "/");
                    }
                    $(".imload").fadeOut("1000");
                    $('#btnsearch').attr("disabled", false);
                }
            });

        }

        function afficher_search(){
            $( "#dateDebut").datepicker( "option", "dateFormat", "yy-mm-dd" );
            $( "#dateFin").datepicker( "option", "dateFormat", "yy-mm-dd" );
            var debut = $('#dateDebut').val();
            var fin = $('#dateFin').val();
            var nom = $('#nomtf').val();
            var telephone = $('#telephonetf').val();
            var actifornot = $('#actifornot').val();
            var bankornot = $('#bankornot').val();
            if (debut == '' && fin == '' && telephone == ''
                && nom == '' && actifornot == '' && bankornot == ''){
                 doShowError("Veuillez saisir au moins un paramètre de recherche !!!");
            }
            else{
                showRechForClient();
            }
        }


        $("#btnsearch").click(function () {
            afficher_search();
        });


        $('#nomtf').keydown(function( event ) {
            if(event.keyCode == 13){
                afficher_search();
            }
        });
        
        $('#telephonetf').keydown(function( event ) {
            if(event.keyCode == 13){
                   afficher_search();
            }
        });

        $("#exportPDF").click(function(){
            $( "#dateDebut").datepicker( "option", "dateFormat", "yy-mm-dd" );
            $( "#dateFin").datepicker( "option", "dateFormat", "yy-mm-dd" );
            var debut = $('#dateDebut').val();
            var fin = $('#dateFin').val();
            var actifornot = $('#actifornot').val();
            var bankornot = $('#bankornot').val();
            window.location.href = "/bgfimoney/export/clients?typeExport=pdf&debut=" + debut + "&fin=" + fin + "&actifornot=" + actifornot + "" + "&bankornot=" + bankornot + "";
            return false;
        });

        $("#exportXLS").click(function(){
            $( "#dateDebut").datepicker( "option", "dateFormat", "yy-mm-dd" );
            $( "#dateFin").datepicker( "option", "dateFormat", "yy-mm-dd" );
            var debut = $('#dateDebut').val();
            var fin = $('#dateFin').val();
            var actifornot = $('#actifornot').val();
            var bankornot = $('#bankornot').val();
            window.location.href = "/bgfimoney/export/clients?typeExport=xls&debut=" + debut + "&fin=" + fin + "&actifornot=" + actifornot + "" + "&bankornot=" + bankornot + "";
            return false;
        });

});