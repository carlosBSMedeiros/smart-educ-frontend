import Swal from 'sweetalert2'

export var succesLoginAlert = Swal.mixin({
    icon: 'success',
    title: 'Login efetuado com sucesso!',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export var errorLoginAlert = Swal.mixin({
    icon: 'error',
    showConfirmButton: true,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export var fimSessaoTimeout = Swal.mixin({
    icon: 'warning',
    showConfirmButton: true,
})

export var carregando = Swal.mixin({
    title: 'Aguarde...',
    backdrop: true,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    },
})

export var erroGenericoBuilder = {
    build: function(erros:string[]){
        var errosHtml = "" 
        erros.forEach(erro=>{
            errosHtml += erro + "<br>"
        })

        return Swal.mixin({
            icon: 'error',
            title: "Algo não deu certo!",
            html: errosHtml,
        })
    },
    buildStr: function(erro:string){
        return Swal.mixin({
            icon: 'error',
            title: "Algo não deu certo!",
            html: erro,
            timer: 10000
        })
    }
}

//#region toastr

export var toastrSucessoBuilder = {
    build: function(titulo:string){
        var toastr  = Swal.mixin({
            toast: true,
            title: titulo,
            icon: 'success',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
        return toastr
    }
}

//#endregion

