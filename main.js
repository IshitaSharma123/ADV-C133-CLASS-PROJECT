img = "";
status = "";
object = [];

function preload() {
    img = loadImage('dog_cat.jpg');
}
function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();

    oblectDetector = ml5.oblectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status  Dectecting Objects...";
}

function modelLoaded() {
     console.log("Model Loaded!");
     status = true;
     oblectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(img, 0, 0, 640, 420);

    if(status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#FF0000");
            percent = flood(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects.width, objects[i].height);
        }
    }
}

