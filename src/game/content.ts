import type { CardDef, Chapter, EnemyTemplate, EventDef, NodeType, RelicDef } from "./types";

export const CHAPTER_CONFIG: Record<
  Chapter,
  {
    name: string;
    subtitle: string;
    background: string;
    normalEnemies: string[];
    eliteEnemies: string[];
    bossId: string;
    nodeRows: number;
  }
> = {
  1: {
    name: "荒庙篇",
    subtitle: "山雾不散，破庙钟声隐约可闻",
    background: "night-temple",
    normalEnemies: ["lantern", "waterghost", "templecorpse"],
    eliteEnemies: ["macaque", "warlock", "foxshade"],
    bossId: "tigerlord",
    nodeRows: 8,
  },
  2: {
    name: "阴市篇",
    subtitle: "鬼火引路，灯笼在水面漂成星河",
    background: "ghost-market",
    normalEnemies: ["willow", "paperdoll", "incense"],
    eliteEnemies: ["butcher", "puppet"],
    bossId: "riverlord",
    nodeRows: 8,
  },
  3: {
    name: "冥府篇",
    subtitle: "黄泉路远，奈何桥头风卷纸钱",
    background: "underworld",
    normalEnemies: ["ghostsoldier", "soulfire", "boneguard"],
    eliteEnemies: ["judge", "reaper"],
    bossId: "yama",
    nodeRows: 8,
  },
};

export const CARD_DEFS: Record<string, CardDef> = {
  strike: {
    id: "strike",
    name: "斩妖剑",
    type: "attack",
    rarity: "basic",
    cost: 1,
    text: ["造成 6 点伤害。", "造成 9 点伤害。"],
  },
  defend: {
    id: "defend",
    name: "护身符",
    type: "skill",
    rarity: "basic",
    cost: 1,
    text: ["获得 5 点格挡。", "获得 8 点格挡。"],
  },
  zhusha: {
    id: "zhusha",
    name: "朱砂符",
    type: "attack",
    rarity: "basic",
    cost: 1,
    text: ["造成 4 点伤害。施加 1 层符印。", "造成 6 点伤害。施加 2 层符印。"],
  },
  taomu: {
    id: "taomu",
    name: "桃木连斩",
    type: "attack",
    rarity: "common",
    cost: 1,
    text: ["造成 4 点伤害 2 次。", "造成 5 点伤害 2 次。"],
  },
  cloudstep: {
    id: "cloudstep",
    name: "云步",
    type: "skill",
    rarity: "common",
    cost: 0,
    text: ["获得 3 点格挡。抽 1 张牌。", "获得 5 点格挡。抽 1 张牌。"],
  },
  qingxin: {
    id: "qingxin",
    name: "清心咒",
    type: "skill",
    rarity: "common",
    cost: 0,
    text: ["抽 2 张牌。", "抽 3 张牌。"],
  },
  golden: {
    id: "golden",
    name: "金光咒",
    type: "skill",
    rarity: "common",
    cost: 1,
    text: ["获得 8 点格挡与 1 点香火。", "获得 11 点格挡与 1 点香火。"],
  },
  incense: {
    id: "incense",
    name: "香火续灯",
    type: "skill",
    rarity: "common",
    cost: 0,
    exhaust: true,
    text: ["获得 2 点香火。消耗。", "获得 3 点香火。消耗。"],
  },
  windScroll: {
    id: "windScroll",
    name: "回风符",
    type: "skill",
    rarity: "common",
    cost: 0,
    text: ["抽 1 张牌。若敌人有符印，额外抽 1 张。", "抽 1 张牌。若敌人有符印，额外抽 2 张。"],
  },
  thunder: {
    id: "thunder",
    name: "引雷",
    type: "attack",
    rarity: "common",
    cost: 2,
    text: ["造成 10 点伤害。若敌人有符印，额外造成 6 点伤害。", "造成 14 点伤害。若敌人有符印，额外造成 8 点伤害。"],
  },
  bell: {
    id: "bell",
    name: "镇魂铃",
    type: "skill",
    rarity: "common",
    cost: 1,
    text: ["获得 3 点格挡。施加 2 层虚弱。", "获得 5 点格挡。施加 3 层虚弱。"],
  },
  fog: {
    id: "fog",
    name: "驱雾",
    type: "skill",
    rarity: "common",
    cost: 1,
    text: ["获得 6 点格挡。抽 1 张牌。", "获得 9 点格挡。抽 1 张牌。"],
  },
  command: {
    id: "command",
    name: "太上敕令",
    type: "skill",
    rarity: "uncommon",
    cost: 2,
    text: ["获得 4 点格挡。施加 4 层符印。", "获得 6 点格挡。施加 5 层符印。"],
  },
  burn: {
    id: "burn",
    name: "焚符",
    type: "attack",
    rarity: "uncommon",
    cost: 1,
    text: ["移除所有符印。每层造成 5 点伤害。", "移除所有符印。每层造成 7 点伤害。"],
  },
  paper: {
    id: "paper",
    name: "纸人替身",
    type: "skill",
    rarity: "uncommon",
    cost: 1,
    text: ["获得 7 点格挡。将 1 张纸刃加入手牌。", "获得 10 点格挡。将 1 张强化纸刃加入手牌。"],
  },
  breakEvil: {
    id: "breakEvil",
    name: "破邪",
    type: "attack",
    rarity: "uncommon",
    cost: 2,
    text: ["造成 14 点伤害。若敌人有符印，获得 1 点能量。", "造成 18 点伤害。若敌人有符印，获得 1 点能量。"],
  },
  mirror: {
    id: "mirror",
    name: "照妖镜",
    type: "skill",
    rarity: "uncommon",
    cost: 1,
    text: ["施加 2 层符印与 2 层易伤。", "施加 3 层符印与 2 层易伤。"],
  },
  refine: {
    id: "refine",
    name: "丹砂炼气",
    type: "skill",
    rarity: "uncommon",
    cost: 0,
    exhaust: true,
    text: ["获得 1 点能量。失去 2 点生命。消耗。", "获得 1 点能量。失去 1 点生命。消耗。"],
  },
  scripture: {
    id: "scripture",
    name: "翻经",
    type: "skill",
    rarity: "uncommon",
    cost: 1,
    text: ["抽 3 张牌，将 1 张阴寒加入弃牌堆。", "抽 4 张牌，将 1 张阴寒加入弃牌堆。"],
  },
  ashReturn: {
    id: "ashReturn",
    name: "灰烬回卷",
    type: "skill",
    rarity: "uncommon",
    cost: 0,
    text: ["将弃牌堆洗回抽牌堆。抽 1 张牌。获得 4 点格挡。", "将弃牌堆洗回抽牌堆。抽 2 张牌。获得 6 点格挡。"],
  },
  nightEye: {
    id: "nightEye",
    name: "夜眼",
    type: "power",
    rarity: "rare",
    cost: 1,
    text: ["法门：每回合多抽 1 张牌。", "法门：每回合多抽 1 张牌。立即抽 1 张牌。"],
  },
  citygod: {
    id: "citygod",
    name: "请城隍",
    type: "power",
    rarity: "rare",
    cost: 2,
    text: ["法门：每回合获得 3 点格挡与 1 点香火。", "法门：每回合获得 5 点格挡与 1 点香火。"],
  },
  thunderLaw: {
    id: "thunderLaw",
    name: "五雷正法",
    type: "attack",
    rarity: "rare",
    cost: 3,
    text: ["消耗所有香火。造成 12 点伤害，每点香火额外 +5。", "消耗所有香火。造成 16 点伤害，每点香火额外 +6。"],
  },
  paperBlade: {
    id: "paperBlade",
    name: "纸刃",
    type: "attack",
    rarity: "special",
    cost: 0,
    exhaust: true,
    text: ["造成 3 点伤害。消耗。", "造成 5 点伤害。消耗。"],
  },
  yinCold: {
    id: "yinCold",
    name: "阴寒",
    type: "status",
    rarity: "status",
    cost: "-",
    unplayable: true,
    text: ["无法打出。回合结束时若在手牌，失去 2 点生命。", "无法打出。回合结束时若在手牌，失去 2 点生命。"],
  },
};

export const CARD_POOL = Object.keys(CARD_DEFS).filter((id) => {
  const rarity = CARD_DEFS[id].rarity;
  return !["basic", "special", "status"].includes(rarity);
});

export const RELICS: RelicDef[] = [
  { id: "bronzeMirror", name: "青铜古镜", text: "每场战斗开始时，施加 2 层符印。" },
  { id: "taomuTassel", name: "桃木剑穗", text: "每场战斗第一张攻击牌额外造成 4 点伤害。" },
  { id: "citySeal", name: "城隍小印", text: "每场战斗第一回合获得 2 点香火。" },
  { id: "brokenCenser", name: "破香炉", text: "每打出一张技能牌，获得 1 点格挡。" },
  { id: "nightSand", name: "夜明砂", text: "每场战斗第一回合多抽 1 张牌。" },
  { id: "oldUmbrella", name: "旧雨伞", text: "每场战斗第一回合获得 6 点格挡。" },
  { id: "thunderWood", name: "雷击木", text: "符印每层伤害提高 1。" },
  { id: "blankPage", name: "无字残页", text: "每回合每打出 3 张牌，抽 1 张牌。" },
  { id: "paperHorse", name: "小纸马", text: "每场战斗第一回合获得 1 点额外能量。" },
  { id: "foxCoin", name: "狐市旧钱", text: "获得时立即得到 60 金。", onGain: "gold60" },
];

export const ENEMIES: Record<string, EnemyTemplate> = {
  lantern: {
    id: "lantern",
    name: "灯笼精",
    artKey: "lantern",
    hp: 42,
    moves: [
      { type: "attack", amount: 6, label: "灯火扑面" },
      { type: "curse", amount: 1, label: "冷焰入袖" },
      { type: "block", amount: 7, label: "纸罩护身" },
    ],
  },
  waterghost: {
    id: "waterghost",
    name: "披蓑水鬼",
    artKey: "waterghost",
    hp: 48,
    moves: [
      { type: "attack", amount: 8, label: "湿爪" },
      { type: "debuff", amount: 2, label: "寒水缠身" },
      { type: "attack", amount: 5, hits: 2, label: "拖入井口" },
    ],
  },
  templecorpse: {
    id: "templecorpse",
    name: "庙祝尸",
    artKey: "templecorpse",
    hp: 54,
    moves: [
      { type: "attack", amount: 10, label: "香灰掌" },
      { type: "block", amount: 10, label: "残袍护体" },
      { type: "curse", amount: 1, label: "旧愿缠身" },
    ],
  },
  macaque: {
    id: "macaque",
    name: "山魈",
    artKey: "macaque",
    hp: 52,
    moves: [
      { type: "attack", amount: 4, hits: 3, label: "乱爪" },
      { type: "buff", amount: 2, label: "啸林" },
      { type: "attack", amount: 10, label: "扑杀" },
    ],
  },
  warlock: {
    id: "warlock",
    name: "黑坛术士",
    artKey: "warlock",
    hp: 68,
    elite: true,
    moves: [
      { type: "attack", amount: 12, label: "黑符" },
      { type: "buff", amount: 3, label: "开坛" },
      { type: "curse", amount: 2, label: "夺魂" },
    ],
  },
  foxshade: {
    id: "foxshade",
    name: "画皮影",
    artKey: "foxshade",
    hp: 72,
    elite: true,
    moves: [
      { type: "attack", amount: 8, hits: 2, label: "剥面" },
      { type: "debuff", amount: 3, label: "换相" },
      { type: "blockAttack", amount: 7, block: 10, label: "披皮反扑" },
    ],
  },
  tigerlord: {
    id: "tigerlord",
    name: "山君",
    artKey: "tigerlord",
    hp: 118,
    boss: true,
    moves: [
      { type: "attack", amount: 16, label: "虎啸压山" },
      { type: "attack", amount: 6, hits: 3, label: "裂骨三扑" },
      { type: "buff", amount: 3, label: "百兽伏首" },
      { type: "blockAttack", amount: 10, block: 12, label: "盘踞古庙" },
    ],
  },
  willow: {
    id: "willow",
    name: "垂柳精",
    artKey: "willow",
    hp: 56,
    moves: [
      { type: "attack", amount: 7, label: "柳枝抽击" },
      { type: "debuff", amount: 2, label: "缠足" },
      { type: "attack", amount: 5, hits: 2, label: "乱枝" },
    ],
  },
  paperdoll: {
    id: "paperdoll",
    name: "纸人",
    artKey: "paperdoll",
    hp: 44,
    moves: [
      { type: "attack", amount: 6, label: "纸刃" },
      { type: "curse", amount: 1, label: "替身纸" },
      { type: "block", amount: 8, label: "折纸盾" },
    ],
  },
  incense: {
    id: "incense",
    name: "香童",
    artKey: "incense",
    hp: 52,
    moves: [
      { type: "attack", amount: 8, label: "香火烫" },
      { type: "buff", amount: 2, label: "添香" },
      { type: "attack", amount: 6, hits: 2, label: "双香" },
    ],
  },
  butcher: {
    id: "butcher",
    name: "鬼屠夫",
    artKey: "butcher",
    hp: 78,
    elite: true,
    moves: [
      { type: "attack", amount: 14, label: "剁骨刀" },
      { type: "debuff", amount: 3, label: "放血" },
      { type: "attack", amount: 20, label: "开膛" },
    ],
  },
  puppet: {
    id: "puppet",
    name: "提线傀儡",
    artKey: "puppet",
    hp: 74,
    elite: true,
    moves: [
      { type: "attack", amount: 10, label: "丝线缠" },
      { type: "block", amount: 14, label: "木盾" },
      { type: "attack", amount: 8, hits: 3, label: "乱舞" },
    ],
  },
  riverlord: {
    id: "riverlord",
    name: "河伯",
    artKey: "riverlord",
    hp: 142,
    boss: true,
    moves: [
      { type: "attack", amount: 18, label: "浪涛拍岸" },
      { type: "debuff", amount: 3, label: "溺水" },
      { type: "attack", amount: 8, hits: 3, label: "漩涡" },
      { type: "blockAttack", amount: 14, block: 15, label: "水盾" },
    ],
  },
  ghostsoldier: {
    id: "ghostsoldier",
    name: "阴兵",
    artKey: "ghostsoldier",
    hp: 62,
    moves: [
      { type: "attack", amount: 10, label: "长枪突刺" },
      { type: "block", amount: 9, label: "盾阵" },
      { type: "buff", amount: 2, label: "战魂" },
    ],
  },
  soulfire: {
    id: "soulfire",
    name: "鬼火",
    artKey: "soulfire",
    hp: 48,
    moves: [
      { type: "attack", amount: 9, label: "幽火" },
      { type: "curse", amount: 1, label: "噬魂" },
      { type: "attack", amount: 7, hits: 2, label: "鬼火燎原" },
    ],
  },
  boneguard: {
    id: "boneguard",
    name: "白骨守卫",
    artKey: "boneguard",
    hp: 66,
    moves: [
      { type: "attack", amount: 11, label: "骨刃" },
      { type: "block", amount: 12, label: "骨盾" },
      { type: "attack", amount: 5, hits: 4, label: "碎骨" },
    ],
  },
  judge: {
    id: "judge",
    name: "判官",
    artKey: "judge",
    hp: 86,
    elite: true,
    moves: [
      { type: "attack", amount: 15, label: "朱笔点魂" },
      { type: "debuff", amount: 4, label: "定罪" },
      { type: "attack", amount: 22, label: "勾魂" },
    ],
  },
  reaper: {
    id: "reaper",
    name: "无常",
    artKey: "reaper",
    hp: 82,
    elite: true,
    moves: [
      { type: "attack", amount: 12, label: "锁链" },
      { type: "debuff", amount: 2, label: "勾命" },
      { type: "attack", amount: 18, label: "索命" },
    ],
  },
  yama: {
    id: "yama",
    name: "阎罗王",
    artKey: "yama",
    hp: 168,
    boss: true,
    moves: [
      { type: "attack", amount: 20, label: "阎罗怒" },
      { type: "buff", amount: 4, label: "审判" },
      { type: "attack", amount: 12, hits: 3, label: "三刀问罪" },
      { type: "blockAttack", amount: 16, block: 18, label: "阴曹护佑" },
    ],
  },
};

export const NODE_DEFS: Record<NodeType, { name: string; desc: string }> = {
  combat: { name: "荒村遭遇", desc: "普通妖物拦路。胜利后获得金币与卡牌。" },
  elite: { name: "破庙恶客", desc: "更凶险的怪异。胜利后一定获得遗物。" },
  event: { name: "怪事", desc: "夜路不只会遇见敌人，也会遇见代价。" },
  rest: { name: "残灯休整", desc: "在风停处疗伤，或把一张牌磨得更锋利。" },
  shop: { name: "阴市灯摊", desc: "花金币买牌、买遗物，或请摊主替你烧掉一张旧牌。" },
  boss: { name: "荒庙正殿", desc: "山君盘踞殿中，雾气里有血和香灰的味道。" },
};

export const EVENTS: EventDef[] = [
  {
    id: "well",
    title: "荒村井声",
    body: "井底传来锣鼓声，水面倒映的不是月亮，而是一盏盏红灯。",
    choices: [
      { id: "wellHeal", title: "饮一口井水", desc: "回复 12 点生命。" },
      { id: "wellRelic", title: "投下朱砂符", desc: "失去 7 点生命，获得 1 件遗物。" },
    ],
  },
  {
    id: "fox",
    title: "狐嫁夜路",
    body: "远处喜乐忽近忽远，红轿停在路边，轿帘下递出一张折好的纸。",
    choices: [
      { id: "foxCard", title: "接过纸契", desc: "获得 1 张随机牌。" },
      { id: "foxRemove", title: "付钱改命", desc: "花费 40 金，移除 1 张牌。" },
    ],
  },
  {
    id: "temple",
    title: "破庙神像",
    body: "神像半张脸被烟熏黑，供桌下压着一枚仍有温度的旧铜钱。",
    choices: [
      { id: "templeUpgrade", title: "续上残香", desc: "升级 1 张牌。" },
      { id: "templeGold", title: "取走铜钱", desc: "获得 80 金，将 1 张阴寒加入牌组。" },
    ],
  },
  {
    id: "scholar",
    title: "无面书生",
    body: "书生请你替他读一段文章。纸上没有字，读完后却像少记了一件旧事。",
    choices: [
      { id: "scholarCopy", title: "替他读完", desc: "复制 1 张非基础牌，并加入 1 张阴寒。" },
      { id: "scholarLeave", title: "绕路离开", desc: "什么也不发生。" },
    ],
  },
];
