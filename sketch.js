let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  // 隱藏預設產生的 HTML DOM 影片元件，只在畫布上繪製
  capture.hide();
}

function draw() {
  background('#e7c6ff');
  
  // 設定影像的寬高為畫布的 50%
  let w = width * 0.5;
  let h = height * 0.5;
  // 計算起始座標使其置中
  let x = (width - w) / 2;
  let y = (height - h) / 2;
  
  push();
  // 將座標原點移至影像預計出現的右側，並進行水平翻轉
  translate(x + w, y);
  scale(-1, 1);
  // 繪製影像，此時座標為 (0, 0)
  image(capture, 0, 0, w, h);
  pop();
}

function windowResized() {
  // 確保視窗縮放時畫布也能自動調整大小
  resizeCanvas(windowWidth, windowHeight);
}
