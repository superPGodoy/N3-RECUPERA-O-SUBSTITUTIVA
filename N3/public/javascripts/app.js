var table = null;

$(document).ready(function() {
    $('#inserirDados').submit(function(){
        inserirDados();
        return false;
    });

    table = $('#myTable').DataTable( {
        'language': {
            'url': '/javascripts/dt_pt.json'
        },
        "order": [[ 0, "desc" ]],
        ajax: {
            url: "/C_cerveja/",
            dataSrc: "data"
         },
         "columns": [
            { "data": "_id", 'title':'ID' },
            { "data": "Data", 'title':'Data' },
            { "data": "Temperatura Media (C)", 'title':'Temperatura media' },
            { "data": "Temperatura Minima (C)", 'title':'Temperatura minima' },
            { "data": "Temperatura Maxima (C)", 'title':'Temperatura maxima' },
            { "data": "Final de Semana", 'title':'Final de semana' },
            { "data": "Consumo de Cerveja", 'title': 'Consumo' },
            {
                data: null,
                title: 'Remover',
                render: function ( _data, _type, row ) {
                    return '<button class="btn btn-danger" onclick="removerDado(\'' + row._id +'\');">Remover</button>';
                }
            }
        ]
    } );
});

function removerDado(id){
    $.ajax({
        url: '/C_cerveja/' + id,
        type: 'DELETE',
        success: function(_response) {
            table.ajax.reload();
        }
     });
}

function inserirDados(_id){
    Dado = {
        'Data': $('#Data').val(),
        'Temperatura Media (C)': $('#Temperatura_Media').val(),
        'Temperatura Minima (C) acid': $('#Temperatura_Minima').val(),
        'Temperatura Maxima (C)': $('#Temperatura_Maxima').val(),
        'Final de Semana': $('#Final_de_Semana').val(),
        'Consumo de Cerveja': $('#Consumo_de_Cerveja').val(),
    };
    console.log(JSON.stringify(Dado));
    $.ajax({
        url: '/C_cerveja/',
        type: 'POST',
        data: Dado,
        success: function(_response) {
            table.ajax.reload();
            $('#inserirDado input').val('');
            $('#inserir').hide();

        }
     });

}


