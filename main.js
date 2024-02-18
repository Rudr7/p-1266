 song2 = "";
 song1 = "";

 leftWristX = 0;
 leftWristY = 0;
 rightWristX = 0;
 rightWristY = 0;
 
 scoreleftWrist = 0;
 scorerightWrist = 0;

 song1Status = "";
 song2Status = "";

 function setup() {
    canvas = createCanvas(600, 550);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}
 function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
    }
    
    function draw() {
        image(video, 0, 0, 600, 550);
        song1Status = song1.isPlaying();
        song2Status = song2.isPlaying();
        fill("#FF0000");
        stroke("FF0000");
        if(scoreleftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2Status == false){
            song2.play();
            document.getElementById("song").innerHTML = "Playing-peter pan song ";
        }
        }
        if(scorerightWrist > 0.2){
            circle(rightWristX,rightWristY,20);
            song2.stop();
            if(song1Status == false){
                song1.play();
                document.getElementById("song").innerHTML = "Playing-Harry Potter Theme song ";
            }
        }
    }
    
    function modelLoaded() {
        console.log('PoseNet Is Initialized');
    }

    function gotPoses(results) {
        if(results.length > 0)
        {
            console.log(results);
            scoreleftWrist = results[0].pose.keypoints[9].score;
            console.log("scoreLeftWrist =" +scoreleftWrist)
    
            scorerightWrist = results[0].pose.keypoints[10].score;
            console.log("scorerightWrist =" +scorerightWrist)
    
            leftWristX = results[0].pose.leftWrist.x;
            leftWristY = results[0].pose.leftWrist.y;
            console.log("leftWristX =" + leftWristX +" leftWristY ="+ leftWristY)
            
            rightWristX = results[0].pose.rightWrist.x;
            rightWristY = results[0].pose.rightWrist.y;
            console.log("rightWristX =" + rightWristX +" rightWristY ="+ rightWristY)  
        }
    }