import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private client = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.token
  });

  constructor() { }

  //querying all the content in contentful
  getCourses(query?: object): Promise<Entry<any>[]> {
    return this.client.getEntries(Object.assign({
      content_type: 'course'
    }, query))
      .then(res => res.items);
  }

  //querying a particular content in contentful
  getCourse(courseId): Promise<Entry<any>> {
    return this.client.getEntries(Object.assign({
      content_type: 'course'
    }, {'sys.id': courseId}))
      .then(res => res.items[0])
  }

}
