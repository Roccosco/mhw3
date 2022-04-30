const RESULTS_MAP = {
    'scalatore': {
        title: 'Scalatore',
        contents: "La salita non fa paura. Sei il tipo di persona che prende la bici e in un giretto deve fare almeno 1000 metri di dislivello altrimenti non è felice. Ti emozioni sulle strade rivivendo le sensazioni dei grandi della storia.",
    },
    'velocista': {
        title: 'Velocista',
        contents: "Ti piace la velocità pura. Ami staccare tutti gli altri al cavalcavia o in una volata improvvisata. Se sfidi un avversario degno della tua condizione fisica è ancora meglio. ",
    },
    'passcalatore': {
        title: 'Passista-scalatore',
        contents: "Al diavolo gli scatti, il tuo obiettivo è terminare la salita nel minor tempo possibile con un ritmo costante. Sai gestire le energie e non vai mai in crisi. Sei una vera e propria macchina per macinare km di salita!",
    },
    'pasvelocista': {
        title: 'Passista-velocista',
        contents: "Lo scatto è il tuo punto di forza, ma quanto c'è da faticare a lungo non ti tiri indietro. Ti armi di coraggio e percorri lunghe distanze in compagnia solamente di te stesso. Se dovessi gareggiare in uno sprint con un gruppetto avresti ottime possibilità di vittoria.",
    },
    'cronoman': {
        title: 'Cronoman',
        contents: "Tic tac. Il tempo è il tuo amico/nemico. Indossi la tuta più aero, cambi le ruote ventricolari e cerchi di migliorare i tuoi record. Hai bisogno solamente della giusta concentrazione e fiducia in te stesso, tutto ciò che desideri è fattibile, basta fare i giusti sacrifici per abbassare il tuo record di qualche secondo.",
    },
    'ciclocrossman': {
        title: 'Ciclocrossman',
        contents: "Sei il tipo di ciclista che quando vede una stradina non asfaltata o un po' di terra non riesce a resistere e abbandona l'asfalto. Ami il rischio e perdere momentaneamente l'equilibrio per ritrovarlo subito dopo guadagnando anche una dose di adrenalina. Continua a percorrere strade non ancora battute da nessuno!",
    },
    'gregario': {
        title: 'Gregario',
        contents: "Il tuo spirito di sacrificio per gli altri ti nobilita. Non importa la tipologia di percorso, il tuo aiuto sarà prezioso, sempre. Tutti sognano di avere un compagno come te in gruppo e ovunque andrai sarai rispettato da tutti. ",
    },
    'succhiaruote': {
        title: 'Succhiaruote',
        contents: "Il tuo obiettivo in bici è risparmiare energie. Ti piace far faticare gli altri per aprirti la scia e risparmiare quei preziosissimi Watt. Attenzione a non esagerare, in un gruppetto devi farti furbo e trovare la giusta strategia per stare in testa al gruppo il meno possibile senza farti accorgere. ",
    },
    'merckx': {
        title: 'Il nuovo Merckx',
        contents: "Hai tutte le carte in tavola per diventare un Campione, quello di altri tempi. Non segui le solite convenzioni: non sei uno scalatore, un velocista o un cronoman. Tu sei tu. Se continui a faticare i successi arriveranno, hai la stoffa del campione!",
    }
};

const Ciclisti = {
    'scalatore': {
        "nome": "Marco Pantani",
        "stravaID": null
        },
    'velocista': {
        "nome": "André Greipel",
        "stravaID": '384548'
        }, 
    'passcalatore':  {
        "nome": "Vincenzo Nibali", 
        "stravaID": '8842341'
        },
    'pasvelocista':  {
        "nome": "Peter Sagan",
        "stravaID": null
        },
    'cronoman':  {
        "nome": "Filippo Ganna", 
        "stravaID": '3574069'
        },
    'ciclocrossman':  {
        "nome": "Mathieu van der Poel", 
        "stravaID": '559834'
        },
    'gregario':  {
        "nome": "Michele Scarponi", 
        "stravaID": null
        },
    'succhiaruote':  {
        "nome": "Nairo Quintana", 
        "stravaID": null
        },
    'merckx':  {
        "nome": "Tadej Pogacar",
        "stravaID": '6021015'
    }
};


// const endpointStrava = "https://www.strava.com/api/v3/athletes/";
const endpointOpenWeather = "http://api.openweathermap.org/geo/1.0/direct?limit=1&q=";
const apikeyWheater ="8cb1fae005dd98c07a808f8af72e561b";

const endpointStrava = "https://www.strava.com/api/v3/segments/explore?activity_type=riding&min_cat=0&max_cat=4&bounds=";

const endpointWiki = "https://it.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exchars=500&origin=*&titles=";

const endpointStravaOauth = "https://www.strava.com/oauth/token";