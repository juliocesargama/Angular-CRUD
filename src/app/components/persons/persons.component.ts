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

  id: number;
  name: string;
  lastName: String;

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
      name: new FormControl(null),
      lastName: new FormControl(null),
      age: new FormControl(null),
      profession: new FormControl(null)
    });
  }

  HideForm(): void {
    this.tableVisibility = true;
    this.formVisibility = false;
  }

  SendPerson(): void {
    const person: Person = this.form.value;

    if (person.id > 0) {
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

  UpdatePerson(id: number): void {
    this.tableVisibility = false;
    this.formVisibility = true;

    this.personsService.GetById(id).subscribe(result => {
      this.formTitle = `Atualizar ${result.name} ${result.lastName}`;

      this.form = new FormGroup({
        id: new FormControl(result.id),
        name: new FormControl(result.name),
        lastName: new FormControl(result.lastName),
        age: new FormControl(result.age),
        profession: new FormControl(result.profession)
      });
    });
  }

  ShowDeleteModal(id: number, name: string, 
    lastName: string, modalContent: TemplateRef<any>): void{
      this.modalRef = this.modalService.show(modalContent);
      this.id = id;
      this.name = name;
      this.lastName = lastName;
  }

  DeletePerson(id: number): void{
    this.personsService.DeletePerson(id).subscribe(result =>{
      this.modalRef.hide();
      
      this.personsService.GetAll().subscribe(records =>{
        this.persons = records;
      });

      alert("Exclusão efetuada com sucesso!");
    });

  }
}
