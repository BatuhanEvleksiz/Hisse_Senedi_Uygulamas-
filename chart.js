// chart.js
const createChart = (labels, data) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels, // Zaman etiketleri
            datasets: [{
                label: 'Hisse Fiyatı',
                data: data, // Fiyat verileri
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
};
