import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.100.6:3333',
})

export default api

// IOS com Emulador: localhost
// IOS com físico: ip da máquina

// Android com emulador: localhost (adb reverse) adb reverse tcp:3333 tcp:3333
// Android com emulador: 10.0.2.2 (android Studio)
// Android com emulador: 10.0.3.2 (Genymotion)
// Andro com físico: IP da máquina