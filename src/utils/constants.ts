import type { Weather, WeatherEffect, BerryType, GrowthStage, Personality, TaskType, TaskDifficulty } from '@/types/game'

export const ATTR_MIN = 0
export const ATTR_MAX = 100
export const DEATH_THRESHOLD = 10

export const STAGE_DURATION: Record<Exclude<GrowthStage, 'adult'>, number> = {
  egg: 1,
  chick: 2,
  juvenile: 2,
  subadult: 1,
}

export const STAGE_NAMES: Record<GrowthStage, string> = {
  egg: '🥚 蛋',
  chick: '🐣 雏鸟',
  juvenile: '🐥 幼鸟',
  subadult: '🦜 亚成鸟',
  adult: '🐦 成鸟',
}

export const STAGE_EMOJI: Record<GrowthStage, string> = {
  egg: '🥚',
  chick: '🐣',
  juvenile: '🐥',
  subadult: '🦜',
  adult: '🐦',
}

export const FOOD_NEED_MULTIPLIER: Record<Exclude<GrowthStage, 'egg'>, number> = {
  chick: 1.5,
  juvenile: 1.2,
  subadult: 1.0,
  adult: 0.8,
}

export const HUNGER_DECAY_RATE = 1.5
export const FEAR_DECAY_RATE = 0.8
export const HEALTH_RECOVERY_RATE = 0.5

export const BERRY_SPAWN_INTERVAL = 4000
export const BERRY_MAX_COUNT = 8
export const BERRY_LIFETIME = 20000

export const BERRY_VALUES: Record<BerryType, number> = {
  red: 10,
  blue: 15,
  golden: 25,
}

export const BERRY_COLORS: Record<BerryType, string> = {
  red: '#C41E3A',
  blue: '#4169E1',
  golden: '#FFD700',
}

export const BERRY_EMOJI: Record<BerryType, string> = {
  red: '🍒',
  blue: '🫐',
  golden: '✨',
}

export const WEATHER_CHANGE_INTERVAL = 25000

export const WEATHER_EFFECTS: Record<Weather, WeatherEffect> = {
  sunny: { hungerMod: 1.0, fearMod: 0.8, healthMod: 1.0 },
  rainy: { hungerMod: 1.3, fearMod: 1.5, healthMod: 0.9, awayChance: 0.08 },
  snowy: { hungerMod: 1.5, fearMod: 1.2, healthMod: 0.7, sickChance: 0.12 },
  stormy: { hungerMod: 1.2, fearMod: 2.0, healthMod: 0.6, awayChance: 0.2, sickChance: 0.18 },
}

export const WEATHER_NAMES: Record<Weather, string> = {
  sunny: '☀️ 晴天',
  rainy: '🌧️ 雨天',
  snowy: '❄️ 雪天',
  stormy: '🌪️ 暴风',
}

export const WEATHER_COLORS: Record<Weather, string> = {
  sunny: 'from-amber-300/30 to-yellow-200/20',
  rainy: 'from-blue-400/40 to-gray-500/30',
  snowy: 'from-blue-100/40 to-white/30',
  stormy: 'from-gray-600/50 to-purple-800/40',
}

export const PERSONALITY_NAMES: Record<Personality, string> = {
  bold: '勇敢大胆',
  shy: '胆小害羞',
  gentle: '温柔恬静',
  curious: '好奇活泼',
  stubborn: '倔强独立',
}

export const PERSONALITY_EMOJI: Record<Personality, string> = {
  bold: '💪',
  shy: '🥺',
  gentle: '🌸',
  curious: '🌟',
  stubborn: '😤',
}

export const DAY_DURATION = 60000
export const INITIAL_FOOD = 30
export const MIN_EGGS = 2
export const MAX_EGGS = 4
export const MAX_BREEDING_ROUNDS = 2

export const BIRD_NAMES = [
  '毛毛', '豆豆', '啾啾', '喳喳', '花花', '点点', '果果', '泡泡',
  '糖糖', '圆圆', '小米', '小麦', '云朵', '星星', '月亮', '太阳',
  '小橘', '小蓝', '小绿', '小红', '阿黄', '阿白', '阿黑', '阿灰',
]

export const TASK_REFRESH_INTERVAL = 45000
export const MAX_ACTIVE_TASKS = 4

export interface TaskTemplate {
  type: TaskType
  title: string
  description: string
  baseTarget: number
  baseReward: number
  difficulty: TaskDifficulty
  weather?: Weather[]
  stages?: GrowthStage[]
}

export const TASK_TEMPLATES: TaskTemplate[] = [
  {
    type: 'feed',
    title: '喂食小能手',
    description: '喂饱饥饿的小鸟们',
    baseTarget: 3,
    baseReward: 15,
    difficulty: 'easy',
    stages: ['chick', 'juvenile', 'subadult', 'adult'],
  },
  {
    type: 'feed',
    title: '美食家',
    description: '让每只小鸟都吃得饱饱的',
    baseTarget: 8,
    baseReward: 35,
    difficulty: 'normal',
    stages: ['chick', 'juvenile', 'subadult', 'adult'],
  },
  {
    type: 'feed',
    title: '超级饲养员',
    description: '今天是喂食大挑战！',
    baseTarget: 15,
    baseReward: 60,
    difficulty: 'hard',
    stages: ['chick', 'juvenile', 'subadult', 'adult'],
  },
  {
    type: 'calm',
    title: '安抚小天使',
    description: '安抚受惊的小鸟',
    baseTarget: 2,
    baseReward: 12,
    difficulty: 'easy',
    weather: ['rainy', 'stormy', 'snowy'],
    stages: ['chick', 'juvenile', 'subadult', 'adult'],
  },
  {
    type: 'calm',
    title: '心灵抚慰者',
    description: '在坏天气里给小鸟安全感',
    baseTarget: 5,
    baseReward: 30,
    difficulty: 'normal',
    weather: ['rainy', 'stormy', 'snowy'],
    stages: ['chick', 'juvenile', 'subadult', 'adult'],
  },
  {
    type: 'calm',
    title: '风暴守护者',
    description: '暴风雨中的守护天使',
    baseTarget: 10,
    baseReward: 55,
    difficulty: 'hard',
    weather: ['stormy'],
    stages: ['juvenile', 'subadult', 'adult'],
  },
  {
    type: 'health',
    title: '健康小卫士',
    description: '保持小鸟健康',
    baseTarget: 2,
    baseReward: 18,
    difficulty: 'easy',
    stages: ['chick', 'juvenile', 'subadult', 'adult'],
  },
  {
    type: 'health',
    title: '贴心护理员',
    description: '悉心照料每一只小鸟',
    baseTarget: 5,
    baseReward: 40,
    difficulty: 'normal',
    weather: ['snowy', 'stormy'],
    stages: ['chick', 'juvenile', 'subadult', 'adult'],
  },
  {
    type: 'collect',
    title: '浆果收集者',
    description: '收集美味的浆果',
    baseTarget: 5,
    baseReward: 10,
    difficulty: 'easy',
  },
  {
    type: 'collect',
    title: '采果达人',
    description: '在林中采集更多浆果',
    baseTarget: 12,
    baseReward: 25,
    difficulty: 'normal',
  },
  {
    type: 'collect',
    title: '浆果大师',
    description: '今天是丰收的好日子！',
    baseTarget: 20,
    baseReward: 50,
    difficulty: 'hard',
    weather: ['sunny'],
  },
  {
    type: 'hatch',
    title: '等待孵化',
    description: '见证新生命的诞生',
    baseTarget: 1,
    baseReward: 20,
    difficulty: 'easy',
    stages: ['egg'],
  },
  {
    type: 'hatch',
    title: '孵化专家',
    description: '让所有蛋顺利孵化',
    baseTarget: 3,
    baseReward: 45,
    difficulty: 'normal',
    stages: ['egg'],
  },
  {
    type: 'survive',
    title: '平安一天',
    description: '平安度过这一天',
    baseTarget: 1,
    baseReward: 25,
    difficulty: 'normal',
  },
]

export const TASK_TYPE_EMOJI: Record<TaskType, string> = {
  feed: '🍽️',
  calm: '💝',
  health: '💚',
  collect: '🫐',
  survive: '🛡️',
  hatch: '🥚',
}

export const TASK_DIFFICULTY_COLORS: Record<TaskDifficulty, string> = {
  easy: 'from-green-500/20 to-emerald-500/10 border-green-400/30',
  normal: 'from-blue-500/20 to-cyan-500/10 border-blue-400/30',
  hard: 'from-purple-500/20 to-pink-500/10 border-purple-400/30',
}

export const TASK_DIFFICULTY_NAMES: Record<TaskDifficulty, string> = {
  easy: '简单',
  normal: '普通',
  hard: '困难',
}
