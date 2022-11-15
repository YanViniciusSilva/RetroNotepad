import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';

@Component({
  selector: 'retro-datepicker',
  templateUrl: './retro-datepicker.component.html',
  styleUrls: ['./retro-datepicker.component.scss']
})
export class RetroDatepickerComponent implements OnInit {

  today:any
  date:Date | undefined
  lastDayOfMonth:any
  firstDayOfMonth:any
  monthName:string = ''

  day:number | undefined
  month:number | undefined
  year:number | undefined

  enumMonths = [
    {id:1, name:'janeiro'},
    {id:2, name:'fevereiro'},
    {id:3, name:'março'},
    {id:4, name:'abril'},
    {id:5, name:'maio'},
    {id:6, name:'junho'},
    {id:7, name:'julho'},
    {id:8, name:'agosto'},
    {id:9, name:'setembro'},
    {id:10, name:'outubro'},
    {id:11, name:'novembro'},
    {id:12, name:'dezembro'},
  ]

  constructor(
    @Inject(LOCALE_ID)
    public locale: string,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.format();
  }

  format(){
    const date = setInterval( () => {
      this.date = new Date()
      this.day = this.date.getDate()
      this.month = new Date().getMonth() + 1
      this.year = new Date().getFullYear()
      this.today = formatDate(this.date, 'dd MMMM, yyyy', 'pt-BR')
      this.firstDayOfMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1)
      this.lastDayOfMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0)

      clearInterval(date)
    }, 500)
  }

  nextDate(){
    if(this.day! <= this.lastDayOfMonth.getDate() - 1){
      this.day = this.day! + 1
      this.enumMonths.forEach(result => {
        if( result.id === this.month){
          this.monthName = result.name
        }
      })
      const year = new Date().getFullYear()
      this.today = this.day + ' ' + this.monthName + ', ' + year
    }else{
      if(this.month! <= 11){
        this.day = 1
        this.month = this.month! + 1
        this.enumMonths.forEach(result => {
          if( result.id === this.month){
            this.monthName = result.name
          }
        })
        const year = new Date().getFullYear()
        this.today = this.day + ' ' + this.monthName + ', ' + year
        this.firstDayOfMonth = new Date(new Date().getFullYear(), this.month, 1)
        this.lastDayOfMonth = new Date(new Date().getFullYear(), this.month , 0)
      }else{
        this.day = 1
        this.month = 1
        this.enumMonths.forEach(result => {
          if( result.id === this.month){
            this.monthName = result.name
          }
        })
        this.year = this.year! + 1
        this.today = this.day + ' ' + this.monthName + ', ' + this.year
        this.firstDayOfMonth = new Date(new Date().getFullYear(), this.month, 1)
        this.lastDayOfMonth = new Date(new Date().getFullYear(), this.month , 0)
      }
    }
  }

  previousDate(){
    if(this.day! >= this.firstDayOfMonth.getDate() + 1){
      this.day = this.day! - 1
      this.enumMonths.forEach(result => {
        if( result.id === this.month){
          this.monthName = result.name
        }
      })
      this.today = this.day + ' ' + this.monthName + ', ' + this.year
    }else{
      if(this.month! > 1){
        this.day = this.lastDayOfMonth.getDate()
        this.month = this.month! - 1
        this.enumMonths.forEach(result => {
          if( result.id === this.month){
            this.monthName = result.name
          }
        })
        this.today = this.day + ' ' + this.monthName + ', ' + this.year
        this.firstDayOfMonth = new Date(new Date().getFullYear(), this.month, 1)
        this.lastDayOfMonth = new Date(new Date().getFullYear(), this.month -1, 0)
      }else{
        this.day = this.lastDayOfMonth.getDate()
        this.month = 12
        this.enumMonths.forEach(result => {
          if( result.id === this.month){
            this.monthName = result.name
          }
        })
        this.year = this.year! - 1
        this.today = this.day + ' ' + this.monthName + ', ' + this.year
        this.firstDayOfMonth = new Date(new Date().getFullYear(), this.month, 1)
        this.lastDayOfMonth = new Date(new Date().getFullYear(), this.month -1, 0)
      }
    }
  }


}
