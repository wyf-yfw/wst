// 确保DOM完全加载后执行
document.addEventListener('DOMContentLoaded', function() {
  // 风格选择按钮功能
  const styleButtons = document.querySelectorAll('.style-btn');
  styleButtons.forEach(button => {
    button.addEventListener('click', function () {
      styleButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // 生成图像功能
  const generateBtn = document.getElementById('generateBtn');
  const placeholder = document.getElementById('placeholder');
  const loading = document.getElementById('loading');
  const resultImage = document.getElementById('resultImage');

  generateBtn.addEventListener('click', async function() {
    let promptInput = document.querySelector('.prompt-input').value;
    if (!promptInput.trim()) {
      alert('请输入图像描述');
      return;
    }

    // 根据选择的风格添加前缀
    const activeStyle = document.querySelector('.style-btn.active').textContent;
   const stylePrefixes = {
  '写实风格': 'ultra-high-definition, photorealistic, natural lighting, realistic textures, professional photography,',
  '卡通风格': 'Disney-style cartoon, soft colors, clean outlines, whimsical characters, animation-style lighting,',
  '油画风格': 'classic oil painting style, thick brush strokes, rich texture, Renaissance lighting, canvas texture, chiaroscuro,',
  '水彩风格': 'watercolor painting style, soft pastel colors, translucent layers, flowing brushstrokes, artistic background,',
  '赛博朋克': 'cyberpunk style, neon lights, futuristic cityscape, high-tech, dystopian atmosphere, dark tones, reflective surfaces,',
  '中国风': 'traditional Chinese ink painting style, black ink brushwork, minimalist landscape, ancient Chinese aesthetics, rice paper texture,',
  '像素艺术': '8-bit pixel art style, retro video game graphics, blocky resolution, limited color palette, nostalgic vibe,',
  '3D渲染': '3D render style, Blender engine, ray tracing, high-poly model, realistic lighting and shadows, physically-based rendering,'
};

    if (stylePrefixes[activeStyle]) {
      promptInput = stylePrefixes[activeStyle] + promptInput;
    }

    // 显示加载状态
    placeholder.style.display = 'none';
    loading.style.display = 'flex';
    resultImage.style.display = 'none';
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 生成中...';

    try {
      // 调用后端API
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: promptInput
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '生成失败');
      }

      // 获取生成的图像
      const imageUrl = `/api${data.image_url}`;
      resultImage.src = imageUrl;

      // 隐藏加载状态，显示结果
      loading.style.display = 'none';
      resultImage.style.display = 'block';
      generateBtn.disabled = false;
      generateBtn.innerHTML = '<i class="fas fa-magic"></i> 生成图像';

    } catch (error) {
      console.error('生成错误:', error);
      alert(error.message);
      loading.style.display = 'none';
      placeholder.style.display = 'flex';
      generateBtn.disabled = false;
      generateBtn.innerHTML = '<i class="fas fa-magic"></i> 生成图像';
    }
  });
});
