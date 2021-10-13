object_array = [];
status = "";

function setup() {
    canvas = createCanvas(400, 350);
    canvas.center()
    webcam = createCapture(VIDEO);
    webcam.size(600, 500)
    webcam.hide();
}

function preload() {

}

function draw() {
    image(webcam, 0, 0, 400, 350);
    if (status != "") {
        fill("#0000ff");
        textSize(20);
        model.detect(webcam, getResults);

        for (i = 0; i < object_array.length; i++) {

            object_name = object_array[i].label;
            if (object_name == ob_text) {
                object_confidence = floor(object_array[i].confidence * 100);
                object_x = object_array[i].x;
                object_y = object_array[i].y;
                object_width = object_array[i].width;
                object_height = object_array[i].height;
                text(object_name + " " + object_confidence + "%", object_x, object_y);
                noFill();
                stroke("#0000ff");
                rect(object_x, object_y, object_width, object_height);
                document.getElementById("status").innerHTML = "Status:" + ob_text + " found";

            }
            else{
                document.getElementById("status").innerHTML = "Status:" + ob_text + " not found";

            }
        }
    }
}

function getResults(E, R) {
    if (E) {
        console.error(E);
    } else {
        console.log(R);
        object_array = R;
    }
}
status = "";

function start() {
    ob_text = document.getElementById("name_object").value
    model = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "status: detecting objects";

}

function modelloaded() {
    console.log("model loaded successfully");
    status = true;

}