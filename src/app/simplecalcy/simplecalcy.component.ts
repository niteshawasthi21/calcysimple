import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone:true,
  selector: 'app-simplecalcy',
  templateUrl: './simplecalcy.component.html',
  styleUrls: ['./simplecalcy.component.css'],
  imports:[FormsModule]
})
export class SimplecalcyComponent {
  currentOperand: string = '';
  displayOperand: string = ''; // To display input and operations
  previousOperand: string = '';
  operation: string = '';
  errorMessage: string = '';
  
  // Appends a number or floating-point number
  appendNumber(number: number | string) {
    if (this.errorMessage) this.clearError();  
    if (this.currentOperand.includes('.') && number === '.') return;  // Prevent multiple dots
    
    this.currentOperand = `${this.currentOperand}${number}`;
    this.displayOperand = `${this.displayOperand}${number}`;  // Append to display
  }

  // Append dot for floating numbers
  appendDot() {
    if (!this.currentOperand.includes('.')) {
      this.appendNumber('.');  // Append dot like a normal number
    }
  }

  // Select the operation
  chooseOperation(operation: string) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.calculate();  // Perform the previous operation if it exists
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.displayOperand = `${this.displayOperand} ${operation} `;  // Append operation to display
    this.currentOperand = '';  // Clear the current operand for the next input
  }

  // Calculation logic
  calculate() {
    let computation: number;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        if (current === 0) {
          this.errorMessage = "Error: Division by zero!";
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = computation.toString();
    this.displayOperand = this.currentOperand;  // Replace display with the result
    this.operation = '';
    this.previousOperand = '';
  }

  // Clear the display and reset values
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = '';
    this.displayOperand = '';  // Clear display
    this.errorMessage = '';
  }

  // Clear only the error message
  clearError() {
    this.errorMessage = '';
  }

  // Keyboard event listener for accessibility
  @HostListener('window:keydown', ['$event'])
  handleKeyboardInput(event: KeyboardEvent) {
    if (event.key >= '0' && event.key <= '9') {
      this.appendNumber(Number(event.key));
    }
    if (event.key === '.') this.appendDot();
    if (['+', '-', '*', '/'].includes(event.key)) this.chooseOperation(event.key);
    if (event.key === 'Enter') this.calculate();
    if (event.key === 'Backspace') this.clear();
  }
}
