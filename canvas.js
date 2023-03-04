    const changeColor = document.getElementById("colorPicker");
    const lineWidth = document.getElementById("size");
    const lineShape = document.getElementById("shape");
    const canvas = document.querySelector("canvas");
    const clear = document.querySelector("#clear");
    const colorThings = document.querySelector("#colorThings");
    const ctx = canvas.getContext("2d");
    let painting = false;
    let color = "black";
    let size = "4.5";
    let shape ="1";
    let startX = 0;
    let startY = 0;
    let save = "";
    let distance = 0;
    let distanceX=0;
    let distanceY=0;
    let folder = "Current/"
    var dataURL = canvas.toDataURL();

window.addEventListener("load",() => {
   console.log('Page is loaded');
   canvas.width = canvas.offsetWidth;
   canvas.height = canvas.offsetHeight;
   ctx.fillStyle = "white";
   ctx.fillRect(0, 0, canvas.width, canvas.height);

   let xhr = new XMLHttpRequest();
   xhr.open('GET', 'server.php?getcurrentdata');
   xhr.responseType = 'json';
   xhr.onload = () => {
   const data = xhr.response;
   let curr = data[0];

    var img1 = new Image();
    img1.src=curr.canvasData;
    ctx.drawImage(img1, 0, 0);  
};
xhr.send();

   });

   function senddData(code,name){
    console.log(code,name)
   }
   function changeC(){
        color=this.value;
    };

    function changeW(){
        size=this.value;
    };

    function changeShape(){
        shape=this.value;
    }
    function sendCanvas(){
      $.ajax({
        url : folder,
        success: function (data) {
            $(data).find("a").attr("href", function (i, val) {
                if( val.match(/\.(json)$/) ) { 
                    var nazwa = val;
                    let json = {
                        name: nazwa,
                        canvasData: canvas.toDataURL('image/png'),
                    };
                    let jsonString = JSON.stringify(json);
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', 'server.php?updatecanvas=' + nazwa);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(jsonString);
                } 
            });
        } 
    });
       
    }
    
    function startPosition(e){
        painting=true;
        ctx.beginPath();
        startX = e.offsetX;
        startY = e.offsetY;
        ctx.strokeStyle=color;
        ctx.lineWidth=size;
        ctx.lineCap="round";
        save = ctx.getImageData(0,0,canvas.width,canvas.height);
        draw(e);
    };

    function finishedPosition(){
        painting=false;
    };

    function draw(e){
        switch(shape)
        {
            case '1':
                if(!painting) return;
                ctx.lineTo(e.offsetX,e.offsetY);
                ctx.stroke();
                break;
            case '2':
                if(!painting) return;
                ctx.putImageData(save,0,0);
                ctx.beginPath();
                ctx.moveTo(startX,startY);
                ctx.lineTo(e.offsetX,e.offsetY);
                ctx.closePath();
                ctx.stroke();               
                break;
            case '3':
                if(!painting) return;
                ctx.putImageData(save,0,0);
                ctx.beginPath();
                distance = Math.sqrt((Math.abs(startX-e.offsetX))*Math.abs(startY-e.offsetY));
                ctx.arc(startX,startY,distance,0,2*Math.PI);
                ctx.closePath();
                ctx.stroke();                
                break;
            case '4':
                if(!painting) return;
                ctx.putImageData(save,0,0);
                ctx.beginPath();
                distanceX= -(startX-e.offsetX);
                distanceY= -(startY-e.offsetY);
                ctx.rect(startX,startY,distanceX,distanceY)
                ctx.closePath();
                ctx.stroke();
                break;
            default:
                console.log("Error, out switch out of the range.");
        }
    }
    canvas.addEventListener('mousedown',startPosition);
    canvas.addEventListener('mouseup',() => {
      console.log("Change submitted");
      finishedPosition();     
      sendCanvas();
    });

    canvas.addEventListener('mousemove',draw);

let intervalID = window.setInterval(myCallback, 1000);

function myCallback() { 
	let xhr = new XMLHttpRequest();
    xhr.open('GET', 'server.php?getcurrentdata');
    xhr.responseType = 'json';
	xhr.onload = function () {
		let code = xhr.response;
		let pic = new Image();
		pic.src = code[0].canvasData;
		ctx.drawImage(pic, 0, 0);
	};
	xhr.send();
}
    
    //EventListeners

    changeColor.addEventListener('change',changeC);
    changeColor.addEventListener('input',changeC);
    lineWidth.addEventListener('change',changeW);
    lineShape.addEventListener('change',changeShape);
    clear.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        sendCanvas();
       
    });
    colorThings.addEventListener("click",() => {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);  
        sendCanvas();    
    });

    // Set up touch events for mobile, etc
    function getTouchPos(canvasDom, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
          x: touchEvent.touches[0].clientX - rect.left,
          y: touchEvent.touches[0].clientY - rect.top
        };
      }

canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {clientX: touch.clientX,clientY: touch.clientY});
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchend", function (e) {
  var mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
  sendCanvas();

}, false);
canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
  clientX: touch.clientX,
  clientY: touch.clientY
});
canvas.dispatchEvent(mouseEvent);
}, false);

       


      

  
  


