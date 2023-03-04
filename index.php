<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="utf-8">
    <title>Canvas</title>
    <link rel="stylesheet" href="style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.10.2.js"></script>
    
  </head>
  <body>
    <section id="container">
        <table id="paste">
            <tr>
                <td><a onclick=newCanvas() href='board.php'><img src='new.png' style='border: 1px solid black; height: 151px; width: 300px; box-shadow: rgb(100, 100, 100) 3px 3px 4px;'></a></td>
            </tr>                
      <script>
        const paste = document.querySelector('#paste');
        window.addEventListener('load', () => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'server.php?getalldata');
        xhr.responseType = 'json';
        xhr.onload = () => {
          const data = xhr.response;
          data.forEach((file) => {
          paste.innerHTML+= "<tr><td><a class='picture' onclick=sendData('"+file.name+"') href='board.php'><img src='"+ file.canvasData +"' style='border: 1px solid black; width: 300px; box-shadow: rgb(100, 100, 100) 3px 3px 4px;'></a></td></tr>";
          });
        };
        xhr.send();
      });
        
        function sendData(nazwa){
          console.log(nazwa);
          let xhr = new XMLHttpRequest();
          xhr.open('GET', 'server.php?getsingledata=' + nazwa);
          xhr.responseType = 'json';
          xhr.onload = () => {
            const data = xhr.response; 
            let jsonString = JSON.stringify(data)
            let xp = new XMLHttpRequest();
            xp.open('POST', 'server.php?updatecanvas=' + nazwa);
            xp.setRequestHeader('Content-Type', 'application/json');
            xp.send(jsonString);
          };
          xhr.send();


        };
        

        function newCanvas(){       
          var number = $("table a[class='picture']").length;
          var nazwa = "picture"+number+".json";
        
          let json={
              name: nazwa,
              canvasData: '',
          };
          let jsonString = JSON.stringify(json);
          let xhr = new XMLHttpRequest();
          xhr.open('POST', 'server.php?updatecanvas=' + nazwa);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(jsonString);}
        
      </script>     
      </table>
    </section> 


  </body>
</html>