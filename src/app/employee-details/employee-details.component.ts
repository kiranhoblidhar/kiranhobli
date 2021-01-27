import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employees = [
    {
      name: "Employee One",
      age: 40,
      email: "one@gmail.com",
      departments: ["Computer", "Physics"],
    },
    {
      name: "Employee Two",
      age: 10,
      email: "Two@gmail.com",
      departments: ["Computer"],
    },
    {
      name: "Employee Three",
      age: 10,
      email: "Three@gmail.com",
      departments: ["Physics", "Chemistry"],
    },
    {
      name: "Employee Four",
      age: 60,
      email: "Four@gmail.com",
      departments: ["Chemistry", "Physics"],
    },
    {
      name: "Employee Five",
      age: 70,
      email: "Five@gmail.com",
      departments: ["Computer", "Physics", "Chemistry"],
    },
    {
      name: "Employee Six",
      age: 70,
      email: "Six@gmail.com",
      departments: ["Computer", "Physics"],
    },
  ];
  previous: any = [];
  headElements = ['Emp Name', 'Age', 'Email Address', 'Departments'];
  department = [];
  employeesFilter = [];
  departmentVal: any;
  name: any;
  invalidFlag = true;

  constructor() { }

  ngOnInit() {
    this.employees.forEach(element => {
      element.departments.forEach(item => {
        this.department.push(item);
      });
    });
    this.department = this.department.map(item => item).filter((value, index, self) => self.indexOf(value) === index);
    this.departmentVal = this.department[0];
    this.loadElements();
  }

  loadElements() {
    this.employeesFilter = this.employees;
    this.employeesFilter.sort((a, b) => a.name.localeCompare(b.name));
  }

  searchEmployee() {
    this.employeesFilter = [];
    this.employees.forEach(element => {
      element.departments.forEach(item => {
        if (item === this.departmentVal) {
          this.employeesFilter.push(element);
        }
      });
    });
    const re = /\S+@\S+\.\S+/;
    if (re.test(this.name)) {
      this.employeesFilter = this.employeesFilter.filter(item => item.email === this.name);
    } else {
      this.employeesFilter = this.employeesFilter.filter(item => item.name === this.name);
    }
  }

  reset() {
    this.departmentVal = this.department[0];
    this.name = null;
    this.loadElements();
  }

  sortEmp(event: any) {
    if (event === '1') {
      this.employeesFilter.sort((a, b) => a.name.localeCompare(b.name));
    } else if (event === '2') {
      this.employeesFilter.sort((a, b) => b.name.localeCompare(a.name));
    } else if (event === '3') {
      this.employeesFilter.sort((a, b) => a.age - b.age);
    } else {
      this.employeesFilter.sort((a, b) => a.email.localeCompare(b.email));
    }
  }

  checkValid() {
    if (this.departmentVal === null || this.departmentVal === '' || this.departmentVal === undefined ||
      this.name === null || this.name === '' || this.name === undefined) {
      this.invalidFlag = true;
    } else {
      this.invalidFlag = false;
    }
  }

}
