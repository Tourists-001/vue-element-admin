import './waves.css'

const context = '@@wavesContent'
function handleClick(el, binding) {
  function handle(e) {
    const customOpt = Object.assign({}, binding.value) // 自己传入的属性v-waves="{ type: 'center' ,name: '1' }"
    const opts = Object.assign(
      {
        ele: el, // 波纹作用元素
        type: 'hit', // hit 点击位置扩散 center中心点扩展
        color: 'rgba(0, 0, 0, 0.15)' // 波纹颜色
      },
      customOpt
    )
    const target = opts.ele
    // 避免自己传入的ele没值
    if (target) {
      target.style.position = 'relative'
      target.style.overflow = 'hidden'
      const rect = target.getBoundingClientRect()
      // console.log(rect)
      let ripple = target.querySelector('.waves-ripple')
      if (!ripple) {
        ripple = document.createElement('span')
        ripple.className = 'waves-ripple'
        ripple.style.height = ripple.style.width =
          Math.max(rect.width, rect.height) + 'px'
        target.appendChild(ripple)
      } else {
        ripple.className = 'waves-ripple'
      }
      // 设置位置
      switch (opts.type) {
        case 'center':
          ripple.style.top = rect.height / 2 - ripple.offsetHeight / 2 + 'px'
          ripple.style.left = rect.width / 2 - ripple.offsetWidth / 2 + 'px'
          break
        default:
          ripple.style.top =
            (e.pageY -
              rect.top -
              ripple.offsetHeight / 2 -
              document.documentElement.scrollTop || document.body.scrollTop) + 'px'
          ripple.style.left =
            (e.pageX -
              rect.left -
              ripple.offsetWidth / 2 -
              document.documentElement.scrollLeft || document.body.scrollLeft) + 'px'
      }
      ripple.style.backgroundColor = opts.color
      ripple.className = 'waves-ripple z-active'
      return false
    }
  }
  if (!el[context]) {
    el[context] = {
      removeHandle: handle
    }
  } else {
    el[context].removeHandle = handle
  }

  return handle
}

export default {
  // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  bind(el, binding) {
    // console.log(el, binding)
    el.addEventListener('click', handleClick(el, binding), false)
  },
  update(el, binding) {
    el.removeEventListener('click', el[context].removeHandle, false)
    el.addEventListener('click', handleClick(el, binding), false)
  },
  unbind(el) {
    el.removeEventListener('click', el[context].removeHandle, false)
    el[context] = null
    delete el[context]
  }
}
