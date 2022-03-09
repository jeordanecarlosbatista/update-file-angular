import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  fileNameReducer: string[] = [];
  fileBase64Reducer: string[] = [];

  constructor() {}

  preventDefaults(e) {
    console.log(e);

    e.preventDefault();
    e.stopPropagation();
  }

  ngAfterViewInit() {
    document
      .querySelector('.update-file-div')
      .addEventListener('drag', (event) => {
        console.log(event);
      });

    let dropArea = document.getElementById('drop-area');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
      dropArea.addEventListener(eventName, this.preventDefaults, false);
    });
  }

  onClickUpdateFile() {
    console.log('TESTE');
  }

  convertFileToBase64(file: any): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  dragOverHandler(event: any) {
    console.log(event);
  }

  drop(event: any) {
    console.log(event);
  }

  onChangeFileSelected(event: any): void {
    this.fileNameReducer = [];
    if (event.target.multiple == true) {
      for (let item of event.target.files) {
        const { name } = item;
        this.fileNameReducer.push(name);
      }
    } else {
      let file = event.target.files.item(0);
      this.fileNameReducer.push(file);
    }
  }

  async generateFileBase64() {
    const input: any = document.querySelector('#file');
    for (let item of input.files) {
      const base64: string = await this.convertFileToBase64(item);
      this.fileBase64Reducer.push(base64);
    }
  }

  upload(): void {
    this.generateFileBase64();
  }

  removeItemByIndex(index: number) {
    const TOTAL_ITEMS_REMOVED = 1;
    this.fileNameReducer.splice(index, TOTAL_ITEMS_REMOVED);
  }
}
