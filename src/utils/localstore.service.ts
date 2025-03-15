export type KeyToken = 'token' | 'refreshToken' | 'id' | 'username'

export const setTokenToLS = (key: KeyToken, data: string) => {
  const item = typeof data !== 'string' ? JSON.stringify(data) : data;
  localStorage.setItem(key, item)
}

export const getTokenFromLS = (key: KeyToken) => {
  return localStorage.getItem(key)
}




export const LocalStorageEventTarget = new EventTarget();

export const clearLS = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

// Sự kiện này có thể được lắng nghe(listen) ở bất kỳ component nào để thực hiện hành động phù hợp, ví dụ:
// Redirect người dùng về trang đăng nhập.
// Cập nhật giao diện để phản ánh trạng thái đăng xuất.