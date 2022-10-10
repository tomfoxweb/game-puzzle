import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = environment.title;
  buttonNewGameCaption = environment.buttonNewGameCaption;

  constructor(private documentTitle: Title) {}

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
}
