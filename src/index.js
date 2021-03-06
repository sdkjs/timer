/**
 * a human oriented timer for javascript
 *
 * var timer = new Timer(func, 2000)
 * timer.run()
 * timer.stop()
 * timer.start()
 * timer.reset()
 * timer.reset(1000)
 * timer.cancel()
 */

const CONSTRUCTED = 0

const STOPPED = 1

const CANCELLED = 2

const RUNNING = 3

function attempt(fn, context, args) {
  if (typeof fn !== 'function') return

  try {
    return fn.apply(context, args)
  } catch(e) {
    return
  }
}

export default function(fn, duration) {
  /**
   * running期间多次调用会执行多次
   * 下个执行点为轮询执行完毕的duration之后
   */
  this.duration = duration
  this.status = RUNNING

  // 立即执行一次
  this.run = () => {
    if (this.status === CANCELLED) return

    // 清除上次的定时器
    clearTimeout(this.timer)
    attempt(fn)
    this.timer = setTimeout(this.run, this.duration)
  }

  // 重新设置定时器的轮询周期
  this.reset = (num) => {
    if (this.status === CANCELLED) return

    this.stop()
    if (num) {
      this.duration = num
    }
    this.run()
  }

  this.start = () => {
    if (this.status === STOPPED) {
      setTimeout(this.run, this.duration)
    }
  }

  // 暂停
  this.stop = () => {
    this.status = STOPPED
    clearTimeout(this.timer)
  }

  // 永久停止timer防止被错误启动
  this.cancel = function() {
    this.status = CANCELLED
    clearTimeout(this.timer)
  }

  this.timer = setTimeout(this.run, this.duration)
}
