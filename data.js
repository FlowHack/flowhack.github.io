/**
 * Централизованный файл данных свадьбы Дмитрия и Екатерины.
 * Все тексты, даты, гости и ссылки хранятся здесь.
 * Для правки плана достаточно изменить этот файл — верстка не затрагивается.
 */
const weddingData = {
    /**
     * Общий план мероприятия.
     */
    generalPlan: [
        {
            date: "03.10.2026",
            dayLabel: "Суббота, 3 октября",
            events: [
                {
                    time: "15:50",
                    desc: "Выезд в ЗАГС",
                    location: "г. Краснодар, ул. им. Петра Метальникова, 28",
                    mapLink: "https://yandex.ru/maps/-/CTDJrZNR"
                },
                {
                    time: "16:30 – 17:00",
                    desc: "Фотосессия возле ЗАГСа",
                    location: "г. Краснодар, ул. Офицерская, 47",
                    mapLink: "https://yandex.ru/maps/-/CTDJr0p6"
                },
                {
                    time: "17:00",
                    desc: "Церемония регистрации брака",
                    location: "г. Краснодар, ул. Офицерская, 47",
                    mapLink: "https://yandex.ru/maps/-/CTDJr0p6"
                },
                {
                    time: "17:30",
                    desc: "Трансфер до парка «Краснодар»",
                    location: "г. Краснодар, ул. Офицерская, 47",
                    mapLink: "https://yandex.ru/maps/-/CTDJr0p6"
                },
                {
                    time: "18:00 – 19:30",
                    desc: "Фотосессия в парке «Краснодар»",
                    location: "Парк «Краснодар»",
                    mapLink: "https://yandex.ru/maps/org/park_krasnodar/77426465118/"
                },
                {
                    time: "20:30 – 21:00",
                    desc: "Сбор гостей",
                    location: "г. Краснодар, ул. им. Петра Метальникова, 28",
                    mapLink: "https://yandex.ru/maps/-/CTDJrZNR"
                }
            ]
        },
        {
            date: "04.10.2026",
            dayLabel: "Воскресенье, 4 октября",
            events: [
                {
                    time: "12:00",
                    desc: "Выезд в парк «Краснодар»",
                    location: "г. Краснодар, ул. им. Петра Метальникова, 28",
                    mapLink: "https://yandex.ru/maps/-/CTDJrZNR"
                },
                {
                    time: "13:45",
                    desc: "Заход в «Японский сад»",
                    location: "Парк «Краснодар», Японский сад",
                    mapLink: "https://yandex.ru/maps/org/yaponskiy_sad/38080582022/"
                },
                {
                    time: "14:15 – 16:15",
                    desc: "Посещение ресторана «Рётэй»",
                    location: "г. Краснодар, ул. Длинная, 58",
                    mapLink: "https://yandex.ru/maps/org/ryotey/44285147668/"
                },
                {
                    time: "с 16:15",
                    desc: "Свободная прогулка по парку «Краснодар» и Японскому саду",
                    location: "Парк «Краснодар»",
                    mapLink: "https://yandex.ru/maps/org/park_krasnodar/77426465118/"
                }
            ]
        }
    ],

    /**
     * Список приглашённых гостей.
     * slug — часть URL хэша: #/{slug}
     * welcomeName — имя в обращении на карточке
     * gender — пол гостя: 'female' | 'male' (определяет персональный дресс-код)
     * aliases — уменьшительно-ласкательные формы имени (для входа)
     * checkIn / checkOut — персональные данные по заселению/выезду (для индивидуального плана)
     */
    guests: [
        {
            slug: "olga",
            welcomeName: "Ольга",
            gender: "female",
            genitiveName: "Ольги",
            aliases: ["оля", "оленька", "олечка"],
            checkIn: {
                date: "02.10.2026",
                time: "после 14:00",
                address: "г. Краснодар, ул. им. Евгении Жигуленко, 9",
                mapLink: "https://yandex.ru/maps/-/CTDJrSNA"
            },
            checkOut: {
                date: "06.10.2026",
                time: "до 12:00"
            }
        },
        {
            slug: "yuriy",
            welcomeName: "Юрий",
            gender: "male",
            genitiveName: "Юрия",
            aliases: ["юра", "юрочка"],
            checkIn: {
                date: "02.10.2026",
                time: "после 14:00",
                address: "г. Краснодар, ул. им. Евгении Жигуленко, 9",
                mapLink: "https://yandex.ru/maps/-/CTDJrSNA"
            },
            checkOut: {
                date: "06.10.2026",
                time: "до 12:00"
            }
        },
        {
            slug: "kseniya",
            welcomeName: "Ксения",
            gender: "female",
            genitiveName: "Ксении",
            aliases: ["ксюша", "ксю", "ксенька"],
            checkIn: {
                date: "02.10.2026",
                time: "после 14:00",
                address: "г. Краснодар, ул. им. Евгении Жигуленко, 9",
                mapLink: "https://yandex.ru/maps/-/CTDJrSNA"
            },
            checkOut: {
                date: "06.10.2026",
                time: "до 12:00"
            }
        },
        {
            slug: "tatyana",
            welcomeName: "Татьяна",
            gender: "female",
            genitiveName: "Татьяны",
            aliases: ["таня", "танечка", "танюша"],
            checkIn: {
                date: "02.10.2026",
                time: "после 16:00",
                address: "г. Краснодар, ул. им. Петра Метальникова, 28",
                mapLink: "https://yandex.ru/maps/-/CTDJrZNR"
            },
            checkOut: {
                date: "04.10.2026",
                time: "до 11:00"
            }
        },
        {
            slug: "sergey",
            welcomeName: "Сергей",
            gender: "male",
            genitiveName: "Сергея",
            aliases: ["серёжа", "серёжка"],
            checkIn: {
                date: "02.10.2026",
                time: "после 16:00",
                address: "г. Краснодар, ул. им. Петра Метальникова, 28",
                mapLink: "https://yandex.ru/maps/-/CTDJrZNR"
            },
            checkOut: {
                date: "04.10.2026",
                time: "до 11:00"
            }
        }
    ],

    /**
     * Внешние ссылки.
     */
    links: {
        restaurantMenu: "https://ryotei.ru/atmos/"
    },

    /**
     * Дресс-код мероприятия.
     * common — общее правило для всех дней
     * female / male — правила по полу гостя
     * secondDay — общее правило на второй день
     */
    dressCode: {
        common: "Спортивный и пляжный стиль не предусмотрен на оба дня.",
        female: {
            title: "Для девушек",
            rules: [
                "Исключаем чёрный, белый и красный цвета.",
                "Единственное исключение для чёрного — строгий официальный костюм."
            ]
        },
        male: {
            title: "Для мужчин",
            rules: [
                "В первый день воздержитесь от кроссовок и сандалей."
            ]
        },
        secondDay: {
            title: "Второй день",
            rules: [
                "Обязательны кроссовки или полуспортивная обувь.",
                "Туфли, босоножки и балетки лучше оставить дома."
            ]
        }
    },

    /**
     * Общая информация о торжестве.
     */
    info: {
        groomName: "Дмитрий",
        brideName: "Екатерина",
        weddingDate: "03 октября 2026 года"
    }
};
