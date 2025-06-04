// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 加载历史图片
    loadHistoryImages();
});

function loadHistoryImages() {
    // 这里应该从后端API获取历史图片
    // 暂时使用模拟数据
    const historyGrid = document.getElementById('historyGrid');
    historyGrid.innerHTML = '';
    
    // 模拟从后端获取数据
    setTimeout(() => {
        const images = [
            { id: '5d15eb95-b8b2-4d2f-b14d-789ac0f01a05', prompt: '宇航员骑马在月球表面' },
            { id: '7c56aeba-dcf2-4ef5-a3d8-4ba16295989e', prompt: '未来城市夜景' },
            { id: '8deef255-11f6-43dd-b7ca-cac8e79de75e', prompt: '海底城堡' },
            { id: '15e20209-f475-4382-a864-5ec4d03018bc', prompt: '森林中的魔法小屋' },
            { id: '9131f118-98df-4a34-97ee-b9b10c6b655d', prompt: '蒸汽朋克风格的机器人' },
            { id: '315895d4-bc8c-42ba-81d9-9d24665486a2', prompt: '中国山水画' },
            { id: '454300e9-6f49-4cc9-8842-95898f8a1535', prompt: '卡通动物乐队' }
        ];
        
        images.forEach(img => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <img src="../backend/outputs/${img.id}.png" alt="${img.prompt}">
                <div class="history-prompt">${img.prompt}</div>
                <div class="history-actions">
                    <button class="action-btn download-btn">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="action-btn favorite-btn">
                        <i class="fas fa-star"></i>
                    </button>
                    <button class="action-btn delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            historyGrid.appendChild(historyItem);
        });
    }, 1000);
}
