import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DbServiceService} from "../services/db-service.service";
import {Password} from "../Model/Password";
import {VigenereEncryptService} from "../services/vigenere-encrypt.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  displayedColumns: string[] = ['id', 'password', 'delete'];
  passwords: Password[] = [];
  form: FormGroup= new FormGroup({
    cryptoName: new FormControl(''),
  });
  checked: boolean= false;
  constructor(private dbService: DbServiceService,private vigenereEncrypt: VigenereEncryptService,private _snackBar: MatSnackBar){
  }
  onSubmit() {
    if (this.form.controls["cryptoName"].value != "") {
      let password: Password = {
        password: this.vigenereEncrypt.vigenereEncrypt(this.form.value.cryptoName)
      }
      this.dbService.addPassword(password).subscribe(_ => {
        this.checked = false;
        this.getPasswords();
      })
      this.form.controls["cryptoName"].setValue("");
    }
    else{
      this.openSnackBar("Please enter a password","close")
    }
  }
  ngOnInit(): void {
    this.getPasswords();
  }
  getPasswords(){
    this.dbService.getAllPasswords().subscribe(data=>{
      this.passwords = data;
    })
  }

  deletePassword(id:number){
    this.dbService.deletePassword(id).subscribe(data=>{
      this.getPasswords();
    })
  }
  updateShowPasswords(){
    this.passwords.forEach(password=>{
      if (!this.checked){
        password.password = this.vigenereEncrypt.vigenereDecrypt(password.password);
      }else{
        password.password = this.vigenereEncrypt.vigenereEncrypt(password.password);
      }
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

}
