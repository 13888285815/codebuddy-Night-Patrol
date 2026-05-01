export type Screen =
  | "title"
  | "about"
  | "explainer"
  | "map"
  | "combat"
  | "cinematic"
  | "reward"
  | "event"
  | "rest"
  | "shop"
  | "remove"
  | "upgrade"
  | "gameover"
  | "victory";

export type CardType = "attack" | "skill" | "power" | "status";
export type Rarity = "basic" | "common" | "uncommon" | "rare" | "special" | "status";
export type NodeType = "combat" | "elite" | "event" | "rest" | "shop" | "boss";
export type Difficulty = "story" | "normal" | "hard";

export interface MapNode {
  id: string;
  row: number;
  lane: number;
  type: NodeType;
  nextIds: string[];
}

export interface CardDef {
  id: string;
  name: string;
  type: CardType;
  rarity: Rarity;
  cost: number | "-";
  text: [string, string];
  exhaust?: boolean;
  unplayable?: boolean;
}

export interface CardInstance {
  uid: string;
  id: string;
  upgraded: boolean;
  temp?: boolean;
}

export interface RelicDef {
  id: string;
  name: string;
  text: string;
  onGain?: "gold60";
}

export interface EnemyMove {
  type: "attack" | "block" | "buff" | "debuff" | "curse" | "blockAttack";
  amount: number;
  hits?: number;
  block?: number;
  label: string;
}

export interface EnemyTemplate {
  id: string;
  name: string;
  artKey: string;
  hp: number;
  moves: EnemyMove[];
  elite?: boolean;
  boss?: boolean;
}

export interface EnemyState extends EnemyTemplate {
  maxHp: number;
  block: number;
  strength: number;
  seal: number;
  weak: number;
  vulnerable: number;
  intent: EnemyMove | null;
}

export interface PlayerState {
  name: string;
  hp: number;
  maxHp: number;
  block: number;
  energy: number;
  maxEnergy: number;
  incense: number;
  gold: number;
  weak: number;
  vulnerable: number;
  powers: {
    nightEye?: number;
    citygod?: number;
  };
  deck: CardInstance[];
  relics: RelicDef[];
}

export interface CombatState {
  type: "combat" | "elite" | "boss";
  enemy: EnemyState;
  drawPile: CardInstance[];
  discardPile: CardInstance[];
  exhaustPile: CardInstance[];
  hand: CardInstance[];
  turn: number;
  cardsPlayedThisTurn: number;
  attackPlayed: boolean;
  pulse: number;
  hitTarget: "enemy" | "player" | null;
}

export interface EventChoiceDef {
  id: string;
  title: string;
  desc: string;
}

export interface EventDef {
  id: string;
  title: string;
  body: string;
  choices: EventChoiceDef[];
}

export interface RewardState {
  title: string;
  gold: number;
  relic: RelicDef | null;
  cards: CardInstance[];
}

export interface CinematicState {
  enemyId: string;
  enemyName: string;
  enemyArtKey: string;
  combatType: "combat" | "elite" | "boss";
  title: string;
  subtitle: string;
  videoUrl: string;
  posterUrl: string;
  nextScreen: "reward" | "victory";
  rewardSummary?: {
    gold: number;
    relicName?: string;
  };
}

export interface ShopState {
  cards: Array<{
    card: CardInstance;
    sold: boolean;
    cost: number;
  }>;
  relic: {
    relic: RelicDef | null;
    sold: boolean;
    cost: number;
  };
  removeCost: number;
}

export interface PendingCardAction {
  cost?: number;
  returnScreen: "map" | "shop";
}

export interface GameState {
  screen: Screen;
  difficulty: Difficulty;
  player: PlayerState | null;
  floor: number;
  mapNodes: MapNode[];
  availableNodeIds: string[];
  currentNodeId: string | null;
  visitedNodeIds: string[];
  combat: CombatState | null;
  cinematic: CinematicState | null;
  reward: RewardState | null;
  event: EventDef | null;
  shop: ShopState | null;
  pendingRemove: PendingCardAction | null;
  pendingUpgrade: PendingCardAction | null;
  log: string[];
  seed: number;
  nextCardUid: number;
  lastFx: "none" | "card" | "hit" | "impact" | "fire" | "lightning" | "charge" | "block" | "reward" | "danger";
}
