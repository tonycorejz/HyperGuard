
// Динамически вытаскивать перевод из .json файлов без костылей
// не получилось, поэтому вот так уот
const RoutePaths = [
    {
        name_ru: "Главная",
        name_en: "Dashboard",
        route: "/"
    },
    {
        name_ru: "Зачисления",
        name_en: "Payments",
        route: "/history"
    },
    {
        name_ru: "Биллинг",
        name_en: "Billing",
        route: "/billing"
    },
    {
        name_ru: "Поддержка",
        name_en: "Support",
        route: "/support"
    }
];

export default RoutePaths;