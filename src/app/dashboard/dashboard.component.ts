import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  // fundtransferForm
  constructor(private api:ApiService, private toaster:ToasterService, private fb:FormBuilder,private dashBoardRouter:Router){}

  transferForm = this.fb.group({

    creditacno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })
  
  isReadMore:boolean=true
  toggle(){
    this.isReadMore = !this.isReadMore
  }
  
  user:string=""
  balance:number=0
  balancesuccessstatus:boolean=false

  ngOnInit(): void {
    if(localStorage.getItem("loginUsername")){
      this.user=localStorage.getItem("loginUsername")|| ""
    }
  }

//  get balance

  getbalance(){
    // get acno from local storage
    const acno = localStorage.getItem("loginUseracno")
  // make api call using service
  this.api.getbalance(acno).subscribe({
    next:(output:any)=>{
      this.balance=output
      this.balancesuccessstatus=true
    },
    error:(err:any)=>{
      this.toaster.showWarning(err.error,"Warning")
      this.balancesuccessstatus=false
    }

  })
  }

  // fund transfer
  transfer(){
    if(this.transferForm.valid){
     let creditacno = this.transferForm.value.creditacno
     let amount = this.transferForm.value.amount
     this.api.fundtransfer(creditacno,amount).subscribe({
      next:(response:any)=>{
        this.toaster.showSuccess(response,"success")
      },
      error:(err:any)=>{
        this.toaster.showError(err.error,"Failed")
      }
     })

    }
    else{
      this.toaster.showWarning("InvalidForm","Warning")

    }
  }

  // delete account
  deleteAccount(){
    // api call
    this.api.deleteacno().subscribe({
      next:(response:any)=>{
        localStorage.removeItem("token")
        localStorage.removeItem("loginUsername")
        localStorage.removeItem("loginUseracno")
        
        this.toaster.showSuccess(response,"success")
        setTimeout(()=>{

          this.dashBoardRouter.navigateByUrl("")
        },3000);
      },
      error:(err:any)=>{
        this.toaster.showError(err.message,"Error")
      }
    })
    
  }

  // log out

  logout(){
    localStorage.removeItem("token")
        localStorage.removeItem("loginUsername")
        localStorage.removeItem("loginUseracno")
        this.toaster.showSuccess("Logout Successfully....Please Login for continue!!!","success")
        
        setTimeout(()=>{

          this.dashBoardRouter.navigateByUrl("")
        },3000);

  }
}
