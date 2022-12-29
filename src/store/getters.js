const getters = {
  token: (state) => state.user.token,
  permission_routes: (state) => state.permission.routes,
  sidebar: (state) => state.app.sidebar,
  roles: (state) => state.user.roles,
  device: (state) => state.app.device,
  errorLogs: (state) => state.errorLog.logs,
  size: (state) => state.app.size,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name
}

export default getters
