export default {
  // 只调用一次，指令第一次绑定到元素时调用
  bind(el, binding, vnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cssText += ';cursor:move;'
    dragDom.style.cssText += ';top:0px;'
    // console.log(dialogHeaderEl, dragDom)
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const getStyle = (function() {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr]
      }
    })()
    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素点击距离父元素的距离
      const disY = e.clientY - dialogHeaderEl.offsetTop
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      // 包容器的宽高()
      const dragDomWidth = dragDom.offsetWidth
      const dragDomHeight = dragDom.offsetHeight
      // 可视区的宽高
      const clientHeight = document.body.clientHeight
      const clientWidth = document.body.clientWidth
      // min max left （对宽高计算需要加上偏移位置）
      const minDragDomLeft = dragDom.offsetLeft
      // console.log(minDragDomLeft);
      const maxDragDomLeft = clientWidth - dragDom.offsetLeft - dragDomWidth
      // min max top
      const minDragDomTop = dragDom.offsetTop
      // console.log(minDragDomTop);
      const maxDragDomTop = clientHeight - dragDom.offsetTop - dragDomHeight

      // 获取dragDom的偏移值
      let styL = getStyle(dragDom, 'left')
      let styT = getStyle(dragDom, 'top')
      // 用正则替换单位
      if (styL.includes('%') || styT.includes('%')) {
        styL = +clientWidth * (+styL.replace(/\%/g, '') / 100)
        styT = +clientHeight * (+styT.replace(/\%/g, '') / 100)
      } else {
        styL = +styL.replace(/\px/g, '')
        styT = +styT.replace(/\px/g, '')
      }

      document.onmousemove = function(e) {
        // 通过事件委托，计算移动距离
        let left = e.clientX - disX
        let top = e.clientY - disY
        // 边界处理

        if (-left > minDragDomLeft) {
          left = -minDragDomLeft
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }

        if (-top > minDragDomTop) {
          top = -minDragDomTop
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }
        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
        // emit onDrag event
        vnode.child.$emit('dragDialog')
      }

      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
