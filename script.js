const projects = [
  {
    title: "Бот для мастеров на дом",
    desc: "Telegram-бот для записи мастеров на дом. Клиент выбирает услугу, удобное время и оставляет заявку. Мастер получает уведомление и подтверждает.",
    stack: ["Python", "aiogram", "SQLite"],
    link: "https://t.me/ProMasterNaDom_bot",
    type: "real"
  },
  {
    title: "Бот-автоворонка для онлайн-курса",
    desc: "Воронка продаж для курса по SMM. Лид-магнит, серия прогревающих сообщений, продажа курса. Статистика и рассылка для админа.",
    stack: ["Python", "aiogram", "SQLite"],
    link: "https://t.me/Digital_Master_onebot",
    type: "demo"
  },
  {
    title: "Лендинг для онлайн-школы",
    desc: "Одностраничный сайт для курсов по дизайну. Форма заявки, секция с преподавателями, FAQ и блок отзывов.",
    stack: ["HTML", "CSS", "JavaScript"],
    link: "#",
    type: "demo"
  },
  {
    title: "AI-фото для карточек Wildberries",
    desc: "Пакет из 20 фотографий моделей в одежде, сгенерированных через Nana Banana Pro. Белый фон, инфографика.",
    stack: ["Nana Banana Pro", "Canva"],
    link: "#",
    type: "demo"
  },
  {
    title: "Бот-магазин для кофейни",
    desc: "Telegram-магазин с каталогом, корзиной и оплатой через ЮКassa. Админка для управления заказами.",
    stack: ["Python", "aiogram", "ЮКassa API", "PostgreSQL"],
    link: "#",
    type: "demo"
  },
  {
    title: "Оформление магазина на Wildberries",
    desc: "Полное оформление 15 карточек товаров: инфографика, продающие описания, ключевые слова для SEO.",
    stack: ["Figma", "Canva", "ChatGPT"],
    link: "#",
    type: "demo"
  }
];

function renderPortfolio() {
  const grid = document.getElementById("portfolioGrid");
  if (!grid) return;
  grid.innerHTML = projects.map(p => `
    <div class="portfolio-card reveal">
      <span class="portfolio-card__badge portfolio-card__badge--${p.type}">
        ${p.type === "real" ? "✓ Реальный проект" : "Учебный / демо"}
      </span>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="portfolio-card__stack">
        ${p.stack.map(s => `<span class="stack-tag">${s}</span>`).join("")}
      </div>
      <a href="${p.link}" target="${p.link !== "#" ? "_blank" : "_self"}" rel="noopener"
        class="portfolio-card__link"
        ${p.link === "#" ? 'onclick="return false" style="opacity:0.45;cursor:default"' : ""}>
        ${p.link !== "#" ? "Смотреть проект →" : "Скоро появится"}
      </a>
    </div>
  `).join("");
  observeReveal();
}

function initNav() {
  const nav    = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const links  = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  burger.addEventListener("click", () => {
    const open = burger.classList.toggle("open");
    links.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });

  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      burger.classList.remove("open");
      links.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

function observeReveal() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
    }),
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

function addRevealClasses() {
  [".service-card", ".pricing-card", ".trust-card", ".process-step", ".section__header"]
    .forEach(sel => document.querySelectorAll(sel).forEach(el => el.classList.add("reveal")));
}

// Formspree сам обрабатывает форму — показываем красивое сообщение после отправки
function initForm() {
  const form = document.querySelector(".contact__form");
  if (!form) return;

  form.addEventListener("submit", async function(e) {
    e.preventDefault();
    const btn  = form.querySelector("button[type=submit]");
    const orig = btn.textContent;
    btn.textContent = "Отправляю...";
    btn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        form.innerHTML = `
          <div style="text-align:center;padding:3rem 1rem">
            <div style="font-size:3rem;margin-bottom:1rem">✅</div>
            <h3 style="font-family:'Syne',sans-serif;margin-bottom:0.5rem">Заявка отправлена!</h3>
            <p style="color:var(--text-muted);font-size:0.95rem">
              Отвечу в Telegram в течение часа.<br/>
              Если срочно — пишите напрямую:
              <a href="https://t.me/dima_02551" style="color:var(--accent-light)">@dima_02551</a>
            </p>
          </div>
        `;
      } else {
        throw new Error("Ошибка");
      }
    } catch {
      btn.textContent = orig;
      btn.disabled = false;
      alert("Что-то пошло не так. Напишите мне напрямую в Telegram: @dima_02551");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderPortfolio();
  addRevealClasses();
  observeReveal();
  initNav();
  initForm();
});
