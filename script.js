document.addEventListener('DOMContentLoaded', function () {
    // 移动端菜单切换
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 关闭移动菜单（如果打开）
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }

                // 平滑滚动
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 考虑固定头部的高度
                    behavior: 'smooth'
                });
            }
        });
    });

    // 表单验证
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // 获取表单字段
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            const responseMessage = document.getElementById('responseMessage');

            // 简单验证
            if (!name || !email || !phone || !message) {
                responseMessage.innerHTML = '<p class="text-red-600">请填写所有字段</p>';
                return;
            }

            // 邮箱格式验证
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                responseMessage.innerHTML = '<p class="text-red-600">请输入有效的邮箱地址</p>';
                return;
            }

            // 模拟表单提交
            responseMessage.innerHTML = '<p class="text-blue-600">正在发送...</p>';

            // 这里可以添加实际的表单提交逻辑
            // 为了演示，我们使用 setTimeout 模拟异步请求
            setTimeout(function () {
                responseMessage.innerHTML = '<p class="text-green-600">消息已成功发送！我们会尽快回复您。</p>';
                contactForm.reset();
            }, 1500);
        });
    }

    // 聊天功能优化
    const chatBtn = document.getElementById('chatBtn');
    const chatBox = document.getElementById('chatBox');
    const closeChat = document.getElementById('closeChat');
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');
    const chatContent = document.getElementById('chatContent');

    if (chatBtn && chatBox && closeChat) {
        // 打开聊天框
        chatBtn.addEventListener('click', function () {
            chatBox.classList.remove('hidden');
        });

        // 关闭聊天框
        closeChat.addEventListener('click', function () {
            chatBox.classList.add('hidden');
        });

        // 点击聊天框外部关闭
        chatBox.addEventListener('click', function (e) {
            if (e.target === chatBox) {
                chatBox.classList.add('hidden');
            }
        });
    }

    // 页面滚动动画
    function revealOnScroll() {
        const elements = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }

    // 添加滚动监听
    window.addEventListener('scroll', revealOnScroll);

    // 初始检查
    revealOnScroll();
});

// 地图初始化函数
function initMap() {
    if (!document.getElementById('map')) return;

    // 检查 Leaflet 是否已加载
    if (typeof L !== 'undefined') {
        const map = L.map('map').setView([30.6517, 104.0658], 15); // 成都的经纬度

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([30.6517, 104.0658]).addTo(map)
            .bindPopup('四川省成都市武侯区高攀路26号-1')
            .openPopup();
    }
}

// 当页面加载完成后初始化地图
window.addEventListener('load', initMap);
