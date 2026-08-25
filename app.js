/**
 * Свадебное приглашение — SPA-приложение с hash-роутером.
 * Все страницы рендерятся внутри #app без перезагрузки.
 */
(function () {
    'use strict';

    // --- Ссылки на DOM ---
    var app = document.getElementById('app');

    // --- Состояние ---
    var currentGuestSlug = null;

    // --- Утилиты ---

    /** Получить хэш без # */
    function getHash() {
        return window.location.hash.replace(/^#\/?/, '');
    }

    /** Найти гостя по slug */
    function findGuest(slug) {
        return weddingData.guests.find(function (g) { return g.slug === slug; });
    }

    /** SVG-иконка «открыть в картах» */
    function mapIcon() {
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>';
    }

    /** Экранирование HTML */
    function esc(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    /** Заменить «Рётэй» в тексте на кликабельную ссылку */
    function linkifyRyotei(text) {
        var menuUrl = weddingData.links.restaurantMenu;
        var escaped = esc(text);
        return escaped.replace(/Рётэй/g, '<a href="' + menuUrl + '" target="_blank" rel="noopener" class="ryotei-link">Рётэй</a>');
    }

    // --- Рендер шапки ---
    function renderHeader(show) {
        var hash = getHash();
        var slug = currentGuestSlug;
        var isInvitation = /^[\w-]+$/.test(hash) && hash !== 'plan';
        var isInvitationPlan = /^[\w-]+\/plan$/.test(hash);

        if (isInvitation || isInvitationPlan) {
            slug = hash.replace(/\/plan$/, '');
        }

        var planLink = slug ? '#/' + slug + '/plan' : '#/plan';
        var menuUrl = weddingData.links.restaurantMenu;

        return '<header class="site-header ' + (show ? 'visible' : '') + '"' +
            (show ? ' style="transition: none;"' : '') + '>' +
            '<a href="' + planLink + '">План</a>' +
            '<a href="' + menuUrl + '" target="_blank" rel="noopener">Меню ресторана</a>' +
            '</header>';
    }

    // --- Шаблон страницы: планы / 404 ---
    function pageShell(headerShown, innerHtml) {
        return '<div class="app-wrapper page-ornament">' +
            renderHeader(headerShown) +
            '<div class="page-content fade-enter">' +
            innerHtml +
            '</div>' +
            '</div>';
    }

    /** Активировать fade-анимацию после вставки в DOM */
    function activateFadeIn() {
        requestAnimationFrame(function () {
            var el = document.querySelector('.fade-enter');
            if (el) el.classList.add('active');
        });
    }

    // ============================================================
    //  Страницы
    // ============================================================

    // --- Главная: форма входа по имени ---
    function renderHome() {
        var menuUrl = weddingData.links.restaurantMenu;
        var html = '<div class="app-wrapper page-ornament">' +
            '<div class="page-content fade-enter">' +
            '<h1 class="page-title">Приглашаем Вас на свадьбу<br>Дмитрия и Екатерины</h1>' +
            '<p class="home-subtitle">Введите ваше имя для входа</p>' +
            '<div class="home-form">' +
            '<input type="text" id="guest-name-input" class="home-input" placeholder="Введите ваше имя (например: Ксения)" autocomplete="off">' +
            '<button id="guest-submit-btn" class="home-btn">Открыть</button>' +
            '</div>' +
            '<p id="home-error" class="home-error">Имя не найдено. Проверьте правильность написания.</p>' +
            '<div class="home-links">' +
            '<a href="#/plan" class="home-link">План</a>' +
            '<a href="' + menuUrl + '" target="_blank" rel="noopener" class="home-link">Меню ресторана</a>' +
            '</div>' +
            '</div></div>';
        return html;
    }

    /** Инициализация логики формы входа */
    function initHomeLogic() {
        var input = document.getElementById('guest-name-input');
        var btn = document.getElementById('guest-submit-btn');
        var errorEl = document.getElementById('home-error');

        if (!input || !btn || !errorEl) return;

        function attemptLogin() {
            var value = input.value.trim().toLowerCase();
            if (!value) {
                errorEl.classList.add('visible');
                return;
            }

            var found = weddingData.guests.find(function (g) {
                if (g.welcomeName.toLowerCase() === value) return true;
                return g.aliases && g.aliases.some(function (a) { return a.toLowerCase() === value; });
            });

            if (found) {
                errorEl.classList.remove('visible');
                window.location.hash = '#/' + found.slug;
            } else {
                errorEl.classList.add('visible');
            }
        }

        btn.addEventListener('click', attemptLogin);
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                attemptLogin();
            }
        });

        // Скрыть ошибку при начале ввода
        input.addEventListener('input', function () {
            errorEl.classList.remove('visible');
        });
    }

    // --- Страница приглашения (конверт + карточка) ---
    function renderInvitation(slug) {
        var guest = findGuest(slug);
        if (!guest) return renderNotFound();

        currentGuestSlug = slug;
        var envelopeBg = 'templates/envelope.jpg';
        var cardBg = 'templates/invitation_card.jpg';
        var menuUrl = weddingData.links.restaurantMenu;

        var html = '<div class="invitation-wrapper">';

        // Ограничивающий контейнер для конверта и карточки
        html += '<div class="invitation-card-container">';

        // Слой «Конверт»
        html += '<div class="envelope-layer" id="envelope-layer" style="background-image: url(\'' + envelopeBg + '\')">';
        html += '<div class="seal-container" id="seal-btn">';
        html += '<div class="seal-pulse"></div>';
        html += '<div class="seal-hitbox" role="button" aria-label="Открыть приглашение" tabindex="0"></div>';
        html += '</div>';
        html += '</div>';

        // Слой «Карточка» (изначально скрыт)
        html += '<div class="card-layer" id="card-layer" style="background-image: url(\'' + cardBg + '\')">';
        html += '<div class="card-content">';
        html += '<div class="card-inner">';
        html += '<h1>Приглашаем Вас,<br>' + esc(guest.welcomeName) + ',<br>на свадьбу Дмитрия и Екатерины</h1>';
        html += '<p>Предлагаем ознакомиться с <span class="nowrap">информацией по мероприятию</span></p>';
        html += '<div>';
        html += '<a href="' + menuUrl + '" target="_blank" rel="noopener" class="card-btn">Меню ресторана</a>';
        html += '<a href="#/' + slug + '/plan" class="card-btn">Индивидуальный план</a>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        html += '</div>'; // .invitation-card-container
        html += '</div>'; // .invitation-wrapper

        return html;
    }

    /** Инициализация анимации конверта */
    function initEnvelopeAnimation() {
        var envelope = document.getElementById('envelope-layer');
        var card = document.getElementById('card-layer');
        var seal = document.getElementById('seal-btn');

        if (!envelope || !card || !seal) return;

        var envelopeImg = new Image();
        envelopeImg.src = 'templates/envelope.jpg';

        function onEnvelopeReady() {
            envelope.style.display = '';
        }

        function onEnvelopeError() {
            envelope.style.display = '';
        }

        if (envelopeImg.complete) {
            onEnvelopeReady();
        } else {
            envelope.style.display = 'none';
            envelopeImg.onload = onEnvelopeReady;
            envelopeImg.onerror = onEnvelopeError;
        }

        function openEnvelope() {
            if (envelope.classList.contains('sliding-up')) return;

            envelope.classList.add('sliding-up');

            // Показываем карточку через небольшую задержку
            setTimeout(function () {
                card.classList.add('visible');
            }, 100);

            // После завершения анимации — скрываем конверт
            setTimeout(function () {
                envelope.classList.add('hidden');
            }, 1300);
        }

        seal.addEventListener('click', openEnvelope);
        seal.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openEnvelope();
            }
        });
    }

    // --- Общий план ---
    function renderGeneralPlan() {
        var planEvents = weddingData.generalPlan;
        var backLink = currentGuestSlug ? '#/' + currentGuestSlug : '#/';
        var backText = currentGuestSlug ? 'Назад к приглашению' : 'Назад к форме входа';

        var inner = '<h1 class="page-title">План мероприятия</h1>';

        planEvents.forEach(function (day) {
            inner += '<div class="plan-day">';
            inner += '<div class="plan-day-label">' + esc(day.dayLabel) + '</div>';

            day.events.forEach(function (ev) {
                inner += '<div class="plan-event">';
                inner += '<div class="plan-time">' + esc(ev.time) + '</div>';
                inner += '<div class="plan-details">';
                inner += '<p class="plan-desc">' + linkifyRyotei(ev.desc) + '</p>';
                inner += '<p class="plan-location">' + esc(ev.location) + '</p>';
                if (ev.mapLink) {
                    inner += '<a href="' + ev.mapLink + '" target="_blank" rel="noopener" class="map-link-icon">' + mapIcon() + ' Открыть в картах</a>';
                }
                inner += '</div>';
                inner += '</div>';
            });

            inner += '</div>';
        });

        inner += '<div class="back-link"><a href="' + backLink + '">' + esc(backText) + '</a></div>';

        return pageShell(true, inner);
    }

    // --- Индивидуальный план ---
    function renderIndividualPlan(slug) {
        var guest = findGuest(slug);
        if (!guest) return renderNotFound();

        currentGuestSlug = slug;
        var planEvents = weddingData.generalPlan;

        var inner = '<h1 class="page-title">План для ' + esc(guest.genitiveName || guest.welcomeName) + '</h1>';

        // Общий план
        planEvents.forEach(function (day) {
            inner += '<div class="plan-day">';
            inner += '<div class="plan-day-label">' + esc(day.dayLabel) + '</div>';

            day.events.forEach(function (ev) {
                inner += '<div class="plan-event">';
                inner += '<div class="plan-time">' + esc(ev.time) + '</div>';
                inner += '<div class="plan-details">';
                inner += '<p class="plan-desc">' + linkifyRyotei(ev.desc) + '</p>';
                inner += '<p class="plan-location">' + esc(ev.location) + '</p>';
                if (ev.mapLink) {
                    inner += '<a href="' + ev.mapLink + '" target="_blank" rel="noopener" class="map-link-icon">' + mapIcon() + ' Открыть в картах</a>';
                }
                inner += '</div>';
                inner += '</div>';
            });

            inner += '</div>';
        });

        // Персональные данные заселения/выезда
        if (guest.checkIn || guest.checkOut) {
            inner += '<div class="stay-section">';
            inner += '<div class="stay-title">Размещение</div>';

            if (guest.checkIn) {
                inner += '<div class="stay-item"><strong>Заезд:</strong> ' +
                    esc(guest.checkIn.date) + ', ' + esc(guest.checkIn.time);
                if (guest.checkIn.address) {
                    inner += '<br>' + esc(guest.checkIn.address);
                }
                inner += '</div>';
            }

            if (guest.checkOut) {
                inner += '<div class="stay-item"><strong>Выезд:</strong> ' +
                    esc(guest.checkOut.date) + ', ' + esc(guest.checkOut.time) + '</div>';
            }

            inner += '</div>';
        }

        inner += '<div class="back-link"><a href="#/' + slug + '">Назад к приглашению</a></div>';

        return pageShell(false, inner);
    }

    // --- 404 ---
    function renderNotFound() {
        var inner = '<h1 class="error-title">Ой, приглашение не найдено!</h1>' +
            '<p class="error-text">Возможно, ссылка устарела или в ней опечатка.</p>' +
            '<a href="#/" class="error-btn">Вернуться к форме входа</a>';

        return pageShell(true, inner);
    }

    // ============================================================
    //  Роутер
    // ============================================================

    function route() {
        var hash = getHash();
        document.body.classList.remove('no-scroll');
        document.body.style.overflow = '';

        // Пустой хэш → главная
        if (!hash || hash === '/') {
            currentGuestSlug = null;
            document.body.classList.add('no-scroll');
            app.innerHTML = renderHome();
            activateFadeIn();
            initHomeLogic();
            return;
        }

        // #/plan — общий план
        if (hash === 'plan') {
            app.innerHTML = renderGeneralPlan();
            activateFadeIn();
            return;
        }

        // #/{slug}/plan — индивидуальный план
        var planMatch = hash.match(/^([\w-]+)\/plan$/);
        if (planMatch) {
            var slugForPlan = planMatch[1];
            var guest = findGuest(slugForPlan);
            if (!guest) {
                app.innerHTML = renderNotFound();
                activateFadeIn();
                return;
            }
            app.innerHTML = renderIndividualPlan(slugForPlan);
            activateFadeIn();
            return;
        }

        // #/{slug} — страница приглашения (или 404)
        var slugMatch = hash.match(/^([\w-]+)$/);
        if (slugMatch) {
            var slug = slugMatch[1];
            var guestData = findGuest(slug);

            if (!guestData) {
                app.innerHTML = renderNotFound();
                activateFadeIn();
                return;
            }

            currentGuestSlug = slug;
            document.body.classList.add('no-scroll');
            app.innerHTML = renderInvitation(slug);

            // Инициализация анимации конверта
            initEnvelopeAnimation();
            return;
        }

        // Всё остальное → 404
        app.innerHTML = renderNotFound();
        activateFadeIn();
    }

    // --- Запуск ---
    window.addEventListener('hashchange', route);

    // При первой загрузке: если хэша нет или он пустой — ставим #/
    // hashchange сработает для пустого хэша и #, но не для уже существующего #/
    if (!window.location.hash || window.location.hash === '#') {
        window.location.hash = '#/';
    } else {
        route();
    }

})();
