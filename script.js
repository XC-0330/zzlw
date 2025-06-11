// 密码保护
const passwordPage = document.getElementById('password-page');
const mainContent = document.getElementById('main-content');
const passwordInput = document.getElementById('password-input');
const passwordSubmit = document.getElementById('password-submit');
const passwordError = document.getElementById('password-error');

const correctPassword = '1231';

passwordSubmit.addEventListener('click', () => {
    if (passwordInput.value === correctPassword) {
        passwordPage.style.display = 'none';
        mainContent.style.display = 'block';
        loadUserProfile();
        showRandomPoem();
    } else {
        passwordError.textContent = '密码错误，请重试';
    }
});

passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') passwordSubmit.click();
});

// 随机古诗词（示例数据，可自行扩展）
const poems = [
    { text: "床前明月光，疑是地上霜。", author: "李白《静夜思》" },
    { text: "春眠不觉晓，处处闻啼鸟。", author: "孟浩然《春晓》" },
    { text: "人闲桂花落，夜静春山空。", author: "王维《鸟鸣涧》" },
    { text: "月落乌啼霜满天，江枫渔火对愁眠。", author: "张继《枫桥夜泊》" }
];

function showRandomPoem() {
    const idx = Math.floor(Math.random() * poems.length);
    document.getElementById('poem-text').textContent = poems[idx].text;
    document.getElementById('poem-author').textContent = poems[idx].author;
}

// 用户头像和昵称本地存储相关
const userAvatar = document.getElementById('user-avatar');
const avatarUpload = document.getElementById('avatar-upload');
const nicknameInput = document.getElementById('nickname-input');
const saveProfileBtn = document.getElementById('save-profile');

function loadUserProfile() {
    const savedAvatar = localStorage.getItem('userAvatar');
    const savedNickname = localStorage.getItem('userNickname');

    if (savedAvatar) userAvatar.src = savedAvatar;
    if (savedNickname) nicknameInput.value = savedNickname;
}

avatarUpload.addEventListener('change', () => {
    const file = avatarUpload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            userAvatar.src = e.target.result;
            localStorage.setItem('userAvatar', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

saveProfileBtn.addEventListener('click', () => {
    const nickname = nicknameInput.value.trim();
    if (nickname.length > 0) {
        localStorage.setItem('userNickname', nickname);
        alert('保存成功！');
    } else {
        alert('昵称不能为空');
    }
});

// 导航和搜索功能（简单示意）
const navLinks = document.querySelectorAll('.nav-link');
const sections = {
    home: null,
    characters: document.getElementById('characters'),
    articles: document.getElementById('articles'),
    contact: document.getElementById('contact')
};

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href').slice(1);
        for (const key in sections) {
            if (sections[key]) sections[key].style.display = 'none';
        }
        if (target === 'home') {
            document.getElementById('random-poem').style.display = 'block';
            document.getElementById('user-profile').style.display = 'flex';
        } else {
            document.getElementById('random-poem').style.display = 'none';
            document.getElementById('user-profile').style.display = 'none';
            if (sections[target]) sections[target].style.display = 'block';
        }
    });
});

document.getElementById('search-input').addEventListener('input', e => {
    const keyword = e.target.value.trim().toLowerCase();
