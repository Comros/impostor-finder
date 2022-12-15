var id = 1;
var wholeMap = [];
var x_size = 4, y_size = 4;
var haveImpostor = false;
var impostor1 = false;
var impostor2 = false;
var impostorTileId = null;
const amogusCode_1 = '0111110011110101';
const amogusCode_2 = '1000001100001010';

function Start()
{
    document.title = "Szukanie impostora...";
    document.body.style.backgroundColor = "black";
    document.body.style.margin = 0;
    document.body.style.textAlign = "center";
    for(var i = 0; i < 2500; i++)
    {
        CreateTile(id);
        id++;
    }
    var stringWholeMap = wholeMap.toString();
    stringWholeMap = stringWholeMap.replace(/,/g, '');
    for(var i = 0; i < stringWholeMap.length; i++)
    {
        if(stringWholeMap.search(amogusCode_1) != -1)
        {
            haveImpostor = true;
            impostor1 = true;
            impostorTileId = "map#" + ((parseInt(stringWholeMap.search(amogusCode_1)) / 17) + 1);
        }
        if(stringWholeMap.search(amogusCode_2) != -1)
        {
            haveImpostor = true;
            impostor2 = true;
            impostorTileId = "map#" + ((parseInt(stringWholeMap.search(amogusCode_2)) / 17) + 1);;
        }
    }

    if(haveImpostor) { document.title = "Znaleziono impostora"; ShowImpostor(); }
    if(!haveImpostor) location.reload();
}
Start();

function CreateTile(id)
{
    var map_ = document.createElement("div");
    document.body.appendChild(map_);
    map_.id = "map#" + id;
    map_.style.display = "inline-block";
    var map = [];
    var min = 0, max = 1;

    for(y = 1; y <= y_size; y++)
    {
        for(x = 1; x <= x_size; x++)
        {
            var randomValue = Math.round(Math.random() * (max - min) + min);

            map[x] = randomValue;

            var div_ = document.createElement("div");

            div_.id = map_.id + "[x:" + x + "y:" + y + "]";

            if(map[x] == 1)
            {
                div_.style.backgroundColor = "#000000";
                div_.dataset.value = 1;
            }
            else
            {
                div_.style.backgroundColor = "#FFFFFF";
                div_.dataset.value = 0;
            }

            div_.style.cssFloat = "left";
            div_.style.width = "20px";
            div_.style.height = "20px";

            map_.appendChild(div_);
            if(x == x_size) wholeMap += map;
        }
        map_.appendChild(document.createElement("br"));
    }
    wholeMap += ' ';
}

function ShowImpostor()
{
    for(y = 1; y <= y_size; y++)
    {
        for(x = 1; x <= x_size; x++)
        {
            var impostorTile = document.getElementById(impostorTileId + "[x:" + x + "y:" + y + "]");
            if((impostorTile.dataset.value == 1 && impostor1) || (impostorTile.dataset.value == 0 && impostor2)) impostorTile.style.backgroundColor = "#B22222";
            if((impostorTile.dataset.value == 0 && impostor1) || (impostorTile.dataset.value == 1 && impostor2)) impostorTile.style.backgroundColor = "#000000";
            if(((x == 3 && y == 2) || (x == 4 && y == 2)) && (impostor1 || impostor2)) impostorTile.style.backgroundColor = "#4169E1";
        }
    }
}