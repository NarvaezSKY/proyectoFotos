const formulario = document.getElementById('formulario')
const listaTweets= document.getElementById('lista-tweets')


let tweets=[]

// los listeners y tal:
eventListeners();

function eventListeners(){
formulario.addEventListener('submit', agregarTweet)
document.addEventListener('DOMContentLoaded', ()=>{
    tweets=JSON.parse(localStorage.getItem('tweets'))||[];
    console.log(tweets)
    crearHTML()
})
}
// las funciones y tal:


function agregarTweet(e){
    e.preventDefault();
    const tweet= document.getElementById('tweet')
    const imagen=tweet.files[0]
    
    if (!imagen){
        mostrarError('Por favor, selecciona una imagen');
        return;
    }

    const tweetObj={
        id:Date.now(), 
        imagen:URL.createObjectURL(imagen), 
    }
        
    

    tweets=[...tweets,tweetObj]
    crearHTML();
    formulario.reset();
    // console.table(tweets)
}


function mostrarError (error){
    const mensajeError=document.createElement('p');
    mensajeError.textContent=error;
    mensajeError.classList.add('error')

    const contenido=document.getElementById('contenido')
    contenido.appendChild(mensajeError)

    setTimeout(()=>{
        mensajeError.remove();},2000)
    
}


function crearHTML(){
    limpiarHTML();
    if (tweets.length>=0){
        

        tweets.forEach((imagen)=>{
            const botonBorrar=document.createElement('a')
            botonBorrar.classList='borrar-tweet'
            botonBorrar.innerText='X'
            botonBorrar.style.fontSize="80px"
            
        
            const corazon=document.createElement('img')
            corazon.style.width="60px"
            corazon.src="https://cdn-icons-png.flaticon.com/128/6381/6381251.png"
          
            corazon.addEventListener('click',()=>   {
                corazon.src="https://cdn-icons-png.flaticon.com/128/5683/5683041.png"
                
            })
            
            
            botonBorrar.onclick=()=>{
                borrarTweet(imagen.id);
            }
           
            const li=document.createElement('img')   
            
            li.src=imagen.imagen
            li.style.width="200px"
            li.style.height="200px"

            const mg=document.createElement('p')
                
                
            listaTweets.appendChild(li);
            listaTweets.appendChild(botonBorrar)
            listaTweets.appendChild(corazon)
            listaTweets.appendChild(mg)


            const titulo=document.createElement('h2')
            titulo.textContent="sexo"
            


            let contarlike=0;
            corazon.addEventListener('click',()=>{
                contarlike++;
                mostarlike(contarlike)
            })

            function mostarlike(){
                mg.textContent= `Likes: ${contarlike}`
            }


        })
    }
    agregarStorage();
}


function limpiarHTML(){
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstElementChild)
    }
}


function agregarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

function borrarTweet(id){
    tweets=tweets.filter(imagen=>imagen.id!==id)
    crearHTML()
}


