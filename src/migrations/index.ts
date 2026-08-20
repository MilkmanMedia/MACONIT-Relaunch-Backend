import * as migration_20260820_121006_initial from './20260820_121006_initial';

export const migrations = [
  {
    up: migration_20260820_121006_initial.up,
    down: migration_20260820_121006_initial.down,
    name: '20260820_121006_initial'
  },
];
