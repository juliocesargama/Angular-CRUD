import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Person } from '../../Person';
import { PersonsService } from '../../persons.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  form: any;
  formTitle: string;


  constructor(private personsService: PersonsService) { }

  ngOnInit(): void {

    this.formTitle = 'Nova Pessoa';

    this.form = new FormGroup({
      personName: new FormControl(null),
      personLastName: new FormControl(null),
      personAge: new FormControl(null),
      personProfession: new FormControl(null)
    });
    
  }

  SendForm(): void{
   const person : Person = this.form.value;

    this.personsService.SavePerson(person).subscribe((resultado) => {
      alert('Pessoa inserida com sucesso!');
    });
  }

}
