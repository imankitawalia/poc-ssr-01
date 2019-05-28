import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ServiceService} from '../service/service.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  pollerform: FormGroup;
  public headings = [];
  public region = {};
  public services = {};
  public sources = {};
  public processTypes = {};
  public serverPorts = {};
  submitted = false;
  private fieldArray: Array<any> = [1];
  private newAttribute: any = {};
  constructor(private formBuilder: FormBuilder, private  service: ServiceService) { }

  ngOnInit() {
    console.log('In home init');
    const lables = require('src/app/hays/constants/constant.json');
    this.headings = lables.headings;
    this.region = lables.region;
    this.services = lables.service;
    this.sources = lables.source;
    this.processTypes = lables.processType;
    this.serverPorts = lables.serverPort;
    console.log('lables : ', this.region);
    this.pollerform = this.formBuilder.group({
      'selectChkbox': ['', Validators.required],
      'selectedService' : [null, [Validators.required, Validators.nullValidator]],
      'selectedRegion' : [null, Validators.required],
      'selectedSource' : [null, Validators.required],
      'selectedProcessType' : [null, Validators.required],
      'selectedBatch' : ['5', Validators.required],
      'selectedThread' : ['5', Validators.required],
      'selectedServer' : [null, Validators.required],
      'selectedSchedule' : ['5', Validators.required],
      'currentStatus' : [{value: 'Not Running', disabled: true}]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.pollerform.controls; }

  onSubmit() {
    console.log('In submit');
    this.f['currentStatus'].setValue('Running');
    console.log('status :', this.f.currentStatus.value);
    this.submitted = true;
    if (this.pollerform.invalid) {
      console.log('In form inavlid');
      return;
    }
    if (this.f.selectChkbox.value) {
      console.log('Service :', this.f.selectedService.value);
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.pollerform.value));
      this.service.postRequest(environment.server_hostname, this.f.selectedServer.value, environment.notification_api,
       JSON.stringify(this.pollerform.value)); /*.subscribe( response => {
        console.log('Response : ', response);
          this.f['currentStatus'].setValue('Success');
      },
        error => {
          console.log(error.message);
          this.f['currentStatus'].setValue('Error');
        }
      );*/
    }
  }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }
  deleteFieldValue(index) {
    if (this.fieldArray.length > 1) {
    this.fieldArray.splice(index, 1);
    }
  }
}
