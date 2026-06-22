<script setup lang="ts">
import { ref, computed } from 'vue'
import { interviews } from '@/data/mockData'
import { REASON_COLORS, FOLLOWUP_COLORS, type ReasonTag, type FollowupStatus } from '@/data/types'

const searchQuery = ref('')
const filterDept = ref('')
const departments = [...new Set(interviews.map((r) => r.department))]

const filtered = computed(() => {
  return interviews.filter((r) => {
    const matchSearch =
      !searchQuery.value ||
      r.employeeName.includes(searchQuery.value) ||
      r.destination.includes(searchQuery.value)
    const matchDept = !filterDept.value || r.department === filterDept.value
    return matchSearch && matchDept
  })
})

const renderStars = (score: number) => {
  return Array.from({ length: 5 }, (_, i) => i < score)
}

const resignTypeColor: Record<string, string> = {
  主动离职: 'text-accent-coral bg-accent-coral/10',
  被动离职: 'text-accent-amber bg-accent-amber/10',
  协商解除: 'text-accent-sky bg-accent-sky/10',
  合同到期: 'text-accent-violet bg-accent-violet/10',
}
</script>

<template>
  <div class="glass-card flex flex-col p-5">
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h3 class="section-title">离职面谈记录</h3>
        <p class="section-subtitle mt-0.5">
          共 {{ interviews.length }} 条记录 · 当前展示 {{ filtered.length }} 条
        </p>
      </div>

      <div class="flex items-center gap-2">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索员工/去向..."
            class="w-44 rounded-lg border border-white/[0.06] bg-base-800/60 px-3 py-1.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition focus:border-accent-teal/40 focus:bg-base-800"
          />
        </div>
        <select
          v-model="filterDept"
          class="rounded-lg border border-white/[0.06] bg-base-800/60 px-3 py-1.5 text-sm text-slate-200 outline-none transition focus:border-accent-teal/40"
        >
          <option value="">全部部门</option>
          <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
        </select>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full min-w-[920px] border-collapse">
        <thead>
          <tr class="border-b border-white/[0.06]">
            <th class="px-3 py-2.5 text-left text-xs font-600 uppercase tracking-wider text-slate-400">员工</th>
            <th class="px-3 py-2.5 text-left text-xs font-600 uppercase tracking-wider text-slate-400">部门</th>
            <th class="px-3 py-2.5 text-left text-xs font-600 uppercase tracking-wider text-slate-400">离职类型</th>
            <th class="px-3 py-2.5 text-left text-xs font-600 uppercase tracking-wider text-slate-400">离职原因</th>
            <th class="px-3 py-2.5 text-left text-xs font-600 uppercase tracking-wider text-slate-400">离职去向</th>
            <th class="px-3 py-2.5 text-center text-xs font-600 uppercase tracking-wider text-slate-400">坦诚度</th>
            <th class="px-3 py-2.5 text-center text-xs font-600 uppercase tracking-wider text-slate-400">挽留空间</th>
            <th class="px-3 py-2.5 text-center text-xs font-600 uppercase tracking-wider text-slate-400">跟进状态</th>
            <th class="px-3 py-2.5 text-right text-xs font-600 uppercase tracking-wider text-slate-400">面谈日期</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(record, idx) in filtered"
            :key="record.id"
            class="group border-b border-white/[0.03] transition-colors hover:bg-white/[0.025]"
            :class="idx % 2 === 0 ? '' : 'bg-white/[0.012]'"
          >
            <td class="px-3 py-3">
              <div class="flex items-center gap-2.5">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent-teal/20 to-accent-violet/20 text-xs font-600 text-slate-200">
                  {{ record.employeeName.charAt(0) }}
                </div>
                <div>
                  <p class="text-sm font-500 text-slate-200">{{ record.employeeName }}</p>
                  <p class="font-mono text-[10px] text-slate-500">{{ record.id }}</p>
                </div>
              </div>
            </td>
            <td class="px-3 py-3 text-sm text-slate-300">{{ record.department }}</td>
            <td class="px-3 py-3">
              <span
                class="inline-block rounded-md px-2 py-0.5 text-xs font-500"
                :class="resignTypeColor[record.resignType]"
              >
                {{ record.resignType }}
              </span>
            </td>
            <td class="px-3 py-3">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="tag in record.reasonTags"
                  :key="tag"
                  class="inline-block rounded px-1.5 py-0.5 text-[11px] font-500"
                  :style="{
                    color: REASON_COLORS[tag as ReasonTag],
                    background: REASON_COLORS[tag as ReasonTag] + '15',
                  }"
                >
                  {{ tag }}
                </span>
              </div>
            </td>
            <td class="px-3 py-3 text-sm text-slate-300">{{ record.destination }}</td>
            <td class="px-3 py-3">
              <div class="flex justify-center gap-0.5">
                <span
                  v-for="(filled, i) in renderStars(record.honestyScore)"
                  :key="i"
                  class="text-xs"
                  :class="filled ? 'text-accent-amber' : 'text-slate-700'"
                >
                  ★
                </span>
              </div>
            </td>
            <td class="px-3 py-3">
              <div class="flex justify-center gap-0.5">
                <span
                  v-for="(filled, i) in renderStars(record.retentionScore)"
                  :key="i"
                  class="text-xs"
                  :class="filled ? 'text-accent-teal' : 'text-slate-700'"
                >
                  ●
                </span>
              </div>
            </td>
            <td class="px-3 py-3">
              <div class="flex justify-center">
                <span
                  class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-500"
                  :style="{
                    color: FOLLOWUP_COLORS[record.followupStatus as FollowupStatus],
                    background: FOLLOWUP_COLORS[record.followupStatus as FollowupStatus] + '15',
                  }"
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full"
                    :style="{ background: FOLLOWUP_COLORS[record.followupStatus as FollowupStatus] }"
                  />
                  {{ record.followupStatus }}
                </span>
              </div>
            </td>
            <td class="px-3 py-3 text-right font-mono text-xs text-slate-400">
              {{ record.interviewDate }}
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filtered.length === 0" class="py-12 text-center text-sm text-slate-500">
        未找到匹配的记录
      </div>
    </div>
  </div>
</template>
