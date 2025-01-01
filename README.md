# mov-xchg-simulator

This project is a simple simulator for CPU instructions **MOV** and **XCHG**, designed using HTML, CSS, and JavaScript. It aims to simulate basic data transfer operations, commonly used in low-level programming, allowing users to visualize and interact with register and memory states.

## Features

1. **MOV Instruction Simulation:**
   - Transfers data between registers (AX, BX, CX, DX).
   - Moves data from one register to another, simulating the MOV instruction in a CPU.

2. **XCHG Instruction Simulation:**
   - Swaps data between two registers.
   - Extended to support swapping between registers and memory.

3. **Randomization and Reset:**
   - Random values can be assigned to registers for testing.
   - All registers can be reset to empty values at any time.

4. **Memory Addressing:**
   - Simulates three types of memory addressing: base, index, and base + index.
   - Supports transferring data between memory and registers based on calculated memory addresses.

5. **Interactive Interface:**
   - Allows users to interactively select registers, memory addresses, and perform various operations.
   - Alerts and results are shown after each operation for clear feedback.

## How to Use

1. Open the `index.html` file in any modern browser.
2. Use the input fields to enter hexadecimal values for the registers.
3. Select the source and target for operations from the dropdown menus.
4. Use the **MOV** and **XCHG** buttons to perform the respective operations.
5. For memory addressing:
   - Input values for the registers BX, BP, SI, DI, and the offset.
   - Select the desired addressing mode: **Base**, **Index**, or **Base + Index**.
   - Click **Calculate Address** to see the calculated memory address.
6. Use the **MOV Register → Memory** and **MOV Memory → Register** buttons to transfer data between registers and memory.

## Future Extensions

- **Enhance Memory Operations:** Add more features to the memory module, including visualization of memory contents.
- **Add More CPU Instructions:** Introduce additional instructions like **PUSH**, **POP**, and others for stack operations.
- **Improve UX/UI:** Further improve the user interface with tooltips, error messages, and a more intuitive design.
- **Validation:** Implement input validation to ensure only valid hexadecimal values are entered in the fields.

## Credits

Developed by Patryk Mars ([GitHub: ravorrr](https://github.com/ravorrr)).
