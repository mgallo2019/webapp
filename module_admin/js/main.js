$(document).ready(function(){

    checkLocalStorage();

    setInitial();      

    //el conditional... se tendria que pasar a diferentes.. file js
    if (window.location.href.indexOf('index') > -1)
      loadPosts();

    //activar los listener
    changeTema();//esto tambien podria estar.. si se LOGUEA! 

    scroll();

    managementOpenSesion();


    if (window.location.href.indexOf('about') > -1){
      $('#acordeon').accordion({
        classes: {
          "ui-accordion": "highlight"
        }
      });
    }


    if (window.location.href.indexOf('reloj') > -1){
      
      setInterval(function(){
        var reloj = moment().format("hh:mm:ss");
        $('#reloj').html(reloj);
      },1000);
      
    }


    //validacion
    if (window.location.href.indexOf('contacto') > -1){
    
      $('form #fecha').datepicker({
        dateFormat: 'dd-mm-yy'
      });

      $.validate({
        lang: 'es',
        /*PARA CUSTOM ERRORS*/
        errorMessagePosition: 'top',
        scrollToTopOnError : true // Set this property to true on longer forms
      });

    }



  });



  function setInitial(){

    loadDefaultTheme();
    
    if (window.location.href.indexOf('index') > -1){
      $('.bxslider').bxSlider({
          
        mode:'fade',

        captions: false,
        slideWidth: 1200,
        responsive:true,

        controls:true,
        auto:true,
        speed:800,
        pause:2500,

      });
    }
    //agregado por mi... yo no quiero QUITAR el maquetado de origen... del
    //hmtl asi que intento BORRARLO en tiempo de ejecucion..
    $('#articulo').hide();


  }

  function loadDefaultTheme(){

    var theme = $('#theme'); 
    var Initheme = localStorage.getItem("tema");

    //se que va a a ver 1 SOLO item..
    if (checkLocalStorageItems(Initheme)){
      theme.attr("href",Initheme);
    }
    else{
      theme.attr("href","css/green.css");
    }

  }


  function checkLocalStorage(){

     //compatibilidad con navegador? local storage
    if (typeof(Storage) != 'undefined'){
        console.log("Disponible");
    }else{
        console.log("NO Disponible");
    }

  }


  function loadPosts(){
    
    //Listado de post almacenado en un json y mostrado dinámicamente
    //lo ideal seria tener el API REST con estos datos..??
    var idArti = 0;

    var articulos = [
      {
        title: "Prueba de Titulo 1",
        //date: new Date(),
        date: moment().format('MMMM Do YYYY'),
        content: "Sed cursus lacus non nibh rhoncus convallis. Nulla vehicula augue at ex hendrerit aliquam. Nulla faucibus lorem id sem auctor, nec condimentum ante dignissim. Mauris eget ultrices turpis. Phasellus ut lectus in ligula rhoncus tempus. In hac habitasse platea dictumst. Nullam dignissim diam nec lectus aliquet, at fringilla metus vestibulum. Nulla non dolor semper, congue tortor ut, euismod arcu. Praesent sed rhoncus est, eget malesuada metus. "
      },
      {
        title: "Prueba de Titulo 2",
        date: moment().format('MMMM dddd YYYY'),
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc imperdiet, massa nec sagittis sollicitudin, eros lacus sagittis sem, ac blandit diam augue malesuada leo. Proin eu neque id ante tempor commodo sed sit amet risus. Sed vel mauris eget mi varius pellentesque. Praesent sit amet dictum arcu. Nunc congue pharetra metus, a viverra diam consequat placerat. Suspendisse ultricies pulvinar nulla a sagittis. Morbi eu mauris vulputate, sodales felis a, tincidunt ex. Aliquam quam mauris, iaculis et volutpat at, convallis consectetur elit. Fusce id finibus libero. Donec eget eros quis ligula semper varius eget id orci. Duis venenatis sodales nisl, at finibus risus gravida eget. Aliquam et neque vel lectus convallis condimentum. Donec vehicula libero vitae sapien hendrerit, vel consectetur urna rutrum. Etiam auctor pulvinar elit, at bibendum lectus suscipit eu. Phasellus purus dolor, ullamcorper vitae felis ac, rutrum molestie ipsum. "
      },
      {
        title: "Prueba de Titulo 3",
        date: moment().format('MMMM Do YYYY'),
        content: "Sed cursus lacus non nibh rhoncus convallis. Nulla vehicula augue at ex hendrerit aliquam. Nulla faucibus lorem id sem auctor, nec condimentum ante dignissim. Mauris eget ultrices turpis. Phasellus ut lectus in ligula rhoncus tempus. In hac habitasse platea dictumst. Nullam dignissim diam nec lectus aliquet, at fringilla metus vestibulum. Nulla non dolor semper, congue tortor ut, euismod arcu. Praesent sed rhoncus est, eget malesuada metus. "
      },
      {
        title: "Prueba de Titulo 4",
        date: moment().format('MMMM Do YYYY'),
        content: "Nam laoreet elementum erat at vestibulum. Donec sit amet urna sed dui sagittis efficitur eu vitae lacus. Morbi varius mattis massa, ut blandit enim sagittis vel. Pellentesque facilisis arcu a pretium pulvinar. Vivamus ultricies dolor elit. Integer feugiat, neque pharetra porta viverra, est ex hendrerit ipsum, laoreet imperdiet felis urna non libero. In posuere, nisi sit amet tempor malesuada, risus ante vulputate metus, eu dignissim risus nibh in urna. Maecenas ullamcorper ut lorem in consequat. Etiam suscipit enim sem, quis pulvinar justo rutrum at. Phasellus suscipit blandit auctor.  "
      },
    ]

    articulos.forEach((item, index) => {

      //usa una plantilla se podria hacer linea a linea... con un create.. & append
      idArti += 1;
        
      var post = `
        <article id="articulo${idArti}" class="post">
                      
                      <hgroup>
                          <h2> ${item.title} </h2> 
                      </hgroup>
                      
                      <span class="date"> Publicado el ${item.date}</span>
                  
                      <p id="cuerpoParrafo${idArti}"> 
                        ${item.content}
                      </p>
              
                      <a href="#" class="buttonMore">Leer Mas</a>
                  </article>

        `;

      $('#content').append(post);

    });


    //si no se usa plantilla JAVA
    //o en forma de tener una plantilla en el HTML
    //hacer un clone en JS y sobre ese clone meter los codigo.
    //pero usando la plantlla como se hace aca es mas facil y mas sencilla y eficiente.

  }



  function changeTema(){

    //cambiar temas:
    //se hace o cambiando cada objeto y cambiando su color
    //o intercambiando CSS
    var theme = $('#theme'); 

    $('#toGreen').click(function(){
      theme.attr("href","css/green.css");
      localStorage.setItem("tema","css/green.css");
    });
    
    $('#toRed').click(function(){
      theme.attr("href","css/red.css");
      localStorage.setItem("tema","css/red.css");
    });

    $('#toBlue').click(function(){
      theme.attr("href","css/blue.css");
      //lo pisa.. es unico el key
      localStorage.setItem("tema","css/blue.css");
    });

  }

function scroll(){

  $('#scroll').click(function(e){
    
    e.preventDefault();//para que se vaya a otra pagina sino que quede en la misma

     $('html, body').animate({
        scrollTop: 0
     }, 500);

     return false;

    });

}


function checkLocalStorageItems(valor){
  
  if (valor != null && valor != "undefined")
    return true;
  else
    return false;

}


function managementOpenSesion(){

  $('#login form').submit(function (e) { 
    e.preventDefault();

    var form_name = $('#form_name').val();
    localStorage.setItem("form_name",form_name);
    
    managementCloseSesion();
  });

}


function managementCloseSesion(){

  var form_name = localStorage.getItem("form_name");
  if (checkLocalStorageItems(form_name)){
    var about = $('#about p');

    about.html("<br><strong>Bienvenido: " + form_name+"<strong>");
    about.append("<a href='#' id='logout'> Cerrar Sesion</a>");
    $('#login').hide();
  }

  $('#logout').click(function(){
    localStorage.clear();
    location.reload();
  });

}