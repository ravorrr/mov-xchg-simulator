// Losowanie wartości HEX
function randomValues() {
    const registers = ["ax", "bx", "cx", "dx"];
    registers.forEach((reg) => {
        const randomValue = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase();
        document.getElementById(reg).value = randomValue.padStart(4, "0");
    });
}

// Czyszczenie rejestrów
function clearRegisters() {
    const registers = ["ax", "bx", "cx", "dx"];
    registers.forEach((reg) => {
        document.getElementById(reg).value = "";
    });
}

// MOV: Wykonanie na podstawie dropdown
function movSelected() {
    const sourceId = document.getElementById("source-register").value; // Pobranie źródła
    const targetId = document.getElementById("target-register").value; // Pobranie celu

    if (sourceId === targetId) {
        alert("Źródło i cel nie mogą być takie same!");
        return;
    }

    const value = document.getElementById(sourceId).value; // Wartość z rejestru źródłowego

    if (value) {
        document.getElementById(targetId).value = value; // Przenoszenie wartości
        alert(`MOV ${sourceId.toUpperCase()} → ${targetId.toUpperCase()}: ${value}`);
    } else {
        alert(`Rejestr ${sourceId.toUpperCase()} jest pusty!`);
    }
}

// XCHG: Wykonanie na podstawie dropdown
function xchgSelected() {
    const sourceId = document.getElementById("source-register").value; // Pobranie źródła
    const targetId = document.getElementById("target-register").value; // Pobranie celu

    if (sourceId === targetId) {
        alert("Źródło i cel nie mogą być takie same!");
        return;
    }

    const sourceValue = document.getElementById(sourceId).value; // Wartość źródłowa
    const targetValue = document.getElementById(targetId).value; // Wartość docelowa

    if (sourceValue && targetValue) {
        document.getElementById(sourceId).value = targetValue; // Zamiana
        document.getElementById(targetId).value = sourceValue;
        alert(`XCHG ${sourceId.toUpperCase()} ↔ ${targetId.toUpperCase()}`);
    } else {
        alert("Oba rejestry muszą mieć wartości, aby wykonać XCHG!");
    }
}
