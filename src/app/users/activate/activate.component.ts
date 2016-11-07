import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.activateRoute.snapshot.queryParams['pid']);
    // this.route.params.forEach((params: Params) => {
    // });
  }

}
