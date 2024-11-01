export const countries = [
  { ko: "대한민국", en: "REPUBLIC OF KOREA", flag: "🇰🇷" },
  { ko: "미국", en: "UNITED STATES", flag: "🇺🇸" },
  { ko: "캐나다", en: "CANADA", flag: "🇨🇦" },
  { ko: "일본", en: "JAPAN", flag: "🇯🇵" },
  { ko: "독일", en: "GERMANY", flag: "🇩🇪" },
  { ko: "프랑스", en: "FRANCE", flag: "🇫🇷" },
  { ko: "영국", en: "UNITED KINGDOM", flag: "🇬🇧" },
  { ko: "호주", en: "AUSTRALIA", flag: "🇦🇺" },
  { ko: "중국", en: "CHINA", flag: "🇨🇳" },
  { ko: "인도", en: "INDIA", flag: "🇮🇳" },
];

export const languages = [
  { code: "ko", ko: "한국어", en: "Korean" },
  { code: "en", ko: "영어", en: "English" },
  { code: "fr", ko: "프랑스어", en: "French" },
  { code: "ja", ko: "일본어", en: "Japanese" },
  { code: "de", ko: "독일어", en: "German" },
  { code: "zh", ko: "중국어", en: "Chinese" },
  // { ko: "스페인어", en: "Spanish" },
  // { ko: "힌디어", en: "Hindi" },
  // { ko: "러시아어", en: "Russian" },
  // { ko: "포르투갈어", en: "Portuguese" },
];

export const majors = [
  { ko: "인문대학", en: "Humanities" },
  { ko: "자연과학대학", en: "Natural Sciences" },
  { ko: "사회과학대학", en: "Social Sciences" },
  { ko: "글로벌정경대학", en: "Global Economics and Business" },
  { ko: "공과대학", en: "Engineering" },
  { ko: "정보기술대학", en: "Information Technology" },
  { ko: "경영대학", en: "Business" },
  { ko: "예술체육대학", en: "Arts and Sports" },
  { ko: "사범대학", en: "Education" },
  { ko: "도시과학대학", en: "Urban Sciences" },
  { ko: "생명과학기술대학", en: "Life Science and Technology" },
  { ko: "융합자유전공대학", en: "Convergence and Liberal Studies" },
  {
    ko: "동북아국제통상물류학부",
    en: "Northeast Asia International Commerce and Logistics",
  },
  { ko: "법학부", en: "Law" },
];

export const interests: {
  [key: string]: {
    ko: string;
    en: string;
    fr: string;
    ja: string;
    de: string;
    zh: string;
    emoji: string;
  };
} = {
  "Free-talking": {
    ko: "더 자신 있게 자유롭게 대화하세요!",
    en: "Boost Your Confidence with Free Talking!",
    fr: "Renforcez votre confiance avec Free Talking!",
    ja: "自信を持って自由に話そう！",
    de: "Stärken Sie Ihr Selbstvertrauen mit freiem Sprechen!",
    zh: "提升自信，自由交流吧！",
    emoji: "💬",
  },
  Interview: {
    ko: "면접이 두렵나요? 함께 준비해봐요! 😱",
    en: "Feeling Nervous? Let's Nail the Interview! 😱",
    fr: "Nerveux? Clouons cet entretien! 😱",
    ja: "面接が怖いですか？ 一緒に準備しましょう！ 😱",
    de: "Sind Sie nervös? Lassen Sie uns das Interview meistern! 😱",
    zh: "紧张吗？让我们搞定面试！😱",
    emoji: "📝",
  },
  Speech: {
    ko: "연설의 예술을 마스터하세요.",
    en: "Master the Art of Public Speaking",
    fr: "Maîtrisez l'art de la prise de parole en public",
    ja: "演説の技術をマスターしましょう",
    de: "Meistern Sie die Kunst der öffentlichen Rede",
    zh: "掌握演讲的艺术",
    emoji: "🎤",
  },
  Travel: {
    ko: "여행 전문가의 팁으로 세상을 탐험하세요.",
    en: "Explore the World with Expert Travel Tips",
    fr: "Explorez le monde avec des conseils de voyage d'experts",
    ja: "専門家の旅行のヒントで世界を探検しよう",
    de: "Entdecken Sie die Welt mit Reisetipps von Experten",
    zh: "通过专家旅行建议探索世界",
    emoji: "🌍",
  },
  Music: {
    ko: "음악으로 당신을 표현하세요 🎵",
    en: "Express Yourself Through Music 🎵",
    fr: "Exprimez-vous à travers la musique 🎵",
    ja: "音楽で自分を表現しましょう 🎵",
    de: "Drücken Sie sich durch Musik aus 🎵",
    zh: "通过音乐表达自己 🎵",
    emoji: "🎶",
  },
  Cooking: {
    ko: "맛있는 요리로 모두를 감동시키세요 👩‍🍳",
    en: "Cook Delicious Dishes and Impress Everyone 👩‍🍳",
    fr: "Cuisinez de délicieux plats et impressionnez tout le monde 👩‍🍳",
    ja: "美味しい料理で皆を感動させよう 👩‍🍳",
    de: "Kochen Sie köstliche Gerichte und beeindrucken Sie alle 👩‍🍳",
    zh: "烹饪美味佳肴，打动每一个人 👩‍🍳",
    emoji: "🍳",
  },
  Drawing: {
    ko: "그림으로 창의력을 발휘하세요 🎨",
    en: "Unleash Your Creativity with Drawing 🎨",
    fr: "Libérez votre créativité avec le dessin 🎨",
    ja: "絵で創造力を発揮しましょう 🎨",
    de: "Entfalten Sie Ihre Kreativität mit Zeichnen 🎨",
    zh: "通过绘画释放你的创造力 🎨",
    emoji: "🎨",
  },
  Computer: {
    ko: "컴퓨터의 세계에 깊이 빠져보세요 💻",
    en: "Dive Deep into the World of Computers 💻",
    fr: "Plongez dans le monde de l'informatique 💻",
    ja: "コンピュータの世界に飛び込もう 💻",
    de: "Tauchen Sie tief in die Welt der Computer ein 💻",
    zh: "深入探索计算机的世界 💻",
    emoji: "💻",
  },
  Sports: {
    ko: "스포츠로 활기차고 에너제틱하게! 🏅",
    en: "Stay Active and Energized with Sports 🏅",
    fr: "Restez actif et énergique avec les sports 🏅",
    ja: "スポーツで元気いっぱいになろう！ 🏅",
    de: "Bleiben Sie aktiv und energiegeladen mit Sport 🏅",
    zh: "通过体育运动保持活力和精力充沛 🏅",
    emoji: "🏅",
  },
  Games: {
    ko: "게임 실력을 레벨업하세요 🎮",
    en: "Level Up Your Gaming Skills 🎮",
    fr: "Améliorez vos compétences en jeu 🎮",
    ja: "ゲームスキルをレベルアップしよう 🎮",
    de: "Verbessern Sie Ihre Gaming-Fähigkeiten 🎮",
    zh: "提升你的游戏技能 🎮",
    emoji: "🎮",
  },
};

export const filteredMessages = new Set([
  "필터링 된 메시지입니다.",
  "フィルタリングされたメッセージです.",
  "这是经过筛选的消息。",
  "This message has been filtered.",
  "Ce message a été filtré.",
  "Este mensaje ha sido filtrado.",
  "Questo messaggio è stato filtrato.",
  "Esta mensagem foi filtrada.",
  "Diese Nachricht wurde gefiltert.",
  "Dit bericht is gefilterd.",
  "Denne besked er blevet filtreret.",
  "Þessi skilaboð hafa verið síuð.",
  "Denne meldingen har blitt filtrert.",
  "Detta meddelande har filtrerats.",
  "Tämä viesti on suodatettu.",
  "Tato zpráva byla filtrována.",
  "Ta wiadomość została przefiltrowana.",
  "Táto správa bola filtrovaná.",
  "To sporočilo je bilo filtrirano.",
  "Αυτό το μήνυμα έχει φιλτραριστεί.",
  "See sõnum on filtreeritud.",
  "Ezt az üzenetet megszűrtük.",
  "Šī ziņa ir filtrēta.",
  "Ši žinutė buvo filtruota.",
  "הודעה זו סוננה.",
  "Bu mesaj filtrelendi.",
]);
