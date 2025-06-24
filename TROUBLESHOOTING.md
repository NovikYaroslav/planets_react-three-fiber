# Troubleshooting VR Issues

## 🐛 Частые проблемы и их решения

### 1. Ошибка "Cannot read properties of undefined (reading 'S')"

**Причина:** Несовместимость версий `@react-three/fiber`, `@react-three/drei` и `@react-three/xr`

**Решение:**

```bash
npm uninstall @react-three/fiber @react-three/drei @react-three/xr
npm install @react-three/fiber@^8.15.0 @react-three/drei@^9.88.0 @react-three/xr@^5.4.0 --legacy-peer-deps
```

### 2. Предупреждение "export 'Controllers' was not found"

**Причина:** В новых версиях `@react-three/xr` компонент был переименован

**Решение:** Используйте совместимые версии (см. выше) или замените `Controllers` на `XRControllerComponent`

### 3. VR не запускается в браузере

**Возможные причины:**

- Браузер не поддерживает WebXR
- VR устройство не подключено
- Необходимо HTTPS соединение

**Решения:**

1. Используйте Chrome 79+, Firefox 72+, Edge 79+
2. Убедитесь, что VR гарнитура подключена
3. Для продакшена используйте HTTPS

### 4. Низкая производительность в VR

**Решения:**

- Уменьшите качество текстур
- Отключите пост-обработку
- Используйте более простые 3D модели
- Проверьте системные требования

### 5. Контроллеры не работают

**Решения:**

- Убедитесь, что контроллеры заряжены
- Перезапустите VR гарнитуру
- Проверьте драйверы
- Попробуйте другой браузер

## 🔧 Совместимые версии

Для стабильной работы используйте:

```json
{
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.88.0",
  "@react-three/xr": "^5.4.0",
  "three": "^0.170.0"
}
```

## 📱 Поддерживаемые устройства

### VR гарнитуры:

- ✅ Oculus Quest / Quest 2 / Quest Pro
- ✅ HTC Vive / Vive Pro
- ✅ Valve Index
- ✅ Windows Mixed Reality
- ⚠️ Google Cardboard (базовая поддержка)

### Браузеры:

- ✅ Chrome 79+
- ✅ Firefox 72+
- ✅ Edge 79+
- ⚠️ Safari 13.1+ (iOS)

## 🚀 Отладка

### Включение отладки:

```javascript
// В консоли браузера
localStorage.setItem('debug', 'react-three-fiber:*');
```

### Проверка WebXR поддержки:

```javascript
if ('xr' in navigator) {
  navigator.xr
    .isSessionSupported('immersive-vr')
    .then((supported) => console.log('VR supported:', supported));
}
```

## 📞 Получение помощи

1. Проверьте консоль браузера на ошибки
2. Убедитесь, что все зависимости совместимы
3. Попробуйте другой браузер
4. Проверьте системные требования VR устройства
