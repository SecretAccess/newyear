function drawGift() {
    const MAX_ATTEMPTS = 100; // 再抽選の最大試行回数
    let attempt = 0;
    let valid = false;
    let numberOfBills, billTypes, totalAmount;

    const billValues = [1000, 5000, 10000];
    const billImages = {
        1000: 'kitasato.png',
        5000: 'umeko.png',
        10000: 'shibusawa.png'
    };

    while (!valid && attempt < MAX_ATTEMPTS) {
        attempt++;
        // 紙幣枚数を1から10の間でランダムに選択
        numberOfBills = getRandomInt(1, 10);
        billTypes = [];
        totalAmount = 0;

        for (let i = 0; i < numberOfBills; i++) {
            // 各紙幣の種別をランダムに選択
            const bill = billValues[getRandomInt(0, billValues.length - 1)];
            billTypes.push(bill);
            totalAmount += bill;
        }

        // 上限1万円、下限2000円を確認
        if (totalAmount >= 2000 && totalAmount <= 10000) {
            valid = true;
        }
    }

    const resultDiv = document.getElementById('result');
    const totalDiv = document.getElementById('total');

    if (valid) {
        // 結果をクリア
        resultDiv.innerHTML = '';
        // 各紙幣の画像を表示
        billTypes.forEach(bill => {
            const img = document.createElement('img');
            img.src = billImages[bill];
            img.alt = `${bill}円`;
            img.className = 'bill-image';
            resultDiv.appendChild(img);
        });
        // 合計金額を表示
        totalDiv.innerHTML = `合計金額: ${totalAmount}円`;
    } else {
        // 再抽選失敗
        resultDiv.innerHTML = '';
        totalDiv.innerHTML = '抽選に失敗しました。もう一度お試しください。';
    }
}

// ランダムな整数を取得（minからmaxの範囲、両端含む）
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

