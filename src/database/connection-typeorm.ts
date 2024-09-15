import { DataSource } from 'typeorm';

import { config } from '../config/typeorm-config';

export class ConnectionTypeORM {
  private static instance: ConnectionTypeORM;
  private con!: DataSource;

  private constructor() {}

  public static getInstance(): ConnectionTypeORM {
    if (!ConnectionTypeORM.instance) {
      ConnectionTypeORM.instance = new ConnectionTypeORM();
    }

    return ConnectionTypeORM.instance;
  }

  public async startConnection(): Promise<void> {
    console.log('Stating connection TypeORM');
    this.con = config;
    await this.con.initialize();
    console.info('Finished connection TypeORM');
  }

  public async getConnection(): Promise<DataSource> {
    if (!this.con) {
      await this.startConnection();
    }
    return this.con;
  }
}
