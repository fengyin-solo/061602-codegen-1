<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '@/types/game'
import { TASK_TYPE_EMOJI, TASK_DIFFICULTY_COLORS, TASK_DIFFICULTY_NAMES } from '@/utils/constants'

const props = defineProps<{
  tasks: Task[]
}>()

const emit = defineEmits<{
  (e: 'claim', taskId: string): void
}>()

const activeTasks = computed(() => {
  return props.tasks.filter(t => !t.claimed).sort((a, b) => {
    if (a.completed && !b.completed) return -1
    if (!a.completed && b.completed) return 1
    return b.createdAt - a.createdAt
  })
})

const progressPercent = (task: Task) => {
  return Math.min(Math.round((task.progress / task.target) * 100), 100)
}

const handleClaim = (taskId: string) => {
  emit('claim', taskId)
}
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="font-display text-lg text-amber-300 flex items-center gap-2 px-1 mb-3">
      <span>📋</span> 鸟巢任务板
    </div>

    <div class="flex-1 min-h-0 overflow-y-auto scrollbar-hide flex flex-col gap-3 pb-2">
      <div v-if="activeTasks.length === 0" class="text-center text-white/40 text-sm py-8">
        <div class="text-4xl mb-2">🌟</div>
        <div>暂无任务</div>
        <div class="text-xs mt-1">新任务即将刷新~</div>
      </div>

      <div
        v-for="task in activeTasks"
        :key="task.id"
        class="relative rounded-2xl p-4 border backdrop-blur-sm transition-all duration-300"
        :class="[
          TASK_DIFFICULTY_COLORS[task.difficulty],
          task.completed ? 'ring-2 ring-yellow-400/50' : ''
        ]"
      >
        <div class="flex items-start gap-3">
          <div class="text-3xl flex-shrink-0">
            {{ TASK_TYPE_EMOJI[task.type] }}
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-bold text-white text-sm truncate">{{ task.title }}</span>
              <span
                class="text-[10px] px-2 py-0.5 rounded-full font-medium"
                :class="{
                  'bg-green-500/30 text-green-300': task.difficulty === 'easy',
                  'bg-blue-500/30 text-blue-300': task.difficulty === 'normal',
                  'bg-purple-500/30 text-purple-300': task.difficulty === 'hard',
                }"
              >
                {{ TASK_DIFFICULTY_NAMES[task.difficulty] }}
              </span>
            </div>
            <div class="text-white/60 text-xs mb-2">{{ task.description }}</div>

            <div class="flex items-center gap-2">
              <div class="flex-1 h-2 bg-black/30 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-500"
                  :class="task.completed ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : 'bg-gradient-to-r from-emerald-400 to-green-500'"
                  :style="{ width: `${progressPercent(task)}%` }"
                />
              </div>
              <span class="text-xs text-white/70 font-medium flex-shrink-0">
                {{ task.progress }}/{{ task.target }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
          <div class="flex items-center gap-1 text-amber-300 text-sm font-bold">
            <span>🎁</span>
            <span>+{{ task.reward }}</span>
            <span class="text-white/50 text-xs font-normal">食物</span>
          </div>

          <button
            v-if="task.completed && !task.claimed"
            class="px-4 py-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold rounded-xl btn-3d hover:from-yellow-400 hover:to-amber-400 transition-all animate-pulse-slow"
            @click="handleClaim(task.id)"
          >
            领取奖励
          </button>
          <div
            v-else-if="task.completed && task.claimed"
            class="text-green-400 text-xs font-medium flex items-center gap-1"
          >
            <span>✅</span>
            已领取
          </div>
          <div
            v-else
            class="text-white/40 text-xs"
          >
            进行中...
          </div>
        </div>

        <div
          v-if="task.completed && !task.claimed"
          class="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs animate-bounce-slow"
        >
          ✨
        </div>
      </div>
    </div>
  </div>
</template>
