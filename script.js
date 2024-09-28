window.onload = function() {
    let score = 0;
    let gameInProgress = false; // Oyunun durumunu kontrol eder
    const slapSound = new Audio('slap.mp3'); // Tokat sesi tanımla

    // HTML elementlerine erişim
    const targetImage = document.getElementById('target');
    const scoreElement = document.getElementById('score');
    const messageElement = document.getElementById('message');
    const resetButton = document.getElementById('reset-btn');

    // HTML elementlerinin varlığını kontrol et
    if (!targetImage || !scoreElement || !messageElement || !resetButton) {
        console.error('HTML elementlerine erişim başarısız oldu. ID\'leri kontrol et!');
        return;
    }

    // Görsele tıklama olayını tanımla
    targetImage.addEventListener('click', () => {
        if (!gameInProgress) return; // Oyun devam etmiyorsa çıkış yap
        score++;
        scoreElement.textContent = `Skor: ${score}`;

        // Tokat sesi çal
        slapSound.currentTime = 0; // Sesi sıfırla (aynı ses tekrar tekrar oynatılabilsin)
        slapSound.play();

        // Tokat animasyonu
        targetImage.style.transform = 'translateX(-10px)';
        setTimeout(() => {
            targetImage.style.transform = 'translateX(0px)';
        }, 100);
    });

    // Tekrar Oyna butonuna tıklama olayı
    resetButton.addEventListener('click', () => {
        resetGame(); // Önce oyunu sıfırla
        startGame(); // Sonra tekrar başlat
    });

    // Oyun başlatma fonksiyonu
    function startGame() {
        score = 0; // Skoru sıfırla
        gameInProgress = true; // Oyun başladı
        scoreElement.textContent = `Skor: 0`;
        messageElement.textContent = ''; // Mesajı temizle
        resetButton.style.display = 'none'; // Tekrar Oyna butonunu gizle
        setTimeout(endGame, 10000); // 10 saniye sonra oyunu bitir
    }

    // Oyun bitirme fonksiyonu
    function endGame() {
        gameInProgress = false; // Oyun sona erdi
        if (score < 58) {
            messageElement.textContent = "Aybüke'den yeteri kadar nefret etmiyorsun. Biraz daha sohbet edip öyle gel.";
        } else {
            messageElement.textContent = "Aybüke'den Gerçekten Nefret Ediyorsun Tebrikler!";
        }
        resetButton.style.display = 'block'; // Tekrar Oyna butonunu göster
    }

    // Oyun sıfırlama fonksiyonu
    function resetGame() {
        score = 0; // Skoru sıfırla
        gameInProgress = false; // Oyun sıfırlandı
        scoreElement.textContent = `Skor: 0`;
        messageElement.textContent = ''; // Mesajları temizle
        resetButton.style.display = 'none'; // Tekrar Oyna butonunu gizle
    }

    // Sayfa yüklendiğinde oyunu başlat
    startGame();
};
