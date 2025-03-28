
// Discord server ID
const SERVER_ID = 'c2hq9Z9G';

// Update member count
function updateMemberCount(onlineCount, totalCount) {
    const onlineCountSpan = document.querySelector('.status-row:nth-child(2) span');
    const offlineCountSpan = document.querySelector('.status-row:nth-child(3) span');
    onlineCountSpan.textContent = `👥 สมาชิกออนไลน์: ${onlineCount} คน`;
    offlineCountSpan.textContent = `👤 สมาชิกออฟไลน์: ${totalCount - onlineCount} คน`;
}

// Fetch member count
async function fetchMemberCount() {
    try {
        const response = await fetch(`https://discord.com/api/v9/invites/${SERVER_ID}?with_counts=true`);
        const data = await response.json();
        if (data.approximate_presence_count && data.approximate_member_count) {
            updateMemberCount(data.approximate_presence_count, data.approximate_member_count);
        }
    } catch (error) {
        console.error('Error fetching member count:', error);
    }
}

// Update count every 30 seconds
setInterval(fetchMemberCount, 30000);
fetchMemberCount();

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.style.position = 'fixed';
    snowflake.style.top = '-10px';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.width = Math.random() * 5 + 3 + 'px';
    snowflake.style.height = snowflake.style.width;
    snowflake.style.background = 'white';
    snowflake.style.borderRadius = '50%';
    snowflake.style.opacity = Math.random() * 0.6 + 0.4;
    snowflake.style.pointerEvents = 'none';
    snowflake.style.boxShadow = '0 0 10px rgba(255,255,255,0.3)';
    snowflake.style.filter = 'blur(0.5px)';

    document.querySelector('.snow').appendChild(snowflake);

    const animationDuration = Math.random() * 4 + 3;
    const horizontalMovement = Math.random() * 150 - 75;
    const rotateAmount = Math.random() * 720 - 360;

    snowflake.animate([
        { transform: 'translate(0, 0) rotate(0deg)' },
        { transform: `translate(${horizontalMovement}px, ${window.innerHeight + 10}px) rotate(${rotateAmount}deg)` }
    ], {
        duration: animationDuration * 1000,
        easing: 'ease-in-out'
    }).onfinish = () => {
        snowflake.remove();
    };
}

setInterval(createSnowflake, 200);
// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    themeToggle.textContent = body.classList.contains('light-mode') ? '🌚' : '🌙';
});
