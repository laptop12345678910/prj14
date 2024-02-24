song1="";
song2="";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

ScoreleftWrist = 0;
ScorerightWrist = 0;

song1_status = "";
song2_status = "";

function Preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function play()
{
    song.play();
	song.setVolume(1);
	song.rate(1);
}


function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("!!!PoseNet Model Has Been Initialized!!!");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
         
        console.log("LeftWristX = " + leftWristX , "LeftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY - results[0].pose.rightWrist.y;

        console.log("rightWristX = " + rightWristX , "rightWristY = " + rightWristY);

        ScoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = " + ScoreleftWrist);

        ScorerightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Right Wrist = " + ScorerightWrist);
    }
}
 
function draw(){

    image(video, 0, 100, 600, 500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();


    fill("#FF0000");
    stroke("#FF0000");

   if(ScorerightWrist > 0.2)
   {
      circle(rightWristX,rightWristY,20);

       song2.stop();

       if(song1_status == false)
       {
        document.getElementById("Song").innerHTML = "Song = Hogwards Theme Song";
           song1.play();
       }
   }


   if(ScoreleftWrist > 0.2)
   {
    circle(leftWristX,leftWristY,20);

    song1.stop();

    if(song2_status == false)
    {
     document.getElementById("Song").innerHTML = "Song = Peter Pan Song";
        song2.play();
    }
   }

}  