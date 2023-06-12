'use strict';

class Company {
  constructor(companyName, locationName) {
    this.companyName = companyName;
    this.locationName = locationName;
    this.employee = [];
  }

  table() {
    let body = document.getElementById('tbody');
    let tr = '';
    const employeeArr = this.employee;
    for (let i = 0; i < employeeArr.length; i++) {
      const employee = employeeArr[i];
      tr += `
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${employee.name}</td>
          <td>${employee.position}</td>
          <td>${employee.salary}</td>
          <td>
            <button class="btn btn-danger" onclick="deleteEmployee(${i})">Delete</button>
          </td>
        </tr>
      `;
    }
    body.innerHTML = tr;

    // iscilerin sayi-update
    document.getElementById('employeeCount').innerText = this.employee.length;
    document.getElementById('totalSalary').innerText = this.calculateTotalSalary().toLocaleString();
  }

  calculateTotalSalary() {
    let total = 0;
    for (let i = 0; i < this.employee.length; i++) {
      total += parseFloat(this.employee[i].salary);
    }
    return total;
  }

  addData(name, position, salary) {
    if (!name || !position || !salary) {
      alert('Bos buraxila bilmez!');
      return;
    }

    const employee = {
      name: name,
      position: position,
      salary: salary
    };

    this.employee.push(employee);
    this.table();
  }

  deleteData(index) {
    this.employee.splice(index, 1);
    this.table();
  }

  updateCompanyName(companyName) {
    this.companyName = companyName;
    document.getElementById('company').innerHTML = this.companyName;
  }

  updateLocationName(locationName) {
    this.locationName = locationName;
    document.getElementById('location').innerHTML = this.locationName;
  }

  updateSummary() {
    const employeeCount = this.employee.length;
    const totalSalary = this.calculateTotalSalary();

    document.getElementById('employeeCount').textContent = employeeCount;
    document.getElementById('totalSalary').textContent = totalSalary.toLocaleString();
  }
}

const ca = new Company('Code Academy', '28 may');
const na = new Company('Code Academy', 'Nizami');

document.getElementById('company').innerHTML = ca.companyName;
document.getElementById('location').innerHTML = ca.locationName;

let loc = document.getElementById('loc');

function Add() {
  let name = document.getElementById('name').value;
  let position = document.getElementById('position').value;
  let salary = document.getElementById('salary').value;

  if (loc.value === '1') {
    ca.addData(name, position, salary);
  } else if (loc.value === '2') {
    na.addData(name, position, salary);
  }

  // Modal-clear 
  document.getElementById('name').value = '';
  document.getElementById('position').value = '';
  document.getElementById('salary').value = '';

  
  document.getElementById('exampleModalLabel').innerHTML = 'Modal title';
}

function deleteEmployee(index) {
  if (loc.value === '1') {
    ca.deleteData(index);
  } else if (loc.value === '2') {
    na.deleteData(index);
  }
}

loc.addEventListener('change', function () {
  if (loc.value === '1') {
    ca.updateLocationName('28 may');
    ca.table();
  } else if (loc.value === '2') {
    na.updateLocationName('Nizami');
    na.table();
  }
});
