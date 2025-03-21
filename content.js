
var settings =
{ 
    title: "*Relatório de Inspeção Técnica*",
    areaTitle: "Talhão",
    varietyTitle: "Material",
    fenologyTitle: "Estádio Fenológico",
    daeTitle: "Dias Após Emergência",
    plaguesTitle: "*Pragas*",
    diasesTitle: "*Doenças*",
    herbsTitle: "*Plantas Daninhas*",

    // UI
    windowTitle: "Novo Relatório - Safra Algodão 25",
    clipboardPlaceholder: "Copiar",
    copiedDialogBox: "Relatório copiado para a área de transferência!",

}


let placeholderRules =
[
    ["is Lagartas", (string) => string.split(" ")[1] == "Lagartas"],
    ["is Encontradas", (string) => string.split(" ")[1] == " encontradas"],
    ["is blank line'.'", (string) => string == ""],
    ["is stand", (string) => string == "Stand"],
    ["ends with ')'", (string)=> string.split("").splice(-1) == "²"],
    ["ends with ')'", (string)=> string.split("").splice(-1) == ")"]
    // ["is stand", (string) => string == "Metro"],
    // ["is stand", (string) => string == "Ha"],
    // ["is stand", (string) => string == "Ocorrências não encontradas"]

]

var path = 
{ 
    plagueRootElement: "#root > section > section > main > div > div.st-timeline-side-bar > div > div.st-timeline-area-day-info-content > div.st-timeline-area-day-info-main > div.st-timeline-area-day-info-day-contents > div > div > div.ant-collapse-content.ant-collapse-content-active > div > div.st-grid-row-2.st-timeline-area-day-info-monitoring-header-phenomena > div > div:nth-child(4)",
    areaName: "#root > section > section > main > div > div.st-timeline-side-bar > div > div.st-timeline-area-day-info-content > div.st-timeline-area-day-info__header-container > div:nth-child(3) > div > div.st-timeline-area-day-info__area-title__name-wrapper > div.st-timeline-area-day-info__area-title__name > div > span",
    areaFenology: "#root > section > section > main > div > div.st-timeline-side-bar > div > div.st-timeline-area-day-info-content > div.st-timeline-area-day-info-main > div.st-timeline-area-day-info-detail > div.st-timeline-area-day-info-detail__tags > span:nth-child(1) > span",
    areaDae: "#root > section > section > main > div > div.st-timeline-side-bar > div > div.st-timeline-area-day-info-content > div.st-timeline-area-day-info-main > div.st-timeline-area-day-info-detail > div.st-timeline-area-day-info-detail__tags > span:nth-child(2) > span",
    areaVariety: "#root > section > section > main > div > div.st-timeline-side-bar > div > div.st-timeline-area-day-info-content > div.st-timeline-area-day-info-main > div.st-timeline-area-day-info-detail > div.st-timeline-area-day-info-detail__area-variety > div.st-timeline-area-day-info-detail__area-variety__seeds__container > span",
    plagueName: "div:nth-child(1)> div:nth-child(2) > span:nth-child(1)",
    plagueDataContainer: "div",
    plagueDataLabel: "div > div:nth-child(2) > div > div > div:nth-child(2)> span:nth-child(1)",
    plagueDataContent: "div > div:nth-child(2) > div > div > div:nth-child(2) > div > span"
}


var relatoryStructure =
[
    [settings.title,        ""  ,  ""],
    [settings.areaTitle,    ": ",  getAreaLabel],
    [settings.varietyTitle, ": ",  getVariety],
    [settings.fenologyTitle,": ",  getFenology],
    [settings.daeTitle,     ": ",  getDae],
    ["",                    ""  ,  ""],
    [plagueAsText,              "" ,  ""],
    [diasesAsText,                    ""  ,  ""],
    [herbsAsText,""  ,  ""]
]

var termDictionary =
[
    // diases dictionary
    ["plague", ["Evolução do algodão", "Helicoverpa", "Pulgões", "Lagarta elasmo", "Lagarta-da-soja", "Vaquinha Metálica", "Spodoptera albula", "Spodoptera cosmiodes", "Spodoptera eridania","Tripes", "Percevejo-marrom", "Pulgão","Percevejo manchador", "Percevejo-barriga-verde", "Percevejo-asa-preta", "Percevejo acrosterno", "Percevejo pequeno", "Percevejo-verde", "Pulgão Parasitado", "Caramujo", "Lagarta Militar" , "Ácaro-rajado", "Aranhas predadoras", "Beauveria bassiana", "Calosoma sp.", "Campoletis spp.", "Cascudinho da soja", "Cascudinho-verde", "Catolaccus grandis", "Lagarta-falsa-medideira", "Cigarrinha da pastagem", "Cigarrinha-do-milho", "Cochonilha", "Condylostylus sp.", "Dano por Ratos", "Euplectrus spp.", "Formiga", "Gafanhoto", "Geocoris spp.", "Grilo/Saltão", "Joaninha", "Larva de syrphidae", "Larva-minadora", "Libélula", "Lixeiro predador", "Louva-a-deus", "Lysiphlebus testaceipes", "Mariposas em geral", "Metarhizium anisopliae", "Mosca parasitoide", "Mosca-branca", "Nabis sp.", "Nematóide", "Nematoide da Haste Verde / Soja Louca II", "Nematóide Das Lesões", "Nematóide-das-galhas", "Nematóide-reniforme", "Orius spp.", "Percevejo acrosterno", "Lagarta-da-soja", "Lagarta-das-maçãs"]],
    ["diase",   ["Podridão por Fusarium", "Tombamento", "Anomalia de Hastes e Vagens", "Antracnose", , "Crestamento bacteriano", "Crestamento foliar", "Ferrugem", "Macrophomina (podridão cinzenta)", "Mancha de mirotécio", "Mancha-alvo", "Mancha-olho-de-rã", "Mancha-parda", "Míldio", "Mofo branco", "Oídio"]],
    ["herb",    ["Caruru de Mancha", "Trapoeraba", "Vassourinha de botão", "Tiririca/Tiriricão", "Tiguera Algodão", "Tiguera Milho", "Tiguera Soja", "Tiguera milheto", "Agrião-do-pasto", "Aguará", "Amendoim-bravo", "Apaga fogo", "Arrebenta-pedra", "Balãozinho", "Beldroega", "Buva", "Calopogônio", "Canopum", "Capim Carrapicho", "Capim-amargoso", "Capim-branco", "Capim-braquiária", "Capim-colchão", "Capim-colonião", "Capim-favorito", "Capim-massambará", "Capim-pé-de-galinha", "Capim-rabo-de-raposa", "Carrapicho-de-carneiro", "Corda de Viola", "Caruru", "Corda-de-viola", "Cordão de frade", "Crotalaria", "Erva de Santa Luzia", "Erva Lobrigueira", "Erva quente", "Erva-de-touro", "Falsa serralha", "Fedegoso-branco", "Guanxuma", "Idi amin", "Joá-bravo", "Joá-de-capote", "Malva Branca", "Mamona", "Maria pretinha", "Mentrasto", "Nabo/Nabiça", "Picão Preto", "Serralha"]]
]
var shouldAddNote = ["Formiga", "ovos", "Mariposas em geral",, "Nematóide", "Nematoide da Haste Verde / Soja Louca II", "Nematóide Das Lesões", "Nematóide-das-galhas", "Nematóide-reniforme","Larva-minadora"]

function search(keyWord)
{
    var statement = false
    if(!typeof keyWord == String) return null

    termDictionary.forEach(row => 
    {
        var list = row[1]
        list.forEach(element =>
        {
            if(element == keyWord){statement = row[0]}
        }
        )
    }
    )
    return statement
}
function shouldHaveNote(keyWord)
{
    var statement = false
    if(shouldAddNote.find((element) => (element == keyWord)) == keyWord) statement = true

    return statement
}

function getPlaguesContainer()
{
    var statement = []
    try
    {
        statement = document.querySelector("div.st-grid-row-2.st-timeline-area-day-info-monitoring-header-phenomena > div > div:nth-last-child(1)").children
    }catch(E)
    {
        console.log("Aguarde as pragas serem carregadas!!")
        null
    }
    return statement
}

function plaguesAreLoaded()
{
    return (getPlaguesListAsArray(getPlaguesContainer()).length > 0)
}

// tools to be used 
function generateRelatoryStructure()
{
    var structure = []
    relatoryStructure.forEach(line => 
    {
        var lineArray = []
        line.forEach(element => 
        {
            if(typeof element === "function")
            {
                lineArray.push(element())
            }else
            {
                lineArray.push(element)
            }
        }
    )
    structure.push(lineArray)
    }
    )

    return structure
}

function getDynamicContent(item, content)
{
    try
    {
        return item.querySelector(content);
    }
    catch(e)
    {
        return "NaN"
    }
}

function isValidData(cleanText)
{
    return cleanText
}

function placeholderRulesMet(string)
{
    var statement = true
    placeholderRules.forEach(rule => 
    {
        if (rule[1](string))
        {statement = false}
    }
    )

    return statement
}

function getPlaguesContainerAsArray()
{
    return Array.from(getPlaguesContainer())
}
function getPlaguesListAsArray(container){
    try{
        return Array.from(container.children[1].children)
    }
    catch(E)
    {
        return []
    }
}

function insertInfo(info, string)
{
    let response = info
    try{var cleanString = string.split(":")[0] || info}catch(E){var cleanString = info}
    if (!placeholderRulesMet(cleanString)){return response}

    try
    {
        response = info += string + "\n"
    }catch(E)
    {
        response = info
    }

    return response
}


let treatDataDict =
[
    ["/10p", ["Plantas"]],
    ["%", ["%"]],
    ["cm", ["cm"]]

]
function treatDataContent(string)
{
    try 
    {
        let suffix
        let stringArray = string.split(" ")
        let stringSuffix = stringArray[1]

        treatDataDict.map(e => {
            if (e[1].includes(stringSuffix)) stringSuffix = e[0]
        })
        return string.split(" ")[0]+" "+stringSuffix
        
    }catch(E)
    {
        return string
    }
}

let dataPlaceholderDict = 
[
    [(str) => str.split(" ")[0], ["Média de tamanho da planta", "Pontos com presença"]],
    [(str) => str.split(" ").slice(-1)[0], ["Pontos com presença", "Porcentagem de pon... caramujos", "Média de plantas c...gão alado", "Nível de infestação de adultos", "Nível de infestação de ninfas", "Porcentagem de pon... de ninfas",  "Porcentagem de pon... de adultos", "Média de plantas com colônia", "Média de plantas c...tas médias", "Média de plantas c...s pequenas", "Média de lagartas ...por planta"]],
    [(str) => str.split(" ").slice(-2).join(" "), ["Média de plantas com colônia +", "Média de plantas com colônia ++", "Média da distância...s entrenós"]],
    [(str) => str.split(" ").slice(-3).join(" "), ["Média de tamanho da planta"]]
]
function treatDataPlaceholder(string)
{
    let statement = string

    dataPlaceholderDict.map(e => {
        if (e[1].includes(string) && string)
        {
        statement = e[0](string)

        }
    })
    return statement
}

function treatVoidLines(string)
{
    return string.split('\n').filter(line => line.trim() !== '').join('\n');
}

function getStaticContent(content)
{
    return document.querySelector(content)
}

function getPlagueDataNodesList(item)
{ 
    return item.querySelectorAll(path.plagueDataContainer)
}

function getPlagueItemTextClean(item, content)
{
    try
    {
        if (item)
        {return getDynamicContent(item, content).innerText}
        else
        {return getStaticContent(content).innerText}
    }catch(e)
    {
        return "not found "
    }
}



// dynamic content generation 
    // content generation loop

// function generatePlaguesList()
// {
//     let diasesList = ""
//     let  buffer = ""

//     // getPlaguesList()
// }
function getPlagues()
{ 
    let statement = []
    let bufferRow = ["title", []]
    getPlaguesContainerAsArray().forEach(container =>
    {   
        bufferRow[0] = getPlagueLabel(container)
        getPlaguesListAsArray(container).forEach(element => 
        {
        bufferRow[1].push([getPlagueInfoPlaceholder(element), getPlagueDataContent(element)]) 
        })

        if (bufferRow[1].length > 0) statement.push(bufferRow)
        bufferRow = ["title", []]
    })
    return statement

}

function itemAsText(title, type)
{
    var itemsArray = getPlagues()
    var plaguesText = ""
    var buffer
    
    plaguesText = insertInfo(plaguesText, title+":\n")
    itemsArray.forEach(element => 
        {
            var title = element[0]
            var list = element[1]
            buffer = insertInfo(buffer, title)
            rulesList = []

        list.forEach(single => 
        {
            var placeholder = single[0]
            additional = single.join(": ")
            rulesList.push(placeholderRulesMet(placeholder))
            if (shouldHaveNote(title)) additional = [placeholder, "Nota 1"].join(": ")
            if(type == "diase"){ additional = placeholder +":\ninfestação: Nota 1\ndesenvolvimento: Nota 1"}
            buffer = insertInfo(buffer, additional)

        }
        )


        if(type == "herb"){ buffer = title+":" + "\n" + "Infestação: Nota 1 \n" + "Desenvolvimento: Nota 1\n"}

        if(search(title) == type) plaguesText = insertInfo(plaguesText, buffer)
        buffer = ""

    }
    )
    if(rulesList.find((rule) =>(rule == false) == undefined))plaguesText = insertInfo(plaguesText, buffer)

    if(plaguesText.length < 30) plaguesText = ""
    return plaguesText

}
function plagueAsText()
{
    statement = itemAsText(settings.plaguesTitle ,"plague")
    return statement
}

function diasesAsText()
{
    statement = itemAsText(settings.diasesTitle, "diase")
    return statement
}

function herbsAsText()
{
    statement = itemAsText(settings.herbsTitle, "herb")
    return statement
}


// header setup

function getAreaLabel()
{
    return getPlagueItemTextClean(false, path.areaName).trim() || "nan"
}

function getFenology()
{
    try{
    return getPlagueItemTextClean(false, path.areaFenology).split(":")[1].trim() || "nan"
    }catch(E)
    {
    return("NaN")
    }
}

function getDae()
{
    try{
    return getPlagueItemTextClean(false, path.areaDae).split(":")[1].trim() || "nan"
    }catch(E)
    {
        console.log(E)
        return "NaN"
    }
}

function getVariety()
{
    return getPlagueItemTextClean(false, path.areaVariety).trim() || "nan"
}



// dynamic plague setup 
function getPlagueLabel(item)
{
    return getPlagueItemTextClean(item, path.plagueName) || "nan"
}

function getPlagueDataContent(item)
{
    return treatDataContent(getPlagueItemTextClean(item, path.plagueDataContent))  || "nan"
}

function getPlagueInfoPlaceholder(item)
{
    return "- " + treatDataPlaceholder(getPlagueItemTextClean(item, path.plagueDataLabel)) || "nan" 
}


function generateRelatory()
{
    var text = ""
    generateRelatoryStructure().map(line => 
    {
        text = insertInfo(text, line.join(""))
    })
    
    return text

}

function renderRelatory()
{
    window.contentSection.innerText = generateRelatory().replace(/<br\s*\/?>/g, "\n")
    
}



function setHTMLElements()
{
    window.initButton = document.createElement("button")
    initButton.id = "extension-init-button"

    window.header = document.createElement("div")
    window.header.id = "extension-header"
    
    window.titleContainer = document.createElement("div")
    window.titleContainer.id = "extension-title-container"

    window.container = document.createElement("div");
    window.container.id = "extension-container"

    window.exitButton = document.createElement("button")
    window.exitButton.id = "extension-exit-button"

    window.backdrop = document.createElement("div")
    window.backdrop.id = "extension-backdrop"

    window.contentSection = document.createElement("div")
    window.contentSection.id = "extension-content-section"

    window.copyButton = document.createElement("button")
    window.copyButton.id = "extension-copy-button"

    window.copyButtonContainer = document.createElement("div")
    window.copyButtonContainer.id = "extension-copy-button-wrapper"

    window.icon =  '<svg width="40" height="48" viewBox="0 0 12 16" fill="white" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 0.5H1.5C0.675 0.5 0 1.175 0 2V14C0 14.825 0.6675 15.5 1.4925 15.5H10.5C11.325 15.5 12 14.825 12 14V5L7.5 0.5ZM9 8H3V9.5H9V8ZM9 11H3V12.5H9V11ZM1.5 14H10.5V5.75H6.75V2H1.5V14Z" fill="#FFFFFF"></path></svg>'

}
function setUpWindowHTMLPage()
{
    
    // structure setup
    window.copyButtonContainer.appendChild(window.copyButton)
    window.header.append(window.titleContainer, window.exitButton)
    window.container.append(window.header, window.contentSection, window.copyButtonContainer)

    // dynamic settings
    window.titleContainer.innerText = settings.windowTitle
    window.copyButton.innerText = settings.clipboardPlaceholder
    window.initButton.innerHTML = window.icon

    // click listener settings
    window.initButton.onclick = onClickInit
    window.exitButton.onclick = onClickExit
    window.copyButton.onclick = onClickCopy
}
function showHTMLWindow()
{
    document.body.append(window.backdrop, window.container)
}
function showMainHTMLPage()
{
    document.body.appendChild(initButton)
}
function loadPageCss()
{
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://juliodevdofront.github.io/RelaTool/main.css'; // URL do seu CSS
    link.onload = function() {
        console.log("CSS carregado!");
    };
    link.onerror = function() {
        console.error("Falha ao carregar o CSS.");
    };
    document.head.appendChild(link);
}

function init()
{

    setHTMLElements()
    setUpWindowHTMLPage()
    showMainHTMLPage()
}

function onClickCopy()
{
    navigator.clipboard.writeText(window.contentSection.innerHTML.replace(/<br\s*\/?>/g, "\n"))
    .then(function()
        {
            window.alert(settings.copiedDialogBox)
        })
    .catch(function(E)
        {
            null
        })
}
function onClickExit()
{
    window.initButton.style.display = "flex"
    window.container.remove()
    window.backdrop.remove()
}
function onClickInit()
{
    if(plaguesAreLoaded()) return
    window.initButton.style.display = "none"
    try{

        renderRelatory()
        showHTMLWindow()
    }
    catch(E)
    {
        console.log("error wile generating relatory, restarting module")
        window.alert("Aguarde o monitoramento ser carregado completamente ou selecione um talhão!")
        init()
    }
}
loadPageCss()
init()
