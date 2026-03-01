/* ============================================
   ПОРТФОЛИО — ДОБАВЛЯЙ СЮДА НОВЫЕ КЕЙСЫ
   Просто допиши объект в массив — карточка
   появится автоматически. Больше ничего не трогай.
   ============================================

   Поля:
     title   — название проекта
     desc    — краткое описание (1–2 предложения)
     stack   — массив инструментов/технологий
     link    — ссылка на проект (или "#" если нет)
     type    — "real" (реальный) или "demo" (учебный)
============================================ */

const projects = [
  // ✅ РЕАЛЬНЫЙ ПРОЕКТ — замени ссылку и описание на свои
  {
    title: "Telegram-бот для записи клиентов",
    desc: "Бот для записи на приём к специалисту. Выбор времени, подтверждение, напоминания за 2 часа. Интеграция с Google Sheets.",
    stack: ["Python", "aiogram", "Google Sheets API"],
    link: "https://t.me/ВАШ_БОТ",  // ← замени на свою ссылку
    type: "real"
  },

  // 👇 ДЕМО-КЕЙСЫ — можешь заменить на свои реальные работы
  {
    title: "Лендинг для онлайн-школы",
    desc: "Одностраничный сайт для курсов по дизайну. Форма заявки, секция с преподавателями, FAQ и блок отзывов.",
    stack: ["HTML", "CSS", "JavaScript", "Netlify Forms"],
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
  },
  {
    title: "Бот-автоворонка для инфобизнеса",
    desc: "Приветственная цепочка сообщений, выдача лид-магнита, серия прогревающих писем, продажа курса.",
    stack: ["Python", "aiogram", "ChatGPT API"],
    link: "#",
    type: "demo"
  }
];

/* ============================================
   РЕНДЕР КАРТОЧЕК ПОРТФОЛИО — не трогай
   ============================================ */
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
      <a
        href="${p.link}"
        target="${p.link !== "#" ? "_blank" : "_self"}"
        rel="noopener"
        class="portfolio-card__link"
        ${p.link === "#" ? 'onclick="return false" style="opacity:0.45;cursor:default"' : ""}
      >
        ${p.link !== "#" ? "Смотреть проект →" : "Скоро появится"}
      </a>
    </div>
  `).join("");

  // Запускаем анимацию появления для новых карточек
  observeReveal();
}

/* ============================================
   НАВИГАЦИЯ — скролл и бургер
   ============================================ */
function initNav() {
  const nav     = document.getElementById("nav");
  const burger  = document.getElementById("burger");
  const links   = document.getElementById("navLinks");

  // Тень при скролле
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  // Бургер-меню
  burger.addEventListener("click", () => {
    const open = burger.classList.toggle("open");
    links.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });

  // Закрыть меню при клике на ссылку
  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      burger.classList.remove("open");
      links.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

/* ============================================
   ПЛАВНОЕ ПОЯВЛЕНИЕ СЕКЦИЙ
   ============================================ */
function observeReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

/* ============================================
   ДОБАВИТЬ КЛАССЫ REVEAL К СЕКЦИЯМ
   ============================================ */
function addRevealClasses() {
  const selectors = [
    ".service-card",
    ".pricing-card",
    ".trust-card",
    ".process-step",
    ".section__header"
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add("reveal"));
  });
}

/* ============================================
   ФОРМА — уведомление об успешной отправке
   ============================================ */
function initForm() {
  const form = document.querySelector(".contact__form");
  if (!form) return;

  // Netlify редиректит на /success по умолчанию.
  // Чтобы показать сообщение без перехода — перехватываем сабмит
  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const btn = form.querySelector("button[type=submit]");
    const orig = btn.textContent;
    btn.textContent = "Отправляю...";
    btn.disabled = true;

    try {
      const data = new FormData(form);
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString()
      });

      if (response.ok) {
        form.innerHTML = `
          <div style="text-align:center;padding:3rem 1rem">
            <div style="font-size:3rem;margin-bottom:1rem">✅</div>
            <h3 style="font-family:'Syne',sans-serif;margin-bottom:0.5rem">Заявка отправлена!</h3>
            <p style="color:var(--text-muted);font-size:0.95rem">
              Отвечу в Telegram в течение часа.<br/>
              Если срочно — пишите напрямую: <a href="https://t.me/Digital_Master_onebot" style="color:var(--accent-light)">@dima_02551</a>
            </p>
          </div>
        `;
      } else {
        throw new Error("Ошибка сервера");
      }
    } catch {
      btn.textContent = orig;
      btn.disabled = false;
      alert("Что-то пошло не так. Напишите мне напрямую в Telegram: @dima_02551");
    }
  });
}

/* ============================================
   ЗАПУСК
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderPortfolio();   // рендер кейсов
  addRevealClasses();  // классы для анимации
  observeReveal();     // IntersectionObserver
  initNav();           // навигация
  initForm();          // форма заявки
});
