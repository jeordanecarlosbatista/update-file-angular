import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  filesReducer: string[] = [];
  input: any = document.querySelector('#file');

  onChangeFileSelected(event: any): void {
    console.log(this.input);

    setTimeout(() => console.log(this.input), 3000);
    console.log('onChangeFileSelected');
    this.filesReducer = [];
    if (this.input.multiple == true) {
      for (let item of this.input.files) {
        const { name } = item;
        this.filesReducer.push(name);
      }
    } else {
      let file = this.input.files.item(0);
      this.filesReducer.push(file);
    }
  }

  upload(): void {
    if (this.input.multiple == true) {
      for (let item of this.input.files) {
        const { name } = item;
        this.filesReducer.push(name);
      }

      // Only one file available
    } else {
      let file = this.input.files.item(0);
    }

    console.log(this.input);
  }
}
