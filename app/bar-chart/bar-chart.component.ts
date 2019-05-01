import { Component, OnInit } from '@angular/core';
// import multiYearLaptopSales from '../../multiYearLaptopSales'
import likes from '../../likes';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  chartTypeNumOfLikesPerTagPerMonth = "bar"
  chartDataNumOfLikesPerTagPerMonth = []
  chartLabelsNumOfLikesPerTagPerMonth = []

  constructor() { }

  ngOnInit() {
    //Number Of Likes Per Tag Per Month
    let dataNumOfLikesPerTagPerMonth = []
    let aggregateMonthlyNumOfLikesPerTag = {}
    let tempMonthlyNumOfLikesPerTag = {}
    let monthlyNumOfLikesPerTag = {
      'Jan': 0,
      'Feb': 0,
      'Mar': 0,
      'Apr': 0,
      'May': 0,
      'Jun': 0,
      'Jul': 0,
      'Aug': 0,
      'Sep': 0,
      'Oct': 0,
      'Nov': 0,
      'Dec': 0,
    }

    for (let likeCount of likes) {
      let month = likeCount.dateAdded.substring(4, 7);

      if (!tempMonthlyNumOfLikesPerTag[month]) {
        tempMonthlyNumOfLikesPerTag[month] = {}
      }

      for (let tag of likeCount.tags) {
        if (!tempMonthlyNumOfLikesPerTag[month][tag]) {
          tempMonthlyNumOfLikesPerTag[month][tag] = 0
        }
        tempMonthlyNumOfLikesPerTag[month][tag] += likeCount.likes
      }
    }

    for (let likeCount of Object.keys(tempMonthlyNumOfLikesPerTag)) {
      monthlyNumOfLikesPerTag[likeCount] = tempMonthlyNumOfLikesPerTag[likeCount]
    }

    this.chartLabelsNumOfLikesPerTagPerMonth = Object.keys(monthlyNumOfLikesPerTag)

    for (let month of Object.keys(monthlyNumOfLikesPerTag)) {
      for (let tag in monthlyNumOfLikesPerTag[month]) {
        if (!aggregateMonthlyNumOfLikesPerTag[tag]) {
          aggregateMonthlyNumOfLikesPerTag[tag] = []
        }
        aggregateMonthlyNumOfLikesPerTag[tag].push(monthlyNumOfLikesPerTag[month][tag])
      }
    }

    for (let tag in aggregateMonthlyNumOfLikesPerTag) {
      dataNumOfLikesPerTagPerMonth.push({
        data: aggregateMonthlyNumOfLikesPerTag[tag],
        label: tag
      })
    }

    this.chartDataNumOfLikesPerTagPerMonth = dataNumOfLikesPerTagPerMonth

  }
}
