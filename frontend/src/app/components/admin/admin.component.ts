import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'abe-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public chartType: string = 'bar';
  firstData: Array<any>=[0,0,0,0,0,0];
  secondData:Array<any>=[0,0,0,0,0,0];
  inactiveData:Array<any>=[0,0,0,0,0,0];
  blockedData:Array<any>=[0,0,0,0,0,0];
  driversFirstData: Array<any>=[0,0,0,0,0,0];
  driversSecondData:Array<any>=[0,0,0,0,0,0];
  driversInactiveData:Array<any>=[0,0,0,0,0,0];
  driversBlockedData:Array<any>=[0,0,0,0,0,0];
  user={
    month: 1
  }
  private months:Array<any>=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  public chartDatasets: Array<any> = [
    { data: [0.01,0.01,0.01,0.01,0.01,0.01] }
  ];
  public chartDatasets2: Array<any> = [
    { data: [0.01,0.01,0.01,0.01,0.01,0.01] }
  ];
  public chartDatasets3: Array<any> = [
    { data: [0.01,0.01,0.01,0.01,0.01,0.01]}
  ];
  //Datasets conductores
  public chartDatasets4: Array<any> = [
    { data: [0.01,0.01,0.01,0.01,0.01,0.01]}
  ];
  public chartDatasets5: Array<any> = [
    { data: [0.01,0.01,0.01,0.01,0.01,0.01]}
  ];
  public chartDatasets6: Array<any> = [
    { data: [0.01,0.01,0.01,0.01,0.01,0.01]}
  ];
  public chartDatasets7: Array<any> = [
    { data: [0.01,0.01,0.01,0.01,0.01,0.01]}
  ];
  public chartLabels: Array<any> = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    },
    ];

  public chartType1: string = 'bar';
  public chartDatasets1: Array<any> = [
    { data: [0.01,0.01,0.01,0.01,0.01,0.01] }
  ];
  public chartLabels1: Array<any> = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

    public chartColors1: Array<any> = [
      {
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2,
      },
      ];
    public chartOptions: any = {
      responsive: true,
        scales: {
          xAxes: [{
            stacked: false
            }],
          yAxes: [
          {
            stacked: false
          }
        ]
      }
    };

    public chartOptions1: any = {
      responsive: true,
        scales: {
          xAxes: [{
            stacked: false
            }],
          yAxes: [
          {
            stacked: false
          }
        ]
      }
    };

    public registrados(): void { 
      this.router.navigate(['/users']);
    }
    public activos(): void { 
      this.router.navigate(['/users-act']);
    }
    public inactivos(): void { 
      this.router.navigate(['/users-inact']);
    }
    public bloqueados(): void { 
      this.router.navigate(['/users-bloq']);
    }
    public drivers(): void { 
      this.router.navigate(['/drivers']);
    }
    public driversAct(): void { 
      this.router.navigate(['/drivers-act']);
    }
    public driversInact(): void { 
      this.router.navigate(['/drivers-inact']);
    }
    public driversBloq(): void { 
      this.router.navigate(['/drivers-bloq']);
    }
    public chartHovered(e: any): void { }
    public chartHovered1(e: any): void { }

  constructor( 
    public authService:AuthService,
    private router: Router) {
      
     }

  ngOnInit(): void {
    if(!this.authService.loggedInAdmin()){
      this.router.navigate(['/profile']);
    }else{
    var date = new Date();
    var month=date.getMonth();
    
    var opciones={ month: 'long'};
    //this.chartLabels[1]=date.getMonth().toLocaleString('es-MX');
    for (let index = 5; index > -1; index--) {
      if(month==-1){
        month=11;
      }
      this.user.month=month+1;
      this.authService.getUsersByMonth(this.user)
      .subscribe(
        res=>{
          this.firstData[index]=res.month;
          this.secondData[index]=res.active;
          this.inactiveData[index]=res.inactive;
          this.blockedData[index]=res.blocked;
          this.driversFirstData[index]=res.drivers;
          this.driversSecondData[index]=res.driversActive;
          this.driversInactiveData[index]=res.driversInactive;
          this.driversBlockedData[index]=res.driversBlocked;
        },
        err=>{}

      );
      this.chartLabels[index]=this.months[month];
      month--;
      
    }
    }
    
  }
  updateChart(){
    this.chartDatasets = [
      { data: this.firstData }
    ];

  }
  updateChartActive(){
    this.chartDatasets1 = [
      { data: this.secondData}
    ];

  }
  updateChartInactive(){
    this.chartDatasets2 = [
      { data: this.inactiveData}
    ];

  }
  updateChartBlocked(){
    this.chartDatasets3 = [
      { data: this.blockedData}
    ];

  }

  updateChartDrivers(){
    this.chartDatasets4 = [
      { data: this.driversFirstData }
    ];

  }
  updateChartDriversActive(){
    this.chartDatasets5 = [
      { data: this.driversSecondData}
    ];

  }
  updateChartDriversInactive(){
    this.chartDatasets6 = [
      { data: this.driversInactiveData}
    ];

  }
  updateChartDriversBlocked(){
    this.chartDatasets7 = [
      { data: this.driversBlockedData}
    ];

  }
  /*setTimeout(() => {
    this.chartDatasets[0].data=this.firstData;
  }, 5000);*/

}
