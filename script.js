let risposte = [];
let stravaToken = "";

function ricominciaQuiz() {
    risposte = [];

    for(let risposta of risposteDiv) {
        risposta.classList.remove('selezionato');
        risposta.classList.remove('nonSelezionato');
        risposta.addEventListener('click', selezionaRisposta)
        risposta.querySelector('.checkbox').src="images/unchecked.png";
    }

    document.querySelector("#info").classList.add("hidden");

    const divRicomincia = document.querySelector('.risposta');
    divRicomincia.classList.add('hidden');

    document.querySelector('body').scrollTop=0;
    document.querySelector('html').scrollTop = 0;
}

function getInfoCiclista(indexArray){

    const nome = encodeURIComponent(Ciclisti[indexArray].nome);

    let endpoint= endpointWiki + nome;

    fetch(endpoint).then((risposta) => 
    {
        if(risposta.ok)
            return risposta.json();
    }).then((json)=>{
        for(const pageID in json.query.pages){
            const pagina=json.query.pages[pageID];

            document.querySelector("#infoNome").innerHTML = pagina.title;
            document.querySelector("#infoWiki").innerHTML = pagina.extract;
        }
    });

}

function selezionaRisposta(event){
    const selezionato = event.currentTarget;

    const question = selezionato.dataset.questionId;
    let questionNumber = 0;
    switch(question){
        case 'one':
            questionNumber = 0;
            break;
        case 'two':
            questionNumber = 1;
            break;
        case 'three':
            questionNumber = 2;
            break;
    }

    if(risposte[questionNumber] === undefined){
        for(let risposta of risposteDiv)
            if(risposta.dataset.questionId == question && risposta!== selezionato)
                risposta.classList.add('nonSelezionato');

        document.querySelector("#info").classList.remove("hidden");

        selezionato.classList.add('selezionato');
        selezionato.querySelector('.checkbox').src="images/checked.png";
    }
    else{
        for(let risposta of risposteDiv)
            if(risposta.dataset.questionId == question && risposta.dataset.choiceId == risposte[questionNumber]){
                risposta.classList.add('nonSelezionato');
                risposta.classList.remove('selezionato');
                risposta.querySelector('.checkbox').src="images/unchecked.png";
                break;
            }

        selezionato.classList.remove('nonSelezionato');
        selezionato.classList.add('selezionato');
        selezionato.querySelector('.checkbox').src="images/checked.png";
    }

    if(risposte[questionNumber] !== selezionato.dataset.choiceId){
        risposte[questionNumber] = selezionato.dataset.choiceId;
        
        if(questionNumber==0)
            getInfoCiclista(selezionato.dataset.choiceId);
    }

    checkFine();
}

function checkFine(){
    let risposteDate = 0;
    for (let risposta of risposte)
        if(risposta !== undefined)
            risposteDate++;

    if(risposteDate == 3){
        for(let risposta of risposteDiv) {
            risposta.removeEventListener('click', selezionaRisposta);
        }

        let vincitore = risposte[0];
        if(risposte[1] == risposte[2])
            vincitore = risposte[1];

        const divRicomincia = document.querySelector('.risposta');
        divRicomincia.classList.remove('hidden');
        divRicomincia.querySelector('h1').textContent = RESULTS_MAP[vincitore].title;
        divRicomincia.querySelector('p').textContent = RESULTS_MAP[vincitore].contents;
    }
}

function getStravaToken(){
    fetch(endpointStravaOauth, {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            client_id: "82817",
            client_secret: "9a7109a4969d1e1be29ef1170abc4f834b1e33d8",
            refresh_token: "76ffc606521b9e2b247447d3a8afa884663f1c14",
            grant_type: "refresh_token"
        })
    }).then((res) => res.json()).then((json) => stravaToken = json.access_token);
}

function searchCitta(event){
    
    event.preventDefault();

    const paragraphCitta = document.querySelector('#infoCitta');
    const nomeCitta = document.querySelector('#nomeCitta');

    endpoint = endpointOpenWeather + encodeURIComponent(document.querySelector('#citta').value) + "&appid=" + apikeyWheater;

    fetch(endpoint).then((risposta) => 
    {
        if(risposta.ok)
            return risposta.json();
    }).then((json)=>{
        if(json.length>0){
            paragraphCitta.innerHTML = json[0].country + " latitudine:" + json[0].lat + "; longitudine:" + json[0].lon;
            nomeCitta.innerHTML = json[0].name

            searchSegmenti(json[0]);
        }
        else
            paragraphCitta.innerHTML = "Errore: non esiste una città con questo nome";
    });
}

function searchSegmenti(citta){
    const southWestLat = citta.lat - 0.05;
    const southWestLon = citta.lon - 0.05;
    const northEstLat = citta.lat + 0.05;
    const northEstLon = citta.lon + 0.05;
    const bound = southWestLat + ","+southWestLon+"," + northEstLat + "," + northEstLon;

    const contenitore = document.querySelector(".segmenti div");
    contenitore.innerHTML= "";

    endpoint = endpointStrava + encodeURIComponent(bound) + "&access_token=" + stravaToken;

    fetch(endpoint).then((risposta) => 
    {
        if(risposta.ok)
            return risposta.json();
    }).then((json)=>{
        if(json.segments.length>0){
            for(let segment of json.segments){
                let item = document.createElement('div');
                item.classList.add('segmento');

                let image = document.createElement('img');
                image.src = segment.elevation_profile;
                image.classList.add('imgsegmento');

                let title = document.createElement('h3');
                title.innerHTML = segment.name;

                let list = document.createElement('ul');
                list.classList.add('lissegmento');

                let dist = document.createElement('li');
                dist.innerHTML = "Lunghezza: " + segment.distance + "m";
                list.appendChild(dist);

                let dislivello = document.createElement('li');
                dislivello.innerHTML = "Dislivello: " + segment.elev_difference + "m";
                list.appendChild(dislivello);

                let percentuale = document.createElement('li');
                percentuale.innerHTML = "Pendenza: " + segment.avg_grade + "%";
                list.appendChild(percentuale);
                
                item.appendChild(title);
                item.appendChild(image);
                item.appendChild(list);

                contenitore.appendChild(item);

                console.log(segment);
            }
        }
        else
            console.log("Errore");
    });
}

const buttonRicomincia = document.querySelector('.risposta button');
buttonRicomincia.addEventListener('click', ricominciaQuiz);

const risposteDiv = document.querySelectorAll(".choice-grid div");
for(let risposta of risposteDiv) {
    risposta.addEventListener('click', selezionaRisposta);
}

const form = document.querySelector('form');
form.addEventListener('submit', searchCitta);

getStravaToken();