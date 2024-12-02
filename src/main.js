import * as PIXI from 'pixi.js';

// Khởi tạo ứng dụng PixiJS
const app = new PIXI.Application({
    width: 800,        // Chiều rộng canvas
    height: 600,       // Chiều cao canvas
    backgroundColor: 0x1099bb, // Màu nền
});
document.body.appendChild(app.view); // Thêm canvas vào DOM

// Tạo tiêu đề
const title = new PIXI.Text('My PixiJS Game', {
    fontSize: 36,
    fill: '#ffffff',
    fontWeight: 'bold',
});
title.anchor.set(0.5);
title.x = app.screen.width / 2;
title.y = 50;
app.stage.addChild(title);

// Tạo nút "Start Game"
const button = new PIXI.Graphics();
button.beginFill(0x00ff00); // Màu xanh lá
button.drawRoundedRect(0, 0, 200, 60, 10); // Tạo nút hình chữ nhật bo góc
button.endFill();
button.interactive = true;
button.buttonMode = true; // Con trỏ chuột thay đổi khi hover

const buttonText = new PIXI.Text('Start Game', {
    fontSize: 24,
    fill: '#000000',
});
buttonText.anchor.set(0.5);
buttonText.x = 100;
buttonText.y = 30;
button.addChild(buttonText);

// Đặt vị trí nút và thêm sự kiện click
button.x = app.screen.width / 2 - 100;
button.y = app.screen.height / 2;
button.on('pointertap', () => {
    alert('Game Started!');
});
app.stage.addChild(button);

// Thêm hình nền (nếu cần)
PIXI.Loader.shared.add('background', './assets/background.png').load(() => {
    const background = new PIXI.Sprite(PIXI.Loader.shared.resources.background.texture);
    background.width = app.screen.width;
    background.height = app.screen.height;
    app.stage.addChildAt(background, 0); // Thêm vào lớp dưới cùng
});
