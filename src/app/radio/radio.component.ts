import { Component, OnInit } from '@angular/core';
import radios from '../data/radios.json';
import { Radio } from '../shared/interfaces/radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss'
})
export class RadioComponent implements OnInit {
  title = 'Radio Singulars';
  radioList: Radio[] = [];
  filteredRadios: Radio[] = [];
  inputValue!: string;

  ngOnInit(): void {
    this.radioList = radios;
  }

  handleInput( event: any ){
    if( event.key === 'Backspace' && this.inputValue.trim() === '' ){
      this.filteredRadios = [];
    }
  }

  submitSearch( ){
    this.filteredRadios = this.radioList.filter( ( radio: Radio ) => {
      return radio.name.includes( this.inputValue );
    });
  }
}
