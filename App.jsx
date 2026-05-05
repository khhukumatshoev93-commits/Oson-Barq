import React, { useMemo, useState } from "react";

const installers = [
  { name: "Solar Tajik Energy", rating: 4.8, projects: 76, mw: "1.8 MW", regions: "Dushanbe · RRP · Khatlon", price: "$4,180", warranty: "5 years", days: "7 days", score: 92 },
  { name: "Nur Solar Group", rating: 4.7, projects: 52, mw: "1.1 MW", regions: "Sughd · Dushanbe", price: "$3,950", warranty: "3 years", days: "10 days", score: 86 },
  { name: "PamEnergy Solar", rating: 4.9, projects: 34, mw: "0.9 MW", regions: "GBAO · Rasht", price: "$4,300", warranty: "6 years", days: "8 days", score: 94 },
];

const projectDots = [
  { city: "Dushanbe", x: "53%", y: "61%", count: 112 },
  { city: "Rasht", x: "62%", y: "45%", count: 89 },
  { city: "Khujand", x: "45%", y: "24%", count: 74 },
  { city: "Khorog", x: "77%", y: "76%", count: 61 },
  { city: "Khatlon", x: "43%", y: "72%", count: 96 },
];

const electricianRegions = [
  { name: "Мурғоб", specialists: 8, status: "Remote-ready" },
  { name: "Ашт", specialists: 14, status: "Verified" },
  { name: "Шаҳритус", specialists: 11, status: "Growing" },
  { name: "Рашт", specialists: 19, status: "Verified" },
];

const financeOptionIds = ["paygo", "alif", "loan"];

const i18n = {
  ru: {
    nav: ["Для домовладельцев", "Для установщиков", "Финансирование", "Поставщики", "Карта проектов"],
    login: "Войти",
    getStarted: "Начать",
    missionLabel: "Миссия",
    missionTitle: "Чистая энергия. Реальный эффект.",
    missionText: "Наша миссия — сделать солнечную энергию в Таджикистане доступной, прозрачной и финансируемой для каждого дома, бизнеса и региона.",
    heroTitle: "Сравните. Профинансируйте. Перейдите на солнце.",
    heroAccent: "Перейдите на солнце.",
    heroBody: "Oson Barq — цифровая платформа для Таджикистана, которая помогает найти лучшее солнечное решение, сравнить предложения проверенных установщиков и получить гибкое финансирование.",
    heroCta: "Получить бесплатный расчет",
    heroHow: "Как это работает",
    smart: "Умный путь к солнечной энергии",
    smartBody: "Экономьте деньги, повышайте комфорт и создавайте устойчивое будущее.",
    badges: ["🛡️ Проверенные установщики", "🏷️ Лучшие цены", "✅ Прозрачно и безопасно", "🍃 Зеленое будущее"],
    stats: ["Проверенные установщики", "Завершенные проекты", "Довольные клиенты", "Средняя экономия", "Скрытые платежи"],
    howTitle: "Как работает Oson Barq",
    howSteps: [["📋", "1. Подайте заявку", "Расскажите о вашей потребности в энергии за несколько простых шагов."], ["👥", "2. Получите предложения", "Проверенные компании конкурируют за лучшие условия."], ["⚖️", "3. Сравните и выберите", "Сравните цены, системы и отзывы."], ["💳", "4. Финансирование и установка", "Получите варианты финансирования и профессиональную установку."], ["☀️", "5. Производите и экономьте", "Производите чистую энергию и экономьте годами."]],
    requestTitle: "1. Подача заявки",
    requestSubtitle: "Расскажите о вашем объекте, и получите лучшие предложения от проверенных установщиков.",
    requestProject: "Расскажите о вашем проекте",
    where: "Где будет установка?",
    addressPlaceholder: "Введите адрес",
    detectLocation: "📍 Определить геолокацию",
    propertyType: "Тип объекта",
    propertyOptions: ["🏠 Дом", "🏬 Магазин", "🚜 Ферма", "••• Другое"],
    monthlyBill: "Средний счет за электроэнергию в месяц",
    goalsLabel: "Ваша цель",
    goals: ["🏡 Снизить расходы", "⛰️ Резерв при отключениях", "☀️ Энергонезависимость", "🍃 Экологичность"],
    installPlace: "Место установки",
    installPlaces: ["🏠 Крыша", "⛰️ Земля", "☷ Другое"],
    uploadPhotos: "Загрузите фото",
    uploadBox: "Загрузить фото\nJPG, PNG до 10MB",
    photoLabels: ["Крыша", "Участок", "Точка подключения", "+ Добавить еще"],
    loadLabel: "Нагрузка: что планируете подключать?",
    loads: ["☀ Освещение", "▣ Холодильник", "🚜 Насос", "▣ Телевизор", "❄ Кондиционер", "▯ Зарядка телефона"],
    comments: "Дополнительные комментарии...",
    cancel: "Отменить",
    submit: "Отправить заявку",
    whySubmit: "Почему стоит подать заявку через Oson Barq?",
    whySubmitItems: ["Получите несколько конкурентных предложений", "Сравните цены и системы", "Только проверенные установщики", "Без обязательств и скрытых платежей", "Быстро, удобно и надежно"],
    financeTitle: "4. Финансирование и экономия",
    financeSubtitle: "Выберите лучший способ оплаты и начните экономить с солнечной энергией.",
    choosePayment: "Выберите способ оплаты",
    poweredBy: "При поддержке",
    recommended: "Рекомендуем",
    monthlyPayment: "Ежемесячный платеж",
    selected: "Выбрано",
    choose: "Выбрать",
    financeOptions: { paygo: { name: "PAYGO (Рассрочка)", price: "920 сомони / мес.", bullets: ["Низкий первоначальный взнос", "Гибкий ежемесячный платеж", "Для домохозяйств"] }, alif: { name: "Зеленая рассрочка Alif", price: "1 150 сомони / мес.", bullets: ["Низкий ежемесячный платеж", "До 36 месяцев", "Быстрое одобрение"] }, loan: { name: "Стандартный кредит", price: "1 380 сомони / мес.", bullets: ["Фиксированный платеж", "До 60 месяцев", "Налоговый вычет"] } },
    installersTitle: "Проверенные компании конкурируют за клиента",
    installersText: "Клиент видит не только цену, но и опыт компании: проекты на карте, рейтинг, гарантию и сроки.",
    viewProjects: "Посмотреть проекты",
    mapTitle: "Карта реализованных проектов партнеров",
    mapText: "Клиент видит, где компании уже работали — это строит доверие быстрее любой рекламы.",
    suppliersTitle: "Поставщики и местный завод внутри платформы",
    suppliersText: "Oson Barq может стать каналом спроса для локального производства, поставщиков и installers.",
    electriciansTitle: "Реестр электромонтажников по всей стране",
    electriciansText: "Любой квалифицированный электромонтажник из Мурғоб, Ашт, Шаҳритус, Рашт или другого района может зарегистрироваться, получить статус и сотрудничать с компаниями на платформе.",
    finalTitle: "Не солнечный магазин. Рыночная инфраструктура.",
    finalText: "Oson Barq может превратить разрозненные продажи солнечных систем в прозрачный, финансируемый и масштабируемый рынок распределённой энергетики.",
    startPilot: "Начать пилот",
  },
  tj: {},
  en: {},
  zh: {},
};

i18n.tj = { ...i18n.ru, nav: ["Барои соҳибони хона", "Барои насбкунандагон", "Маблағгузорӣ", "Таъминкунандагон", "Харитаи лоиҳаҳо"], login: "Ворид шудан", getStarted: "Оғоз кардан", missionLabel: "Рисолат", missionTitle: "Энергияи тоза. Таъсири воқеӣ.", missionText: "Миссияи мо — дастрас, шаффоф ва маблағгузоришаванда кардани энергияи офтобӣ барои ҳар хона, соҳибкорӣ ва минтақаи Тоҷикистон аст.", heroTitle: "Муқоиса кунед. Маблағгузорӣ гиред. Ба офтоб гузаред.", heroAccent: "Ба офтоб гузаред.", heroBody: "Oson Barq платформаи рақамӣ барои Тоҷикистон аст, ки ба шумо барои ёфтани беҳтарин ҳалли офтобӣ, муқоисаи пешниҳодҳои насбкунандагони санҷидашуда ва гирифтани маблағгузории қулай кӯмак мекунад.", heroCta: "Ҳисобкунии ройгон гиред", heroHow: "Чӣ тавр кор мекунад", smart: "Роҳи оқилона ба энергияи офтобӣ", smartBody: "Маблағро сарфа кунед, бароҳатиро зиёд кунед ва ояндаи устувор созед.", requestTitle: "1. Пешниҳоди дархост", requestSubtitle: "Дар бораи объекти худ маълумот диҳед ва аз насбкунандагони санҷидашуда беҳтарин пешниҳодҳоро гиред.", where: "Насб дар куҷо мешавад?", addressPlaceholder: "Суроғаро ворид кунед", detectLocation: "📍 Муайян кардани геолокатсия", propertyOptions: ["🏠 Хона", "🏬 Мағоза", "🚜 Ферма", "••• Дигар"], uploadBox: "Аксҳоро бор кунед\nJPG, PNG то 10MB", financeTitle: "4. Маблағгузорӣ ва сарфа", installersTitle: "Ширкатҳои санҷидашуда барои мизоҷ рақобат мекунанд", mapTitle: "Харитаи лоиҳаҳои шарикон", suppliersTitle: "Таъминкунандагон ва заводи маҳаллӣ дар платформа", electriciansTitle: "Реестри электромонтажникҳо дар тамоми кишвар", finalTitle: "На мағозаи офтобӣ. Инфрасохтори бозор.", startPilot: "Оғози пилот" };

i18n.en = { ...i18n.ru, nav: ["For Homeowners", "For Installers", "Financing", "Suppliers", "Project Map"], login: "Log in", getStarted: "Get Started", missionLabel: "Mission", missionTitle: "Clean Energy. Real Impact.", missionText: "Our mission is to make solar energy in Tajikistan affordable, transparent and financeable for every home, business and region.", heroTitle: "Compare. Finance. Go Solar.", heroAccent: "Go Solar.", heroBody: "Oson Barq is Tajikistan’s digital platform that helps you find the best solar solution, compare offers from trusted installers and access flexible financing.", heroCta: "Get Your Free Quote", heroHow: "How It Works", smart: "The smarter way to switch to solar", smartBody: "Save money, increase comfort and power a sustainable future.", badges: ["🛡️ Trusted Installers", "🏷️ Best Prices", "✅ Secure & Transparent", "🍃 Green Future"], stats: ["Verified Installers", "Projects Completed", "Happy Customers", "Average Savings", "Hidden Fees"], howTitle: "How Oson Barq Works", requestTitle: "1. Submit Your Request", requestSubtitle: "Tell us about your site and receive the best offers from verified installers.", requestProject: "Tell us about your project", where: "Where is the installation?", addressPlaceholder: "Enter address", detectLocation: "📍 Use my location", propertyType: "Property type", propertyOptions: ["🏠 House", "🏬 Shop", "🚜 Farm", "••• Other"], uploadBox: "Upload photos\nJPG, PNG up to 10MB", cancel: "Cancel", submit: "Submit Request", financeTitle: "4. Finance & Save", financeSubtitle: "Choose the best payment option and start saving with solar energy.", financeOptions: { paygo: { name: "PAYGO Installments", price: "920 TJS / month", bullets: ["Low upfront payment", "Flexible monthly payment", "Designed for households"] }, alif: { name: "Alif Green Installment", price: "1,150 TJS / month", bullets: ["Low monthly payment", "Up to 36 months", "Fast approval"] }, loan: { name: "Standard Loan", price: "1,380 TJS / month", bullets: ["Fixed payment", "Up to 60 months", "Clear terms"] } }, installersTitle: "Verified companies compete for customers", installersText: "Customers see not only price, but also company track record, map projects, rating, warranty and delivery time.", viewProjects: "View projects", mapTitle: "Verified partner project map", mapText: "Customers see where companies have already worked — trust grows faster than advertising.", suppliersTitle: "Suppliers and local factory inside the platform", suppliersText: "Oson Barq can become a demand channel for local manufacturing, suppliers and installers.", electriciansTitle: "Electrician registry across the country", electriciansText: "Any qualified electrician from Murghob, Asht, Shahritus, Rasht or other districts can register, receive a status and cooperate with companies on the platform.", finalTitle: "Not a solar shop. Market infrastructure.", finalText: "Oson Barq can turn scattered solar sales into a transparent, financeable and scalable distributed energy market.", startPilot: "Start pilot" };

i18n.zh = { ...i18n.en, nav: ["家庭用户", "安装商", "融资", "供应商", "项目地图"], login: "登录", getStarted: "开始", missionLabel: "使命", missionTitle: "清洁能源 · 真正影响", missionText: "我们的使命是让塔吉克斯坦每个家庭、企业和地区都能获得可负担、透明且可融资的太阳能。", heroTitle: "比较方案。获得融资。使用太阳能。", heroAccent: "使用太阳能。", heroBody: "Oson Barq 是塔吉克斯坦的数字平台，帮助用户寻找最佳太阳能方案，比较可信安装商报价，并获得灵活融资。", heroCta: "获取免费报价", heroHow: "工作流程", smart: "更智能地转向太阳能", smartBody: "节省费用，提升舒适度，助力可持续未来。", requestTitle: "1. 提交申请", requestSubtitle: "告诉我们您的项目情况，并获得认证安装商的最佳报价。", where: "安装地点在哪里？", addressPlaceholder: "输入地址", detectLocation: "📍 使用我的位置", propertyOptions: ["🏠 住宅", "🏬 商店", "🚜 农场", "••• 其他"], uploadBox: "上传照片\nJPG, PNG 最大10MB", financeTitle: "4. 融资与节省", installersTitle: "认证公司竞争客户", mapTitle: "认证合作伙伴项目地图", suppliersTitle: "平台内的供应商和本地工厂", electriciansTitle: "全国电工注册库", finalTitle: "不是太阳能商店，而是市场基础设施。", startPilot: "启动试点" };

function runSmokeTests() {
  console.assert(installers.length === 3, "Expected 3 demo installers");
  console.assert(projectDots.every((p) => p.x.endsWith("%") && p.y.endsWith("%")), "Map points must use percentage coordinates");
  console.assert(electricianRegions.some((r) => r.name === "Мурғоб"), "Remote regions should be represented");
  console.assert(["ru", "tj", "en", "zh"].every((lng) => Boolean(i18n[lng])), "All four languages should exist");
  console.assert(["ru", "tj", "en", "zh"].every((lng) => typeof i18n[lng].uploadBox === "string" && i18n[lng].uploadBox.includes("\n")), "uploadBox must use escaped newline strings");
  console.assert(["ru", "tj", "en", "zh"].every((lng) => i18n[lng].financeOptions.alif.name.length > 0), "Each language must include Alif finance option");
  console.assert(["ru", "tj", "en", "zh"].every((lng) => i18n[lng].nav.length === 5), "Each language must include five nav items");
  return true;
}

function Button({ children, variant = "solid", className = "" }) {
  const base = "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition";
  const styles = variant === "outline" ? "border border-[#0F5B3A]/25 bg-white/60 text-[#0F5B3A] hover:bg-white" : "bg-[#138A46] text-white hover:bg-[#0F5B3A]";
  return <button className={`${base} ${styles} ${className}`}>{children}</button>;
}

function Card({ children, className = "" }) {
  return <div className={`rounded-[2rem] bg-white shadow-sm ring-1 ring-[#0F5B3A]/8 ${className}`}>{children}</div>;
}

function SectionTitle({ eyebrow, title, children }) {
  return <div className="mx-auto mb-10 max-w-3xl text-center"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#D9A441]">{eyebrow}</p><h2 className="text-3xl font-bold tracking-tight text-[#0F5B3A] md:text-5xl">{title}</h2>{children && <p className="mt-4 text-base leading-7 text-[#5B655E]">{children}</p>}</div>;
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-12 w-12 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-label="Oson Barq logo mark">
          <circle
            cx="50"
            cy="50"
            r="34"
            fill="none"
            stroke="#0F5B3A"
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray="200 18"
            transform="rotate(18 50 50)"
          />
          <path
            d="M75 49 L66 49 L72 38 L66 52 L75 52 L69 63 Z"
            fill="#D9A441"
          />
        </svg>
      </div>
      <div>
        <p className="text-xl font-extrabold leading-none tracking-[0.12em] text-[#0F5B3A]">OSON BARQ</p>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.32em] text-[#B88917]">Energy of Simplicity</p>
      </div>
    </div>
  );
}

function Hero({ t }) {
  return <section className="relative overflow-hidden bg-white"><div className="mx-auto grid max-w-[1500px] items-stretch md:grid-cols-[0.95fr_1.2fr]"><div className="relative z-10 px-8 py-16 md:px-20 md:py-24"><h1 className="text-5xl font-black leading-tight tracking-tight text-[#101828] md:text-7xl">{t.heroTitle.replace(t.heroAccent, "")}<br /><span className="text-[#138A46]">{t.heroAccent}</span></h1><p className="mt-6 max-w-md text-xl leading-8 text-[#344054]">{t.heroBody}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button className="h-14 px-8 text-base">{t.heroCta} →</Button><Button variant="outline" className="h-14 px-8 text-base">▷ {t.heroHow}</Button></div><div className="mt-12 flex flex-wrap gap-6 text-sm font-semibold text-[#344054]">{t.badges.map((x) => <span key={x}>{x}</span>)}</div></div><div className="relative min-h-[520px] overflow-hidden bg-[radial-gradient(circle_at_70%_45%,#D9A44133,transparent_28%),linear-gradient(135deg,#EAF4EE,#B7D8F0_45%,#073B27)]"><div className="absolute right-10 top-20 h-[300px] w-[520px] rotate-[-6deg] rounded-[2rem] bg-[#1D2939] shadow-2xl"><div className="absolute inset-4 rounded-[1.5rem] bg-gradient-to-br from-[#0F5B3A] to-[#101828]" /><div className="absolute left-10 top-10 grid grid-cols-7 gap-2">{Array.from({ length: 28 }).map((_, i) => <span key={i} className="h-7 w-12 rounded bg-[#1C3F66] ring-1 ring-white/20" />)}</div></div><div className="absolute bottom-10 right-14 z-20 rounded-3xl bg-[#101828]/90 p-6 text-white shadow-2xl"><h3 className="text-xl font-black">{t.smart}</h3><p className="mt-3 max-w-xs text-sm text-white/80">{t.smartBody}</p></div></div></div></section>;
}

function StatsBar({ t }) {
  const data = [["👥", "100+", t.stats[0]], ["📋", "500+", t.stats[1]], ["🧑‍🤝‍🧑", "1,200+", t.stats[2]], ["💰", "Up to 30%", t.stats[3]], ["🛡️", "0%", t.stats[4]]];
  return <section className="bg-white px-5 py-8"><div className="mx-auto grid max-w-7xl gap-3 rounded-[1.5rem] border border-[#0F5B3A]/10 bg-white p-5 shadow-sm md:grid-cols-5">{data.map(([icon, a, b]) => <div key={b} className="flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF4EE] text-2xl">{icon}</div><div><p className="text-2xl font-black text-[#101828]">{a}</p><p className="text-sm text-[#344054]">{b}</p></div></div>)}</div></section>;
}

function HowWorks({ t }) {
  return <section id="how" className="bg-white px-5 py-8"><h2 className="text-center text-3xl font-black text-[#101828]">{t.howTitle}</h2><div className="mx-auto mt-8 grid max-w-7xl gap-4 md:grid-cols-5">{t.howSteps.map(([icon, title, desc]) => <div key={title} className="rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-sm"><div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF4EE] text-2xl">{icon}</div><h3 className="font-black text-[#101828]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#344054]">{desc}</p></div>)}</div></section>;
}

function RequestForm({ t }) {
  return <section id="request" className="px-5 py-14"><div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-8 shadow-xl"><h2 className="text-3xl font-black text-[#101828]">{t.requestTitle}</h2><p className="mt-3 text-[#667085]">{t.requestSubtitle}</p><div className="mt-8 grid gap-8 lg:grid-cols-[1fr_290px]"><Card className="p-6"><h3 className="text-lg font-bold text-[#101828]">{t.requestProject}</h3><div className="mt-6 space-y-6"><div><label className="text-sm font-bold">{t.where}</label><div className="mt-2 flex gap-3"><input className="w-full rounded-xl border px-4 py-3" placeholder={t.addressPlaceholder} /><Button className="rounded-xl">{t.detectLocation}</Button></div></div><div><label className="text-sm font-bold">{t.propertyType}</label><div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">{t.propertyOptions.map((x) => <button key={x} className="rounded-xl border bg-[#EAF4EE] px-4 py-4 text-sm font-semibold text-[#0F5B3A]">{x}</button>)}</div></div><div><label className="text-sm font-bold">{t.uploadPhotos}</label><div className="mt-3 grid grid-cols-5 gap-3"><div className="flex min-h-[88px] flex-col items-center justify-center rounded-xl border border-dashed text-center text-xs text-[#667085]">⇧<span>{t.uploadBox.split("\n").map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</span></div>{t.photoLabels.map((x) => <div key={x} className="flex min-h-[88px] items-end rounded-xl bg-gradient-to-br from-[#EAF4EE] to-[#D9A441]/30 p-2 text-xs font-semibold">{x}</div>)}</div></div><div><label className="text-sm font-bold">{t.loadLabel}</label><div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">{t.loads.map((x) => <label key={x} className="flex items-center gap-2 text-sm"><input type="checkbox" />{x}</label>)}</div></div><textarea className="min-h-[90px] w-full rounded-xl border p-4" placeholder={t.comments} /><div className="flex justify-end gap-3"><Button variant="outline">{t.cancel}</Button><Button>{t.submit}</Button></div></div></Card><Card className="bg-[#EAF4EE] p-5"><h4 className="font-bold text-[#073B27]">{t.whySubmit}</h4><ul className="mt-4 space-y-3 text-sm text-[#344054]">{t.whySubmitItems.map((x) => <li key={x}>✓ {x}</li>)}</ul></Card></div></div></section>;
}

function Finance({ t }) {
  const opts = financeOptionIds.map((id) => ({ id, ...t.financeOptions[id] }));
  return <section id="finance-step" className="px-5 py-14"><div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-8 shadow-xl"><h2 className="text-3xl font-black text-[#101828]">{t.financeTitle}</h2><p className="mt-3 text-[#667085]">{t.financeSubtitle}</p><div className="mt-8 grid gap-5 md:grid-cols-3">{opts.map((f) => <div key={f.id} className={`rounded-2xl border p-6 ${f.id === "alif" ? "border-[#138A46] bg-[#EAF4EE]" : "bg-white"}`}><h4 className="font-black text-[#0F5B3A]">{f.name}</h4><ul className="mt-4 space-y-2 text-sm">{f.bullets.map((b) => <li key={b}>✓ {b}</li>)}</ul><p className="mt-6 text-xs text-[#667085]">{t.monthlyPayment}</p><p className="text-xl font-black">{f.price}</p><Button className="mt-5 w-full">{f.id === "alif" ? t.selected : t.choose}</Button></div>)}</div></div></section>;
}

function InstantCalculator({ t }) {
  const [bill, setBill] = useState(500);
  const systemKw = Math.max(3, Math.round((bill / 150) * 10) / 10);
  const capex = Math.round(systemKw * 9200);
  const monthlySaving = Math.round(bill * 0.72);
  const payback = Math.max(4.2, Math.round((capex / Math.max(monthlySaving * 12, 1)) * 10) / 10);

  return <section id="calculator" className="px-5 py-14"><div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-white p-8 shadow-xl lg:grid-cols-[0.9fr_1.1fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D9A441]">Instant solar estimate</p><h2 className="mt-3 text-3xl font-black text-[#0F5B3A] md:text-5xl">Быстрый расчет системы</h2><p className="mt-4 leading-7 text-[#667085]">Клиент меняет ежемесячный счет, а платформа сразу показывает ориентировочную мощность, стоимость, экономию и окупаемость. Это создает эффект “вау” до подачи заявки.</p><div className="mt-8 rounded-2xl bg-[#FAF8F2] p-5"><div className="flex items-center justify-between"><span className="font-bold text-[#24302A]">Ежемесячный счет</span><span className="rounded-full bg-[#138A46] px-4 py-1 text-sm font-black text-white">{bill} TJS</span></div><input className="mt-5 w-full accent-[#138A46]" type="range" min="200" max="3000" step="50" value={bill} onChange={(e) => setBill(Number(e.target.value))} /><div className="mt-2 flex justify-between text-xs text-[#667085]"><span>200</span><span>1 500</span><span>3 000+</span></div></div></div><div className="grid gap-4 sm:grid-cols-2"><Card className="p-6"><p className="text-sm text-[#667085]">Рекомендуемая система</p><p className="mt-2 text-4xl font-black text-[#0F5B3A]">{systemKw} kW</p><p className="mt-2 text-sm text-[#667085]">Residential / small business estimate</p></Card><Card className="p-6"><p className="text-sm text-[#667085]">Ориентировочная стоимость</p><p className="mt-2 text-4xl font-black text-[#0F5B3A]">{capex.toLocaleString()} TJS</p><p className="mt-2 text-sm text-[#667085]">до financing / grant adjustment</p></Card><Card className="p-6"><p className="text-sm text-[#667085]">Экономия в месяц</p><p className="mt-2 text-4xl font-black text-[#138A46]">{monthlySaving} TJS</p><p className="mt-2 text-sm text-[#667085]">на основе self-consumption logic</p></Card><Card className="p-6"><p className="text-sm text-[#667085]">Окупаемость</p><p className="mt-2 text-4xl font-black text-[#D9A441]">{payback} лет</p><p className="mt-2 text-sm text-[#667085]">предварительный расчет</p></Card><div className="sm:col-span-2"><Button className="w-full rounded-xl">Получить точный расчет →</Button></div></div></div></section>;
}

function InstallerComparison({ t }) {
  const bestPrice = installers.reduce((best, item) => Number(item.price.replace(/[^0-9]/g, "")) < Number(best.price.replace(/[^0-9]/g, "")) ? item : best, installers[0]);
  const bestRating = installers.reduce((best, item) => item.rating > best.rating ? item : best, installers[0]);
  const fastest = installers.reduce((best, item) => Number(item.days.replace(/[^0-9]/g, "")) < Number(best.days.replace(/[^0-9]/g, "")) ? item : best, installers[0]);

  return <section id="compare" className="px-5 py-14"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Best-value marketplace" title="Сравнение компаний по цене, качеству и срокам">Платформа не выбирает только самого дешевого. Клиент видит best-value: цену, рейтинг, гарантию, сроки и реальный опыт компании.</SectionTitle><div className="grid gap-4 md:grid-cols-3"><Card className="p-6"><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D9A441]">Лучшая цена</p><h3 className="mt-3 text-2xl font-black text-[#0F5B3A]">{bestPrice.name}</h3><p className="mt-2 text-[#667085]">{bestPrice.price} · {bestPrice.warranty}</p></Card><Card className="p-6"><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D9A441]">Лучший рейтинг</p><h3 className="mt-3 text-2xl font-black text-[#0F5B3A]">{bestRating.name}</h3><p className="mt-2 text-[#667085]">⭐ {bestRating.rating} · {bestRating.projects} projects</p></Card><Card className="p-6"><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D9A441]">Самый быстрый</p><h3 className="mt-3 text-2xl font-black text-[#0F5B3A]">{fastest.name}</h3><p className="mt-2 text-[#667085]">{fastest.days} · score {fastest.score}</p></Card></div><div className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-[#0F5B3A]/8"><div className="grid grid-cols-5 bg-[#EAF4EE] px-5 py-4 text-sm font-black text-[#0F5B3A]"><span>Company</span><span>Price</span><span>Warranty</span><span>Delivery</span><span>Score</span></div>{installers.map((i) => <div key={i.name} className="grid grid-cols-5 border-t border-[#0F5B3A]/10 px-5 py-4 text-sm"><span className="font-bold text-[#24302A]">{i.name}</span><span>{i.price}</span><span>{i.warranty}</span><span>{i.days}</span><span className="font-black text-[#138A46]">{i.score}</span></div>)}</div></div></section>;
}

function ImpactDashboard({ t }) {
  return <section id="dashboard" className="bg-[#0F5B3A] px-5 py-16 text-white"><div className="mx-auto max-w-7xl"><div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D9A441]">Transparency dashboard</p><h2 className="mt-3 text-4xl font-black md:text-5xl">Живая прозрачность рынка</h2><p className="mt-5 leading-8 text-white/75">Oson Barq должен показывать не обещания, а динамику: заявки, установленные kW, активные регионы, экономию клиентов и статус PAYGO.</p></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-[1.8rem] bg-white/10 p-6 ring-1 ring-white/10"><p className="text-sm text-white/70">Installed capacity</p><p className="mt-2 text-4xl font-black text-[#D9A441]">34 MW</p></div><div className="rounded-[1.8rem] bg-white/10 p-6 ring-1 ring-white/10"><p className="text-sm text-white/70">Active pipeline</p><p className="mt-2 text-4xl font-black text-[#D9A441]">112 MW</p></div><div className="rounded-[1.8rem] bg-white/10 p-6 ring-1 ring-white/10"><p className="text-sm text-white/70">Customer savings</p><p className="mt-2 text-4xl font-black text-[#D9A441]">2.4M TJS</p></div><div className="rounded-[1.8rem] bg-white/10 p-6 ring-1 ring-white/10"><p className="text-sm text-white/70">Regions covered</p><p className="mt-2 text-4xl font-black text-[#D9A441]">42</p></div></div></div></div></section>;
}

function MapSection({ t }) {
  const localProof = [
    { city: "Dushanbe", name: "Саид, Душанбе", text: "Снизил счет на 60% уже в первый месяц.", kw: "5 kW", installer: "Solar Tajik Energy" },
    { city: "Khujand", name: "Фарход, Худжанд", text: "Работает стабильно даже зимой.", kw: "8 kW", installer: "Nur Solar Group" },
    { city: "Khatlon", name: "Мунира, Куляб", text: "Теперь не боимся отключений.", kw: "3 kW", installer: "PamEnergy Solar" },
  ];
  const [selectedCity, setSelectedCity] = useState("Dushanbe");
  const selectedCase = localProof.find((p) => p.city === selectedCity) || localProof[0];

  return <section id="map" className="bg-[#073B27] px-5 py-16 text-white">
    <SectionTitle eyebrow="Trust map" title={t.mapTitle}>{t.mapText}</SectionTitle>

    <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
      <div className="relative h-[26rem] rounded-[2rem] bg-[#082D20] md:col-span-2">
        {projectDots.map((d) => {
          const isSelected = selectedCity === d.city;
          return (
            <button
              key={d.city}
              onClick={() => setSelectedCity(d.city)}
              className="absolute text-left focus:outline-none"
              style={{ left: d.x, top: d.y }}
              aria-label={`Open project case for ${d.city}`}
            >
              <span className={`absolute -inset-3 rounded-full ${isSelected ? "animate-ping bg-[#D9A441]/60" : "bg-[#D9A441]/25"}`} />
              <span className={`relative block h-5 w-5 rounded-full ${isSelected ? "bg-white ring-4 ring-[#D9A441]" : "bg-[#D9A441]"}`} />
              <div className={`mt-2 rounded-2xl px-3 py-1 text-xs font-bold shadow-sm ${isSelected ? "bg-[#D9A441] text-[#073B27]" : "bg-white text-[#0F5B3A]"}`}>
                {d.city}: {d.count}
              </div>
            </button>
          );
        })}

        <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] bg-white/10 p-4 backdrop-blur ring-1 ring-white/10">
          <p className="text-xs uppercase tracking-[0.18em] text-[#D9A441]">Click map points</p>
          <p className="mt-1 text-sm text-white/75">Нажмите на точку региона, чтобы увидеть пример установленного проекта.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-[1.8rem] bg-white p-5 text-[#24302A]">
          <div className="h-32 w-full rounded-xl bg-gradient-to-br from-[#EAF4EE] to-[#D9A441]/40 mb-4 flex items-center justify-center text-xs text-[#0F5B3A]">
            фото объекта
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D9A441]">Selected case</p>
          <h3 className="mt-2 text-xl font-black text-[#0F5B3A]">{selectedCase.name}</h3>
          <p className="mt-2 text-sm leading-6 text-[#667085]">“{selectedCase.text}”</p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-[#FAF8F2] p-3"><p className="text-xs text-[#667085]">System</p><p className="font-black text-[#0F5B3A]">{selectedCase.kw}</p></div>
            <div className="rounded-xl bg-[#FAF8F2] p-3"><p className="text-xs text-[#667085]">Installer</p><p className="font-black text-[#0F5B3A]">{selectedCase.installer}</p></div>
          </div>
        </div>

        {[ ["485", "verified installations"], ["34 MW", "partner track record"], ["42", "districts covered"] ].map(([a,b]) => (
          <div key={a} className="rounded-[1.8rem] bg-white/10 p-5">
            <p className="text-4xl font-black text-[#D9A441]">{a}</p>
            <p>{b}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="mx-auto mt-12 max-w-7xl">
      <h3 className="mb-6 text-2xl font-black text-white">Установлено в вашем районе</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {localProof.map((p) => (
          <button key={p.name} onClick={() => setSelectedCity(p.city)} className="rounded-[1.8rem] bg-white/10 p-5 text-left ring-1 ring-white/10 transition hover:bg-white/15">
            <div className="mb-4 flex h-32 w-full items-center justify-center rounded-xl bg-gradient-to-br from-[#EAF4EE] to-[#D9A441]/40 text-xs text-[#0F5B3A]">фото объекта</div>
            <p className="text-sm text-white/80">{p.text}</p>
            <p className="mt-3 font-bold text-[#D9A441]">{p.name}</p>
            <p className="text-xs text-white/60">{p.kw} · {p.installer}</p>
          </button>
        ))}
      </div>
    </div>
  </section>;
}

export default function OsonBarqPlatformSite() {
  const [lang, setLang] = useState("ru");
  const t = i18n[lang] || i18n.ru;
  const testsPassed = useMemo(() => runSmokeTests(), []);
  return <main className="min-h-screen bg-[#FAF8F2] text-[#24302A]"><nav className="sticky top-0 z-40 border-b bg-white/95"><div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4"><Logo /><div className="hidden gap-8 text-sm font-semibold lg:flex"><a href="#request">{t.nav[0]}</a><a href="#electricians">{t.nav[1]}</a><a href="#finance-step">{t.nav[2]}</a><a href="#suppliers">{t.nav[3]}</a><a href="#map">{t.nav[4]}</a></div><div className="flex items-center gap-3"><select value={lang} onChange={(e) => setLang(e.target.value)} className="rounded-xl border px-3 py-2 text-sm font-bold text-[#0F5B3A]"><option value="tj">TJ</option><option value="ru">RU</option><option value="en">EN</option><option value="zh">中文</option></select><Button variant="outline">{t.login}</Button><Button>{t.getStarted}</Button></div></div></nav><Hero t={t} /><section className="px-5 py-10"><div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-8 shadow-sm md:flex md:items-center md:gap-10"><Logo /><div className="mt-6 md:mt-0"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D9A441]">{t.missionLabel}</p><h2 className="mt-2 text-2xl font-black text-[#0F5B3A]">{t.missionTitle}</h2><p className="mt-3 text-lg leading-8 text-[#344054]">{t.missionText}</p></div></div></section><StatsBar t={t} /><HowWorks t={t} /><InstantCalculator t={t} /><RequestForm t={t} /><Finance t={t} /><InstallerComparison t={t} /><ImpactDashboard t={t} /><section id="installers" className="px-5 py-16"><SectionTitle eyebrow="Solar Reputation Layer" title={t.installersTitle}>{t.installersText}</SectionTitle><div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">{installers.map((i) => <Card key={i.name} className="p-6"><h3 className="text-xl font-bold text-[#0F5B3A]">{i.name}</h3><p className="text-sm text-[#6B756E]">{i.regions}</p><div className="mt-4 grid grid-cols-3 gap-2 text-center"><div className="rounded-2xl bg-[#FAF8F2] p-3"><p className="font-black">{i.projects}</p><p className="text-xs">projects</p></div><div className="rounded-2xl bg-[#FAF8F2] p-3"><p className="font-black">{i.mw}</p><p className="text-xs">installed</p></div><div className="rounded-2xl bg-[#FAF8F2] p-3"><p className="font-black">{i.rating}</p><p className="text-xs">rating</p></div></div><Button className="mt-5 w-full">{t.viewProjects}</Button></Card>)}</div></section><MapSection t={t} /><section id="suppliers" className="bg-[#EAF4EE] px-5 py-16"><SectionTitle eyebrow="Supply side" title={t.suppliersTitle}>{t.suppliersText}</SectionTitle><div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-8"><h3 className="text-2xl font-bold text-[#0F5B3A]">Supplier Hub · Local Factory · RFQ · Quality Registry</h3></div></section><section id="electricians" className="px-5 py-16"><SectionTitle eyebrow="National installer network" title={t.electriciansTitle}>{t.electriciansText}</SectionTitle><div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">{electricianRegions.map((r) => <Card key={r.name} className="p-5"><h3 className="font-black text-[#0F5B3A]">{r.name}</h3><p>{r.specialists} мастеров</p><p className="mt-2 rounded-full bg-[#EAF4EE] px-3 py-1 text-sm font-bold text-[#0F5B3A]">{r.status}</p></Card>)}</div></section><section className="px-5 py-16"><div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#0F5B3A] p-8 text-white md:p-12"><h2 className="text-4xl font-black md:text-5xl">{t.finalTitle}</h2><p className="mt-5 max-w-xl text-white/75">{t.finalText}</p><Button className="mt-6 bg-[#E87A2F]">{t.startPilot}</Button></div><p className="mt-4 text-center text-xs text-[#6B756E]">Preview self-check: {testsPassed ? "passed" : "needs review"}</p></section></main>;
}
