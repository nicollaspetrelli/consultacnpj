$(document).ready(function () { 
  jQuery.validator.setDefaults({
    errorPlacement: function(error, element) {
        if ($('#cnpj-error').length) {
          return false
        }
        error.appendTo('#validation_error_message');
    }
  });

  //$('#cep').mask('00000-000', {reverse: false});
  $('#cnpj').mask('00.000.000/0000-00', {reverse: false});

  $('form').validate({
    rules: {
        cnpj: {
            cnpjBR: true // Método do additional-methods
        }
    }
  })
});

$("#cnpj").blur(function (e) {
    var cnpj = $("#cnpj").val() || ''

    cnpj = cnpj.replace('/', '')
    cnpj = cnpj.replace('-', '')
    cnpj = cnpj.replace('.', '')
    cnpj = cnpj.replace('.', '')

    if (cnpj.length > 14) {
        alert('CNPJ tem mais de 12 números!')
        return
    }

    if ($('form').valid()) {
      buscaCNPJ(cnpj)
      $('#validation_error_message').html('')
    }

})

function buscaCNPJ(cnpj) {
    if (!cnpj) {
        return
    }

    var url = 'https://www.receitaws.com.br/v1/cnpj/' + cnpj 

    $.ajax({
        url: url,
        dataType: "jsonp",
        type: "GET",
        jsonpCallback: 'processJSONPResponse',
        contentType: "application/json; charset=utf-8",
        success: function(result, status, xhr) {
          //console.log(result); // Debug
          preencheCampos(result);
        },
        error: function(xhr, status, error) {
          console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });
}

function preencheCampos(dados) {
    $('#socialname').val(dados.nome)
    $('#brandname').val(dados.fantasia)
    $('#street').val(dados.logradouro)
    $('#number').val(dados.numero)
    $('#complement').val(dados.complemento)
    $('#district').val(dados.bairro)
    $('#zipcode').val(dados.cep)
    $('#city').val(dados.municipio)
    $('#UF').val(dados.uf)
    $('#email').val(dados.email)
    $('#telephone').val(dados.telefone)
}

function copiar(input){
  var copyText = document.getElementById(input);
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  document.execCommand("copy");
}

function copyJson(){
    var text = JSON.stringify($('form').serializeArray());
    $("#copyJson").show().val(text)[0].select();
    document.execCommand("copy");
    $("#copyJson").hide();
    alert("JSON Copiado: " + text);
}