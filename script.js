/* ==========================================
   TAB SWITCHING
   ========================================== */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabSections = document.querySelectorAll('.tab-section');

function activateTab(tabName) {
    // Update buttons
    tabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    // Update sections
    tabSections.forEach(section => {
        section.classList.remove('active');
    });

    const target = document.getElementById(`tab-${tabName}`);
    if (target) {
        target.classList.add('active');
    }

    // If switching to resume, animate skill bars
    if (tabName === 'resume') {
        animateSkillBars();
    }
}

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
});

/* ==========================================
   SKILL BAR ANIMATION
   ========================================== */
let skillsAnimated = false;

function animateSkillBars() {
    if (skillsAnimated) return;
    skillsAnimated = true;

    const fills = document.querySelectorAll('.skill-bar-fill');
    fills.forEach((fill, i) => {
        const targetWidth = fill.getAttribute('data-width') + '%';
        setTimeout(() => {
            fill.style.width = targetWidth;
        }, i * 80);
    });
}

/* ==========================================
   CONTACT FORM
   ========================================== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name    = contactForm.querySelector('[name="name"]').value.trim();
        const email   = contactForm.querySelector('[name="email"]').value.trim();
        const subject = contactForm.querySelector('[name="subject"]').value.trim();
        const message = contactForm.querySelector('[name="message"]').value.trim();

        if (!name || !email || !subject || !message) {
            showToast('⚠️ Please fill in all fields.');
            return;
        }

        const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRx.test(email)) {
            showToast('⚠️ Please enter a valid email address.');
            return;
        }

        showToast('✅ Message sent! I\'ll get back to you soon.');
        contactForm.reset();
    });
}

/* ==========================================
   TOAST NOTIFICATION
   ========================================== */
function showToast(message, duration = 4000) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

/* ==========================================
   SCROLL-AWARE SIDEBAR CLAMP
   ========================================== */
function clampSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    const viewportH = window.innerHeight;
    const sidebarH  = sidebar.scrollHeight;
    if (sidebarH < viewportH) {
        sidebar.style.top = Math.floor((viewportH - sidebarH) / 2) + 'px';
    } else {
        sidebar.style.top = '32px';
    }
}

window.addEventListener('resize', clampSidebar);
window.addEventListener('load', clampSidebar);

/* ==========================================
   INIT
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Ensure About is the active tab on load
    activateTab('about');
    clampSidebar();
});
