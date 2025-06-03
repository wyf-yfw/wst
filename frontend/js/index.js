// 确保DOM完全加载后执行
document.addEventListener('DOMContentLoaded', function() {
  // 侧边栏折叠功能
  document.querySelector('.toggle-btn').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('collapsed');

    const icon = this.querySelector('i');
    if (sidebar.classList.contains('collapsed')) {
        icon.classList.remove('fa-angle-left');
        icon.classList.add('fa-angle-right');
    } else {
        icon.classList.remove('fa-angle-right');
        icon.classList.add('fa-angle-left');
    }
  });

  // 模型选择功能
  const modelItems = document.querySelectorAll('.model-item');
  modelItems.forEach(item => {
    item.addEventListener('click', function() {
      modelItems.forEach(model => model.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // 页面导航功能
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      navItems.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // 风格选择按钮
  const styleButtons = document.querySelectorAll('.style-btn');
  styleButtons.forEach(button => {
    button.addEventListener('click', function() {
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
    const promptInput = document.querySelector('.prompt-input').value;
    if (!promptInput.trim()) {
      alert('请输入图像描述');
      return;
    }

    // 显示加载状态
    placeholder.style.display = 'none';
    loading.style.display = 'flex';
    resultImage.style.display = 'none';
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 生成中...';

    try {
      // 调用后端API
      const response = await fetch('http://127.0.0.1:5001/generate', {
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
      const imageUrl = `http://127.0.0.1:5001${data.image_url}`;
      resultImage.src = imageUrl;

      // 隐藏加载状态，显示结果
      loading.style.display = 'none';
      resultImage.style.display = 'block';
      generateBtn.disabled = false;
      generateBtn.innerHTML = '<i class="fas fa-magic"></i> 生成图像';

      // 添加到历史记录
      addToHistory(promptInput, imageUrl);
    } catch (error) {
      console.error('生成错误:', error);
      alert(error.message);
      loading.style.display = 'none';
      placeholder.style.display = 'flex';
      generateBtn.disabled = false;
      generateBtn.innerHTML = '<i class="fas fa-magic"></i> 生成图像';
    }
  });

  // 添加到历史记录
  function addToHistory(prompt, imageUrl) {
    const historyList = document.querySelector('.history-list');
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
      <div class="history-image" style="background-image: url('${imageUrl}'); background-size: cover;"></div>
      <div class="history-prompt">${prompt}</div>
    `;
    historyList.insertBefore(historyItem, historyList.firstChild);
  }

  // 历史记录点击事件
  document.querySelectorAll('.history-item').forEach(item => {
    item.addEventListener('click', function() {
      const image = this.querySelector('.history-image');
      const bgImage = window.getComputedStyle(image).backgroundImage;

      if (bgImage && bgImage !== 'none') {
        // 提取URL
        const imgUrl = bgImage.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
        resultImage.src = imgUrl;
        placeholder.style.display = 'none';
        loading.style.display = 'none';
        resultImage.style.display = 'block';
      }
    });
  });

  // 清空历史记录
  document.querySelector('.clear-history').addEventListener('click', function() {
    if (confirm('确定要清空所有历史记录吗？')) {
      document.querySelector('.history-list').innerHTML = '';
    }
  });
});
