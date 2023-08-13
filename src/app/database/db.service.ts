import { Injectable } from '@angular/core';
import {
  SQLite,
  SQLiteObject,
  SQLiteDatabaseConfig,
} from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DBService {
  constructor(private sqlite: SQLite) {}

}
