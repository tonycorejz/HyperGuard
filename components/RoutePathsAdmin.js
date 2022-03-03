
// Динамически вытаскивать перевод из .json файлов без костылей
// не получилось, поэтому вот так уот
const RoutePathsAdmin = [
    {
        name_ru: "Пользователи",
        name_en: "Users",
        route: "/admin/users"
    },
    {
        name_ru: "Рекламные баннеры",
        name_en: "Ad. Banners",
        route: "/admin/marketing"
    },
    {
        name_ru: "Зачисления",
        name_en: "Payments",
        route: "/admin/history"
    },
    {
        name_ru: "Биллинг",
        name_en: "Billing",
        route: "/admin/billing"
    },
    {
        name_ru: "Поддержка",
        name_en: "Support",
        route: "/admin/support"
    },
    {
        name_ru: "Товары",
        name_en: "Services",
        route: "/admin/services"
    }
];

export default RoutePathsAdmin;