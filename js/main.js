const memory = new Array(65536).fill(0);  // Symulacja 64 KB pamięci
const stack = [];  // Stos
const stackSize = 16;  // Maksymalny rozmiar stosu

// Losowanie wartości HEX dla rejestrów
function randomizeRegisters() {
    const registers = ["ax", "bx", "cx", "dx"];
    registers.forEach((reg) => {
        const randomValue = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase();
        document.getElementById(reg).value = randomValue.padStart(4, "0");
    });
}

// Czyszczenie wszystkich rejestrów
function clearRegisters() {
    const registers = ["ax", "bx", "cx", "dx"];
    registers.forEach((reg) => {
        document.getElementById(reg).value = "";
    });
}

// Wykonywanie operacji MOV i XCHG
function executeOperation(operation) {
    const sourceId = document.getElementById("source-register").value;
    const targetId = document.getElementById("target-register").value;

    // Zapobieganie operacjom na tym samym rejestrze
    if (sourceId === targetId) {
        alert("Źródło i cel nie mogą być takie same!");
        return;
    }

    const value = document.getElementById(sourceId).value;

    if (value) {
        if (operation === "mov") {
            document.getElementById(targetId).value = value;
            alert(`MOV ${sourceId.toUpperCase()} → ${targetId.toUpperCase()}: ${value}`);
        } else if (operation === "xchg") {
            const targetValue = document.getElementById(targetId).value;
            document.getElementById(sourceId).value = targetValue;
            document.getElementById(targetId).value = value;
            alert(`XCHG ${sourceId.toUpperCase()} ↔ ${targetId.toUpperCase()}`);
        }
    } else {
        alert(`Rejestr ${sourceId.toUpperCase()} jest pusty!`);
    }
}

// Obliczanie adresu pamięci w zależności od wybranego trybu adresowania
function calculateAddress() {
    // Pobieramy wartości w systemie szesnastkowym
    const bx = parseInt(document.getElementById("mem-bx").value || "0", 16);
    const bp = parseInt(document.getElementById("mem-bp").value || "0", 16);
    const si = parseInt(document.getElementById("mem-si").value || "0", 16);
    const di = parseInt(document.getElementById("mem-di").value || "0", 16);
    const offset = parseInt(document.getElementById("mem-offset").value || "0", 16);
    const mode = document.getElementById("addressing-mode").value;

    // Logowanie danych przed obliczeniem
    console.log(`BX: ${bx.toString(16)}, BP: ${bp.toString(16)}, SI: ${si.toString(16)}, DI: ${di.toString(16)}, Offset: ${offset.toString(16)}`);
    
    let address = 0;

    // Zależnie od trybu adresowania, oblicz adres
    if (mode === "base") {
        address = bp + offset;
    } else if (mode === "index") {
        address = si + offset;
    } else if (mode === "base-index") {
        address = bp + di + offset; // Poprawiona formuła: dodajemy BP i DI
    }

    // Logowanie obliczonego adresu
    console.log(`Calculated Address: ${address.toString(16).toUpperCase()}`);

    // Sprawdzenie, czy adres jest w dopuszczalnym zakresie
    if (address < 0 || address >= memory.length) {
        alert("Adres pamięci poza zakresem (0 - 65535)!");
        document.getElementById("address-result").innerText = "Nieprawidłowy adres!";
        return null;
    }

    // Wyświetlenie obliczonego adresu w formacie HEX
    document.getElementById("address-result").innerText = `Adres pamięci: ${address.toString(16).toUpperCase()}`;
    return address;
}

// Przesyłanie wartości z rejestru do pamięci
function moveToMemory() {
    const register = document.getElementById("memory-register-ops").value;
    const address = calculateAddress();
    if (address === null) return;

    const value = parseInt(document.getElementById(register).value || "0", 16);
    memory[address] = value; // Zapisanie wartości do pamięci

    alert(`Zapisano wartość ${value.toString(16).toUpperCase()} z ${register.toUpperCase()} do pamięci pod adresem ${address.toString(16).toUpperCase()}`);
}

// Przesyłanie wartości z pamięci do rejestru
function moveFromMemory() {
    const register = document.getElementById("memory-register-ops").value;
    const address = calculateAddress();
    if (address === null) return;

    const value = memory[address];

    if (value === undefined || value === 0) {
        alert("Komórka pamięci jest pusta!");
        return;
    }

    document.getElementById(register).value = value.toString(16).toUpperCase().padStart(4, "0");
    alert(`Załadowano wartość ${value.toString(16).toUpperCase()} z pamięci pod adresem ${address.toString(16).toUpperCase()} do ${register.toUpperCase()}`);
}

// Funkcja PUSH - Dodanie wartości do stosu
function pushToStack() {
    const register = document.getElementById("memory-register-stack").value;
    const value = parseInt(document.getElementById(register).value || "0", 16);

    if (stack.length < stackSize) {
        stack.push(value); // Dodanie wartości na stos
        alert(`PUSH ${register.toUpperCase()} → Stack: ${value.toString(16).toUpperCase()}`);
    } else {
        alert("Stos jest pełny!");
    }
}

// Funkcja POP - Pobranie wartości ze stosu
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
