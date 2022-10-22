import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { ImageProviderService } from './image-provider.service';
import { PuzzleComponent } from './puzzle/puzzle.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('puzzle') puzzleComponent!: PuzzleComponent;

  title = environment.title;
  buttonNewGameCaption = environment.buttonNewGameCaption;
  buttonPrevImageCaption = environment.buttonPrevImageCaption;
  buttonNextImageCaption = environment.buttonNextImageCaption;
  buttonUploadCaption = environment.buttonUploadCaption;
  buttonDeleteCaption = environment.buttonDeleteCaption;
  imageCanBeDeleted = false;

  constructor(
    private documentTitle: Title,
    private imageProvider: ImageProviderService
  ) {}

  ngOnInit(): void {
    this.documentTitle.setTitle(this.title);
  }

  decrementShuffleCount(
    inputElement: HTMLInputElement,
    outputElement: HTMLOutputElement
  ) {
    let value = Number(inputElement.value);
    value--;
    inputElement.value = value.toString();
    outputElement.value = inputElement.value;
  }

  incrementShuffleCount(
    inputElement: HTMLInputElement,
    outputElement: HTMLOutputElement
  ) {
    let value = Number(inputElement.value);
    value++;
    inputElement.value = value.toString();
    outputElement.value = inputElement.value;
  }

  onFileSelected(event: Event) {
    if (!event.target) {
      return;
    }
    const target: any = event.target;
    const file: File = target.files[0];
    if (!file.type.startsWith('image/')) {
      return;
    }
    const imgUrl = window.URL.createObjectURL(file);
    this.imageProvider.addNewImage(imgUrl);
    this.puzzleComponent.showCurrentImage();
  }

  deleteCurrentImage() {
    this.imageProvider.removeCurrentImage();
    this.puzzleComponent.showCurrentImage();
  }

  onImageCanBeDeletedEvent(canBeDeleted: boolean) {
    this.imageCanBeDeleted = canBeDeleted;
  }
}
