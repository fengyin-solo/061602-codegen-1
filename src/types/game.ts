export type GrowthStage = 'egg' | 'chick' | 'juvenile' | 'subadult' | 'adult'

export type Weather = 'sunny' | 'rainy' | 'snowy' | 'stormy'

export type Personality = 'bold' | 'shy' | 'gentle' | 'curious' | 'stubborn'

export type BerryType = 'red' | 'blue' | 'golden'

export type GamePhase = 'start' | 'playing' | 'breeding' | 'ended'

export interface Bird {
  id: string
  name: string
  stage: GrowthStage
  stageProgress: number
  hunger: number
  fear: number
  health: number
  personality: Personality
  hatchDuration: number
  hatchTimeLeft: number
  isAway: boolean
  isSick: boolean
  isDead: boolean
  feedingCount: number
  lastFedAt: number
  awayUntil?: number
  sickUntil?: number
  justHatched?: boolean
  justGrew?: boolean
  justFed?: boolean
}

export interface Berry {
  id: string
  x: number
  y: number
  value: number
  type: BerryType
  spawnedAt: number
}

export interface GameState {
  phase: GamePhase
  day: number
  dayProgress: number
  currentWeather: Weather
  nextWeatherChangeAt: number
  foodStock: number
  birds: Bird[]
  berries: Berry[]
  totalHatched: number
  totalDied: number
  breedingCount: number
  maxBreedingRounds: number
  eventLog: { id: string; message: string; type: string; timestamp: number }[]
  score?: GameScore
  selectedBirdId?: string
  tasks: Task[]
  taskStats: TaskStats
  lastTaskRefreshAt: number
}

export interface GameScore {
  totalScore: number
  survivalRate: number
  avgHealth: number
  breedingBonus: number
  personalityBonus: number
  stars: number
  rank: string
}

export interface WeatherEffect {
  hungerMod: number
  fearMod: number
  healthMod: number
  awayChance?: number
  sickChance?: number
}

export type TaskType = 'feed' | 'calm' | 'health' | 'collect' | 'survive' | 'hatch'

export type TaskDifficulty = 'easy' | 'normal' | 'hard'

export interface Task {
  id: string
  type: TaskType
  title: string
  description: string
  target: number
  progress: number
  reward: number
  difficulty: TaskDifficulty
  completed: boolean
  claimed: boolean
  createdAt: number
  expiresAt?: number
  relatedWeather?: Weather
  relatedStage?: GrowthStage
}

export interface TaskStats {
  totalCompleted: number
  totalClaimed: number
  totalRewardEarned: number
  easyCompleted: number
  normalCompleted: number
  hardCompleted: number
}

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
