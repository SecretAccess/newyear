document.getElementById('drawButton').addEventListener('click', drawLottery);

function drawLottery() {
    // 初期化
    document.getElementById('billCount').classList.remove('hidden');
    document.getElementById('billTypes').classList.add('hidden');
    document.getElementById('totalAmount').classList.add('hidden');
    document.querySelector('.bills').innerHTML = '';
    document.getElementById('amount').innerText = '0円';

    // 枚数抽選
    setTimeout(() => {
        const numberOfBills = getRandomInt(1, 10);
        displayBillCount(numberOfBills);

        // 紙幣種別抽選
        setTimeout(() => {
            const billTypes = drawBillTypes(numberOfBills);
            displayBillTypes(billTypes);

            // 合計金額表示
            setTimeout(() => {
                const total = billTypes.reduce((sum, bill) => sum + bill, 0);
                displayTotalAmount(total);
            }, 1500);
        }, 2000);
    }, 1000);
}

function displayBillCount(count) {
    const billCountDiv = document.getElementById('billCount');
    billCountDiv.innerHTML = `<h2>紙幣枚数: <span id="count">${count}</span>枚</h2>`;
    animateNumber('count', 0, count, 2000);
}

function drawBillTypes(count) {
    const billValues = [1000, 5000, 10000];
    const billTypes = [];
    for (let i = 0; i < count; i++) {
        const bill = billValues[getRandomInt(0, billValues.length - 1)];
        billTypes.push(bill);
    }
    return billTypes;
}

function displayBillTypes(bills) {
    document.getElementById('billCount').classList.add('hidden');
    const billTypesDiv = document.getElementById('billTypes');
    billTypesDiv.classList.remove('hidden');

    const billsContainer = document.querySelector('.bills');
    bills.forEach((bill, index) => {
        const img = document.createElement('img');
        img.classList.add('bill-image');
        img.src = getBillImage(bill);
        img.alt = `${bill}円`;
        img.style.animationDelay = `${index * 0.3}s`;
        billsContainer.appendChild(img);
    });
}

function displayTotalAmount(amount) {
    document.getElementById('billTypes').classList.add('hidden');
    const totalDiv = document.getElementById('totalAmount');
    totalDiv.classList.remove('hidden');
    document.getElementById('amount').innerText = `${amount}円`;
}

function getBillImage(amount) {
    const images = {
        1000: 'kitasato.png',
        5000: 'umeko.png',
        10000: 'shibusawa.png'
    };
    return images[amount];
}

// ランダムな整数を取得（minからmaxの範囲、両端含む）
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 数字アニメーション
function animateNumber(id, start, end, duration) {
    const obj = document.getElementById(id);
    let current = start;
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    const timer = setInterval(() => {
        current += increment;
        obj.innerText = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}
