# Reset Scanner App

Mobil uygulama için backend sunucusu (Express + TypeScript).  
Bu proje, kullanıcı kimlik doğrulaması, resim analizi ve REST API desteği sağlar.  

## 🚀 Özellikler
- 📸 **Görüntü Yükleme & Analiz**: Kullanıcılar ürün fotoğraflarını yükleyebilir, sistem içerikleri analiz eder.  
- 🔐 **Kullanıcı Doğrulama**: E-posta & şifre ile güvenli giriş. (Gelecekte Google/Apple ile giriş opsiyonel olabilir)  
- 🌐 **REST API Desteği**: Mobil uygulama bu backend ile iletişim kurar.  
- ⚙️ **Admin / Kullanıcı Rolleri**: İlerleyen sürümlerde aile üyeleri veya premium hesaplara sınırsız hak tanımlanabilecek.  
- 🌓 **Dil Seçeneği & Dark/Light Mode**: Mobil uygulamada desteklenecek.  

## 📂 Proje Yapısı
- `/src` → TypeScript kaynak kodları  
- `/dist` → Derlenmiş JavaScript dosyaları  
- `/routes` → API endpoint tanımları  
- `/controllers` → İş mantığı  
- `/models` → Veri modelleri  

## 🔑 Gereksinimler
- Node.js 18+  
- NPM veya Yarn  
- OpenAI API Key (çevre değişkeni olarak eklenmeli: `OPENAI_API_KEY`)  

## ⚡ Çalıştırma
```bash
npm install
npm run build
npm run start
