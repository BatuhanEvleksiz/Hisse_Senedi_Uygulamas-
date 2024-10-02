document.getElementById('fetchData').addEventListener('click', async () => {
    const stockCode = document.getElementById('stockCode').value;
    console.log(`Hisse kodu: ${stockCode}`); // Hisse kodunu konsola yazdır
    const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${stockCode}`);

    // Yanıtı kontrol et
    if (!response.ok) {
        console.error('Hata:', response.statusText);
        alert("Bir hata oluştu. Lütfen hisse kodunu kontrol edin.");
        return;
    }

    const data = await response.json();
    console.log(data); // API'den gelen veriyi konsola yazdır

    if (data.chart.result) {
        displayData(data.chart.result[0]);
    } else {
        alert("Hisse senedi bulunamadı.");
    }
});

function displayData(stockData) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    
    const { meta, indicators } = stockData;
    const price = meta.regularMarketPrice;
    const volume = indicators.quote[0].volume;

    const table = `
        <table>
            <thead>
                <tr>
                    <th>Veri</th>
                    <th>Değer</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Hisse Fiyatı</td><td>${price}</td></tr>
                <tr><td>Hacim</td><td>${volume}</td></tr>
            </tbody>
        </table>
    `;

    resultDiv.innerHTML = table;

    // Grafik oluşturmak için
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1', '2', '3'], // Örnek zaman etiketleri
            datasets: [{
                label: 'Hisse Fiyatı',
                data: [price, price + 1, price - 1], // Örnek fiyatlar
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// CSV indirme işlemi (şu anda kullanılmıyor, ama eklemek isterseniz)
function downloadCSV(data) {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hisse_senedi_verileri.csv';
    a.click();
}
