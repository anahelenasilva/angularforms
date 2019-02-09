import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';
import { tap, first } from 'rxjs/operators';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.scss']
})
export class SubmitFormComponent implements OnInit {

  myForm: FormGroup;

  //Form state
  loading: boolean = false;
  success: boolean = false;

  constructor(private fb: FormBuilder, private afs: AngularFirestore) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  async submitHandler() {
    loading = true;

    const formValue = this.myForm.value;
    try {
      await this.afs.collection('contacts').add(formValue);
      this.success = true;
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
  }

}
