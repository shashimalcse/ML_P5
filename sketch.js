let mobilenet;
let video;
let lable='';
let classifier;
let leftbutton;
let rightbutton;
let trainbutton;
function modelReady(){
    console.log('Model is ready!!!!');
    //mobilenet.predict(gotResults);
}
function videoReady(){
    console.log('Video is ready!!!!');
}
function gotResults(error,result){
    if(error){
        console.log(error);
    }
    else{
        
        lable= result;
        classifier.classify(gotResults);
    }

}
function whileTraining(loss){
    if(loss==null){
        console.log('Traning Complete');
        classifier.classify(gotResults);
    }
    else{
    console.log(loss);
    }
}
// function imageReady(){
//     image(puffin,0,0,width,height);
// }
function setup() {
    createCanvas(640, 550);
    video=createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet=ml5.featureExtractor('MobileNet',modelReady);
    classifier=mobilenet.classification(video,videoReady);
    leftbutton=createButton('left');
    leftbutton.mousePressed(function(){
        classifier.addImage('left');
    });
    rightbutton=createButton('right');
    rightbutton.mousePressed(function(){
        classifier.addImage('right');
    });
    trainbutton=createButton('train');
    trainbutton.mousePressed(function(){
        classifier.train(whileTraining)
    });


}
function draw(){
    background(0)
    image(video,0,0);
    fill(255);
    textSize(30);
    text(lable,10,height-30);
}