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

## Technologies

- **HTML**, **CSS**, **JavaScript**: Frontend of the simulator.
- **Custom Memory and Stack Simulation**: Backend logic for memory and stack handling implemented in JavaScript.

## Demo

[Click here to try the simulator!](https://ravorrr.github.io/mov-xchg-simulator/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ravorrr/mov-xchg-simulator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd mov-xchg-simulator
   ```
3. Open `index.html` in any modern web browser.

## How to Use

1. Open the `index.html` file in any modern browser.
2. Use the input fields to enter hexadecimal values for the registers.
3. Select the source and target for **MOV** and **XCHG** operations from the dropdown menus.
4. Use the **MOV** and **XCHG** buttons to perform the respective operations.
5. For **PUSH/POP** operations, select a register and use the **PUSH Register → Stack** or **POP Stack → Register** buttons.
6. For memory addressing, use the **Memory Addressing** section to calculate memory addresses based on the chosen addressing mode and offset.

## Screenshots

### Application Interface
![Application Interface](https://i.imgur.com/2PKXpLY.png)

## Credits

Developed by **Patryk Mars** ([GitHub: ravorrr](https://github.com/ravorrr)).
