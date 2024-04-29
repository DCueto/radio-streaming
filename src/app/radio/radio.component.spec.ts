import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioComponent } from './radio.component';
import { By } from '@angular/platform-browser';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Radio Singulars', () => {

    it('El nombre de la aplicación (Radio Singulars) debe estar en una propiedad title', () => {
      const title = 'Radio Singulars';
      expect( component.title ).toEqual( title );
    });

    it('El nombre de la aplicación (Radio Singulars) debe mostrarse en algún lugar', () => {
      const componentEl = fixture.nativeElement;
      const inputEl = componentEl.querySelector('h1');
      const textTitle = 'Radio Singulars';

      expect( inputEl.textContent ).toEqual( textTitle );
    });

  });

  describe('Debería buscar una estación de radio por nombre', () => {

    it("debería tener un campo input con el placeholder 'Escribe el nombre de la radio'", () => {
      const input = fixture.nativeElement.querySelector('input');
      const placeholderValue = input.placeholder;

      expect( placeholderValue ).toEqual('Escribe el nombre de la radio');

    });

    it("debería tener un botón de búsqueda con el texto 'Buscar'", () => {
      const buttonEl = fixture.nativeElement.querySelector('button[type="submit"]');

      expect( buttonEl.textContent ).toEqual('Buscar');
    });

    it('cuando hacemos click al botón Buscar, se debería ejecutar la función de búsqueda una sola vez', () => {
      const buttonEl = fixture.debugElement.query(By.css('button[type="submit"]'));
      const eventFunction = jest.spyOn( component, 'submitSearch' );
      buttonEl.triggerEventHandler('click', {});
      fixture.detectChanges();
      expect( eventFunction ).toHaveBeenCalled();
    });

  });

  describe('Listado de emisoras', () => {
    
    it('debería existir una propiedad con un listado de emisoras', () => {
      expect( component.radioList ).toBeDefined();
    });

    it('debería existir una lista impresa en html del listado de emisoras', () => {
      const radioListEl = fixture.nativeElement.querySelector('ul');
      expect( radioListEl ).toBeTruthy();
    });

    it('el listado debería inicializar vacío', () => {

      const radioListElements = fixture.nativeElement.querySelectorAll('li');
      expect( radioListElements.length ).toBe(0);

    });

    // it('debería existir una lista impresa en html del listado de emisoras', () => {
    //   const radioList = [
    //     'Sabana Radio',
    //     'Radio FM',
    //     'Angular FM'
    //   ];

    // });

    it('debería mostrar al menos un resultado cuando se hace una búsqueda válida', () => {

      // const input = fixture.nativeElement.querySelector('input')
      // const inputEl = fixture.debugElement.query(By.css('input'));
      const buttonEl = fixture.debugElement.query(By.css('button[type="submit"]'));
      component.filteredRadios = [
        {name: 'test', url: 'test', country: 'test'} 
      ];

      const searchEvent = jest.spyOn( component, 'submitSearch' ).mockImplementation( () => {
        component.filteredRadios = component.radioList.filter( ( radio ) => {
          return radio.name.includes('t');
        })
      });

      component.inputValue = '13 TV';
      buttonEl.triggerEventHandler('click', {});
      fixture.detectChanges();
      
      expect( searchEvent ).toHaveBeenCalled();
      // expect(  )
    });

    it('debería mostrar un mensaje "No se han encontrado emisoras para esta búsqueda" cuando se hace una búsqueda inválida (no existe)', () => {

    });
  });

});
