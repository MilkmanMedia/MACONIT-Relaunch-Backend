import * as migration_20260820_121006_initial from './20260820_121006_initial';
import * as migration_20260820_132159_add_maintenance_mode from './20260820_132159_add_maintenance_mode';

export const migrations = [
  {
    up: migration_20260820_121006_initial.up,
    down: migration_20260820_121006_initial.down,
    name: '20260820_121006_initial',
  },
  {
    up: migration_20260820_132159_add_maintenance_mode.up,
    down: migration_20260820_132159_add_maintenance_mode.down,
    name: '20260820_132159_add_maintenance_mode'
  },
];
