import { writable } from 'svelte/store';

interface Strings {
    "Serving lines": string
    "No Service Alerts": string
    "English": string
    "Brought to you by Livable Portland": string
    "Resources": string
    "Full System Map": string
    "Download the UMO App": string
    "Adopt this stop": string
}

export const strings: { [k: string]: Strings } = {
    // English
    "en": {
        "Serving lines": "Serving lines",
        "No Service Alerts": "No Service Alerts 😎",
        "English": "English",
        "Brought to you by Livable Portland": "Brought to you by Livable Portland",
        "Resources": "Resources",
        "Full System Map": "Full System Map",
        "Download the UMO App": "Download the UMO App",
        "Adopt this stop": "Adopt this stop",
    },
    // Spanish
    "es": {
        "Serving lines": "Líneas de servicio",
        "No Service Alerts": "Sin alertas de servicio 😎",
        "English": "Español",
        "Brought to you by Livable Portland": "Presentado por Livable Portland",
        "Resources": "Recursos",
        "Full System Map": "Mapa completo del sistema",
        "Download the UMO App": "Descarga la aplicación UMO",
        "Adopt this stop": "Adopta esta parada",

    },
    // Arabic
    "ar": {
        "Serving lines": "خطوط التقديم",
        "No Service Alerts": "😎 لا تنبيهات الخدمة",
        "English": "عربي",
        "Brought to you by Livable Portland": "مقدم لكم من Livable Portland",
        "Resources": "موارد",
        "Full System Map": "خريطة النظام الكاملة",
        "Download the UMO App": "قم بتنزيل تطبيق UMO",
        "Adopt this stop": "تبني هذه المحطة",
    },
    // Somali
    "so": {
        "Serving lines": "Khadadka u adeega",
        "No Service Alerts": "Ogeysiis Adeeg ma jiro 😎",
        "English": "Soomaali",
        "Brought to you by Livable Portland": "Waxaa kuu keenay Livable Portland",
        "Resources": "Khayraadka",
        "Full System Map": "Khariidadda Nidaamka oo Buuxa",
        "Download the UMO App": "Soo deji UMO App",
        "Adopt this stop": "Qaado joogsigan",
    },
    // Portuguese
    "pt": {
        "Serving lines": "Linhas de veiculação",
        "No Service Alerts": "Nenhum alerta de serviço 😎",
        "English": "Português",
        "Brought to you by Livable Portland": "Trazido a você por Livable Portland",
        "Resources": "Recursos",
        "Full System Map": "Mapa completo do sistema",
        "Download the UMO App": "Baixe o aplicativo UMO",
        "Adopt this stop": "Adote esta parada",
    },
    // French
    "fr": {
        "Serving lines": "Lignes de service",
        "No Service Alerts": "Aucune alerte de service 😎",
        "English": "Français",
        "Brought to you by Livable Portland": "Présenté par Livable Portland",
        "Resources": "Ressources",
        "Full System Map": "Carte complète du système",
        "Download the UMO App": "Téléchargez l'application UMO",
        "Adopt this stop": "Adoptez cet arrêt",
    },
    // Farsi
    "fa": {
        "Serving lines": "خطوط سرویس دهی",
        "No Service Alerts": "😎 هیچ هشدار خدماتی وجود ندارد",
        "English": "فارسی",
        "Brought to you by Livable Portland": "توسط Livable Portland برای شما آورده شده است",
        "Resources": "منابع",
        "Full System Map": "نقشه کامل سیستم",
        "Download the UMO App": "اپلیکیشن UMO را دانلود کنید",
        "Adopt this stop": "این توقف را اتخاذ کنید",
    },
    // Pashto
    "ps": {
        "Serving lines": "د خدمت کولو لینونه",
        "No Service Alerts": "😎 هیڅ خدمت خبرتیا نشته",
        "English": "پښتو",
        "Brought to you by Livable Portland": "د ژوند وړ پورټلینډ لخوا تاسو ته راوړل شوی",
        "Resources": "سرچینې",
        "Full System Map": "د بشپړ سیسټم نقشه",
        "Download the UMO App": "د UMO اپلیکیشن ډاونلوډ کړئ",
        "Adopt this stop": "دا تمځای غوره کړئ",
    },
}

function defaultLanguageStrings() {
    let prefix = (typeof window !== "undefined" && window.localStorage.getItem("language"))
        ? window.localStorage.getItem("language")
        : typeof navigator === "undefined" ? "en" : navigator.language.substring(0, 2)

    return [prefix, strings[prefix] ? strings[prefix] : strings["en"]]
}

export const stringStore = writable(defaultLanguageStrings());

export function setLanguage(language: string) {
    stringStore.set([language, strings[language]])
    window.localStorage.setItem("language", language)
}