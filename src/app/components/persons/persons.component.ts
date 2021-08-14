import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  persons: Person[];

  personID: number;
  personName: string;
  personLastName: String;

  tableVisibility: boolean = true;
  formVisibility: boolean = false;

  modalRef: BsModalRef;

  constructor(private personsService: PersonsService, 
    private modalService: BsModalService) { }

  ngOnInit(): void {

    this.personsService.GetAll().subscribe(result => {
      this.persons = result;
    });
  }

  ShowForm(): void {
    this.tableVisibility = false;
    this.formVisibility = true;

    this.formTitle = 'Nova Pessoa';

    this.form = new FormGroup({
      personName: new FormControl(null),
      personLastName: new FormControl(null),
      personAge: new FormControl(null),
      personProfession: new FormControl(null)
    });
  }

  HideForm(): void {
    this.tableVisibility = true;
    this.formVisibility = false;
  }

  SendPerson(): void {
    const person: Person = this.form.value;

    if (person.personID > 0) {
      //Atualização
      this.personsService.PutPerson(person).subscribe(result => {
        this.formVisibility = false;
        this.tableVisibility = true;

        alert('Pessoa atualizada com sucesso!');

        this.personsService.GetAll().subscribe(records => {
          this.persons = records;
        });
      });
    } else {
      // Inserção
      this.personsService.PostPerson(person).subscribe((result) => {
        this.formVisibility = false;
        this.tableVisibility = true;

        alert('Pessoa inserida com sucesso!');

        this.personsService.GetAll().subscribe(records => {
          this.persons = records;
        });
      });
    }
  }

  UpdatePerson(personID: number): void {
    this.tableVisibility = false;
    this.formVisibility = true;

    this.personsService.GetById(personID).subscribe(result => {
      this.formTitle = `Atualizar ${result.personName} ${result.personLastName}`;

      this.form = new FormGroup({
        personID: new FormControl(result.personID),
        personName: new FormControl(result.personName),
        personLastName: new FormControl(result.personLastName),
        personAge: new FormControl(result.personAge),
        personProfession: new FormControl(result.personProfession)
      });
    });
  }

  ShowDeleteModal(personID: number, personName: string, 
    personLastName: string, modalContent: TemplateRef<any>): void{
      this.modalRef = this.modalService.show(modalContent);
      this.personID = personID;
      this.personName = personName;
      this.personLastName = personLastName;
  }

  DeletePerson(personID: number): void{
    this.personsService.DeletePerson(personID).subscribe(result =>{
      this.modalRef.hide();
      
      this.personsService.GetAll().subscribe(records =>{
        this.persons = records;
      });

      alert("Exclusão efetuada com sucesso!");
    });

  }
}
