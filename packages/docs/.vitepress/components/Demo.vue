<script setup lang="ts">
import { computed, getCurrentInstance, ref, toRef, watch } from 'vue'
import { computedAsync, useClipboard, useToggle } from '@vueuse/core'
import { ElNotification } from 'element-plus'
import { highlight } from '../utils/highlight'

const props = defineProps<{
  source: string
  description?: string
}>()

const vm = getCurrentInstance()!
const decoded = ref('')

watch(
  () => props.source,
  async (val) => {
    try {
      const render = await highlight()
      decoded.value = render(val, 'html')
    }
    catch (error) {
      decoded.value = val
    }
  },
  {
    immediate: true,
  },
)

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.source),
  read: false,
})

const [sourceVisible, setSourceVisible] = useToggle()

const decodedDescription = computed(() =>
  decodeURIComponent(props.description!),
)

const decodedCode = computed(() =>
  decodeURIComponent(props.source!),
)

const copyCode = async () => {
  try {
    await copy()
    ElNotification.success('代码复制成功')
  }
  catch (e: any) {
    ElNotification.error(e.message)
  }
}
</script>

<template>
  <div>
    <p v-if="decodedDescription" text="sm" v-html="decodedDescription" />
    <div class="example">
      <div class="example-showcase">
        <div v-html="decodedCode" />
      </div>
      <el-divider />
      <div class="op-btn-group">
        <el-tooltip content="复制代码" :show-arrow="false">
          <svg
            class="op-btn"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4898"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="16"
            height="16"
            title="复制"
            @click="copyCode"
          >
            <path
              d="M68.608 962.56V206.848h740.864V962.56H68.608zM746.496 271.36H131.584v629.248h614.912V271.36zM131.584 262.144"
              p-id="4899"
              fill="#666"
            />
            <path
              d="M219.136 65.024v116.224h62.976V129.536h614.912v629.248h-60.416v61.952h123.392V65.024z"
              p-id="4900"
              fill="#666"
            />
          </svg>
        </el-tooltip>
        <el-tooltip content="查看源代码" :show-arrow="false">
          <svg
            class="op-btn"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2840"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="22"
            height="22"
            title="展开"
            @click="setSourceVisible()"
          >
            <path
              d="M311.1 739c-6.1 0-12.2-2.3-16.8-7L69.7 507.4l224.6-224.6c9.3-9.3 24.3-9.3 33.6 0s9.3 24.3 0 33.6l-191 191 191 191c9.3 9.3 9.3 24.3 0 33.6-4.6 4.7-10.7 7-16.8 7zM711.5 739c-6.1 0-12.2-2.3-16.8-7-9.3-9.3-9.3-24.3 0-33.6l191-191-191-191c-9.3-9.3-9.3-24.3 0-33.6s24.3-9.3 33.6 0L953 507.4 728.3 732c-4.6 4.7-10.7 7-16.8 7zM418.5 814.7c-2.4 0-4.8-0.4-7.2-1.1-12.5-4-19.4-17.3-15.5-29.8l179.6-567.1c4-12.5 17.3-19.4 29.8-15.5 12.5 4 19.4 17.3 15.5 29.8L441.1 798.1a23.73 23.73 0 0 1-22.6 16.6z"
              fill="#666"
              p-id="2841"
            />
          </svg>
        </el-tooltip>
      </div>
      <el-divider v-show="sourceVisible" />
      <el-collapse-transition>
        <div
          v-show="sourceVisible"
          class="example-source language-vue"
          v-html="decoded"
        />
      </el-collapse-transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.example {
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  overflow: hidden;

  .el-divider--horizontal {
    margin: 0;
  }

  .op-btn-group {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;
    }
  }
}
</style>

<style scoped lang="scss">
.language-vue {
  margin: 0 !important;
  border-radius: 0 !important;
}
</style>

<style lang="scss" scoped>
.example-showcase {
  padding: 1.5rem;
  margin: 0.5px;
  background-color: var(--bg-color);
  &.transparent-enabled {
    background-image: linear-gradient(
        45deg,
        rgb(249, 249, 250) 25%,
        transparent 25%
      ),
      linear-gradient(135deg, rgb(249, 249, 250) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, rgb(249, 249, 250) 75%),
      linear-gradient(135deg, transparent 75%, rgb(249, 249, 250) 75%);
    background-size: 20px 20px;
    background-position: 0px 0px, 10px 0px, 10px -10px, 0px 10px;
  }

  @at-root .dark .example-showcase {
    background-image: unset;
    background-color: var(--bg-color-soft);
  }
}
</style>
