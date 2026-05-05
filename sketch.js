let capture;
let facemesh;
let predictions = [];

// 定義指定的特徵點編號組
const group1 = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];
const group2 = [76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  // 隱藏預設產生的 HTML DOM 影片元件，只在畫布上繪製
  capture.hide();

  // 初始化 FaceMesh 臉部辨識模型
  facemesh = ml5.facemesh(capture, () => {
    console.log("FaceMesh Model Ready!");
  });

  // 當偵測到臉部特徵時，更新 predictions 陣列
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function draw() {
  background('#e7c6ff');
  
  // 設定影像的寬高為畫布的 50%
  let w = width * 0.5;
  let h = height * 0.5;
  // 計算起始座標使其置中
  let x = (width - w) / 2;
  let y = (height - h) / 2;
  
  // 顯示文字：教科414730357
  fill(0); // 設定文字顏色（黑色）
  textSize(windowHeight * 0.05); // 根據視窗高度動態調整字體大小
  textAlign(CENTER, CENTER);
  text("教科414730357", width / 2, y / 2); // 放置在影像上方空白區域的中心

  push();
  // 將座標原點移至影像預計出現的右側，並進行水平翻轉
  translate(x + w, y);
  scale(-1, 1);
  // 繪製影像，此時座標為 (0, 0)
  image(capture, 0, 0, w, h);

  // 如果偵測到臉部且攝影機影像已加載
  if (predictions.length > 0 && capture.width > 0) {
    let keypoints = predictions[0].scaledMesh;
    
    // 計算影像縮放比例，確保線條對齊 50% 的影像大小
    let sw = w / capture.width;
    let sh = h / capture.height;

    stroke(255, 0, 0); // 線條採用紅色
    noFill();

    // 繪製第一組連線：編號組 1，粗細 15
    strokeWeight(15);
    for (let i = 0; i < group1.length - 1; i++) {
      let p1 = keypoints[group1[i]];
      let p2 = keypoints[group1[i+1]];
      line(p1[0] * sw, p1[1] * sh, p2[0] * sw, p2[1] * sh);
    }

    // 繪製第二組連線：編號組 2，粗細 1
    strokeWeight(1);
    for (let i = 0; i < group2.length - 1; i++) {
      let p1 = keypoints[group2[i]];
      let p2 = keypoints[group2[i+1]];
      line(p1[0] * sw, p1[1] * sh, p2[0] * sw, p2[1] * sh);
    }
  }
  pop();
}

function windowResized() {
  // 確保視窗縮放時畫布也能自動調整大小
  resizeCanvas(windowWidth, windowHeight);
}
