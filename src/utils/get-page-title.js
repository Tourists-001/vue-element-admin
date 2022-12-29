const title = 'Vue Element Admin'

/**
 * 获取新的网页title
 * @param {*} pageTitle
 */
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
