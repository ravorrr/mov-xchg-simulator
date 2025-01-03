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
        alert(`MOV Memory → ${targetId.toUpperCase()}: ${memoryValue.toString(16).toUpperCase()}`);
    } else {
        const value = document.getElementById(sourceId).value;
        memory[address] = parseInt(value, 16);
        alert(`MOV ${sourceId.toUpperCase()} → Memory [${address.toString(16).toUpperCase()}]: ${value}`);
    }
}

// Obsługa XCHG dla pamięci
function handleMemoryXchg(sourceId, targetId) {
    const address = calculateAddress();
    if (address === null) return;

    if (sourceId === "memory") {
        const memoryValue = memory[address];
        const regValue = document.getElementById(targetId).value;
        memory[address] = parseInt(regValue, 16);
        document.getElementById(targetId).value = memoryValue.toString(16).toUpperCase().padStart(4, "0");
        alert(`XCHG Memory ↔ ${targetId.toUpperCase()}`);
    } else {
        const regValue = document.getElementById(sourceId).value;
        const memoryValue = memory[address];
        memory[address] = parseInt(regValue, 16);
        document.getElementById(sourceId).value = memoryValue.toString(16).toUpperCase().padStart(4, "0");
        alert(`XCHG ${sourceId.toUpperCase()} ↔ Memory`);
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

    let address = 0;

    // Obliczanie adresu w zależności od trybu
    switch (mode) {
        case "base":
            if (bx !== 0) {
                address = bx + offset; // BX jako baza
            } else if (bp !== 0) {
                address = bp + offset; // BP jako baza
            } else {
                alert("Brak wartości w rejestrach bazowych (BX/BP)!");
                return null;
            }
            break;

        case "index":
            if (si !== 0) {
                address = si + offset; // SI jako indeks
            } else if (di !== 0) {
                address = di + offset; // DI jako indeks
            } else {
                alert("Brak wartości w rejestrach indeksowych (SI/DI)!");
                return null;
            }
            break;

        case "base-index":
            if (bx !== 0 && si !== 0) {
                address = bx + si + offset; // BX + SI
            } else if (bx !== 0 && di !== 0) {
                address = bx + di + offset; // BX + DI
            } else if (bp !== 0 && si !== 0) {
                address = bp + si + offset; // BP + SI
            } else if (bp !== 0 && di !== 0) {
                address = bp + di + offset; // BP + DI
            } else {
                alert("Brak odpowiednich wartości w rejestrach bazowych i indeksowych!");
                return null;
            }
            break;

        default:
            alert("Nieprawidłowy tryb adresowania!");
            return null;
    }

    if (address < 0 || address >= memory.length) {
        alert("Adres pamięci poza zakresem (0 - 65535)!");
        return null;
    }

    document.getElementById("address-result").innerText = `Adres pamięci: ${address.toString(16).toUpperCase()}`;
    return address;
}

// Przesyłanie wartości z rejestru do pamięci
function moveToMemory() {
    const register = document.getElementById("memory-register-ops").value;
    const address = calculateAddress();
    if (address === null) return;

    const value = parseInt(document.getElementById(register).value || "0", 16);
    memory[address] = value;
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
        stack.push(value);
        alert(`PUSH ${register.toUpperCase()} → Stack: ${value.toString(16).toUpperCase()}`);
    } else {
        alert("Stos jest pełny!");
    }
}

// Funkcja POP - Pobranie wartości ze stosu
function popFromStack() {
    const register = document.getElementById("memory-register-stack").value;

    if (stack.length > 0) {
        const value = stack.pop();
        document.getElementById(register).value = value.toString(16).toUpperCase().padStart(4, "0");
        alert(`POP Stack → ${register.toUpperCase()}: ${value.toString(16).toUpperCase()}`);
    } else {
        alert("Stos jest pusty!");
    }
}
