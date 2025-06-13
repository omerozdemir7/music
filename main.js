// main.js

// Electron modüllerini içe aktarın
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow; // Ana pencere referansı

function createWindow () {
  // Yeni bir tarayıcı penceresi oluşturun
  mainWindow = new BrowserWindow({
    width: 800, // Pencere genişliği
    height: 600, // Pencere yüksekliği
    minWidth: 450, // Minimum genişlik (küçük ekranlar için)
    minHeight: 650, // Minimum yükseklik (küçük ekranlar için)
    autoHideMenuBar: true, // Menü çubuğunu gizle
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Güvenlik için önerilir (şimdilik boş bırakabiliriz)
      nodeIntegration: true, // Web içeriğinde Node.js API'lerini kullanmaya izin verir (DİKKATLİ OLUN!)
      contextIsolation: false // Node.js entegrasyonu true ise genellikle false olmalı
    }
  });

  // Uygulamanızın HTML dosyasını yükleyin
  // HTML dosyanızın adı 'index.html' değilse, burayı güncelleyin!
  // Örneğin: mainWindow.loadFile('muzik_calar.html');
  mainWindow.loadFile('index.html'); 

  // (İsteğe bağlı) Geliştirici araçlarını açmak için:
  // mainWindow.webContents.openDevTools();
}

// Bu metod, Electron hazır olduğunda çağrılır.
// Pencere oluşturur ve uygulamanın başlangıç noktasıdır.
app.whenReady().then(() => {
  createWindow();

  // Uygulama etkinleştirildiğinde (örn. Dock'ta ikona tıklanıldığında) pencere oluştur.
  // macOS için yaygın bir davranıştır.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Tüm pencereler kapatıldığında uygulamadan çıkın.
// macOS'ta kullanıcı CMD + Q ile açıkça çıkana kadar uygulamalar genellikle çalışmaya devam eder.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});