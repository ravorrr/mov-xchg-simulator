const memory = new Array(65536).fill(0); // Symulacja 64 KB pamięci
const stack = [];
const stackSize = 16;

// Losowanie wartości HEX dla rejestrów
function randomizeRegisters() {
    const registers = ["ax", "bx", "cx", "dx"];
    registers.forEach((reg) => {
        const randomValue = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase();
        document.getElementById(reg).value = randomValue.padStart(4, "0");
    });
    console.log("Rejestry zrandomizowane:", registers.map((reg) => `${reg.toUpperCase()}: ${document.getElementById(reg).value}`));
}

// Czyszczenie wszystkich rejestrów
function clearRegisters() {
    const registers = ["ax", "bx", "cx", "dx"];
    registers.forEach((reg) => {
        document.getElementById(reg).value = "";
    });
    console.log("Rejestry wyczyszczone");
}

// Wykonywanie operacji MOV i XCHG
function executeOperation(operation) {
    const sourceId = document.getElementById("source-register").value;
    const targetId = document.getElementById("target-register").value;

    if (operation === "mov") {
        if (sourceId === "memory" || targetId === "memory") {
            handleMemoryMov(sourceId, targetId);
            return;
        }

        const sourceValue = document.getElementById(sourceId).value;
        if (!sourceValue) {
            alert(`Rejestr ${sourceId.toUpperCase()} jest pusty!`);
            return;
        }

        document.getElementById(targetId).value = sourceValue;
        console.log(`MOV ${sourceId.toUpperCase()} → ${targetId.toUpperCase()}: ${sourceValue}`);
        alert(`MOV ${sourceId.toUpperCase()} → ${targetId.toUpperCase()}: ${sourceValue}`);
    } else if (operation === "xchg") {
        if (sourceId === "memory" || targetId === "memory") {
            handleMemoryXchg(sourceId, targetId);
            return;
        }

        const sourceValue = document.getElementById(sourceId).value;
        const targetValue = document.getElementById(targetId).value;

        document.getElementById(sourceId).value = targetValue;
        document.getElementById(targetId).value = sourceValue;

        console.log(`XCHG ${sourceId.toUpperCase()} ↔ ${targetId.toUpperCase()}`);
        alert(`XCHG ${sourceId.toUpperCase()} ↔ ${targetId.toUpperCase()}`);
    }
}

// Obsługa MOV dla pamięci
function handleMemoryMov(sourceId, targetId) {
    const address = calculateAddress();
    if (address === null) return;

    if (sourceId === "memory") {
        const memoryValue = memory[address];
        if (!memoryValue) {
            alert(`Pamięć pod adresem ${address.toString(16).toUpperCase()} jest pusta!`);
            return;
        }
        document.getElementById(targetId).value = memoryValue.toString(16).toUpperCase().padStart(4, "0");
        console.log(`MOV Memory [${address.toString(16).toUpperCase()}] → ${targetId.toUpperCase()}: ${memoryValue}`);
        alert(`MOV Memory → ${targetId.toUpperCase()}: ${memoryValue.toString(16).toUpperCase()}`);
    } else {
        const value = document.getElementById(sourceId).value;
        memory[address] = parseInt(value, 16);
        console.log(`MOV ${sourceId.toUpperCase()} → Memory [${address.toString(16).toUpperCase()}]: ${value}`);
        alert(`MOV ${sourceId.toUpperCase()} → Memory [${address.toString(16).toUpperCase()}]: ${value}`);
    }
}

// Obsługa XCHG dla pamięci
function handleMemoryXchg(sourceId, targetId) {
    const address = calculateAddress(); // Oblicz adres pamięci
    if (address === null) return;

    const hexAddress = address.toString(16).toUpperCase(); // Konwertuj adres na system szesnastkowy

    if (sourceId === "memory") {
        // Wymiana pamięć → rejestr
        const memoryValue = memory[address];
        const regValue = document.getElementById(targetId).value;

        // Zamiana wartości
        memory[address] = parseInt(regValue, 16);
        document.getElementById(targetId).value = memoryValue.toString(16).toUpperCase().padStart(4, "0");

        // Logowanie po aktualizacji wartości
        console.log(`XCHG Memory [${hexAddress}] ↔ ${targetId.toUpperCase()}: Memory=${memory[address].toString(16).toUpperCase()}, Reg=${document.getElementById(targetId).value}`);
        alert(`XCHG Memory [${hexAddress}] ↔ ${targetId.toUpperCase()}: Memory=${memory[address].toString(16).toUpperCase()}, Reg=${document.getElementById(targetId).value}`);
    } else {
        // Wymiana rejestr → pamięć
        const regValue = document.getElementById(sourceId).value;
        const memoryValue = memory[address];

        // Zamiana wartości
        memory[address] = parseInt(regValue, 16);
        document.getElementById(sourceId).value = memoryValue.toString(16).toUpperCase().padStart(4, "0");

        // Logowanie po aktualizacji wartości
        console.log(`XCHG ${sourceId.toUpperCase()} ↔ Memory [${hexAddress}]: Reg=${document.getElementById(sourceId).value}, Memory=${memory[address].toString(16).toUpperCase()}`);
        alert(`XCHG ${sourceId.toUpperCase()} ↔ Memory [${hexAddress}]: Reg=${document.getElementById(sourceId).value}, Memory=${memory[address].toString(16).toUpperCase()}`);
    }
}

// Obliczanie adresu pamięci
function calculateAddress() {
    const bx = parseInt(document.getElementById("mem-bx").value || "0", 16);
    const bp = parseInt(document.getElementById("mem-bp").value || "0", 16);
    const si = parseInt(document.getElementById("mem-si").value || "0", 16);
    const di = parseInt(document.getElementById("mem-di").value || "0", 16);
    const offset = parseInt(document.getElementById("mem-offset").value || "0", 16);
    const mode = document.getElementById("addressing-mode").value;

    console.log(`BX=${bx.toString(16).toUpperCase()}, BP=${bp.toString(16).toUpperCase()}, SI=${si.toString(16).toUpperCase()}, DI=${di.toString(16).toUpperCase()}, Offset=${offset.toString(16).toUpperCase()}, Mode=${mode}`);

    let address = 0;

    switch (mode) {
        case "base":
            if (bx !== 0) {
                address = bx + offset;
            } else if (bp !== 0) {
                address = bp + offset;
            } else {
                alert("Brak wartości w rejestrach bazowych (BX/BP)!");
                return null;
            }
            break;

        case "index":
            if (si !== 0) {
                address = si + offset;
            } else if (di !== 0) {
                address = di + offset;
            } else {
                alert("Brak wartości w rejestrach indeksowych (SI/DI)!");
                return null;
            }
            break;

        case "base-index":
            if (bx !== 0 && si !== 0) {
                address = bx + si + offset;
            } else if (bx !== 0 && di !== 0) {
                address = bx + di + offset;
            } else if (bp !== 0 && si !== 0) {
                address = bp + si + offset;
            } else if (bp !== 0 && di !== 0) {
                address = bp + di + offset;
            } else {
                alert("Brak odpowiednich wartości w rejestrach bazowych i indeksowych!");
                return null;
            }
            break;

        default:
            alert("Nieprawidłowy tryb adresowania!");
            return null;
    }

    // Logowanie adresu w systemie szesnastkowym
    console.log(`Obliczony adres: ${address.toString(16).toUpperCase()}`);
    
    if (address < 0 || address >= memory.length) {
        alert("Adres pamięci poza zakresem (0 - 65535)!");
        document.getElementById("address-result").innerText = "Nieprawidłowy adres!";
        return null;
    }

    document.getElementById("address-result").innerText = `Adres pamięci: ${address.toString(16).toUpperCase()}`;
    return address;
}

// Przesyłanie wartości z rejestru do pamięci
function moveToMemory() {
    const register = document.getElementById("memory-register-ops").value; // Pobierz wybrany rejestr
    const address = calculateAddress(); // Oblicz adres pamięci
    if (address === null) return;

    const value = parseInt(document.getElementById(register).value || "0", 16); // Pobierz wartość z rejestru
    memory[address] = value; // Zapisanie wartości do pamięci

    // Logowanie i alert
    console.log(`MOV Register → Memory: Zapisano wartość ${value.toString(16).toUpperCase()} pod adresem ${address.toString(16).toUpperCase()}`);
    alert(`MOV Register → Memory: Zapisano wartość ${value.toString(16).toUpperCase()} pod adresem ${address.toString(16).toUpperCase()}`);
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
    const register = document.getElementById("memory-register-stack").value; // Pobierz wybrany rejestr
    const value = parseInt(document.getElementById(register).value || "0", 16); // Pobierz wartość z rejestru

    if (stack.length < stackSize) {
        stack.push(value); // Dodanie wartości na stos
        console.log(`PUSH: Dodano wartość ${value.toString(16).toUpperCase()} do stosu.`);
        alert(`PUSH: Dodano wartość ${value.toString(16).toUpperCase()} do stosu.`);
    } else {
        alert("Stos jest pełny!");
        console.log("PUSH: Próba dodania wartości do pełnego stosu!");
    }
}

// Funkcja POP - Pobranie wartości ze stosu
function popFromStack() {
    const register = document.getElementById("memory-register-stack").value; // Pobierz wybrany rejestr

    if (stack.length > 0) {
        const value = stack.pop(); // Pobierz wartość ze stosu
        document.getElementById(register).value = value.toString(16).toUpperCase().padStart(4, "0"); // Zapisz do rejestru

        // Logi i alert
        console.log(`POP: Zdjęto wartość ${value.toString(16).toUpperCase()} ze stosu i zapisano w rejestrze ${register.toUpperCase()}.`);
        alert(`POP: Zdjęto wartość ${value.toString(16).toUpperCase()} ze stosu i zapisano w rejestrze ${register.toUpperCase()}.`);
    } else {
        alert("Stos jest pusty!");
        console.log("POP: Próba zdjęcia wartości z pustego stosu!");
    }
}
