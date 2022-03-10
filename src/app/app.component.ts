import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

type FileUploadReducer = {
  id: string;
  name: string;
  file: string;
};

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  fileUploadedReducer: FileUploadReducer[] = [];

  constructor() {}

  convertFileToBase64(file: any): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  async onChangeFileSelected(event: any): Promise<void> {
    for (let item of event.target.files) {
      const { name } = item;
      const base64: string = await this.convertFileToBase64(item);
      this.fileUploadedReducer.push({ id: uuidv4(), name, file: base64 });
    }
  }

  upload(): void {
    console.log(
      'Upload files on ' + this.fileUploadedReducer.map((val) => val.id)
    );
  }

  removeItemById(id: string) {
    const TOTAL_ITEMS_REMOVED = 1;
    const index = this.fileUploadedReducer
      .map((val) => {
        return val.id;
      })
      .indexOf(id);
    if (index !== -1) {
      this.fileUploadedReducer.splice(index, TOTAL_ITEMS_REMOVED);
      console.log('Item ' + id + ' excluído!');
    }
  }
}
