// 加载导航栏并初始化功能
async function loadNavbar() {
    // 加载导航栏HTML
    const response = await fetch('../components/navbar.html');
    const html = await response.text();
    document.body.insertAdjacentHTML('afterbegin', html);

    // 初始化侧边栏折叠功能
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
            const page = this.getAttribute('data-page');
            if (page && page !== window.location.pathname.split('/').pop().replace('.html', '')) {
                window.location.href = `${page}.html`;
            }
        });
    });

    // 设置当前页面高亮
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    document.querySelector(`.nav-item[data-page="${currentPage}"]`)?.classList.add('active');
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadNavbar);
