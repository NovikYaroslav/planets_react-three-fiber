# Оптимизация производительности

## 📊 Текущие размеры файлов

### Большие файлы (>1MB):

- `earth_baseColor.png` - 23.8 MB
- `clouds_baseColor.png` - 22.9 MB
- `Material.001_baseColor.jpeg` - 19.7 MB
- `earth_specularf0.png` - 10.5 MB
- `moon/scene.bin` - 14.3 MB
- `beautiful-shining-stars-night-sky.jpg` - 12.7 MB

## 🚀 Рекомендации по оптимизации

### 1. Сжатие текстур

```bash
# Используйте инструменты для сжатия изображений
npm install -g imagemin-cli
imagemin public/models/earth/textures/*.png --out-dir=public/models/earth/textures/optimized
```

### 2. Конвертация в WebP

```bash
# Конвертируйте PNG в WebP для лучшего сжатия
cwebp earth_baseColor.png -o earth_baseColor.webp -q 80
```

### 3. Оптимизация GLTF моделей

```bash
# Используйте gltf-pipeline для оптимизации
npm install -g gltf-pipeline
gltf-pipeline -i scene.gltf -o scene_optimized.gltf -s
```

### 4. Ленивая загрузка

```javascript
// В компонентах используйте динамический импорт
const Earth = lazy(() => import('../Earth/Earth'));
const Moon = lazy(() => import('../Moon/Moon'));
```

### 5. CDN для статических файлов

- Загрузите большие файлы на CDN (Cloudinary, AWS S3)
- Используйте URL CDN вместо локальных файлов

## 🔧 Webpack оптимизации

### Добавьте в webpack.config.js:

```javascript
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      },
    },
  },
},
```

### Сжатие изображений:

```javascript
{
  test: /\.(png|jpg|gif|svg|jpeg)$/,
  use: [
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: [0.65, 0.90], speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 75 }
      }
    }
  ]
}
```

## 📱 VR оптимизации

### 1. Уменьшение качества для VR

```javascript
// В VR режиме используйте текстуры меньшего размера
const isVR = useXR().isPresenting;
const textureQuality = isVR ? 'low' : 'high';
```

### 2. LOD (Level of Detail)

```javascript
// Показывайте разные модели в зависимости от расстояния
const distance = camera.position.distanceTo(planetPosition);
const modelQuality = distance > 10 ? 'low' : 'high';
```

## 🎯 Приоритеты оптимизации

### Высокий приоритет:

1. **Сжать текстуры планет** (экономия ~50MB)
2. **Оптимизировать GLTF модели**
3. **Конвертировать в WebP**

### Средний приоритет:

1. **Ленивая загрузка компонентов**
2. **Разделение кода (code splitting)**
3. **Кэширование ресурсов**

### Низкий приоритет:

1. **CDN для статических файлов**
2. **Прогрессивная загрузка**
3. **Предзагрузка критических ресурсов**

## 📈 Ожидаемые результаты

После оптимизации:

- **Общий размер**: с ~100MB до ~20MB
- **Время загрузки**: с 30s до 5s
- **VR производительность**: улучшение на 40%
- **SEO рейтинг**: улучшение PageSpeed Score
