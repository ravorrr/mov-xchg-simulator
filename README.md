# mov-xchg-simulator

This project is a simple simulator for CPU instructions **MOV**, **XCHG**, **PUSH**, and **POP**, designed using HTML, CSS, and JavaScript.

## Features

1. **MOV Instruction Simulation:**
   - Transfers data between registers (AX, BX, CX, DX).

2. **XCHG Instruction Simulation:**
   - Swaps data between two registers.

3. **PUSH/POP Stack Operations:**
   - **PUSH** a register's value onto the stack.
   - **POP** a value from the stack into a register.

4. **Memory Addressing:**
   - Supports 3 types of memory addressing modes (Base, Index, Base + Index).
   - Transfer values between registers and memory.

5. **Randomization and Reset:**
   - Random values can be assigned to registers.
   - Reset all registers to empty values.

## How to Use

1. Open the `index.html` file in any modern browser.
2. Use the input fields to enter hexadecimal values for the registers.
3. Select the source and target for **MOV** and **XCHG** operations from the dropdown menus.
4. Use the **MOV** and **XCHG** buttons to perform the respective operations.
5. For **PUSH/POP** operations, select a register and use the **PUSH Register → Stack** or **POP Stack → Register** buttons.
6. For memory addressing, use the **Memory Addressing** section to calculate memory addresses based on the chosen addressing mode and offset.

## Future Extensions

- Add additional CPU instructions like **ADD**, **SUB**, etc.
- Enhance the user interface for better usability.

## Credits

Developed by **Patryk Mars** ([GitHub: ravorrr](https://github.com/ravorrr)).
