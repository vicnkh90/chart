import { Component, OnInit } from '@angular/core';
import movieUserPreference from '../../movieUserPreference';
import likes from '../../likes';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  chartTypeNumOfLikesPerTag = "pie"
  chartDataNumOfLikesPerTag = []
  chartLabelsNumOfLikesPerTag = []

  chartTypeNumOfImagesPerTag = "pie"
  chartDataNumOfImagesPerTag = []
  chartLabelsNumOfImagesPerTag = []

  constructor() { }

  ngOnInit() {
    //Number Of Likes Per Tag
    let datasetNumOfLikesPerTag = []
    let numOfLikesPerTag = {}

    for (let likeCount of likes) {
      for (let tag of likeCount.tags) {
        if (!numOfLikesPerTag[tag]) {
          numOfLikesPerTag[tag] = 0
        }
        numOfLikesPerTag[tag] += likeCount.likes
      }
    }

    this.chartLabelsNumOfLikesPerTag = Object.keys(numOfLikesPerTag)
    for (let tags of Object.keys(numOfLikesPerTag)) {
      datasetNumOfLikesPerTag.push(numOfLikesPerTag[tags])
    }

    this.chartDataNumOfLikesPerTag.push({
      data: datasetNumOfLikesPerTag
    })

    //Number Of Images Per Tag
    let datasetNumOfImagesPerTag = []
    let numOfImagesPerTag = {}

    for (let likeCount of likes) {
      for (let tag of likeCount.tags) {
        if (!numOfImagesPerTag[tag]) {
          numOfImagesPerTag[tag] = 0
        }
        numOfImagesPerTag[tag] += 1
      }
    }

    this.chartLabelsNumOfImagesPerTag = Object.keys(numOfImagesPerTag)
    for (let tags of Object.keys(numOfImagesPerTag)) {
      datasetNumOfImagesPerTag.push(numOfImagesPerTag[tags])
    }

    this.chartDataNumOfImagesPerTag.push({
      data: datasetNumOfImagesPerTag
    })

  }
}