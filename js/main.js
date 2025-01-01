const memory = new Array(65536).fill(0); // Symulacja 64 KB pamięci
const stack = []; // Stos
const stackSize = 16; // Maksymalny rozmiar stosu

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

    if (sourceValue || targetValue) {
        document.getElementById(sourceId).value = targetValue || ""; // Zamiana
        document.getElementById(targetId).value = sourceValue || "";
        alert(`XCHG ${sourceId.toUpperCase()} ↔ ${targetId.toUpperCase()}`);
    } else {
        alert("Oba rejestry muszą mieć wartości, aby wykonać XCHG!");
    }
}

// Funkcja obliczania adresu pamięci
function calculateAddress() {
    const bx = parseInt(document.getElementById("mem-bx").value || "0", 16);
    const bp = parseInt(document.getElementById("mem-bp").value || "0", 16);
    const si = parseInt(document.getElementById("mem-si").value || "0", 16);
    const di = parseInt(document.getElementById("mem-di").value || "0", 16);
    const offset = parseInt(document.getElementById("mem-offset").value || "0", 16);

    const mode = document.getElementById("addressing-mode").value;
    let address = 0;

    if (mode === "base") {
        address = (bx || bp) + offset; // Obsługa BX lub BP
    } else if (mode === "index") {
        address = si + offset; // Tryb indeksowy
    } else if (mode === "base-index") {
        address = bx + si + offset; // Tryb bazowo-indeksowy
    }

    // Sprawdzanie zakresu adresu
    if (address < 0 || address >= memory.length) {
        alert("Adres pamięci poza zakresem (0 - 65535)!");
        document.getElementById("address-result").innerText = "Nieprawidłowy adres!";
        return null; // Zwróć null, jeśli adres jest nieprawidłowy
    }

    document.getElementById("address-result").innerText = `Adres pamięci: ${address.toString(16).toUpperCase()}`;
    return address;
}

// Funkcja przesyłania wartości z rejestru do pamięci
function movToMemory() {
    const register = document.getElementById("memory-register-ops").value; // Wybór rejestru
    const address = calculateAddress(); // Obliczenie adresu
    if (address === null) return; // Sprawdzenie poprawności adresu

    const value = parseInt(document.getElementById(register).value || "0", 16);
    memory[address] = value; // Zapisanie wartości w pamięci

    alert(`Zapisano wartość ${value.toString(16).toUpperCase()} z ${register.toUpperCase()} do pamięci pod adresem ${address.toString(16).toUpperCase()}`);
}

// Funkcja przesyłania wartości z pamięci do rejestru
function movFromMemory() {
    const register = document.getElementById("memory-register-ops").value; // Wybór rejestru
    const address = calculateAddress(); // Obliczenie adresu
    if (address === null) return; // Sprawdzenie poprawności adresu

    const value = memory[address]; // Pobranie wartości z pamięci

    if (value === undefined || value === 0) {
        alert("Komórka pamięci jest pusta!");
        return;
    }

    document.getElementById(register).value = value.toString(16).toUpperCase().padStart(4, "0"); // Odczyt wartości z pamięci
    alert(`Załadowano wartość ${value.toString(16).toUpperCase()} z pamięci pod adresem ${address.toString(16).toUpperCase()} do ${register.toUpperCase()}`);
}

// Funkcja PUSH do stosu
function pushToStack() {
    const register = document.getElementById("memory-register-stack").value;
    const value = parseInt(document.getElementById(register).value || "0", 16);

    if (stack.length < stackSize) {
        stack.push(value); // Dodanie wartości do stosu
        alert(`PUSH ${register.toUpperCase()} → Stack: ${value.toString(16).toUpperCase()}`);
    } else {
        alert("Stos jest pełny!");
    }
}

// Funkcja POP ze stosu
function popFromStack() {
    const register = document.getElementById("memory-register-stack").value;

    if (stack.length > 0) {
        const value = stack.pop(); // Pobranie wartości ze stosu
        document.getElementById(register).value = value.toString(16).toUpperCase().padStart(4, "0");
        alert(`POP Stack → ${register.toUpperCase()}: ${value.toString(16).toUpperCase()}`);
    } else {
        alert("Stos jest pusty!");
    }
}
