// bckground slideshow
const backgrounds = [
    'url("bg1w.jpg")',
    'url("bg2w.jpg")',
    'url("bg3w.jpg")'
];
let currentIndex = 0;
function changeBackground() {
    document.body.style.backgroundImage = backgrounds[currentIndex];
    currentIndex = (currentIndex + 1) % backgrounds.length;
}
setInterval(changeBackground, 5000);
changeBackground();

// tanggal waktu
function updateDateTime() {
    const now = new Date();
    const optionsDate = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const optionsTime = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    };
    document.getElementById('date').innerText = now.toLocaleDateString('id-ID', optionsDate);
    document.getElementById('time').innerText = now.toLocaleTimeString('id-ID', optionsTime);
}
updateDateTime();
setInterval(updateDateTime, 1000);

// tombol swap
function swapbutton() {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
}

// konversi
async function convertCurrency() {
    const apiKey = 'fca_live_HRAEYKqlsavBUbkM1q54lGKAVujUJJwnrL1P1zS3';
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const loadingSpinner = document.getElementById('loadingSpinner'); // elemen loading spinner
    if (amount === '' || isNaN(amount)) {
        alert("Masukkan nilai yang valid.");
        return;
    }
    loadingSpinner.style.display = 'block';
    try {
        const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=${fromCurrency}`);
        const data = await response.json();
        if (data.data[toCurrency]) {
            const rate = data.data[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } else {
            document.getElementById('result').innerText = "Conversion rate not available";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById('result').innerText = "An error occurred. Please try again.";
    } finally {
        // sembunyikan loading spinner setelah proses selesai
        loadingSpinner.style.display = 'none';
    }
}