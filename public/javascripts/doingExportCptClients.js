/**
 * Created by MOMBOY on 05/02/2015.
 */
$(document)
    .ready(
    function (e) {

        console.log("Ancien lien PDF = " + $('#btn_export_PDF_JPivo').attr("href"));

        initialExportLink_PDF = $('#btn_export_PDF_JPivo').attr("href");

        initialExportLink_XLS = $('#btn_export_XLS_JPivo').attr("href");

        function getParamReche() {
            var dateDebut = $('#datedebut').val();
            var dateFin = $('#datefin').val();
            var idNatOp = $('#sel_natureOperation option:selected').text()

            var idNatOpVal = $('#sel_natureOperation').val()

            if (dateDebut == "") {
                dateDebut = "--";

            }
            if (idNatOpVal == "") {
                idNatOp = "--";

            }

            var param = dateDebut + "@" + dateFin + "@" + idNatOp;

            var newLinkForExport_PDF = initialExportLink_PDF + param;
            var newLinkForExport_XLS = initialExportLink_XLS + param;

            $('#btn_export_PDF_JPivo').attr("href", newLinkForExport_PDF);

            $('#btn_export_XLS_JPivo').attr("href", newLinkForExport_XLS);

            console.log("nouvau lien XLS = " + newLinkForExport_XLS);
            console.log("nouvau lien PDF = " + newLinkForExport_PDF);

        }

        $('.getParamReche').click(
            function (e) {
                getParamReche();

            });

    });
