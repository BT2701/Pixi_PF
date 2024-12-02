import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const PixiComponent = () => {
  const pixiContainer = useRef(null);

  useEffect(() => {
    if (!pixiContainer.current) {
      console.error('pixiContainer chưa được mount!');
      return;
    }

    // Khởi tạo ứng dụng Pixi
    const app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });

    // Gắn canvas của Pixi vào DOM
    pixiContainer.current.appendChild(app.view);

    // Tải tài nguyên từ JSON
    PIXI.Loader.shared
      .add('spritesheet', './assets/assets.json') // Đường dẫn JSON chính xác
      .load(() => {
        const texture = PIXI.Loader.shared.resources['spritesheet']?.textures?.['bunny.png'];
        if (!texture) {
          console.error('Không tìm thấy texture "bunny.png".');
          return;
        }

        const bunny = new PIXI.Sprite(texture);
        bunny.anchor.set(0.5);
        bunny.x = app.view.width / 2;
        bunny.y = app.view.height / 2;
        app.stage.addChild(bunny);
      });

    return () => {
      app.destroy(true, { children: true });
    };
  }, []);

  return <div ref={pixiContainer}></div>;
};

export default PixiComponent;
