// 臉部偵測，樂器
let video;
let poseNet;
let poses = [];
let pose;
let img_nose, img_left_ear, img_right_ear, img_eye;

function preload(){
  img_nose = loadImage("pig_nose.png");
  img_left_ear = loadImage("left_ear.png")
  img_right_ear = loadImage("right_ear.png")
  img_eye = loadImage("eyes.gif")
  img_eye2 = loadImage("eye.png")
}


function setup() {
  createCanvas(640, 480);
  createGraphics(640, 480);
  background(51);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  graphic = createGraphics(640,480)
  graphic.translate(640,0)
  graphic.scale(-1,1)

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses)

  rectMode(CENTER);
  img_nose.resize(80, 0)
  img_left_ear.resize(40, 90)
  img_right_ear.resize(40, 90)

  img_eye.resize(30,40)
  img_eye2.resize(40,90)
  background(220)
}

function gotPoses(poses){
  if(poses.length>0){
    pose = poses[0].pose;
  }
  // tint(255, 200);
}


function modelReady() {
  console.log('Model Loaded!');
}


function draw() {
  graphic.image(video,0,0)
  imageMode(CORNER)
  image(graphic,0,0)
	var size = random(5, 20); //形狀大小

	stroke(200, 100, 120); // 設定圖案框線顏色
	noFill(); // 圖案空心 無填滿

  if(pose){
    imageMode(CENTER)
    // fill(200, 100, 120); // 設定圖案框線顏色
    image(img_nose, width-pose.nose.x, pose.nose.y)
    image(img_left_ear, width-pose.leftEar.x, pose.leftEar.y)
    image(img_right_ear, width-pose.rightEar.x, pose.rightEar.y)
    image(img_eye2, width-pose.leftEye.x, pose.leftEye.y)
    // image(img_eye2, width-pose.rightEye.x, pose.rightEye.y)
  }
}


