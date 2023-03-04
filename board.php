<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width", initial-scale="1.0"/>
        <meta http-equiv="X-UA-Compatible" content=""ie=edge"/>
        <link rel="stylesheet" href="style.css"/>
        <script type="text/javascript" src="https://code.jquery.com/jquery-1.10.2.js"></script>
        <script src="canvas.js" defer></script>
        <title>Canvas</title>
    </head>
    <body>
        
        <div id="container">   
        <div id="sztaluga">
                    <canvas id="canvas" style="box-shadow: rgb(100, 100, 100) 3px 3px 4px;"></canvas>
        </div>             
            <nav>
                <input id="colorPicker" type="color" style="height: 50px;" value="#000000">
                <select style="font-size: 30px;" id="size">
                    <option value="2">bardzo cienka</option>
                    <option value="3">cienka</option>
                    <option value="4.5">normalna</option>
                    <option value="6.5">pół gruba</option>
                    <option value="8">gruba</option>
                    <option value="12">bardzo gruba</option>
                </select>
                <select style="font-size: 30px;" id="shape">
                    <option value="1">wolne</option>
                    <option value="2">prosta</option>
                    <option value="3">okrąg</option>
                    <option value="4">prostokąt</option>
                </select>
                <button class="button" id="colorThings">Color Everything</button>
                <button class="button "id="clear">Clear</button>
            </nav>
        </div>
    </body>
</html>

