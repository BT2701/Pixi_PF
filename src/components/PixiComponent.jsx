// src/PixiComponent.js
import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const PixiComponent = () => {
  const pixiContainer = useRef(null); // Tham chiếu tới container PixiJS

  useEffect(() => {
    // Khởi tạo ứng dụng PixiJS
    const app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb, // Màu nền
    });

    // Thêm canvas Pixi vào DOM thông qua pixiContainer
    pixiContainer.current.appendChild(app.view);

    // Tải asset pack (spritesheet) bằng PIXI.Loader
    PIXI.Loader.shared
      .add('bus1', '../../assets.json') // Đường dẫn tới tệp JSON chứa thông tin sprite sheet
      .load(() => {
        // Sau khi tải xong, chúng ta sẽ sử dụng tài nguyên
        const bunny = new PIXI.Sprite(
          PIXI.Loader.shared.resources['bus1'].textures['bunny.png']
        );

        bunny.x = app.view.width / 2;
        bunny.y = app.view.height / 2;
        bunny.anchor.set(0.5); // Căn giữa sprite

        app.stage.addChild(bunny);

        // Thêm chuyển động cho sprite
        app.ticker.add(() => {
          bunny.rotation += 0.01; // Quay sprite mỗi frame
        });
      });

    // Cleanup khi component bị hủy
    return () => {
      app.destroy(true, { children: true });
    };
  }, []);

  return <div ref={pixiContainer}>
    {/* <h1>Pixi</h1> */}
  </div>;
};

export default PixiComponent;
