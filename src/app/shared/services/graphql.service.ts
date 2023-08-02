import { Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const COUNTRIES = gql`
  {
    countries {
      name
      capital
      currency
      emoji
      phone
      continent {
        name
      }
    }
  }
`;

const EURO = gql`
  query euro($code: ID!) {
   continent(code: $code) {
     name
    countries {
      name
    }
  }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  getCountries() {
    return this.apollo.watchQuery({ query: COUNTRIES }).valueChanges;
  }

  getEuroCountries() {
    return this.apollo.watchQuery({ query: EURO, variables: { code: 'AS' } })
      .valueChanges;
  }
}
